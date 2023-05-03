import { React } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck, FaSearch } from "react-icons/fa";

const Filters = () => {
  const {
    filtered_products,
    all_products,
    updateFilters,
    filters,
    categories,
    companies,
    colors,
    max_price,
    min_price,
    shipping,
    clearFilters,
  } = useFilterContext();

  return (
    <Wrapper>
      <div className="content">
        <div className="form-control">
          <form>
            <input type="text" className="search-input" placeholder="search" />
          </form>
        </div>
        <div className="categories">
          <h5>Category</h5>
          <button onClick={() => updateFilters("category", "all")}>all</button>
          {all_products !== null &&
            categories.map((cat, i) => (
              <button
                className={`${filters.category === cat ? "active" : null}`}
                key={i}
                onClick={() => updateFilters("category", cat)}
              >
                {cat}
              </button>
            ))}
        </div>
        <div className="form-control">
          <h5>Company</h5>
          <form>
            <select
              name="company"
              id="company"
              className="company"
              defaultValue="all"
              onChange={(e) => {
                updateFilters("company", e.target.value);
              }}
            >
              <option value="all">all</option>
              {all_products !== null &&
                companies.map((com, i) => (
                  <option key={i} value={com}>
                    {com}
                  </option>
                ))}
            </select>
          </form>
        </div>
        <div className="form-control">
          <h5>Colors</h5>
          <div className="colors">
            <button
              className={`all-btn ${
                filters.colors === "all" ? "active" : null
              }`}
              onClick={() => {
                updateFilters("colors", "all");
              }}
            >
              All
            </button>
            {all_products !== null &&
              colors.map((color, i) => {
                return (
                  <button
                    data-color={color}
                    key={i}
                    className={`color-btn `}
                    style={{ background: color }}
                    onClick={(e) => {
                      updateFilters("colors", e.target.dataset.color);
                    }}
                  >
                    {filters.colors === color ? <FaCheck /> : null}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="form-control">
          <h5>Price</h5>
          <p className="price">{formatPrice(filters.price)} </p>
          <input
            type="range"
            name="price"
            min={min_price}
            max={max_price}
            onChange={(e) => {
              updateFilters("price", e.target.value);
            }}
            value={filters.price}
          />
        </div>
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            checked={filters.shipping}
            onChange={(e) => {
              console.log(e.target.checked);
              updateFilters("shipping", e.target.checked);
            }}
          />
        </div>
        <button className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .categories {
    padding-bottom: 0.75rem;
  }

  .form-control {
    margin-bottom: 1.25rem;
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 120px;
    input {
      translate: 0 10%;
    }
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
