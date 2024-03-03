'use strict';

import { searchImages, handleSubmit } from "./js/pixabay-api";
import { renderImages, showLoadingIndicator, hideLoadingIndicator } from "./js/render-functions";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener("DOMContentLoaded", async function () {
    const searchForm = document.querySelector('.search-form');

    // Додавання обробника події натискання на кнопку відправки форми
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        await handleSubmit(event);
    });

    // Підготовка галереї
    const gallery = new SimpleLightbox('.gallery a', {
        captionDelay: 250
    });

    // Функція для оновлення галереї після додавання нових елементів
    function updateGallery() {
        gallery.refresh();
    }

    // Обробник події натискання на кнопку відправки форми
    async function handleFormSubmit(event) {
        event.preventDefault();

        const searchInput = document.querySelector('.search-form input[type="text"]');
        const query = searchInput.value.trim();

        if (query === '') {
            iziToast.error({
                title: 'Помилка',
                message: 'Будь ласка, введіть текст для пошуку',
                position: 'topCenter',
            });
            return;
        }

        try {
            const imagesData = await searchImages(query);

            if (imagesData.hits.length === 0) {
                iziToast.warning({
                    title: 'Увага',
                    message: 'Вибачте, результатів пошуку не знайдено. Спробуйте інший запит.',
                    position: 'topCenter',
                });
                return;
            }

            // Відображення зображень на сторінці
            renderImages(imagesData);

            updateGallery();
        } catch (error) {
            console.error(error.message);
            iziToast.error({
                title: 'Помилка',
                message: 'Під час виконання запиту сталася помилка. Будь ласка, спробуйте ще раз.',
                position: 'topCenter',
            });
        }
    }
    const defaultQuery = 'your_default_query_here'; 
    const imagesData = await searchImages(defaultQuery);

    renderImages(imagesData);
    updateGallery();
});

