import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="About" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="sucka" />
        <article>
          <div className="title">
            <h2>our house</h2>
            <div className="underline"></div>
            <p>
              Our house, in the middle of our street <br /> Our house, in the
              middle of our street <br /> Our house, in the middle of our street{" "}
              <br /> Our house, in the middle of our <br /> Our house, was our
              castle and our keep <br /> Our house, in the middle of our street{" "}
              <br /> Our house, that was where we used to sleep <br /> Our
              house, in the middle of our street <br /> Our house
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
