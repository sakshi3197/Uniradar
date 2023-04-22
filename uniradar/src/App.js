import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Recommendations from "./Recommendations";
import Universities from "./Universities";
import SingleUniversity from "./SingleUniversity";
import Favourites from "./Favourites";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Registration from "./Registration";
import Profile from "./Profile";

const App = () => {
const theme = {
  colors: {
    bg: "#F6F8FA", 
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "reba (98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient: "linear-gradient(Odeg, rgb(132 144 255) 0%, rgb (98 189 252) 100%)",
    shadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px Opx 0px 1px;", 
    shadowSupport: "rgba(0, 0, 0, 0.16) Opx 1px 4px",
  },
  media: {
    mobile: "768px",
    tab: "998px",
  },
};





  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleUniversity/:id" element={<SingleUniversity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favourites/" element={<Favourites />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/registration/" element={<Registration />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
};

export default App;

