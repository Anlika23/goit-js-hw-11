'use strict';

import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';

export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; 

    // Перевіряємо, чи images є об'єктом з властивістю hits
    if (images && images.hits && Array.isArray(images.hits)) {
        const slicedImages = images.hits.slice(0, 9);
        
        slicedImages.forEach(image => {
            const cardLink = document.createElement('a');
            cardLink.href = image.largeImageURL;
            cardLink.rel = "noopener noreferrer";
            cardLink.classList.add('card');

            cardLink.innerHTML = `
                <img src="${image.webformatURL}" alt="${image.tags}">
                <div class="metrics">
                    ${createMetricContainer('Likes', image.likes).outerHTML}
                    ${createMetricContainer('Views', image.views).outerHTML}
                    ${createMetricContainer('Comments', image.comments).outerHTML}
                    ${createMetricContainer('Downloads', image.downloads).outerHTML}
                </div>
            `;

            gallery.appendChild(cardLink);
        });
     
    } else {
        console.error('Invalid images data:', images);
    }
}

// Функція для створення контейнера з текстом та числовим значенням
function createMetricContainer(label, value) {
    const container = document.createElement('div');
    container.classList.add('metric-container');

    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;
    labelSpan.classList.add('metric-label');
    labelSpan.style.fontWeight = 'bold'; 
    container.appendChild(labelSpan);

    const valueSpan = document.createElement('span');
    valueSpan.textContent = value;
    valueSpan.classList.add('metric-value');
    container.appendChild(valueSpan);

    return container;
}

// Функція для показу індикатора завантаження
export function showLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.textContent = 'Loading images, please wait...';
    loadingIndicator.style.display = 'block';
}

export function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'none';
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}

// Функція для оновлення галереї
export function updateGallery() {
    const gallery = new SimpleLightbox('.gallery a', {
        captionDelay: 250
    });
    gallery.refresh();
}