import { useState } from "react";
import Header from "./components/Header";
import Disclaimer from "./components/Disclaimer";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          console.log("No se pudo obtener la ubicacion");
        }
      );
    }
  };

  return (
    <>
      <Header />
      <section className="flex content-center justify-center flex-col">
        <Disclaimer />
        <Form />
        <div>
          <button className="bg-teal-500" onClick={getLocation}>
            Obtener ubicacion
          </button>

          <h2>
            Ubicacion: {lat},{long}
          </h2>
        </div>
      </section>
    </>
  );
}

export default App;
