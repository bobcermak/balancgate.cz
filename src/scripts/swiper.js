import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
//CSS
import '/src/styles/swiper.css';

//page__services - swiper
const swiperServices = new Swiper('.page__services-container', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    pagination: {
        clickable: true,
        el: '.page__services-container-swiper-pagination',
    },
    navigation: {
        nextEl: '.page__services-container-swiper-button-next',
        prevEl: '.page__services-container-swiper-button-prev',
    },
    autoplay: {
        delay: 12000,
        disableOnInteraction: true,
    }
});

//page__reviews - swiper