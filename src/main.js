'use strict';

import { searchImages, handleSubmit } from "./js/pixabay-api";
import { renderImages, showLoadingIndicator, hideLoadingIndicator, updateGallery } from "./js/render-functions";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener("DOMContentLoaded", async function () {
    const searchForm = document.querySelector('.search-form');

   
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        await handleSubmit(event);
        updateGallery(); 
    });

    const defaultQuery = 'your_default_query_here'; 
    const imagesData = await searchImages(defaultQuery);

    renderImages(imagesData);
    updateGallery(); 
});

