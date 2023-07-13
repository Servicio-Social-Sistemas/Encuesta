import { useState } from "react";
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
      <h1 className="text-3xl font-bold text-teal-500">Formulario</h1>

      <button onClick={getLocation}>Obtener ubicacion</button>

      <h2>
        Ubicacion: {lat}, {long}
      </h2>
      <div></div>
    </>
  );
}

export default App;
