let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_type_description')// Воспользуйтесь инструментом .querySelector()
let profileEditBtn = document.querySelector('.profile__edit-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');

// открыть попап
profileEditBtn.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
});

// закрыть без сохранения
popupCloseBtn.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;  
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
