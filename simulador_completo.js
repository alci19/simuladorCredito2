
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

ocultarSecciones = function(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");

}

mostrarSeccion = function(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
  let valorTasa = recuperarFloat("tasaInteres");
  if(valorTasa >= 10 && valorTasa <= 20){
    tasaInteres = valorTasa;
    mostrarTexto("mensajeTasa","Tasa de interés guardada correctamente: " + tasaInteres + "%");
  } else {
    mostrarTexto("mensajeTasa","Valor de tasa de interés no válido. debe estar entre 10% y 20%");
  }
}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios