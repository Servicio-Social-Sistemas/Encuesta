const questions = [
  {
    question: "¿Es usted...",
    responses: [
      { answer: "verde", text: "Empresario persona moral" },
      { answer: "rojo", text: "Empresario persona física" },
      { answer: "azul", text: "No estoy dado de alta en el SAT" },
    ],
  },
  {
    question: "¿Su negocio es?",
    responses: [
      { answer: "verde", text: "Venta de servicios" },
      { answer: "rojo", text: "Venta de productos" },
      { answer: "azul", text: "Comercio" },
    ],
  },
  {
    question: "Si le ofrecieran algún crédito, ¿para qué lo usaría?",
    responses: [
      {
        answer: "verde",
        text: "Inversión Fija (muebles, vehículos, equipos, mobiliario...)",
      },
      {
        answer: "rojo",
        text: "Inversión Diferida (instalaciones, remodelaciones, publicidad, anuncios, rentas...)",
      },
      {
        answer: "azul",
        text: "Capital de Trabajo (insumos, mercancías, mano de obra...)",
      },
    ],
  },
  {
    question: "Si puede conectarse vía internet, ¿qué dispositivo podría usar?",
    responses: [
      { answer: "verde", text: "Computadora" },
      { answer: "rojo", text: "Celular" },
      { answer: "azul", text: "Cuento con ambos" },
    ],
  },
  {
    question:
      "¿Usaría comercio electrónico a través de una APP para vender su producto o servicio?",
    responses: [
      { answer: "verde", text: "Sí" },
      { answer: "rojo", text: "No" },
      { answer: "azul", text: "No me sirve para mis ventas" },
    ],
  },
  {
    question: "¿Cuenta con una terminal para el cobro con tarjeta de crédito?",
    responses: [
      { answer: "verde", text: "Sí" },
      { answer: "rojo", text: "No" },
      { answer: "azul", text: "No me sirve" },
    ],
  },
  {
    question: "¿Qué tipo de capacitación le interesaría más para su negocio?",
    responses: [
      { answer: "verde", text: "Administrar sus finanzas" },
      { answer: "rojo", text: "Comercialización en línea" },
      { answer: "azul", text: "Ambas" },
    ],
  },
];

export default questions;
