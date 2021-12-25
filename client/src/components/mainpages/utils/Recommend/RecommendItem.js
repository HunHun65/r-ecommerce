import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobleState";
import { Link } from "react-router-dom";
function RecommendItem({ recommend }) {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const addCart = state.userAPI.addCart;
  return (
    <div className="product-card">
      <div className="badge">Hot</div>
      <div className="product-tumb">
        <img src={recommend?.images?.url} alt="" />
      </div>
      <div className="product-details">
        <span className="product-catagory">{recommend?.category.name}</span>
        <h4
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "25px",
            // webkitLineClamp: "2",
            height: "50px",
            display: " -webkit-box",
            // webkitBoxOrient: "vertical",
            textAlign: "center",
          }}
        >
          <a href={`/detail/${recommend._id}`}>{recommend?.title}</a>
        </h4>
        <p
          style={{
            width: "290px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "25px",
            height: "75px",
            display: "-webkit-box",
          }}
        >
          {recommend?.description}
        </p>
        <div className="product-bottom-details">
          <div className="product-price">${recommend?.price}</div>
          <div
            className="product-link"
            style={{
              backgroundColor: "#22222A",
              borderRadius: "3px",
              height: "40px",
              marginTop: "-10px",
            }}
          >
            <Link
              id="btn_buy"
              to={isLogged ? "#!" : "/login"}
              disabled={recommend.inStock === 0 ? true : false}
              onClick={() => addCart(recommend)}
            >
              <p
                style={{
                  color: "#ffffff",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                Add to Cart
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendItem;
