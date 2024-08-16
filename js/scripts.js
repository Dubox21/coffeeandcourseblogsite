//evento submit, para usar en imagenes, textos, carrito
// const btnSend = document.querySelector('.button--primary');
// btnSend.addEventListener('click', function (e) {
//     console.log(e);
//     e.preventDefault();
//     console.log("enviando formulario");
// });

const forms = document.getElementById('forms');
const inputs = document.querySelectorAll('.field__input');

const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: /^[a-zA-Z0-9\_\-]{10,300}$/
}

const validatorForm = (e) => {
    switch (e.target.name) {
        case "name":
            validatorFields(expressions.name, e.target, 'name');
            break;
        case "email":
            validatorFields(expressions.email, e.target, 'email');
            break;
        case "message":
            validatorFields(expressions.message, e.target, 'message');
            break;
    }
}

validatorFields = (expression, input, field) => {
    if (expression.test(input.value)) {
        document.getElementById(`group__${field}`).classList.remove('form__group-incorrect');
        document.querySelector(`#group__${field} .form__input--error`).classList.remove('form__input--error-activo');
    } else {
        document.getElementById(`group__${field}`).classList.add('form__group-incorrect');
        document.querySelector(`#group__${field} .form__input--error`).classList.add('form__input--error-activo');
    }
}

const data = {
    name: '',
    email: '',
    message: ''
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validatorForm);
    input.addEventListener('blur', validatorForm);
});

//Para escuchar el formulario
const form = document.querySelector('.form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    //para validar el formulario
    const { name, email, message } = data;

    if (name === '' || email === '' || message === '') {
        showAlert("Todos los campos son obligatorios", true);
        //console.log('todos los campos son obligatorios');
        return;
    } else {
        form.reset();
        showAlert("Su mensaje se envio correctamente");
        return;
    }
    console.log("enviando formulario")
});

//escucha de input
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

name.addEventListener('input', readText);
email.addEventListener('input', readText);
message.addEventListener('input', readText);

function readText(e) {
    // console.log(e.target.value);
    data[e.target.id] = e.target.value;
    console.log(data);
}

function showAlert(message, error = null) {
    const alert = document.createElement('P');
    alert.textContent = message;
    if (error) {
        alert.classList.add('error');
    } else {
        alert.classList.add('success');
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    form.appendChild(alert);

}


//para mostrar error por campos
// function showError(message) {
//     //crear elementos en html
//     const error = document.createElement('P');
//     error.textContent = message;
//     error.classList.add('error');
//     form.appendChild(error);

//     //desaparecer mensaje de error

// }
