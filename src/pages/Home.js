import React from "react";
import Category from "../components/Category";
import Food from "../components/Food";
import HeadlineCards from "../components/HeadlineCards";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import "../App.css";
function Home() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <HeadlineCards />
      <Food />
      <Category />
    </div>
  );
}

export default Home;
