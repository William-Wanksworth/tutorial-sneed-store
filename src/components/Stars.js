import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { PRODUCT_STARS_NUMBER } from "../utils/constants";
const Stars = ({ stars, reviews }) => {
  const starsArr = [...new Array(PRODUCT_STARS_NUMBER)];
  const tempStars = () => {
    return starsArr.map((_, i) => {
      return (
        <span key={i}>
          {stars >= i + 1 ? (
            <BsStarFill />
          ) : stars <= i ? (
            <BsStar />
          ) : (
            <BsStarHalf />
          )}
        </span>
      );
    });
  };
  return (
    <Wrapper>
      <div className="stars">{tempStars()}</div>
      <p className="reviews">{reviews} customer reviews</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
