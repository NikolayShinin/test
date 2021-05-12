const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('data-id');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		})
	}
}

const popupCloses = document.querySelectorAll('.popup-close');
if (popupCloses.length > 0) {
	for (let index = 0; index < popupCloses.length; index++) {
		const el = popupCloses[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		})
	}
}


function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		let mouseDown
		currentPopup.addEventListener('mousedown', function (e) {
			mouseDown = !e.target.closest('.popup__content')
		})
		currentPopup.addEventListener('mouseup', function (e) {
			if (mouseDown && e.target.classList.contains('popup')) {
				popupClose(e.target.closest('.popup'));
			}
		})
	}
}

function popupClose(popupActive) {
	if (unlock) {
		popupActive.classList.remove('open');
		bodyUnlock();
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('main').offsetWidth + 'px'

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');
	
	unlock = false;
	setTimeout( function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		body.style.paddingRight = '0px';
		body.classList.remove('lock')
	}, timeout)
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
})

const saveEdit = document.querySelector('#edit .popup__save')

saveEdit.addEventListener('click', function (e) {
	e.preventDefault();
	const popupInput = document.querySelectorAll('#edit input');
	let checkError = error(popupInput);
	const name = document.querySelector('#edit #name').value;
	const profession = document.querySelector('#edit #profession').value;
	if (!checkError) {
		const popupActive = document.querySelector('#edit')
		document.querySelector('.profile__name').innerHTML = name;
		document.querySelector('.profile__profession').innerHTML = profession;
		popupClose(popupActive)
	}
})

function error(popupInput) {
	let x = 0;
	if (popupInput) {
		for (let index = 0; index < popupInput.length; index++) {
			const el = popupInput[index];
			el.classList.remove('error');
			if (!el.value) {
				el.classList.add('error');
				x++
			}
		}
	}
	return x
}


const saveAdd = document.querySelector('#add .popup__save')
let img 
saveAdd.addEventListener('click', function (e) {
	e.preventDefault();
	const popupActive = document.querySelectorAll('#add input');
	let checkError = error(popupActive);
	const title = document.querySelector('#add #title').value;
	const posts = document.querySelector('.films__list');
	const post = document.createElement('li');
	if (!checkError) {
		const popupActive = document.querySelector('#add')
		post.classList.add('films__item');
		post.classList.add('item');
		post.innerHTML = '<div class="item__card"><div class="item__img"><img src="' + img + '" alt=""></div><div class="item__info"><h4 class="item__title">' + title + '</h4><a href="/" class="item__like" onclick="like()"></a></div></div>'
		posts.prepend(post);
		popupClose(popupActive);
	}
})

function like() {
	event.preventDefault();
	event.srcElement.classList.toggle('active');
}

function load(input) {
	let file =input.files[0];
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		img = reader.result;
	}
}