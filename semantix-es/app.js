const fieldNome = document.querySelector("input[id='firstname']");
const fieldEmail = document.querySelector("input[id='email']");
const fieldEmpresa = document.querySelector("input[id='company']");
const fieldCargo = document.querySelector("input[id='jobtitle']");
const fieldFuncionarios = document.querySelector(
    "select[id='numero_funcionarios_empresa_bw']"
);
const fieldPais = document.querySelector("input[id='country']");
// const fieldFaturamento = document.querySelector("select[id='faturamento']");
const fieldObjetivo = document.querySelector("select[id='principal_objetivo']");
// const fieldProjeto = document.querySelector("select[id='tempo_projeto']");
const buttonSubmit = document.querySelector("button[id='button-submit']");

buttonSubmit.addEventListener("click", (e) => {
    if (fieldNome.value.trim() === "") {
        showPopUpValidation(e, fieldNome, "Introduzca su nombre");
    } else if (!validacaoEmail(fieldEmail.value)) {
        showPopUpValidation(e, fieldEmail, "Informar su e-mail");
    } else if (!emailCorporativo(fieldEmail.value)) {
        showPopUpValidation(e, fieldEmail, "Introduzca un email corporativo");
    } else if (fieldEmpresa.value.trim() === "") {
        showPopUpValidation(e, fieldEmpresa, "Introduzca su empresa");
    } else if (fieldCargo.value.trim() === "") {
        showPopUpValidation(e, fieldCargo, "Introduce tu posición");
    } else if (fieldFuncionarios.value == "nulo") {
        showPopUpValidation(
            e,
            fieldFuncionarios,
            "Ingrese el número de empleados de la empresa"
        );
    } else if (fieldPais.value.trim() == "") {
        showPopUpValidation(e, fieldPais, "Informar país de origen");
    } else if (fieldObjetivo.value == "nulo") {
        showPopUpValidation(e, fieldObjetivo, "Indique su objetivo principal");
    } else {
        return true;
    }
    return false;
});

// Swal fire popup
function showPopUpValidation(event, field, message) {
    Swal.fire({
        icon: "warning",
        text: message,
        timer: 20000,
        onAfterClose: () => {
            field.focus();
        },
    });

    event.preventDefault();
}

//Email validations
function validacaoEmail(email) {
    var verifica =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return verifica.test(String(email).toLowerCase());
}

function emailCorporativo(email) {
    const invalidDomains = [
        "@gmail.",
        "@yahoo.",
        "@hotmail.",
        "@live.",
        "@aol.",
        "@outlook.",
        "@terra.",
        "@bol.",
        "@uol.",
    ];

    for (let i = 0; i < invalidDomains.length; i++) {
        const domain = invalidDomains[i];
        if (email.indexOf(domain) != -1) {
            return false;
        }
    }
    return true;
}

// url_pagina
setTimeout(function () {
    document.querySelector("input[name='url_pagina']").value =
        location.protocol + "//" + location.host + location.pathname;
}, 2000);

// Query Form
const queryForm = function (settings) {
    const reset = settings && settings.reset ? settings.reset : false;
    const self = window.location.toString();
    const querystring = self.split("?");
    if (querystring.length > 1) {
        const pairs = querystring[1].split("&");
        for (i in pairs) {
            var keyval = pairs[i].split("=");
            if (reset || sessionStorage.getItem(keyval[0]) === null) {
                sessionStorage.setItem(
                    keyval[0],
                    decodeURIComponent(keyval[1])
                );
            }
        }
    }
    const hiddenFields = document.querySelectorAll(
        "input[type=hidden], input[type=text]"
    );
    for (let i = 0; i < hiddenFields.length; i++) {
        const param = sessionStorage.getItem(hiddenFields[i].name);
        if (param)
            document.getElementsByName(hiddenFields[i].name)[0].value = param;
    }
};

setTimeout(() => {
    queryForm();
}, 2000);
