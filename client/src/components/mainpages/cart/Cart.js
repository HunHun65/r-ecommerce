/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobleState";
import axios from "axios";
import PaypalButton from "./PaypalButton";
import { Link } from "react-router-dom";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };
  const removeProduct = (id) => {
    // if (window.confirm("Do you want to delete this product?")) {
    cart.forEach((item, index) => {
      if (item._id === id) {
        cart.splice(index, 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
    // }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    // alert("You have successfully placed an order.")
  };

  if (cart.length === 0)
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card-empty">
              <div class="card-body cart-empty">
                <div class="col-sm-12 empty-cart-cls text-center">
                  {" "}
                  <img
                    src="emptycart.jpg"
                    className="img-fluid"
                    alt=""
                    style={{
                      height: "150px",
                      width: "150px",
                      display: "block",
                      marginLeft: " auto",
                      marginRight: "auto",
                      marginBottom: "20px",
                    }}
                  />
                  <h3>
                    <p
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontSize: "24px",
                        marginBottomL: "10px",
                      }}
                    >
                      Your Cart is Empty
                    </p>
                  </h3>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                  >
                    Add something to make me happy :)
                  </p>{" "}
                  <Link
                    to="/"
                    class="btn cart-btn-transform m-3"
                    data-abc="true"
                    style={{
                      width: "190px",
                      height: "45px",
                      display: "block",
                      marginLeft: " auto",
                      marginRight: "auto",
                      marginTop: "30px",
                      textTransform: "capitalize",
                    }}
                  >
                    <p>continue shopping</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div style={{ marginTop: "20px", height: "100%", backgroundColor: "#fff" }}>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />
          <div className="box-detail">
            <div className="row">
              <h3
                style={{
                  fontFamily: "Arial",
                  marginTop: "10px",
                  textTransform: "uppercase",
                }}
              >
                {product.title}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "25px",
                marginTop: "5px",
                fontFamily: "Roboto",
              }}
            >
              <p className="text-danger">
                {" "}
                PRICE: ${product.price * product.quantity}
              </p>{" "}
            </div>

            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button
                onClick={() => decrement(product._id)}
                style={{ fontSize: "20px" }}
                disabled={product.quantity === 1 ? true : false}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => increment(product._id)}
                style={{ fontSize: "20px" }}
                disabled={
                  product.quantity === product.inStock - product.sold
                    ? true
                    : false
                }
              >
                +
              </button>
            </div>
            <div className="delete" onClick={() => removeProduct(product._id)}>
              x
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>TOTAL: ${total}</h3>
      </div>
      <button
        className="btn-payment"
        style={{ float: "right", padding: "10px", marginRight: "60px" }}
      >
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </button>
    </div>
  );
}

export default Cart;
