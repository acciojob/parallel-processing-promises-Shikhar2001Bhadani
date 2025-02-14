const outputDiv = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
};

const downloadImages = () => {
  // Clear previous content
  outputDiv.innerHTML = '';
  errorDiv.innerHTML = '';
  loadingDiv.style.display = 'block';

  Promise.all(images.map(image => downloadImage(image.url)))
    .then(downloadedImages => {
      loadingDiv.style.display = 'none';
      downloadedImages.forEach(img => outputDiv.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = 'none';
      errorDiv.innerText = error;
    });
};

// Attach event listener to button
btn.addEventListener("click", downloadImages);
