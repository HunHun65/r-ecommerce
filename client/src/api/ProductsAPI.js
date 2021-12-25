/* eslint-disable no-template-curly-in-string */

import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [detailProduct, setDetailProduct] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 12
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [callback, category, sort, search, page]);

  // useEffect(() => {
  //   const getDetailProduct = async (id) => {
  //     const res = await axios.get(`/api/product/${id}`);
  //     console.log(res.data);
  //     // setDetailProduct(res.data.detailProduct);
  //   };
  //   getDetailProduct();
  // }, []);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    detailproduct: [detailProduct, setDetailProduct],
  };
}

export default ProductsAPI;
