import React from "react";

function Form() {
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
