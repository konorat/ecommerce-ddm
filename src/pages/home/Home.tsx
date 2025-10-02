import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Footer from "./components/Footer";

const Home: React.FC = () => {
  return (

    <div className="min-h-screen bg-yellow-50">

      <Header />
      <Menu />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
