import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <section className="flex content-center justify-center flex-col">
        <Form />
      </section>
    </>
  );
}

export default App;
