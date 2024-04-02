const images = document.querySelectorAll('.image');
let imgSrc;
images.forEach((img) => {
  img.addEventListener('click', (e) => {
    imgSrc = e.target.src;
    imgModal(imgSrc);
  });
});
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
  };
  modal.append(newImage, closeBtn);
};
