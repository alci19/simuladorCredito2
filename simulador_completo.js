
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
  document.getElementById("credito").classList.remove("activa");

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

function buscarClienteCredito(){
  let cedula;
  let cliente;
  let contenido;

  cedula = recuperaraTexto("buscarCedulaCredito");
  cliente = buscarCliente(cedula);

  if (cliente != null){
    contenido = "<h3>Cliente encontrado</h3>"+
    "<p><strong> Cédula:</strong>"+cliente.cedula+"</p>"+
    "<p><strong>Nombre:</strong>"+cliente.nombre+" "+cliente.apellido+"</p>"+
    "<p><strong>Ingresos:</strong>"+cliente.ingresos+"</p>"+
    "<p><strong>Egresos:</strong>"+cliente.egresos+"</p>";
    document.getElementById("datosClienteCredito").innerHTML = contenido;

  }else{
    document.getElementById("datosClienteCredito").innerHTML = "<p>Cliente no encontrado</p>";
  }

}

function calcularCredito(){
  let cedula;
  let cliente;
  let monto;
  let plazo;
  let disponible;
  let capacidadPago;
  let totalPagar;
  let cuotaMensual;
  let aprobado;
  let resultadoCredito;
  
  cedula = recuperaraTexto("buscarCedulaCredito");
  cliente = buscarCliente(cedula);
  if(cliente == null){
    document.getElementById("resultadoCredito").innerHTML = "<p>Cliente no encontrado</p>";
    return;
  }

  monto = recuperarFloat("montoCredito");
  plazo = recuperarInt("plazoCredito");

  disponible = calcularDisponible(cliente.ingresos, cliente.egresos);
  capacidadPago = calcularCapacidadPago(disponible);
  totalPagar = calcularTotalaPagar(monto, tasaInteres, plazo);
  cuotaMensual = calcularCuotaMensual(monto, tasaInteres, plazo);
  aprobado = analizarCredito(disponible, monto, tasaInteres, plazo);

  resultadoCredito =document.getElementById("resultadoCredito");


  if(aprobado){

    creditoAprobado = true;
    document.getElementById("btnSolicitarCredito").disabled = false;
    resultadoCredito.className = "aprobado";
    resultadoCredito.innerHTML = "Capacidad de pago: $" + capacidadPago.toFixed(2) + "<br>" +
    "Total a pagar: $" + totalPagar.toFixed(2) + "<br>" +
    "Cuota mensual: $" + cuotaMensual.toFixed(2) + "<br>" +
    "Crédito APROBADO";

  }else{

    creditoAprobado = false;
    document.getElementById("btnSolicitarCredito").disabled = true;
    resultadoCredito.className = "rechazado";
    resultadoCredito.innerHTML = "Capacidad de pago: $" + capacidadPago.toFixed(2) + "<br>" +
    "Total a pagar: $" + totalPagar.toFixed(2) + "<br>" +
    "Cuota mensual: $" + cuotaMensual.toFixed(2) + "<br>" +
    "Crédito RECHAZADO";
  }

}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios