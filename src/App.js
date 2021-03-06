// feature 1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      type: "",
      sort: "",
    };
  }

  // Handle Creating an Order
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  // Handle Adding to Cart
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // Handle Removing from Cart
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item) => item._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item._id !== product._id))
    );
  };

  // Handle Sorting Function
  sortProducts = (event) => {
    let sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        if (sort === "lowest") {
          return a.price > b.price ? 1 : -1;
        } else if (sort === "highest") {
          return a.price < b.price ? 1 : -1;
        } else {
          return a._id > b._id ? 1 : -1;
        }
      }),
    }));
  };

  // Handle Filtering Function
  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ type: event.target.value, products: data.products });
    } else {
      this.setState({
        type: event.target.value,
        products: data.products.filter(
          (product) =>
            product.type.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  // Rendering App Component
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">EZ Shadez</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                type={this.state.type}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
