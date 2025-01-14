const regex = {
    name: /^[a-zA-Zа-яА-ЯёЁ]+([ '-][a-zA-Zа-яА-ЯёЁ]+)*$/,
    age: /^(?:1[01][0-9]|120|[1-9][0-9]?)$/,
    about: /^[\w\s.,!?'"-]{10,300}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    javascript: /^[\w\s.,!?'"-]{10,300}$/,
    html: /^[\w\s.,!?'"-]{10,300}$/,
    css: /^[\w\s.,!?'"-]{10,300}$/
};

const form = document.forms.form;

form.onsubmit = (event) => {
    event.preventDefault()

    let user = {}

    let fn = new FormData(form)

    const isFormValid = validateInpts();

   if (isFormValid) {
        fn.forEach((value, key) => {
            user[key] = value;
        });
        console.log(user);
    } else {
        console.log('Form is invalid');
    }

};

const successFields = document.querySelector('#successFields');
const errorFields = document.querySelector('#errorFields');

function validateInpts() {
    const inpts = document.querySelectorAll('.required');
    let isValid = true;
    let successCount = 0;
    let errorCount = 0;

    inpts.forEach(inp => {
        const key = inp.name;
        const value = inp.value.trim();

        let txtRequired = document.querySelector('.txt-required');

        const errorMsg = document.querySelector('.error-message');
        const obligatory = document.querySelector('.obligatory');
        const errorImg = document.querySelector('img'); 

        if (regex[key] && regex[key].test(value)) {
            inp.classList.add('valid');
            inp.classList.remove('invalid');
            txtRequired.classList.add('valid');
            txtRequired.classList.remove('invalid');
            errorMsg.classList.remove('visible');
            errorMsg.classList.add('hidden');

            if (obligatory) obligatory.style.display = 'flex';

            errorImg.style.visibility = 'hidden';
            successCount++;
        } else {
            inp.classList.add('invalid');
            inp.classList.remove('valid');
            txtRequired.classList.remove('valid');
            txtRequired.classList.add('invalid');
            errorMsg.classList.add('visible');
            errorMsg.classList.remove('hidden');

            if (obligatory) obligatory.style.display = 'none';

            errorImg.style.visibility = 'visible';
            errorCount++;
            isValid = false;
        }
    }); 

    successFields.innerHTML = successCount + '/7';
    errorFields.innerHTML = errorCount + '/7';

    return isValid
};