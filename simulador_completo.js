
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

function guardarCliente(){
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");
  let nuevoCliente = {}
  
  nuevoCliente.cedula = cedula;
  nuevoCliente.nombre = nombre;
  nuevoCliente.apellido = apellido;
  nuevoCliente.ingresos = ingresos;
  nuevoCliente.egresos = egresos;
  clientes.push(nuevoCliente);
  pintarClientes();
}

pintarClientes = function(){ 
  let cmpTabla = document.getElementById("tablaClientes");
  let contenidoTabla = "";
  for(let i=0; i<clientes.length; i++){
    let cliente = clientes[i];
    contenidoTabla += "<tr>"+
    "<td>" + cliente.cedula + "</td>"+ 
    "<td>" + cliente.nombre + "</td>"+
    "<td>" + cliente.apellido + "</td>"+
    "<td>" + cliente.ingresos + "</td>"+
    "<td>" + cliente.egresos + "</td>"+
    "<td><button>Actualizar</button></td>"+
    "</tr>";
  }

  cmpTabla.innerHTML = contenidoTabla;
}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios