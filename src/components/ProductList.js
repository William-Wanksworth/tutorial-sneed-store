import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import Loading from "./Loading";

const ProductList = () => {
  const { filtered_products, grid_view } = useFilterContext();
  if (filtered_products === null) {
    return <Loading />;
  }
  if (grid_view) {
    return <GridView products={filtered_products} />;
  }
  return <ListView products={filtered_products} />;
};

export default ProductList;
