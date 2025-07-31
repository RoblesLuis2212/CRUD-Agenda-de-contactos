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
const tbody = document.getElementById("tablacontactosBody");

//Recuperamos los datos del local storage
const Agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

//Funciones
const crearContacto = () => {
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
  //Guardar contacto en el local storange
  guardarLocalStorage();
  //Mostrar un mensaje al usuario
  Swal.fire({
    title: "Contacto guardado correctamente",
    icon: "success",
    draggable: true,
  });
  //Limpiar el formulario
  limpiarFormulario();

  dibujarFila(contactoNuevo, Agenda.length);
};

const limpiarFormulario = () => {
  formularioContacto.reset();
};
const guardarLocalStorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(Agenda));
};

const cargarContactos = () => {
  //Verificar si tengo contactos para cargar
  if (Agenda.length !== 0) {
    //Recorrer mi agenda y por cada elemento de la agenda
    //Si tengo debo dibujar filas en la tabla
    Agenda.map((contacto, indice) => dibujarFila(contacto, indice + 1));
  } else {
    console.log("no hay elementos en la agenda");
    //Agregar un parrafo que diga que no tenemos contactos
  }
};

const dibujarFila = (itemContacto, fila) => {
  tbody.innerHTML += `
  <tr>
                <th scope="row">${fila}</th>
                <td>${itemContacto.nombre}</td>
                <td>${itemContacto.apellido}</td>
                <td>${itemContacto.telefono}</td>
                <td>${itemContacto.email}</td>
                <td>
                  <img
                    src=${itemContacto.imagen}
                    alt=${itemContacto.nombre}
                    class="imgAgenda"
                  />
                </td>
                <td>
                  <button class="btn btn-primary">
                    <i class="bi bi-eye-fill"></i>
                  </button>
                  <button class="btn btn-warning">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button class="btn btn-danger"
                  type="button"
                  onclick="borrarContacto('${itemContacto.id}')"
                  >
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
  `;
};

window.borrarContacto = (id) => {
  //Mensaje para que el usuario confirme si quiere borrar el contacto
  Swal.fire({
    title: "¿Estas seguro de eliminar el contacto?",
    text: "Esta accion no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",

        text: "Your file has been deleted.",

        icon: "success",
      });
    }
  });
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

cargarContactos();
