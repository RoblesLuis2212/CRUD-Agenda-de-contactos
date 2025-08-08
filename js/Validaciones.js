export const validarCantidadCaracteres = (input, min, max) => {
  if (input.value.length >= min && input.value.length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
};
//texto@gmail.com
export const validarEmail = (input) => {
  const expresionRegular =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (expresionRegular.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
};
//Validar URL de imagen
export const validarURL = (input) => {
  const expressRegular = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
  if (expressRegular.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    input.value =
      "https://us.123rf.com/450wm/iconghor/iconghor2005/iconghor200500005/146031255-icono-de-hombre-de-negocios-ilustraci%C3%B3n-de-s%C3%ADmbolo-vectorial-editable.jpg?ver=6";
  }
  return true;
};
