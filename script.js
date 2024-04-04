const images = document.querySelectorAll('.image');
let imgSrc;
let currentIndex = 0; // Keep track of the current image index
let modalOpen = false; // Flag to track if a modal is open

images.forEach((img, index) => {
  img.addEventListener('click', (e) => {
    if (!modalOpen) { // Check if a modal is not already open
      imgSrc = e.target.src;
      currentIndex = index; // Update the current index when an image is clicked
      imgModal(imgSrc);
      modalOpen = true; // Set the flag to true when a modal is opened
    }
  });
});

// Function to handle swiping left or right
let handleSwipe = (direction) => {
  if (direction === 'left' && currentIndex > 0) {
    currentIndex--;
  } else if (direction === 'right' && currentIndex < images.length - 1) {
    currentIndex++;
  }
  imgSrc = images[currentIndex].src;
  updateModalImage(imgSrc);
};

// Function to update the modal image
let updateModalImage = (src) => {
  const modalImage = document.querySelector('.modal img');
  modalImage.setAttribute('src', src);
};

// Function to create the modal
let imgModal = (src) => {
  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal');
  document.querySelector('body').append(modal);
  const newImage = document.createElement('img');
  newImage.setAttribute('src', src);
  const closeBtn = document.createElement('span');
  closeBtn.setAttribute('class', 'closeBtn');
  closeBtn.innerHTML = "X";
  closeBtn.onclick = () => {
    modal.remove();
    modalOpen = false; // Reset the flag when the modal is closed
  };
  modal.append(newImage, closeBtn);

  // Add event listeners for both touch and mouse events
  let startX, startY;
  newImage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  newImage.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    let diffX = startX - endX;
    let diffY = startY - endY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) { // Swipe detected
      if (diffX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
  });

  newImage.addEventListener('mousedown', (e) => {
    startX = e.clientX;
  });
  newImage.addEventListener('mouseup', (e) => {
    let endX = e.clientX;
    let diffX = startX - endX;
    if (Math.abs(diffX) > 50) { // Swipe detected
      if (diffX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
  });

  // Add click event listeners for tapping left or right
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('closeBtn')) {
      modal.remove();
      modalOpen = false; // Reset the flag when the modal is closed
    } else if (e.clientX < window.innerWidth / 2) { // Tap left half
      handleSwipe('left');
    } else { // Tap right half
      handleSwipe('right');
    }
  });
};
