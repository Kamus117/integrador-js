const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');

// Nos traemos los usuarios del localstorage

const users = JSON.parse(localStorage.getItem('users')) || [];

// Función para guardar los usuarios en el localStorage

const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Función para chequear si el campo esta vacio, MEJORADO: no necesita .length si ya tiene trim()
const isEmpty = (input) => !input.value.trim();

// Función para determinar si el largo del value del input esta entre un minimo y un maximo de caracteres.

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

// En estas variables estoy almacenando las expresiones regulares para poder reutilizarlas de ser necesario.

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
const phoneRegex = /^[0-9]{10}$/;

const isEmailValid = (input) => emailRegex.test(input.value.trim());
const isPassSecure = (input) => passwordRegex.test(input.value.trim());
const isValidPhone = (input) => phoneRegex.test(input.value.trim());

//También cambie el users.some por users.map, además de convertir todo a minúscula para no hacer sensible a mayúsculas el almacenamiento.
const isExistingMail = (input) => {
    const normalizedInputValue = input.value.trim().toLowerCase();
    const isExisting = users.map(user => user.email.toLowerCase()).includes(normalizedInputValue);

    if (isExisting) {
        showError(input, 'El email ya ha sido registrado');
    }

    return isExisting;
};

// Función para mostrar error al validar un input MEJORADA, showError y showSuccess realizaban operaciones similares, asi que reduje la duplicación desde UpdateInputStatus donde se unen las partes repeidas simplificando el código.

const updateInputStatus = (input, isValid, message) => {
    const formField = input.parentElement;
    formField.classList.remove(isValid ? 'error' : 'success');
    formField.classList.add(isValid ? 'success' : 'error');
    const error = formField.querySelector('small');
    error.style.display = isValid ? 'none' : 'block';
    error.textContent = message || '';
};

const showError = (input, message) => {
    updateInputStatus(input, false, message);
};

const showSuccess = (input) => {
    updateInputStatus(input, true);
};

// Función para validar un input de tipo texto MEJORADO: En lugar de mantener la variable valid en la función checkTextInput, remplace la lógica para eliminar la variable y hacer que las llamadas a showError y showSuccess sean más claras:

const checkTextInput = (input) => {
    const minCharacters = 3;
    const maxCharacters = 25;

    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return false;
    }

    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`);
        return false;
    }

    showSuccess(input);
    return true;
};

// Creé una función genérica llamada validateInput que toma varios argumentos para manejar la validación y mostrar los mensajes de error de manera más eficiente, ayuda a reducir la duplicación de código y hacer el código más mantenible.

const validateInput = (input, validationFn, emptyMessage, errorMessage) => {
    if (isEmpty(input)) {
        showError(input, emptyMessage);
        return false;
    }

    if (!validationFn(input)) {
        showError(input, errorMessage);
        return false;
    }

    showSuccess(input);
    return true;
};

const checkEmail = (input) => {
    return validateInput(
        input,
        isEmailValid,
        'El email es obligatorio',
        'El email no es válido'
    ) && !isExistingMail(input);
};

const checkPassword = (input) => {
    return validateInput(
        input,
        isPassSecure,
        'La contraseña es obligatoria',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo'
    );
};

const checkPhone = (input) => {
    return validateInput(
        input,
        isValidPhone,
        'El teléfono es obligatorio',
        'El teléfono no es válido'
    );
};


// Función general MEJORADA: Se pueden eliminar algunas variables intermedias y simplificar el código al evaluar directamente las validaciones en el condicional if:

const validateForm = (e) => {
    e.preventDefault();

    if (
        checkTextInput(nameInput) &&
        checkTextInput(lastNameInput) &&
        checkEmail(emailInput) &&
        checkPassword(passInput) &&
        checkPhone(phoneInput)
    ) {
        users.push({
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passInput.value,
            phone: phoneInput.value
        });
        saveToLocalStorage(users);

        // MEJORADO: Cambia la alerta por un mensaje más elegante y menos invasivo, aparecerá justo encima del botón de registrarse durante 2s, luego te redirije a login.

        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";


        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
};



const init = () => {
    registerForm.addEventListener("submit", validateForm)
    nameInput.addEventListener("input", () => checkTextInput(nameInput))
    lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput))
    emailInput.addEventListener("input", () => checkEmail(emailInput))
    passInput.addEventListener("input", () => checkPassword(passInput))
    phoneInput.addEventListener("input", () => checkPhone(phoneInput))
}

init()

