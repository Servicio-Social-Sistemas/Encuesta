import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

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
      respuesta1: respuesta1,
    },
    ubication: {
      latitud: lat,
      longitud: long,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui va la paticion hacia el endpoint
      // axios.post("/api/data", UserData);
      console.log(UserData);
      getLocation();
      toast.success("Datos enviados con éxito");
    } catch (error) {
      toast.error("Error, intente nuevamente");
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmit}>
      <h2 className="font-bold uppercase">Preguntas</h2>
      {/* Las preguntas van aqui */}

      <button className="bg-pink-400 py-2 px-10 rounded-md text-white hover:bg-pink-500 duration-100">
        Enviar
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default Form;
