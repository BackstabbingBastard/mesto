let popup = document.querySelector('.popup');
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddPlace = document.querySelector('.popup_type_add-place');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let dataFormElement = document.querySelector('.profileform_type_user-data'); // Воспользуйтесь методом querySelector()
let AddImgFormElement = document.querySelector('.profileform_type_add-img');
let nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_type_description')// Воспользуйтесь инструментом .querySelector()
let profileEditBtn = document.querySelector('.profile__edit-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let imageAddBtn = document.querySelector('.profile__add-btn');
let imageAddHeader = document.querySelector('.popup__input_type_img-header');
let imageAddLink = document.querySelector('.popup__input_type_link');

const popupAddCloseBtn = document.querySelector('.popup__close-btn_type_card-add');

const initialCards = [
    {
      name: 'Фэшен',
      link: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=282'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Бэтмен',
      link: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=282&q=282'
    }
  ]; 
const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cardTemplate');

renderCards(initialCards);

// создаем 6 карточек при запуске страницы
function renderCards(initialData) {
  initialData.forEach((item) => {
    cardsSection.append(createCardTemplate(item));
  });
};

// настраиваем темплейт
function createCardTemplate(cardData) {
  const el = cardTemplate.content.cloneNode(true);
  let cardHeader = el.querySelector('.card__header');
  let cardImage = el.querySelector('.card__img');
  cardHeader.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);

  return el;
}

function openPopup(chosenPopup) {
  chosenPopup.classList.add('popup_opened');
}

function closePopup(chosenPopup) {
  chosenPopup.classList.remove('popup_opened');
}

// открыть попап
profileEditBtn.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
});

imageAddBtn.addEventListener('click', () => {
  openPopup(popupAddPlace);
});


// закрыть без сохранения
popupCloseBtn.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

popupAddCloseBtn.addEventListener('click', () => {
  closePopup(popupAddPlace);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;  
    closePopup(popupEditProfile);
}

function addImage (evt) {
    evt.preventDefault(); 
    let newCardData = {
      name: imageAddHeader.value,
      link: imageAddLink.value
    };
    cardsSection.prepend(createCardTemplate(newCardData));
    closePopup(popupAddPlace);
    imageAddHeader.value = '';
    imageAddLink.value = '';
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
dataFormElement.addEventListener('submit', handleFormSubmit);
AddImgFormElement.addEventListener('submit', addImage);
