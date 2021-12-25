import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobleState";
import ProductItem from "../utils/productItem/ProductItem";
import Slider from "../utils/Slider/Slide";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import Footer from "../utils/Footer/Footer";
import Newsletter from "../utils/Newsletter/Newsletter";
import Categories from "../utils/Categories/Categories";
import Recommend from "../utils/Recommend/Recommend";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };
  const deleteProduct = async (id, public_id) => {
    try {
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      {isAdmin ? (
        <>
          <Filters />
          <div className="delete-all">
            <span>Select All</span>
            <input type="checkbox" checked={isCheck} onChange={checkAll} />
            <button onClick={deleteAll}>Delete All</button>
          </div>
          <div className="products">
            {products.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  deleteProduct={deleteProduct}
                  handleCheck={handleCheck}
                />
              );
            })}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <LoadMore />
          </div>
        </>
      ) : (
        <div>
          <Slider />
          <Categories />
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
          <div
            style={{
              fontSize: "40px",
              textAlign: "center",
              fontWeight: "500",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Clothing
          </div>
          <Filters />
          <div className="products">
            {products.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
          </div>
          <LoadMore />
          {products.length === 0 && <Loading />}
          <Newsletter />
          <Footer />
        </div>
      )}
      {/* <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id}  product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck}/>
                    })
                } 
            </div>
            <LoadMore/>
            {products.length === 0 && <Loading/>}
            <Newsletter/>
            <Footer/> */}
    </>
  );
}

export default Products;
