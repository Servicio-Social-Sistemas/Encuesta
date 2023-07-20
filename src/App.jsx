import { useState } from "react";
import Header from "./components/Header";
import Disclaimer from "./components/Disclaimer";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <section className="flex content-center justify-center flex-col">
        <Disclaimer />
        <Form />
      </section>
    </>
  );
}

export default App;
