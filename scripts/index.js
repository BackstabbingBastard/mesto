const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupFullImg = document.querySelector('.popup_type_full-img')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const dataFormElement = document.querySelector('.profileform_type_user-data'); // Воспользуйтесь методом querySelector()
const addImgFormElement = document.querySelector('.profileform_type_add-img');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const imageAddBtn = document.querySelector('.profile__add-btn');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cardTemplate');
const nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description') // Воспользуйтесь инструментом .querySelector()
const imageAddHeader = document.querySelector('.popup__input_type_img-header');
const imageAddLink = document.querySelector('.popup__input_type_link');
const fullImg = document.querySelector('.popup__full-img');
const fullImgText = document.querySelector('.popup__img-text');
const allPopup = document.querySelectorAll('.popup');


// создаем 6 карточек при запуске страницы
function renderCards(initialData) {
  initialData.forEach((item) => {
    cardsSection.append(createCardTemplate(item));
  });
};


// настраиваем темплейт
function createCardTemplate(cardData) {
  const el = cardTemplate.content.cloneNode(true);
  const cardHeader = el.querySelector('.card__header');
  const cardImage = el.querySelector('.card__img');
  cardHeader.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', `Изображение загруженное пользователем: ${cardHeader.textContent}`);

  const likeBtn = el.querySelector('.card__like-btn');
  likeBtn.addEventListener('click', () => {
    likeCard(likeBtn);
  });

  const imgForClick = el.querySelector('.card__img');
  imgForClick.addEventListener('click', () => {
    setImgPopup(imgForClick.src, cardData.name);
    openPopup(popupFullImg);
  });

  const deleteBtn = el.querySelector('.card__delete-btn');
  deleteBtn.addEventListener('click', function (e) {
    deleteCard(e.target.closest('.card'));
  });

  return el;
}

function deleteCard(chosenCardData) {
  chosenCardData.remove();
}

function pressEsc(evt) {
  if (evt.key === 'Escape') {
    allPopup.forEach(popup => {
      if(popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
    deleteEscEvent();
  }
}

function deleteEscEvent() {
  document.removeEventListener('keydown', pressEsc);
}

function openPopup(chosenPopup) {
  chosenPopup.classList.add('popup_opened');
  if(chosenPopup.classList.contains('popup_opened')) 
  {
    document.addEventListener('keydown', pressEsc);
  }
}

function closePopup(chosenPopup) {
  chosenPopup.classList.remove('popup_opened');
}

function likeCard(element) {
  element.classList.toggle('card__like-btn_liked');
}

function setImgPopup(src, text) {
  fullImg.src = src;
  fullImgText.textContent = text;
  fullImg.alt = `Изображение загруженное пользователем: ${text}`;
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddImageSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: imageAddHeader.value,
    link: imageAddLink.value
  };
  cardsSection.prepend(createCardTemplate(newCardData));
  closePopup(popupAddPlace);
  addImgFormElement.reset();
}


// попапы
profileEditBtn.addEventListener('click', (e) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupEditProfile.querySelectorAll(enableValidation.inputSelector).forEach(input => {
    validateInput(input);
});
  openPopup(popupEditProfile);
});

imageAddBtn.addEventListener('click', () => {
  popupAddPlace.querySelectorAll(enableValidation.inputSelector).forEach(input => {
    // validateInput(input);

    // console.log(enableValidation.submitButtonSelector);
    checkFormValidity(popupAddPlace.querySelector(enableValidation.formSelector), popupAddPlace.querySelector(enableValidation.submitButtonSelector));
    
});
  openPopup(popupAddPlace);
});

// закрыть без сохранения
popupCloseBtns.forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});  

allPopup.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);     
  }});
});

renderCards(initialCards);
dataFormElement.addEventListener('submit', handleProfileFormSubmit);
addImgFormElement.addEventListener('submit', handleAddImageSubmit);
