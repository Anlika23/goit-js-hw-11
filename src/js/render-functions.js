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

            const img = document.createElement('img');
            img.src = image.webformatURL;
            img.alt = image.tags;

            const metricsRow = document.createElement('div');
            metricsRow.classList.add('metrics');

            const likesContainer = createMetricContainer('Likes', image.likes);
            const viewsContainer = createMetricContainer('Views', image.views);
            const commentsContainer = createMetricContainer('Comments', image.comments);
            const downloadsContainer = createMetricContainer('Downloads', image.downloads);

            metricsRow.appendChild(likesContainer);
            metricsRow.appendChild(viewsContainer);
            metricsRow.appendChild(commentsContainer);
            metricsRow.appendChild(downloadsContainer);

            cardLink.appendChild(img);
            cardLink.appendChild(metricsRow);

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