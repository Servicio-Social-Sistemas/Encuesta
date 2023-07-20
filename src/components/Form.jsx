import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import questions from "./questions"; // Asegúrate de ajustar la ruta al archivo questions.js si es necesario

function Form() {
  const [userData, setUserData] = useState({
    responses: [],
    ubication: {
      lat: "",
      long: "",
    },
  });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserData((prevUserData) => ({
            ...prevUserData,
            ubication: {
              lat: latitude.toString(),
              long: longitude.toString(),
            },
          }));
        },
        (error) => {
          console.log("No se pudo obtener la ubicacion");
          alert("Por favor, permita el acceso a la ubicación para continuar.");
        }
      );
    }
  };

  const handleAnswerSelection = (questionIndex, answer) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      responses: [
        ...prevUserData.responses,
        { [`answer${questionIndex + 1}`]: answer },
      ],
    }));
  };

  const saveData = (data) => {
    return axios.post(import.meta.env.VITE_API_URL, data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getLocation();

    if (userData.ubication.lat === "" || userData.ubication.long === "") {
      return;
    }

    try {
      await toast.promise(saveData(userData), {
        loading: "Enviando...",
        success: <b>¡Datos enviados con éxito!</b>,
        error: <b>No se puden enviar los datos.</b>,
      });
      console.log(userData);
    } catch (error) {
      console.log("Error al guardar los datos:", error);
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmit}>
      <h2 className="font-bold uppercase">Preguntas</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {question.responses.map((response) => (
            <label key={response.answer}>
              <input
                type="radio"
                value={response.answer}
                name={`question-${index}`}
                onChange={() => handleAnswerSelection(index, response.answer)}
              />
              {response.text}
            </label>
          ))}
        </div>
      ))}

      <button className="bg-pink-400 py-2 px-10 rounded-md text-white hover:bg-pink-500 duration-100">
        Enviar
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default Form;
