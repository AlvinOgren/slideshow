import { slides } from "./slides.js";

let currentSlideIndex = 0;

createDots();
createButtons();
showSlide(currentSlideIndex);

function showPreviousSlide() {
	const newSlideIndex = (currentSlideIndex + slides.length - 1) % slides.length;
	showSlide(newSlideIndex);
}

function showNextSlide() {
	const newSlideIndex = (currentSlideIndex + 1) % slides.length;
	showSlide(newSlideIndex);
}

function showSlide(newSlideIndex) {
	if (newSlideIndex < 0 || newSlideIndex >= slides.length) {
		throw new Error('showSlide newSlideIndex out of bounds.')
	}

	const slideContainer = document.getElementById("slide-container");
	const slideNumber = document.getElementById("slide-number");
	const slideCaption = document.getElementById("slide-caption");

	slideContainer.style.backgroundImage = `url(${slides[newSlideIndex].image})`;
	slideNumber.innerText = `${newSlideIndex + 1} / ${slides.length}`;
	slideCaption.innerText = slides[newSlideIndex].caption;

	triggerSlideAnimation();
	setActiveDot(currentSlideIndex, newSlideIndex);

	currentSlideIndex = newSlideIndex;
}

function setActiveDot(previousActiveDotIndex, nextActiveDotIndex) {
	if (previousActiveDotIndex < 0 || previousActiveDotIndex >= slides.length) {
		throw new Error('setActiveDot previousActiveDotIndex out of bounds.')
	}
	if (nextActiveDotIndex < 0 || nextActiveDotIndex >= slides.length) {
		throw new Error('setActiveDot nextActiveDotIndex out of bounds.')
	}

	const dots = document.getElementsByClassName("dot");
	dots[previousActiveDotIndex].classList.remove("active");
	dots[nextActiveDotIndex].classList.add("active");
}

function triggerSlideAnimation() {
	const slideContainer = document.getElementById("slide-container");
	slideContainer.classList.remove("fade");
	void slideContainer.offsetWidth;
	slideContainer.classList.add("fade");
}

function createDots() {
	const dotsContainer = document.getElementById("dots-container");
	for (let slideIndex = 0; slideIndex < slides.length; ++slideIndex) {
		const dot = document.createElement("span");
		dot.classList.add('dot');
		dot.addEventListener('click', () => showSlide(slideIndex));
		dotsContainer.appendChild(dot);
	}
}

function createButtons() {
	const buttonContainer = document.getElementById("button-container");

	const prevButton = document.createElement("a");
	prevButton.textContent = '\u276E';
	prevButton.classList.add('prev');
	prevButton.addEventListener('click', showPreviousSlide);
	buttonContainer.appendChild(prevButton);

	const nextButton = document.createElement("a");
	nextButton.textContent = '\u276F';
	nextButton.classList.add('next');
	nextButton.addEventListener('click', showNextSlide);
	buttonContainer.appendChild(nextButton);
}
