import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from './styles/Button';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const About = () => {

  const handleNavigation = event => {
    navigate("./universities")
  };
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <h1> About Us </h1>
            <p>UniRadar was created with one goal in mind - to make the search for higher education easier, more efficient, and more enjoyable for students and their families. As experienced educators and researchers, we understand the challenges that come with finding the right university. That's why we set out to create an application that would provide accurate, comprehensive, and up-to-date information about universities around the world.
            </p> 
            <p>
            Our team is made up of passionate and dedicated individuals with years of experience in higher education. At UniRadar, we believe that everyone should have access to reliable and unbiased information about universities. We are committed to providing a platform that is easy to use, free of charge, and accessible to students and families from all parts of the world.
            </p>
            <p>
            We are constantly updating our database and adding new features to make the UniRadar experience even better. We welcome feedback from our users and strive to incorporate their suggestions into our application. Our mission is to help students find the right university and achieve their academic goals, and we are proud to be a part of their journey.
            </p>
            <NavLink>
              <Button><NavLink to="/universities"> Explore Now </NavLink></Button>
            </NavLink>
          </div>
          <div className="hero-section-image">
            <figure>
              <img
                src="images/iu1.png"
                alt="hero-section-photo"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
    }
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;


export default About

