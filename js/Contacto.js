export default class Contacto {
  #id;
  #nombre;
  #apellido;
  #telefono;
  #email;
  #imagen;
  #empresa;
  #puestoTrabajo;
  #direccion;
  #notas;

  constructor(
    nombre,
    apellido,
    telefono,
    email,
    imagen,
    empresa,
    puestoTrabajo,
    direccion,
    notas
  ) {
    this.#id = crypto.randomUUID();
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#telefono = telefono;
    this.#email = email;
    this.#imagen = imagen;
    this.#empresa = empresa;
    this.#puestoTrabajo = puestoTrabajo;
    this.#direccion = direccion;
    this.#notas = notas;
  }
  get id() {
    return this.#id;
  }
  get nombre() {
    return this.#nombre;
  }
  get apellido() {
    return this.#apellido;
  }
  get telefono() {
    return this.#telefono;
  }
  get email() {
    return this.#email;
  }
  get imagen() {
    return this.#imagen;
  }
  get empresa() {
    return this.#empresa;
  }
  get puestoTrabajo() {
    return this.#puestoTrabajo;
  }
  get direccion() {
    return this.#direccion;
  }
  get notas() {
    return this.#notas;
  }

  // Setters
  set id(nuevoId) {
    this.#id = nuevoId;
  }
  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }
  set apellido(nuevoApellido) {
    this.#apellido = nuevoApellido;
  }
  set telefono(nuevoTelefono) {
    this.#telefono = nuevoTelefono;
  }
  set email(nuevoEmail) {
    this.#email = nuevoEmail;
  }
  set imagen(nuevaImagen) {
    this.#imagen = nuevaImagen;
  }
  set empresa(nuevaEmpresa) {
    this.#empresa = nuevaEmpresa;
  }
  set puestoTrabajo(nuevoTrabajo) {
    this.#puestoTrabajo = nuevoTrabajo;
  }
  set direccion(nuevaDireccion) {
    this.#direccion = nuevaDireccion;
  }
  set notas(nuevaNotas) {
    this.#notas = nuevaNotas;
  }
  //Metodo para almacenar el objeto en el localStorage/SessionStorage
  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      apellido: this.#apellido,
      telefono: this.#telefono,
      email: this.#email,
      imagen: this.#imagen,
      empresa: this.#empresa,
      puestoTrabajo: this.#puestoTrabajo,
      direccion: this.#direccion,
      notas: this.#notas,
    };
  }
}
