const imageList = document.querySelectorAll('.image');
const pictureList = document.querySelectorAll('.picture');
const slikaList = document.querySelectorAll('.slika');
let currentIndex = 0;
let currentList = imageList;
let modalOpen = false;
let modal = null;

const handleImageClick = (imgList) => {
  imgList.forEach((img, index) => {
    img.addEventListener('click', () => {
      if (!modalOpen) {
        currentIndex = index;
        currentList = imgList;
        openModal(img.getAttribute('src'));
      }
    });
  });
};

const openModal = (src) => {
  modalOpen = true;
  modal = document.createElement('div');
  modal.setAttribute('class', 'modal');
  document.querySelector('body').append(modal);

  const newImage = document.createElement('img');
  newImage.setAttribute('src', src);
  const closeBtn = document.createElement('span');
  closeBtn.setAttribute('class', 'closeBtn');
  closeBtn.innerHTML = "X";
  closeBtn.onclick = () => {
    closeModal();
  };
  modal.append(newImage, closeBtn);

  newImage.addEventListener('touchstart', handleTouchStart);
  newImage.addEventListener('touchmove', handleTouchMove);
  newImage.addEventListener('touchend', handleTouchEnd);

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('closeBtn')) {
      closeModal();
    } else if (e.clientX < window.innerWidth / 2) {
      handleSwipe('left');
    } else {
      handleSwipe('right');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOpen) {
      closeModal();
    }
  });
};

const closeModal = () => {
  modal.remove();
  modalOpen = false;
};

const handleSwipe = (direction) => {
  if (direction === 'left' && currentIndex > 0) {
    currentIndex--;
  } else if (direction === 'right' && currentIndex < currentList.length - 1) {
    currentIndex++;
  }
  const newSrc = currentList[currentIndex].getAttribute('src');
  const modalImage = modal.querySelector('img');
  modalImage.setAttribute('src', newSrc);
};

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  e.preventDefault();
  let endX = e.touches[0].clientX;
  let diffX = startX - endX;
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      handleSwipe('right');
    } else {
      handleSwipe('left');
    }
  }
};

const handleTouchEnd = () => {
  startX = null;
};

handleImageClick(imageList);
handleImageClick(pictureList);
handleImageClick(slikaList);
