let isReady = false;
let imageLoadCount = 0;
let dataCount = 0;
let count = 10;
let loader = document.getElementById("loader");

async function fetchPhotos() {
  try {
    loader.hidden = false;
    let clientId = "z5OgDAa1rOjH46T5ybkduWdkjE9S2KpEwcjMoC0hsp8";
    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${clientId}&count=${count}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    dataCount = data.length;
    renderImage(data);
    loader.hidden = true;
  } catch (ex) {}
}

function renderImage(data = []) {
  imageLoadCount = 0;
  let ele = document.getElementById("image-container");
  data.forEach(({ urls: { regular }, alt_description }) => {
    let divEle = document.createElement("div");
    divEle.className = "image";
    let image = document.createElement("img");
    image.className = "responsive-img";
    image.src = regular;
    image.alt = alt_description;
    image.addEventListener("load", imageLoad);
    let figcaption = document.createElement("figcaption");
    figcaption.textContent = alt_description;
    divEle.appendChild(image);
    divEle.appendChild(figcaption);
    ele.appendChild(divEle);
  });
}
function imageLoad() {
  imageLoadCount++;
  if (dataCount === imageLoadCount) {
    isReady = true;
  }
}
window.onscroll = function (el) {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    isReady
  ) {
    isReady = false;
    //console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);

    fetchPhotos();
  }
};
fetchPhotos();
