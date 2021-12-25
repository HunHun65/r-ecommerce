import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobleState";
import { Link } from "react-router-dom";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged;
  const addCart = state.userAPI.addCart;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link
            style={{ color: "#ffffff" }}
            id="btn_buy"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </Link>
          <Link
            style={{ color: "#333" }}
            id="btn_view"
            to={`/edit_product/${product._id}`}
          >
            Edit
          </Link>
        </>
      ) : (
        <>
          {product.sold - product.inStock === 0 ? null : (
            <>
              <Link
                style={{ color: "#ffffff" }}
                id="btn_buy"
                to={isLogged ? "#!" : "/login"}
                disabled={product.inStock === 0 ? true : false}
                onClick={() => addCart(product)}
              >
                Add to cart
              </Link>
              {/* 
              <Link
                style={{ color: "#fbb72c" }}
                id="btn_view"
                to={`/detail/${product._id}`}
              >
                View
              </Link> */}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default BtnRender;
