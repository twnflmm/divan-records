//бургер меню
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
  burger.classList.toggle('active');
});

const links = menu.querySelectorAll('a');
links.forEach((element) => {
  element.addEventListener('click', () => {
    menu.classList.toggle('active');
    burger.classList.toggle('active');
  });
});

//фиксация шапки при скроле
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.header');
  const breakpoint = 50;

  if (window.scrollY >= breakpoint) {
    nav.classList.add('header-fixed');
  } else {
    nav.classList.remove('header-fixed');
  }
});

//открытие popup окна
const popupButton = document.querySelectorAll('.nav__button');
const modal = document.querySelector('.modal');

popupButton.forEach(function (item) {
  item.addEventListener('click', () => {
    modal.classList.add('active');
  });
});

//закрытие popup окна через крестик
const closeButton = document.querySelectorAll('.modal__close-button');

closeButton.forEach(function (item) {
  item.addEventListener('click', () => {
    modal.classList.remove('active');
  });
});

//закрытие popup окна через escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
  }
});

//закрытие popup окна при клике вне его
const modalAll = document.querySelectorAll('.modal .modal__wrapper');

modalAll.forEach(function (item) {
  item.addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });
});
modal.addEventListener('click', (event) => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('active');
});

//форма логина
const modalFormLogin = document.getElementById('login');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');

modalFormLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  validateInputsLogin();
});

const validateInputsLogin = () => {
  const emailLoginValue = emailLogin.value.trim();
  const passwordLoginValue = passwordLogin.value.trim();

  if (emailLoginValue === '') {
    setError(emailLogin, 'Почта обязательна');
  } else if (!isValidEmail(emailLoginValue)) {
    setError(emailLogin, 'Введите действительный адрес электронной почты');
  } else {
    setSuccess(emailLogin);
  }

  if (passwordLoginValue === '') {
    setError(passwordLogin, 'Пароль обязателен');
  } else if (passwordLoginValue.length < 8) {
    setError(passwordLogin, 'Пароль должен состоять минимум из 8 символов');
  } else {
    setSuccess(passwordLogin);
  }
};

//форма забыли пароль
const modalFormRecover = document.getElementById('recover');
const emailRecover = document.getElementById('email-recover');

modalFormRecover.addEventListener('submit', (e) => {
  e.preventDefault();

  validateInputsRecover();
});

const validateInputsRecover = () => {
  const emailRecoverValue = emailRecover.value.trim();

  if (emailRecoverValue === '') {
    setError(emailRecover, 'Почта обязательна');
  } else if (!isValidEmail(emailRecoverValue)) {
    setError(emailRecover, 'Введите действительный адрес электронной почты');
  } else {
    setSuccess(emailRecover);
  }
};

//форма регистрации
const modalFormRegister = document.getElementById('register');
const usernameRegister = document.getElementById('username-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
const password2Register = document.getElementById('password2-register');
const checkboxRegister = document.getElementById('checkbox-register');
const checkboxRegisterText = document.querySelector('.checkbox-register-text');

modalFormRegister.addEventListener('submit', (e) => {
  e.preventDefault();

  validateInputsRegister();

  if (validateInputsRegister()) {
    modalFormRegister.submit();
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.modal-form__error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.modal-form__error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('modal-form__error');
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputsRegister = () => {
  const usernameRegisterValue = usernameRegister.value.trim();
  const emailRegisterValue = emailRegister.value.trim();
  const passwordRegisterValue = passwordRegister.value.trim();
  const password2RegisterValue = password2Register.value.trim();
  let counter = 0;

  if (usernameRegisterValue === '') {
    setError(usernameRegister, 'Имя обязательно');
  } else if (usernameRegisterValue.length < 4) {
		setError(usernameRegister, 'Нельзя использовать имя короче 4 символов');	
	} else if (usernameRegisterValue.length > 12) {
		setError(usernameRegister, 'Нельзя использовать имя превышающее 12 символов');	
	} else {
    setSuccess(usernameRegister);
    counter++;
  }

  if (emailRegisterValue === '') {
    setError(emailRegister, 'Почта обязательна');
  } else if (!isValidEmail(emailRegisterValue)) {
    setError(emailRegister, 'Введите действительный адрес электронной почты');
  } else {
    setSuccess(emailRegister);
    counter++;
  }

  if (passwordRegisterValue === '') {
    setError(passwordRegister, 'Пароль обязателен');
  } else if (passwordRegisterValue.length < 8) {
    setError(passwordRegister, 'Пароль должен состоять минимум из 8 символов');
  } else {
    setSuccess(passwordRegister);
    counter++;
  }

  if (password2RegisterValue === '') {
    setError(password2Register, 'Пожалуйста, подтвердите свой пароль');
  } else if (password2RegisterValue !== passwordRegisterValue) {
    setError(password2Register, 'Пароли не совпадают');
  } else {
    setSuccess(password2Register);
    counter++;
  }

  if (!checkboxRegister.checked) {
    checkboxRegisterText.style.color = '#EB404E';
  } else {
    checkboxRegisterText.style.color = '#FFFFFF';
    counter++;
  }

  if (counter === 5) return true;
};

//переключение окон логина, забыли пароль и регистрации
const logRegButton = document.querySelectorAll('.log-reg-link');
const login = document.querySelector('.login');
const recoverLink = document.getElementById('recover-link');
const recoverLinkBack = document.getElementById('recover-link-back');
const recover = document.querySelector('.recover');
const register = document.querySelector('.register');

logRegButton.forEach(function (item) {
  item.addEventListener('click', () => {
    login.classList.toggle('hidden');
    register.classList.toggle('hidden');
  });
});

recoverLink.addEventListener('click', () => {
  recover.classList.remove('hidden');
  login.classList.add('hidden');
});

recoverLinkBack.addEventListener('click', () => {
  recover.classList.add('hidden');
  login.classList.remove('hidden');
});

//скрыть/показать пароль
const toggleShowHideBtn = document.querySelector('.modal-form__eye');

toggleShowHideBtn.addEventListener('click', () => {
  if (passwordRegister.type === 'password') {
    passwordRegister.setAttribute('type', 'text');
    toggleShowHideBtn.classList.add('hide');
  } else {
    passwordRegister.setAttribute('type', 'password');
    toggleShowHideBtn.classList.remove('hide');
  }
});

//слайдер
const swiper = new Swiper('.swiper', {
  slidesPerView: 3.5,
  spaceBetween: 20,
  touchRatio: 2,
  speed: 800,

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    350: {
      slidesPerView: 1.7,
    },
    576: {
      slidesPerView: 2.2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3.5,
      slidesPerGroup: 2,
    },
  },
  navigation: {
    prevEl: '.slider__prev',
    nextEl: '.slider__next',
  },
});

//аккордеон
const accord = document.querySelectorAll('.accord__top');

accord.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.toggle('active');

    var panel = item.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

//форма отправки
const form = document.getElementById('form');
const nameForm = document.getElementById('form-name');
const phoneForm = document.getElementById('form-phone');
const checkForm = document.getElementById('check');
const checkText = document.getElementById('check-text');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validateInputsForm();
});

const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase());
};

const validateInputsForm = () => {
  const nameFormValue = nameForm.value.trim();
  const phoneFormValue = phoneForm.value.trim();

  if (nameFormValue === '') {
    setError(nameForm, 'Имя обязательно');
  } else {
    setSuccess(nameForm);
  }

  if (phoneFormValue === '') {
    setError(phoneForm, 'Номер телефона обязателен');
  } else if (!isValidPhone(phoneFormValue)) {
    setError(phoneForm, 'Имя обязательно');
  } else {
    setSuccess(phoneForm);
  }

  if (!checkForm.checked) {
    checkText.style.color = '#EB404E';
  } else {
    checkText.style.color = '#FFFFFF';
  }
};
