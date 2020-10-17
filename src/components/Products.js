import React, { Component } from "react";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
  render() {
    return (
      <div>
        <Zoom bottom cascade>
          <ul className="products">
            {this.props.products.map((product) => {
              return (
                <li key={product._id}>
                  <div className="product">
                    <a href={"#" + product._id}>
                      <img src={product.images} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{"$" + product.price}</div>
                      <button
                        onClick={() => this.props.addToCart(product)}
                        className="button primary"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Zoom>
      </div>
    );
  }
}
