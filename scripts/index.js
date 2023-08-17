const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupfullImg = document.querySelector('.popup_type_full-img')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const dataFormElement = document.querySelector('.profileform_type_user-data'); // Воспользуйтесь методом querySelector()
const AddImgFormElement = document.querySelector('.profileform_type_add-img');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const imageAddBtn = document.querySelector('.profile__add-btn');
const popupAddCloseBtn = document.querySelector('.popup__close-btn_type_card-add');
const popupImgCloseBtn = document.querySelector('.popup__close-btn_type_full-img');
const initialCards = [{
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
let nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_type_description') // Воспользуйтесь инструментом .querySelector()
let imageAddHeader = document.querySelector('.popup__input_type_img-header');
let imageAddLink = document.querySelector('.popup__input_type_link');
let FullImg = document.querySelector('.popup__full-img');
let FullImgText = document.querySelector('.popup__img-text');


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

  const likeBtn = el.querySelector('.card__like-btn');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.contains('card__like-btn_liked') ? dislikeCard(likeBtn) : likeCard(likeBtn);
  });

  const imgForClick = el.querySelector('.card__img');
  imgForClick.addEventListener('click', () => {
    setImgPopup(imgForClick.src, cardData.name);
    openPopup(popupfullImg);
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

function openPopup(chosenPopup) {
  chosenPopup.classList.add('popup_opened');
}

function closePopup(chosenPopup) {
  chosenPopup.classList.remove('popup_opened');
}

function likeCard(element) {
  element.classList.add('card__like-btn_liked');
}

function dislikeCard(element) {
  element.classList.remove('card__like-btn_liked');
}

function setImgPopup(src, text) {
  FullImg.src = src;
  FullImgText.textContent = text;
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function addImage(evt) {
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


// попапы
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

popupImgCloseBtn.addEventListener('click', () => {
  closePopup(popupfullImg);
});

renderCards(initialCards);
dataFormElement.addEventListener('submit', handleFormSubmit);
AddImgFormElement.addEventListener('submit', addImage);
