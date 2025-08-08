import Contacto from "./Contacto.js";
import {
  validarCantidadCaracteres,
  validarEmail,
  validarURL,
} from "./Validaciones.js";
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
let estoyCreando = true;
let idContacto = null;

//Recuperamos los datos del local storage
const Agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

//Funciones
const crearContacto = () => {
  //Todo agregar validaciones
  //Buscar los datos del formulario y crear objeto contacto
  if (validacion(inputNombre, 2, 50)) {
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
    modalFormularioContacto.hide();
  } else {
    console.log("Error en la validacion");
  }
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
    //Agregar un parrafo que diga que no tenemos contactos
    const padreTableResponsive = document.querySelector(".table-responsive");
    const p = document.createElement("p");
    p.textContent = "No hay contactos en la agenda";
    p.classList.add("text-center");
    padreTableResponsive.appendChild(p);
  }
};

const dibujarFila = () => {
  tbody.innerHTML = "";
  Agenda.forEach((itemContacto, index) => {
    tbody.innerHTML += `
    <tr>
                  <th scope="row">${index + 1}</th>
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
                    <button class="btn btn-warning"
                    onclick="prepararContacto('${itemContacto.id}')">
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
  });
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
      //Aqui se agrega la logica para borrar
      //Buscar en que posicion esta el elemento
      const indiceContacto = Agenda.findIndex((contacto) => contacto.id === id);
      console.log(indiceContacto);
      //Borrar el elemento con splice
      Agenda.splice(indiceContacto, 1);
      //Actualizar local storage
      guardarLocalStorage();
      //Actualizar la tabla
      tbody.children[indiceContacto].remove();
      //Actualizar los elementos del array
      dibujarFila();
      Swal.fire({
        title: "Contacto Eliminado",
        text: "El contacto fue eliminado corractamente.",
        icon: "success",
      });
    }
    // console.log(tareas);
  });
};

window.prepararContacto = (id) => {
  //Modificar el titulo del formulario
  //Cargar inputs con datos del contacto para que lo vea al usuario
  const contactoBuscado = Agenda.find((contacto) => contacto.id === id);
  console.log(contactoBuscado);
  //Mostrar los datos del contacto en el form
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputTelefono.value = contactoBuscado.telefono;
  inputEmail.value = contactoBuscado.email;
  inputImagen.value = contactoBuscado.imagen;
  inputEmpresa.value = contactoBuscado.empresa;
  puestoTrabajo.value = contactoBuscado.puestoTrabajo;
  inputDireccion.value = contactoBuscado.direccion;
  idContacto = id;
  //Abrir el modal
  modalFormularioContacto.show();
};
const editarContacto = () => {
  //Buscar en que posicion del array esta el contacto con tal ID
  const indiceContacto = Agenda.findIndex((contacto) => contacto.id === id);
  //Modificar el contacto
  Agenda[indiceContacto].nombre = inputNombre.value;
  Agenda[indiceContacto].apellido = inputApellido.value;
  Agenda[indiceContacto].telefono = inputTelefono.value;
  Agenda[indiceContacto].email = inputEmail.value;
  Agenda[indiceContacto].imagen = inputImagen.value;
  Agenda[indiceContacto].empresa = inputEmpresa.value;
  Agenda[indiceContacto].puestoTrabajo = puestoTrabajo.value;
  Agenda[indiceContacto].direccion = inputDireccion.value;

  //Actualizar local storage
  guardarLocalStorage();
  //Actualizar fila de la tabla
  //Cerrar ventana modal
  modalFormularioContacto.hide();

  //Mostrar una ventana de sweet alert para indicar que el contacto fue editado correctamente
};

const validacion = () => {
  let datosValidos = true;
  if (!validarCantidadCaracteres(inputNombre, 2, 50)) {
    datosValidos = false;
  }
  if (!validarEmail(inputEmail)) {
    datosValidos = false;
  }
  if (!validarURL(inputImagen)) {
    datosValidos = false;
  }
  //To-do agregar el resto de las funciones de validacion
  return datosValidos;
};

//Manejadores de eventos
btnAgregarContacto.addEventListener("click", () => {
  limpiarFormulario();
  estoyCreando = true;
  modalFormularioContacto.show();
});

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  //Aqui tengo que crear/editar contacto
  if (estoyCreando) {
    crearContacto();
  } else {
    editarContacto();
  }
});

cargarContactos();
