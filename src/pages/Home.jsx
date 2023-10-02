import React from "react";
import Carousel from "../components/Carousel";
import FeaturedProducts from "../components/FeaturedProducts";
import Nav from "../components/Nav";

export default function Home() {
   return (
      <>
         <Nav />
         <Carousel />
         <FeaturedProducts />
      </>
   );
}
