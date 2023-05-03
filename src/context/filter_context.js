import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import { default_filters } from "../utils/constants";

const initialState = {
  filtered_products: null,
  all_products: null,
  grid_view: true,
  sort_by: "Name (A-Z)",
  filters: default_filters,
  companies: null,
  categories: null,
  colors: null,
  shipping: false,
  max_price: "",
  min_price: "",
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  useEffect(() => {
    if (products.length > 0) {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
    }
  }, [products]);

  useEffect(() => {
    if (state.filtered_products !== null) {
      dispatch({ type: FILTER_PRODUCTS });
      dispatch({ type: SORT_PRODUCTS });
    }
  }, [state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (value) => {
    dispatch({ type: UPDATE_SORT, payload: value });
    dispatch({ type: SORT_PRODUCTS });
  };

  const updateFilters = (filter, value) => {
    dispatch({ type: UPDATE_FILTERS, payload: [filter, value] });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
