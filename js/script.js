const form = document.querySelector('form');
const nameInput = document.querySelector('#nombre');
const numberInput = document.querySelector('#numero');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const keyInput = document.querySelector('#key');
const confirm = document.querySelector('.confirm');
const cardName = document.querySelector('.name_in_card');
const cardNumber = document.querySelector('.number_in_card');
const cardDate = document.querySelector('.date_in_card');
const monthCard = document.querySelector('.month_in_card')
const yearCard = document.querySelector('.year_in_card')
const cardKey = document.querySelector('.key_in_card');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
    cardName.textContent = 'Juan Pérez';
    cardNumber.textContent = numParrafo;
    monthCard.textContent = '00/';
    yearCard.textContent = '00';
    cardKey.textContent = keyData;
    form.reset();
});


function validateForm() {
    const nameFunction = validateInputName();
    const numberFunction = validateInputNumber();
    const dateFunction = validateInputDate();
    const keyFunction = validateInputKey();

    if (nameFunction && numberFunction && dateFunction && keyFunction) {
        Swal.fire({
            title: "Datos ingresados correctamente!",
            icon: "success",
            draggable: true
        });
    };
};

function validateInputName() {
    if (nameInput.value === '') {
        nameInput.style.border = 'solid 1.5px red';
        showError(divErrorName, nameInput, 'Debe ingresar el nombre como figura en su tarjeta')
        return false;
    }
    return true;
};

function validateInputNumber() {
    if (numberInput.value.length < 16) {
        numberInput.style.border = 'solid 1.5px red';
        showError(divErrorNumber, numberInput, 'Debe ingresar los 16 dígitos de la tarjeta')
        return false;
    }
    return true;
};

function validateInputDate() {
    if (monthInput.value > 12 || yearInput.value < 25 || yearInput.value > 45
        || monthInput.value === '' || yearInput.value === ''
    ) {
        monthInput.style.border = 'solid 1.5px red';
        yearInput.style.border = 'solid 1.5px red';
        showError(divErrorDate, spanKey, 'Datos de fecha incorrectos')
        return false;
    }
    return true;
};

function validateInputKey() {
    if (keyInput.value === '' || keyInput.value.length < 3) {
        keyInput.style.border = 'solid 1.5px red';
        showError(divErrorKey, spanKey, 'Debe ingresar los tres dígitos de seguridad que figuran en el dorso de su tarjeta');
        return false;
    };
    return true;
};

let divErrorName = document.createElement('div');
divErrorName.classList = 'error';
let divErrorNumber = document.createElement('div');
divErrorNumber.classList = 'error';
let divErrorDate = document.createElement('div');
divErrorDate.classList = 'error';
let divErrorKey = document.createElement('div');
divErrorKey.classList = 'error';
const spanKey = document.querySelector('.visibility');
spanKey.innerHTML = `<img src="./interactive-card/images/icons8-eye-26.png" class="img-eye">`;
keyInput.insertAdjacentElement('afterend', spanKey);


spanKey.addEventListener('click', () => {
    (keyInput.type === 'password') ? keyInput.type = 'text' : keyInput.type = 'password';
})


function showError(div, elemento, valor) {
    div.innerHTML = `<img src="./interactive-card/images/icons8-error-48.png" alt="error" width="10%">
        ${valor}`
    elemento.insertAdjacentElement('afterend', div);
};

function clearError(element) {
    element.innerHTML = '';
};




// input nombre
regexName = /[^a-z ]/ig;
regexPreventData = /^$/;
nameInput.autocomplete = 'off';
let cardNameText = cardName.textContent;
let letterName = '';
nameInput.addEventListener('input', (e) => {
    let prevent = letterName.replace(regexPreventData, '')
    if (nameInput.value.trim().length > 20) {
        e.target.value = prevent;
    } else {
        letterName = e.target.value;
        let newValueName = letterName.replace(regexName, '');
        cardName.textContent = newValueName;
        e.target.value = newValueName;
    }
});

nameInput.addEventListener('focusout', () => {
    (nameInput.value.trim() === '') ? cardName.textContent = cardNameText : cardName.textContent = nameInput.value.trim()
    nameInput.style.border = 'solid 1px rgb(205, 198, 198)';
    clearError(divErrorName)
});


// input numero
let numero = [];
let numParrafo = '0000 0000 0000 0000';
let numeroFormateado = numParrafo.split('');
cardNumber.textContent = numParrafo;

numberInput.type = "number";
numberInput.autocomplete = 'off';
let number = '';
let prevent = '';
numberInput.addEventListener('input', (e) => {
    prevent = number.replace(regexPreventData, ' ');

    if (e.inputType === 'deleteContentBackward' && numero.length > 0) {
        if (numParrafo[numero.length - 1] !== ' ') {
            numero.pop();
            numeroFormateado[numero.length] = '0';
            cardNumber.textContent = numeroFormateado.join('')
        }
        else if (numParrafo[numero.length - 1] === ' ') {
            numero.pop()
            numero.pop()
            numeroFormateado[numero.length] = ' ';
            numeroFormateado[numero.length] = 0;
            cardNumber.textContent = numeroFormateado.join('')
        }
    }

    if (e.inputType !== 'deleteContentBackward' && numero.length + 1 <= numParrafo.length) {
        if (numParrafo[numero.length] !== ' ') {
            numero.push(e.data);
            numeroFormateado[numero.length - 1] = e.data;
            cardNumber.textContent = numeroFormateado;
        } else {
            numero.push('', e.data);
            numeroFormateado[numero.length - 1] = ' ';
            numeroFormateado[numero.length - 1] = e.data;
            cardNumber.textContent = numeroFormateado;
        }
    };

    if (numberInput.value.length <= 16) {
        number = e.target.value;
        cardNumber.textContent = numeroFormateado.join('');
    } else {
        e.target.value = prevent;
    }
});

numberInput.addEventListener('focusout', () => {
    numberInput.style.border = 'solid 1px rgb(205, 198, 198)';
    clearError(divErrorNumber);
})



// inputs fecha

// MES

let month = '';
monthInput.type = 'number';
monthInput.autocomplete = 'off';
monthInput.addEventListener('input', (e) => {
    prevent = month.replace(regexPreventData, '');
    if (monthInput.value.length <= 2) {
        month = e.target.value;
        monthCard.textContent = `${monthInput.value.trim()}/`;
    } else {
        e.target.value = prevent;
    }
    if (monthInput.value.trim() === '') monthCard.textContent = '00/';
});

monthInput.addEventListener('change', () => {
    monthInput.style.border = 'solid 1px rgb(205, 198, 198)';
    yearInput.style.border = 'solid 1px rgb(205, 198, 198)';
    clearError(divErrorDate);
})



// AÑO
let year = '';
yearInput.type = 'number';
yearInput.autocomplete = 'off';
yearInput.addEventListener('input', (e) => {
    prevent = year.replace(regexPreventData, '');
    if (yearInput.value.length <= 2) {
        year = e.target.value;
        yearCard.textContent = `${yearInput.value.trim()}`;
    } else {
        e.target.value = prevent;
    }
    if (yearInput.value.trim() === '') yearCard.textContent = '00';
});

monthInput.addEventListener('change', () => {
    monthInput.style.border = 'solid 1px rgb(205, 198, 198)';
    yearInput.style.border = 'solid 1px rgb(205, 198, 198)';
    clearError(divErrorDate);
})


// input clave
const regexNumber = /\d/g;
const isNotNumber = /[^\d]/g
let key = '';
let formattedInput = ''
keyInput.type = 'password';
const keyData = cardKey.textContent;
keyInput.addEventListener('input', (e) => {
    formattedInput = e.target.value.replace(isNotNumber, '')
    prevent = key.replace(regexPreventData, '');
 
    if (keyInput.value.length <= 3) {
        key = e.target.value;
        e.target.value = formattedInput;
    } else {
        e.target.value = prevent;
    }

    cardKey.textContent = ' ';
    if (keyInput.value.length === 3) cardKey.textContent = '***'
    if (keyInput.value === '') cardKey.textContent = keyData
});

keyInput.addEventListener('change', () => {
    keyInput.style.border = 'solid 1px rgb(205, 198, 198)';
    clearError(divErrorKey);
});