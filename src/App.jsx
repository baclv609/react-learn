import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Ft";
import "./App.css";

import MyRouter from "./router/MyRouter";
// import MyRouter from "./pages/MyRouter";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <MyRouter />
      </main>
      <Footer />
    </>
  );
}

export default App;
