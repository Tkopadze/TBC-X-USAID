const cardsData = () => {
  return fetch("./assets/cards.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  cardsData().then((jsonData) => {
    generateCardsHTML(jsonData);
  });
  faqAnswer();
  burgerMenu();
});

function generateCardsHTML(data) {
  let html = "";
  const container = document.getElementById("cards-container");

  data.forEach((item) => {
    html += `
            <div class="card">
                <img src="${item.imageURL}" alt="${item.name}">
                <div class="card-content">
                    <h2>${item.name}</h2>
                    <p>${item.desc}</p>
                    <a href="${item.link}" target="_blank" class="content-link">
                      <img src="./assets/arrow.svg" alt="arrow" class="arrow" id="arrow">
                        <p> კურსის დეტალები</p>
                    </a>
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
}

let currentSlideIndex = 1;

function showSlides(index) {
  const slides = document.querySelectorAll(".slider-page");

  if (index < 1) {
    currentSlideIndex = slides.length;
  } else if (index > slides.length) {
    currentSlideIndex = 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[currentSlideIndex - 1].style.display = "block";
}

function changeSlide(n) {
  showSlides((currentSlideIndex += n));
}

function currentSlide(n) {
  showSlides((currentSlideIndex = n));
}

// Initialize the slider
showSlides(currentSlideIndex);

setInterval(function () {
  changeSlide(1);
}, 5000);

function faqAnswer() {
  var faqWrapper = document.querySelector(".faqWrapper");

  // Add click event listener to the FAQ wrapper
  faqWrapper.addEventListener("click", function (event) {
    // Check if the clicked element is a toggle button
    if (event.target.classList.contains("toggleAnswerBtn")) {
      // Find the parent FAQ item of the clicked button
      var faqItem = event.target.closest(".faqItem");

      // Toggle the 'active' class on the FAQ item to show/hide the answer
      faqItem.classList.toggle("active");
    }
  });
}

function toggleRotation(button) {
  button.classList.toggle("rotate-90");
}

document.getElementById("popupTrigger").addEventListener("click", function () {
  document.getElementById("popupContainer").style.display = "block";
});

function closePopup() {
  document.getElementById("popupContainer").style.display = "none";
}

function burgerMenu() {
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerContent = document.querySelector(".burger-content");
  const body = document.querySelector("body");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");

  function toggleMenu() {
    if (burgerContent.style.display === "block") {
      body.style.overflowY = "scroll";
      burgerContent.style.display = "none";
      line1.style.transform = "none";
      line2.style.opacity = "1";
      line2.style.transform = "none";
      line3.style.transform = "none";
    } else {
      burgerContent.style.display = "block";
      body.style.overflowY = "hidden";
      line1.style.transform = "rotate(45deg)";
      line2.style.opacity = "1";
      line2.style.transform = "rotate(-45deg)";

      line3.style.transform = "rotate(45deg)";
    }
  }
  function handleDisplay() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 767) {
      burgerContent.style.display = "none";
      body.style.overflowY = "scroll";
      line1.style.transform = "none";
      line2.style.opacity = "1";
      line2.style.transform = "none";
      line3.style.transform = "none";
    }
  }

  burgerMenu.addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleDisplay);

  // Call handleDisplay initially
  handleDisplay();
}

const currentPageUrl = window.location.href;
const navTitles = document.querySelectorAll(".navTitles");

// Function to remove 'active' class from all nav titles
function removeAllActive() {
  navTitles.forEach((title) => {
    title.classList.remove("active");
  });
}

// Add event listeners to nav titles
navTitles.forEach((navTitle) => {
  navTitle.addEventListener("click", function () {
    // Remove 'active' class from all nav titles
    removeAllActive();
    // Add 'active' class to clicked nav title
    this.classList.add("active");
  });

  // Check if the href matches the current page URL
  if (navTitle.href === currentPageUrl) {
    // Remove 'active' class from all nav titles
    removeAllActive();
    // Add 'active' class to the nav title with matching href
    navTitle.classList.add("active");
  }
});
