
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
  let nuevoCliente = {};
  let clienteExistente = buscarCliente(cedula);

  if(clienteExistente == null){
  
    nuevoCliente.cedula = cedula;
    nuevoCliente.nombre = nombre;
    nuevoCliente.apellido = apellido;
    nuevoCliente.ingresos = ingresos;
    nuevoCliente.egresos = egresos;

    clientes.push(nuevoCliente);

  }else{
    clienteExistente.nombre = nombre;
    clienteExistente.apellido = apellido;
    clienteExistente.ingresos = ingresos;
    clienteExistente.egresos = egresos;
  }
  
  pintarClientes();
  limpiar();
  clienteSeleccionado = null;
}

limpiar = function(){
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngresos", "");
  mostrarTextoEnCaja("txtEgresos", "");
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
    "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button></td>"+
    "</tr>";
  }

  cmpTabla.innerHTML = contenidoTabla;
}

function buscarCliente(cedula){
  let clienteEncontrado = null;

  for(let i=0; i<clientes.length; i++){
    let cliente = clientes[i];

    if(cliente.cedula == cedula){
      clienteEncontrado = cliente;
      break;
    }
  }
  return clienteEncontrado;
}

function seleccionarCliente(cedula){
  let cliente = buscarCliente(cedula);
  if(cliente != null){
    clienteSeleccionado = cliente;
    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
    mostrarTextoEnCaja("txtEgresos", cliente.egresos);
  }

}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios