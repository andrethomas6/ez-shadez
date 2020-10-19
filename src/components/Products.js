import React, { Component } from "react";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import Modal from "react-modal";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Bounce bottom cascade>
          <ul className="products">
            {this.props.products.map((product) => {
              return (
                <li key={product._id}>
                  <div className="product">
                    <a href={"#" + product._id}>
                      <img
                        onClick={() => this.openModal(product)}
                        src={product.images}
                        alt={product.title}
                      ></img>
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
        </Bounce>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={() => this.closeModal()}>
                x
              </button>
              <div className="product-details">
                <img src={product.images} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Types{"  "}
                    <button className="button primary">
                      {product.type.toUpperCase()}
                    </button>
                  </p>
                  <div className="product-price">
                    <div>${product.price}</div>
                    <button
                      className="button secondary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
