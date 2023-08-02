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
    <form class="px-8 pt-6 pb-8 text-left" onSubmit={handleSubmit}>
      <div class="uppercase tracking-wide text-2xl text-indigo-500 font-bold">
        Preguntas
      </div>
      {questions.map((question, index) => (
        <div
          key={index}
          className=" m-auto border-r border-b border-l border-gray-400 sm:text-left lg:text-[100%] lg:border-l-0 lg:border-t lg:border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col leading-normal"
        >
          <p class="text-indigo-900 font-bold text-xl mb-2 ">
            {question.question}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {question.responses.map((response) => (
              <label className="cursor-pointer" key={response.answer}>
                <input
                  style={{ visibility: "hidden", height: 0, width: 0 }}
                  className="peer sr-only"
                  type="radio"
                  value={response.answer}
                  name={`question-${index}`}
                  onChange={() => handleAnswerSelection(index, response.answer)}
                />
                <div className="w-full p-5 bg-white rounded-md hover:shadow ring-2 ring-transparent peer-checked:bg-blue-600 peer-checked:text-white peer-checked:ring-blue-950 peer-checked:ring-off">
                  {response.text}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button class="button">
        <span>Enviar</span>
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default Form;
