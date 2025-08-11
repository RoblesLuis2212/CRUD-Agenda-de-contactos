import Contacto from "./Contacto.js";
import {
  validacionTelefono,
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
const tituloModal = document.querySelector(".modal-title");
const sectionOculta = document.getElementById("detalleContacto");

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
                    <button class="btn btn-primary"
                    onclick="mostrarDetalleContacto('${itemContacto.id}')"
                    >
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
  //Modificar el titulo del formulario
  estoyCreando = false;
  tituloModal.textContent = "Editar Contacto";
  idContacto = id;
  //Abrir el modal
  modalFormularioContacto.show();
};
const editarContacto = () => {
  //Buscar en que posicion del array esta el contacto con tal ID
  const indiceContacto = Agenda.findIndex(
    (contacto) => contacto.id === idContacto
  );
  console.log(indiceContacto);
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
  dibujarFila();
  //Mensaje para indicar que el contacto fue editado correctamente
  Swal.fire({
    title: "El contacto fue editado exitosamente!",
    icon: "success",
    draggable: true,
  });
  //Cerrar ventana modal
  modalFormularioContacto.hide();
};

window.mostrarDetalleContacto = (id) => {
  const indiceContacto = Agenda.find((contacto) => contacto.id === id);
  sectionOculta.innerHTML = "";
  sectionOculta.classList.remove("d-none");
  sectionOculta.innerHTML += `
  <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Contactos</a></li>
            <li class="breadcrumb-item active" aria-current="page">${indiceContacto.nombre}</li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <img
                    src="${indiceContacto.imagen}"
                    class="card-img-top rounded-circle imgInformacion"
                    alt="Persona"
                  />
                  <div class="flex-grow-1">
                    <h3 class="card-title mb-0 ms-3">${indiceContacto.nombre}</h3>
                    <p class="card-text ms-3 text-break">
                      ${indiceContacto.email}
                    </p>
                  </div>
                  <a href="#" class="btn btn-success ms-auto">
                    <i class="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
              <h5 class="ms-3">Informacion del Contacto</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item bg-dark text-white ms-2">
                  <i class="bi bi-telephone me-1"></i>Telefono: ${indiceContacto.telefono}
                </li>
                <li class="list-group-item bg-dark text-white ms-2">
                  <i class="bi bi-envelope me-1"></i>Email:
                  ${indiceContacto.email}
                </li>
                <li class="list-group-item bg-dark text-white ms-2">
                  <i class="bi bi-building me-1"></i>Empresa: ${indiceContacto.empresa}
                </li>
                <li class="list-group-item bg-dark text-white ms-2">
                  <i class="bi bi-person-fill me-1"></i>Puesto de Trabajo:
                  ${indiceContacto.puestoTrabajo}
                </li>
                <li class="list-group-item bg-dark text-white ms-2">
                  <i class="bi bi-map me-1"></i>
                  Direccion: ${indiceContacto.direccion}
                </li>
              </ul>
              <div class="mt-3 ms-3">
                <h6>Notas</h6>
                <p>
                ${indiceContacto.notas}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-secondary ms-2 mt-4"
        onclick="ocultarDetalle()"
          ><i class="bi bi-arrow-left me-1"></i>Volver a la lista</button
        >`;
};

window.ocultarDetalle = () => {
  sectionOculta.classList.add("d-none");

  //Metodo para volver a la lista
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const validacion = () => {
  console.log(inputTelefono.value);
  let datosValidos = true;
  if (!validarCantidadCaracteres(inputNombre, 2, 50)) {
    datosValidos = false;
  }
  if (!validarCantidadCaracteres(inputApellido, 2, 50)) {
    datosValidos = false;
  }
  if (!validacionTelefono(inputTelefono)) {
    datosValidos = false;
  }
  if (!validarCantidadCaracteres(inputEmpresa, 2, 50)) {
    datosValidos = false;
  }
  if (!validarCantidadCaracteres(puestoTrabajo, 2, 30)) {
    datosValidos = false;
  }
  if (!validarCantidadCaracteres(inputDireccion, 2, 50)) {
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
  tituloModal.textContent = "Agregar Contacto";
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
