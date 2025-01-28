document.addEventListener('DOMContentLoaded', function () {

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
        if (numberInput.value.length < 19) {
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
            showError(divErrorKey, spanKey, 'Debe ingresar los tres dígitos de seguridad');
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
    let nombre = '';
    const regexName = /[a-z]/ig;
    nameInput.maxLength = 20;
    let cardNameText = cardName.textContent;
    nameInput.addEventListener('keydown', (e) => {
        if (!e.key.match(regexName) && e.key !== 'Backspace' && e.key !== ' '
            || nameInput.value.length < 0) {
            e.preventDefault();
        }
    });
    nameInput.addEventListener('keyup', (e) => {
        if (e.key === 'Backspace' && nameInput.value.length < 0) {
            e.preventDefault();
        }
        if (e.key.match(regexName)) {
            cardName.textContent = nameInput.value.trim()
        } else {
            e.preventDefault()
        }
    })
    nameInput.addEventListener('focusout', () => {
        (nameInput.value.trim() === '') ? cardName.textContent = cardNameText : cardName.textContent = nameInput.value.trim()
        nameInput.style.border = 'solid 1px rgb(205, 198, 198)';
        clearError(divErrorName)
    });


    // input numero
    const regexNumber = /\d/g;
    let numero = [];
    let numParrafo = '0000 0000 0000 0000';
    let numeroFormateado = numParrafo.split('');
    cardNumber.textContent = numParrafo;

    let valor = '';

    numberInput.addEventListener('keydown', (e) => {
        if (numberInput.selectionStart < numberInput.value.length) {
            numberInput.selectionStart === numberInput.value.length;
            numberInput.selectionEnd === numberInput.value.length;
            e.preventDefault();
        }

        if (e.key !== 'Backspace') e.preventDefault();

        if (valor.trim().length >= 20) {
            e.preventDefault();
            return;
        }

        if (e.key === 'Backspace' && numero.length > 0) {
            if (numParrafo[numero.length - 1] !== ' ') {
                e.preventDefault()
                numero.pop()
                numeroFormateado[numero.length] = '0';
                cardNumber.textContent = numeroFormateado.join('')
            }
            else if (numParrafo[numero.length - 1] === ' ') {
                e.preventDefault()
                numero.pop()
                numeroFormateado[numero.length] = ' ';
                cardNumber.textContent = numeroFormateado.join('')
            }
        }

        if (e.key.match(regexNumber) && numero.length + 1 <= numParrafo.length) {
            if (numParrafo[numero.length] !== ' ') {
                numero.push(e.key);
                numeroFormateado[numero.length - 1] = e.key
                cardNumber.textContent = numeroFormateado
            } else {
                numero.push('-', e.key);
                numeroFormateado[numero.length - 1] = ' '
                numeroFormateado[numero.length - 1] = e.key
                cardNumber.textContent = numeroFormateado
            }
        }

        numberInput.value = numero.join('');
        valor = numberInput.value;
        cardNumber.textContent = numeroFormateado.join('');

    });

    numberInput.addEventListener('focusout', () => {
        numberInput.style.border = 'solid 1px rgb(205, 198, 198)';
        clearError(divErrorNumber);
    })


    // inputs fecha

    // MES
    monthInput.maxLength = 2
    monthInput.addEventListener('keydown', (e) => {
        if (!e.key.match(regexNumber) && e.key !== 'Backspace' && e.key !== 'ArrowLeft'
            && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    });
    monthInput.addEventListener('keyup', (e) => {
        if (e.key.match(regexNumber) || e.key === 'Backspace') {
            monthCard.textContent = `${monthInput.value.trim()}/`;
        }
        if (monthInput.value.trim() === '') monthCard.textContent = '00/';
    });
    monthInput.addEventListener('change', () => {
        monthInput.style.border = 'solid 1px rgb(205, 198, 198)';
        yearInput.style.border = 'solid 1px rgb(205, 198, 198)';
        clearError(divErrorDate);
    })

    // AÑO
    yearInput.maxLength = 2
    yearInput.addEventListener('keydown', (e) => {
        if (!e.key.match(regexNumber) && e.key !== 'Backspace' && e.key !== 'ArrowLeft'
            && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    });
    yearInput.addEventListener('keyup', (e) => {
        if (e.key.match(regexNumber) || e.key === 'Backspace') {
            yearCard.textContent = yearInput.value.trim();
        }
        if (yearInput.value.trim() === '') yearCard.textContent = '00';
    });
    yearInput.addEventListener('change', () => {
        monthInput.style.border = 'solid 1px rgb(205, 198, 198)';
        yearInput.style.border = 'solid 1px rgb(205, 198, 198)';
        clearError(divErrorDate);
    });


    // input clave
    keyInput.maxLength = 3;
    const keyData = cardKey.textContent;
    keyInput.addEventListener('keydown', (e) => {
        if (!e.key.match(regexNumber) && e.key !== 'Backspace') e.preventDefault();
    });
    keyInput.addEventListener('keyup', () => {
        cardKey.textContent = ' ';
        if (keyInput.value.length === 3) cardKey.textContent = '***'
        if (keyInput.value === '') cardKey.textContent = keyData
    });
    keyInput.addEventListener('change', () => {
        keyInput.style.border = 'solid 1px rgb(205, 198, 198)';
        clearError(divErrorKey);
    });

})
