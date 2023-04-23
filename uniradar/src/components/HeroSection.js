import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ myData }) => {
  const { name } = myData;
  const navigate = useNavigate();
  const handleNavigation = event => {
    navigate("./universities")
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1> {name} </h1>
            <p>
            Welcome to UniRadar, the ultimate destination for all your university-related queries and concerns!</p> 
            <p>At UniRadar, we understand how important it is to make the right choice when it comes to higher education. That's why we have gathered extensive data and insights about thousands of universities to help you make informed decisions. Our easy-to-use interface and powerful search engine allow you to quickly find and compare universities based on your preferred criteria, such as location, academic programs, tuition fees, and more. </p>
            <NavLink>
            <Button><NavLink to="/universities"> Explore Now </NavLink></Button>
            </NavLink>
          </div>
          <div className="hero-section-image">
            <figure>
              <img
                src="images/iu3.jpg"
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

export default HeroSection;
