function redireccion() {
    window.location.href = "../empresas.html"
}

function habilitarOpcionesRegistro() {
    let datoSeleccionado = document.getElementById('registro-tipoUsuario').value;
    if (datoSeleccionado == "empresario") {
        document.getElementById('div-inputAdmin').style.display = "none";
        document.getElementById('div-inputEmpresa').style.display = "block";
    } else if (datoSeleccionado == "admin") {
        document.getElementById('div-inputAdmin').style.display = "block";
        document.getElementById('div-inputEmpresa').style.display = "none";
    } else {
        document.getElementById('div-inputAdmin').style.display = "none";
        document.getElementById('div-inputEmpresa').style.display = "none";
    }
}