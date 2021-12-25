import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobleState";
import ProductItem from "../utils/productItem/ProductItem";
import axios from "axios";
import Recommend from "../utils/Recommend/Recommend";

function DetailProduct() {
  const state = useContext(GlobalState);
  const { id } = useParams();
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState();
  const [isLogged] = state.userAPI.isLogged;

  //   useEffect(() => {
  //     if (id && products) {
  //       let product = products.find(
  //         (product) => JSON.stringify(product._id) === JSON.stringify(id)
  //       );
  //       setDetailProduct(product);
  //     }
  //   }, [id, products]);
  useEffect(() => {
    const getDetailProduct = async (id) => {
      const res = await axios.get(`/api/products/${id}`);
      console.log(res.data);
      setDetailProduct(res.data);
    };
    getDetailProduct(id);
  }, [id]);

  return (
    <>
      <div>
        <div className="detail">
          <img src={detailProduct?.images.url} alt="" />
          <div className="box-detail">
            <div className="row">
              <h4 style={{ fontFamily: "Arial", marginTop: "10px" }}>
                {detailProduct?.title}
              </h4>
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
              <p
                className="text-danger"
                style={{
                  color: "#fbb72c",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: "24px",
                }}
              >
                {" "}
                price: ${detailProduct?.price}
              </p>
              {detailProduct?.inStock - detailProduct?.sold > 0 ? (
                <p style={{ color: "#2341DB" }}>
                  IN STOCK: {detailProduct?.inStock - detailProduct?.sold}{" "}
                </p>
              ) : (
                <p style={{ color: "#DB232F" }}> OUT STOCK</p>
              )}
            </div>
            <p>{detailProduct?.description}</p>
            <p>{detailProduct?.content}</p>
            <p>SOLD: {detailProduct?.sold}</p>
            {detailProduct?.sold - detailProduct?.inStock === 0 ? null : (
              <Link
                to="/cart"
                className="cart"
                style={{
                  marginTop: "20px",
                  width: "200px",
                  textAlign: "center",
                }}
                onClick={() => addCart(detailProduct)}
              >
                BUY NOW
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        {isLogged ? (
          <p
            style={{
              fontSize: "40px",
              textAlign: "center",
              fontWeight: "500",
              textTransform: "uppercase",
            }}
          >
            Recommend for you
          </p>
        ) : null}
        <Recommend />
      </div>
      <div>
        <h2
          style={{
            marginTop: "20px",
            fontSize: "40px",
            textAlign: "center",
            fontWeight: "500",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          RELATED PRODUCTS
        </h2>
        <div className="products">
          {products.map((product) => {
            return detailProduct?.category === product?.category ? (
              <div>
                <ProductItem key={product._id} product={product} />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
