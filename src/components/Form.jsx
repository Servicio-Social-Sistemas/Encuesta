import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import questions from "./questions"; // Asegúrate de ajustar la ruta al archivo questions.js si es necesario
import styles from "../css/Form.css";

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
        error: <b>No se pueden enviar los datos.</b>,
      });
      console.log(userData);
    } catch (error) {
      console.log("Error al guardar los datos:", error);
    }
  };

  return (
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-bold">preguntas</div>
      <br></br>
      {questions.map((question, index) => (
        <div key={index} class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <p class="text-indigo-900 font-bold text-xl mb-2">{question.question}</p>
          {question.responses.map((response) => (
            <label
              class="text-gray-700 text-base"
              key={response.answer}
            >
              <input
                className="mr-1"
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

      <br></br>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <span>Enviar</span>
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default Form;
