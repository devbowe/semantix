const fieldNome = document.querySelector("input[id='firstname']");
const fieldEmail = document.querySelector("input[id='email']");
const fieldPhone = document.querySelector("input[id='phone']");
const fieldEmpresa = document.querySelector("input[id='company']");
const fieldCargo = document.querySelector("select[id='jobtitle']");
const fieldFuncionarios = document.querySelector(
    "select[id='numero_funcionarios_empresa_bw']"
);
const fieldPais = document.querySelector("select[id='country']");
const fieldSegmento = document.querySelector("select[id='segment']");
const fieldObjetivo = document.querySelector("select[id='principal_objetivo']");
const buttonSubmit = document.querySelector("button[id='button-submit']");

buttonSubmit.addEventListener("click", (e) => {
    if (fieldNome.value.trim() === "") {
        showPopUpValidation(e, fieldNome, "Informe seu nome");
    } else if (!validacaoEmail(fieldEmail.value)) {
        showPopUpValidation(e, fieldEmail, "Informe seu e-mail");
    } else if (!emailCorporativo(fieldEmail.value)) {
        showPopUpValidation(e, fieldEmail, "Informe um e-mail corporativo");
    } else if (!fieldPhone.value.trim() === "" || fieldPhone.value.length < 14) {
        showPopUpValidation(e, fieldPhone, "Informe seu telefone");
    } else if (/^(\d\d)\d{0,10}\1$/.test(fieldPhone.value.replace(/[^0-9]/g,''))) {
        showPopUpValidation(e, fieldPhone, "Informe um telefone válido");
    } else if (fieldEmpresa.value.trim() === "") {
        showPopUpValidation(e, fieldEmpresa, "Informe sua empresa");
    } else if (fieldCargo.value.trim() === "") {
        showPopUpValidation(e, fieldCargo, "Informe seu cargo");
    } else if (fieldFuncionarios.value == "") {
        showPopUpValidation(e, fieldFuncionarios, "Informe o número de funcionários da empresa");
    } else if (fieldPais.value.trim() == "") {
        showPopUpValidation(e, fieldPais, "Informe sua região");
    } else if (fieldSegmento.value.trim() == "") {
        showPopUpValidation(e, fieldSegmento, "Informe seu segmento");
    } else if (fieldObjetivo.value == "") {
        showPopUpValidation(e, fieldObjetivo, "Informe o seu principal objetivo");
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
        if (email.toLowerCase().indexOf(domain) != -1) {
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
                sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]));
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

// ------------------------- Phone Mask -------------------------
fieldPhone.addEventListener("input", handlePhoneInput, false);

function handlePhoneInput(e) {
    e.target.value = phoneMask(e.target.value);
}

function phoneMask(phone) {
    return phone
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{2})(\d)/, "$1) $2")
        .replace(/(\d{5})(\d{1,4})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
}

setTimeout(() => {
    queryForm();
}, 2000);