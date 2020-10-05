// feature 1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      type: "",
      sort: "",
    };
  }

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
            product.type === "unisex" ||
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
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
