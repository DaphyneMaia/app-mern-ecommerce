import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const HomePage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      setProductList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBar />
      <Grid container gap={12} sx={{ padding: 2 }}>
        {productList.length !== 0 &&
          productList.map((product) => (
            <Grid item key={product._id} xs={8} sm={6} md={3} lg={4}>
              <ProductCard
                key={product._id}
                product={product}
                getProduct={() => getProduct()}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default HomePage;
