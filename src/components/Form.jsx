import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import questions from "./questions"; // Asegúrate de ajustar la ruta al archivo questions.js si es necesario
import "../css/Form.css";

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
          toast.error(
            "Por favor, permita el acceso a la ubicación para continuar."
          );
        }
      );
    }
  };

  const handleAnswerSelection = (questionIndex, answer) => {
    setUserData((prevUserData) => {
      const updatedResponses = [...prevUserData.responses];
      updatedResponses[questionIndex] = {
        [`answer${questionIndex + 1}`]: answer,
      };

      return {
        ...prevUserData,
        responses: updatedResponses,
      };
    });
  };

  const saveData = (data) => {
    return axios.post(import.meta.env.VITE_API_URL, data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getLocation();

    console.log(userData.response);

    if (userData.ubication.lat === "" || userData.ubication.long === "") {
      return;
    }

    const allResponsesSelected = questions.every((question, index) => {
      const selectedResponse = userData.responses.find(
        (response) => response[`answer${index + 1}`]
      );
      return selectedResponse !== undefined;
    });

    if (!allResponsesSelected) {
      toast.error("Debe responder todas las preguntas");
      return;
    }

    try {
      await toast.promise(saveData(userData), {
        loading: "Enviando...",
        success: <b>¡Datos enviados con éxito!</b>,
        error: <b>No se pueden enviar los datos.</b>,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error al guardar los datos:", error);
    }
  };

  return (
    <form className="px-8 pt-6 pb-8 text-left" onSubmit={handleSubmit}>
      <div className="uppercase tracking-wide text-2xl text-blue-900 font-bold">
        Preguntas
      </div>
      {questions.map((question, index) => (
        <div
          key={index}
          className=" m-auto sm:text-left lg:text-[100%] border-y border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r py-4 lg:py-6 flex flex-col leading-normal"
        >
          <p className="text-blue-900 font-bold text-xl mb-2">
            {question.question}
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {question.responses.map((response, responseIndex) => (
              <label className="cursor-pointer" key={response.answer}>
                <input
                  className="peer sr-only"
                  type="radio"
                  value={response.answer}
                  name={`question-${index}`}
                  id={`response-${index}-${responseIndex}`} // Agrega un id único
                  onChange={() => handleAnswerSelection(index, response.answer)}
                />
                <div
                  className="w-full p-5 bg-white rounded-md border hover:shadow ring-2 ring-transparent peer-checked:bg-blue-800 peer-checked:text-white peer-checked:ring-blue-950 peer-checked:ring-off"
                  htmlFor={`response-${index}-${responseIndex}`} // Asocia el htmlFor al id
                >
                  {response.text}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="button">
        <span>Enviar</span>
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default Form;
