import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { default_filters } from "../utils/constants";
import { getOverlapping, getUniqueValues, getIds } from "../utils/helpers";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    console.log(action.payload[0]);
    const categories = getUniqueValues(action.payload, "category");
    const companies = getUniqueValues(action.payload, "company");
    const colors = getUniqueValues(action.payload, "colors");
    const prices = getUniqueValues(action.payload, "price");
    const max_price = prices.reduce((acc, price) =>
      price > acc ? price : acc
    );
    const min_price = prices.reduce(
      (acc, price) => (price < acc ? price : acc),
      prices[0]
    );
    console.log(min_price);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      categories,
      companies,
      colors,
      max_price,
      min_price,
      filters: {
        ...state.filters,
        price: max_price,
      },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort_by: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const tempSorted = [];

    if (state.sort_by === "price (descending)") {
      const sorted = state.filtered_products
        .map((a) => a)
        .sort((a, b) => b.price - a.price);
      tempSorted.push(...sorted);
    }

    if (state.sort_by === "Name (A-Z)") {
      const sorted = state.filtered_products
        .map((a) => a)
        .sort((a, b) => a.name.localeCompare(b.name));
      tempSorted.push(...sorted);
    }

    if (state.sort_by === "Name (Z-A)") {
      const sorted = state.filtered_products
        .map((a) => a)
        .sort((a, b) => -1 * a.name.localeCompare(b.name));
      tempSorted.push(...sorted);
    }

    return {
      ...state,
      filtered_products: [...tempSorted],
    };
  }

  if (action.type === UPDATE_FILTERS) {
    const filter = action.payload[0];
    const value = action.payload[1];
    console.log(filter, value);
    return {
      ...state,
      filters: {
        ...state.filters,
        [filter]: value,
      },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const filters = Object.entries(state.filters);
    const tempIds = filters.map((filter) => {
      const [filName, value] = filter;

      const singleFilter = state.all_products.filter((product) => {
        if (value === "all") return true;
        if (filName === "colors") {
          return product.colors.includes(value);
        }
        if (filName === "price") {
          return product.price <= value;
        }
        if (filName === "shipping" && value === false) {
          return true;
        }
        return product[filName] === value;
      });

      return getIds(singleFilter);
    });

    const productIds = getOverlapping([...tempIds]);
    const filtered_products = state.all_products.filter((prod) =>
      productIds.includes(prod.id)
    );
    console.log(filtered_products);
    return {
      ...state,
      filtered_products,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...default_filters,
        price: state.max_price,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
