const allForms = Array.from(document.forms);

const setSubmitButtonState = (isActive, button) => {
    if (isActive) {
        button.removeAttribute('disabled');
        button.classList.remove('popup__save-btn_inactive');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('popup__save-btn_inactive');
    }
};

const validateInput = (inputElement) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    if (inputElement.checkValidity()) {
        inputElement.classList.remove('popup__input_invalid');
        errorElement.textContent = '';
    } else {
        inputElement.classList.add('popup__input_invalid');
        errorElement.textContent = inputElement.validationMessage;
    }
}

const validateForm = (evt) => {
    const form = evt.target.closest('.profileform');
    let allFormInput = form.querySelectorAll('.popup__input');
    console.log('все инпуты формы:', allFormInput);
    allFormInput.forEach(input => {
        validateInput(input);
    });

    const button = form.querySelector('.popup__save-btn');

    if (form.checkValidity()) {
        setSubmitButtonState(true, button);
    } else {
        setSubmitButtonState(false, button);
    }
};

allForms.forEach(form => {
    form.addEventListener('input', validateForm);
    form.addEventListener('submit', validateForm);
});
