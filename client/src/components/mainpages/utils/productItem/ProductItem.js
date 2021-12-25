import React from "react";
import BtnRender from "./BtnRender";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  //   const state = useContext(GlobalState);
  //   const [isLogged] = state.userAPI.isLogged;
  //   const addCart = state.userAPI.addCart;
  return (
    <div className="product_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt="" />

      <div className="product_box" style={{ padding: "15px" }}>
        <h4
          style={{
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: "20px",
            WebkitLineClamp: "2",
            height: "40px",
          }}
          title={product.title}
        >
          {isAdmin ? (
            <a href="#">{product.title}</a>
          ) : (
            <a href={`/detail/${product._id}`}>{product.title}</a>
          )}
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <h6
            className=""
            style={{
              fontSize: "19px",
              color: "#fbb72c",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            {" "}
            ${product.price}
          </h6>
          {product.inStock - product.sold > 0 ? null : (
            <h6
              style={{
                color: "#DB232F",
                fontSize: "18px",
                paddingRight: "15px",
                fontWeight: "600",
              }}
            >
              {" "}
              OUT STOCK
            </h6>
          )}
        </div>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            WebkitLineClamp: "3",
            height: "65px",
            color: "#999",
          }}
        >
          {product.description}
        </p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
