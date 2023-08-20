const allForms = Array.from(document.forms);

function enableValidation(settingsData) {
    enableValidation.formSelector = settingsData['formSelector'];
    enableValidation.inputSelector = settingsData['inputSelector'];
    enableValidation.submitButtonSelector = settingsData['submitButtonSelector'];
    enableValidation.inactiveButtonClass = settingsData['inactiveButtonClass'];
    enableValidation.inputErrorClass = settingsData['inputErrorClass'];
    enableValidation.errorClass = settingsData['errorClass'];

    const allForms = document.querySelectorAll(enableValidation.formSelector);

    allForms.forEach(form => {
        form.addEventListener('input', validateForm);
        form.addEventListener('submit', validateForm);
    });
}

const setSubmitButtonState = (isActive, button) => {
    if (isActive) {
        button.removeAttribute('disabled');
        button.classList.remove(enableValidation.inactiveButtonClass);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(enableValidation.inactiveButtonClass);
    }
};

const validateInput = (inputElement) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    const localButton = inputElement.closest(enableValidation.formSelector).querySelector(enableValidation.submitButtonSelector);
    if (inputElement.checkValidity()) {
        inputElement.classList.remove(enableValidation.inputErrorClass);
        errorElement.textContent = '';
        setSubmitButtonState(true, localButton);
    } else {
        inputElement.classList.add(enableValidation.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        setSubmitButtonState(false, localButton);
    }
}

const validateForm = (evt) => {
    const form = evt.target.closest('.profileform');
    const allFormInput = form.querySelectorAll(enableValidation.inputSelector);
    allFormInput.forEach(input => {
        validateInput(input);
    });

    const button = form.querySelector(enableValidation.submitButtonSelector);

    if (form.checkValidity()) {
        setSubmitButtonState(true, button);
    } else {
        setSubmitButtonState(false, button);
    }
};

enableValidation({
    formSelector: '.profileform',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error'
  }); 
