// LOGICA DEL NEGOCIO
function calcularDisponible(ingresos, egresos){
    let saldo = ingresos - egresos;
    return saldo < 0 ? 0 : saldo;
}

function calcularCapacidadPago(montoDisponible){
    return montoDisponible * 0.50;
}

//function calcularInteresSimple(monto, tasa, plazoAnios){
  //  return plazoAnios * monto * (tasa / 100);//}

function calcularTotalaPagar(monto, tasa, plazoAnios){
    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    return interes + monto + 100;
}

function calcularCuotaMensual(monto, tasa, plazoMeses){
    let total = calcularTotalaPagar(monto, tasa, plazoMeses);
    return total / plazoMeses;
}

function analizarCredito(montoDisponible, monto, tasa, plazoMeses){
    let capacidad = calcularCapacidadPago(montoDisponible);
    let cuota = calcularCuotaMensual(monto, tasa, plazoMeses);
    return capacidad > cuota;
}

function calcularInteresSimple(monto, tasa, plazoMeses){
    return monto*(tasa / 100)*(plazoMeses / 12);
}


// MANIPULACION DEL HTML
function calcular(){
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let arriendo = parseFloat(document.getElementById("txtArriendo").value) || 0;
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    let varios = parseFloat(document.getElementById("txtVarios").value) || 0;

    let egresos = arriendo + alimentacion + varios;
    document.getElementById("spnTotalGastos").textContent = egresos.toFixed(2);

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = disponible.toFixed(2);

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = capacidad.toFixed(2);

    let monto = parseFloat(document.getElementById("txtMonto").value) || 0;
    let plazo = parseInt(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value) || 0;

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = interes.toFixed(2);

    let total = calcularTotalaPagar(monto, tasa, plazo);
    document.getElementById("spnTotalPrestamo").textContent = total.toFixed(2);

    let cuota = calcularCuotaMensual(monto, tasa, plazo);
    document.getElementById("spnCuotaMensual").textContent = cuota.toFixed(2);

    let aprobado = analizarCredito(disponible, monto, tasa, plazo);
    let estado = document.getElementById("spnEstadoCredito");

    if (aprobado){
        estado.textContent = "APROBADO ✅";
        estado.className = "aprobado";
    } else {
        estado.textContent = "RECHAZADO ❌";
        estado.className = "rechazado";
    }
}


// LIMPIAR
function limpiar(){
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtArriendo").value = "";
    document.getElementById("txtAlimentacion").value = "";
    document.getElementById("txtVarios").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnDisponible").textContent = "0";
    document.getElementById("spnCapacidadPago").textContent = "0";
    document.getElementById("spnInteresPagar").textContent = "0";
    document.getElementById("spnTotalPrestamo").textContent = "0";
    document.getElementById("spnCuotaMensual").textContent = "0";
    document.getElementById("spnTotalGastos").textContent = "0";

    let estado = document.getElementById("spnEstadoCredito");
    estado.textContent = "-";
    estado.className = "";
}