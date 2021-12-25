import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import RecommendAPI from "./api/RecommendAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const fristLogin = localStorage.getItem("fristLogin");
    if (fristLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    recommendAPI: RecommendAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
