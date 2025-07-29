import Contacto from "./Contacto.js";
//Elementos del DOM
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const modalFormularioContacto = new bootstrap.Modal(
  document.getElementById("contactoModal")
);
const formularioContacto = document.querySelector("#formContacto");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");
const inputImagen = document.getElementById("imagen");
const inputEmpresa = document.getElementById("empresa");
const puestoTrabajo = document.getElementById("puestoTrabajo");
const inputDireccion = document.getElementById("direccion");
const inputNotas = document.getElementById("notas");

//Recuperamos los datos del local storage
const Agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

//Funciones
const crearContacto = () => {
  console.log("Aqui tengo que crear el contacto");
  //Todo agregar validaciones
  //Buscar los datos del formulario y crear objeto contacto
  const contactoNuevo = new Contacto(
    inputNombre.value,
    inputApellido.value,
    inputTelefono.value,
    inputEmail.value,
    inputImagen.value,
    inputEmpresa.value,
    puestoTrabajo.value,
    inputDireccion.value,
    inputNotas.value
  );
  formularioContacto.reset();
  //Guardar los datos en la agenda de contactos
  Agenda.push(contactoNuevo);
  console.log(contactoNuevo);
  //Guardar contacto en el local storange
  guardarLocalStorage();
  //Mostrar un mensaje al usuario

  //Limpiar el formulario
  limpiarFormulario();
};

const limpiarFormulario = () => {
  formularioContacto.reset();
};
const guardarLocalStorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(Agenda));
};

//Manejadores de eventos
btnAgregarContacto.addEventListener("click", () => {
  modalFormularioContacto.show();
});

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  //Aqui tengo que crear/editar contacto
  crearContacto();
});
