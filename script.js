import galleryItems from './gallery-items.js';

const galleryRef= document.querySelector('.js-gallery');
const lightBox = document.querySelector('.js-lightbox');
const closeLightBtn = document.querySelector('button[data-action="close-lightbox"]')
const closeLightOverlay=document.querySelector('.lightbox__overlay');
const lightBoxImages =document.querySelector('.lightbox__image');


const createGalleryList = (galleryItem,index )=> {

    const galleryList = document.createElement('li');
    galleryList.classList.add('gallery__item');

    const imgLink = document.createElement('a');
    imgLink.classList.add('gallery__link');
    imgLink.setAttribute('href', galleryItem.original);

    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.setAttribute('src', galleryItem.preview);
    imgRef.setAttribute('data-source', galleryItem.original);
    imgRef.setAttribute('data-index',index);
    imgRef.setAttribute('alt', galleryItem.description);

    imgLink.appendChild(imgRef);
    galleryList.append(imgLink);

    return galleryList;
}



const createGalleryItems = galleryItems.map((item,index) => createGalleryList(item,index));

galleryRef.append(...createGalleryItems);


galleryRef.addEventListener('click', openImgGallery);
closeLightBtn.addEventListener('click',closeImgGallery);
closeLightOverlay.addEventListener('click',closeImgGallery);
let indexImgGallery = 0;
let srcImgGallery = '';
function openImgGallery (event)  {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }
    console.dir(lightBoxImages)
    lightBox.classList.add('is-open');

    lightBoxImages.src=event.target.dataset.source;
    indexImgGallery = Number(event.target.dataset.index);
    lightBoxImages.setAttribute('src',lightBoxImages.src);
    lightBoxImages.setAttribute('alt',event.target.alt);
    lightBoxImages.setAttribute('data-index', indexImgGallery );
    window.addEventListener('keydown',closeEscImgGallery);
    window.addEventListener('keydown',scrollingImgGallery);



}

function closeImgGallery() {
    lightBox.classList.remove('is-open');
    lightBoxImages.removeAttribute('src');

    window.removeEventListener('keydown',closeEscImgGallery);
    window.removeEventListener('keydown',scrollingImgGallery);
}

function closeEscImgGallery(event) {
    if(event.code === 'Escape') {
        lightBox.classList.remove('is-open');
    }
}

function scrollingImgGallery(event) {
    if (event.code === 'ArrowRight' && galleryItems.length - 1  > indexImgGallery) {
        indexImgGallery+=1;
        lightBoxImages.src=galleryItems[indexImgGallery].original;
    }
    if (event.code === 'ArrowLeft' && indexImgGallery > 0) {
        indexImgGallery-=1;
        lightBoxImages.src=galleryItems[indexImgGallery].original;
    }

}