import { useState } from "react";

function Form() {
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

  const UserData = {
    response: {
      respuesta1: "",
    },
    ubication: {
      latitud: lat,
      longitud: long,
    },
  };

  console.log(UserData);

  return (
    <form className="my-4">
      <h2 className="font-bold uppercase">Preguntas</h2>
      {/* Aqui va el contenido del formulario */}
      <button className="bg-pink-400 py-2 px-10 rounded-md text-white hover:bg-pink-500 duration-100">
        Enviar
      </button>
    </form>
  );
}

export default Form;
