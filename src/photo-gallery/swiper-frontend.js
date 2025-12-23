/* const swiper = new Swiper('.swiper', {
    centeredSlides: true,
    loop: true,
    speed: 500,
    slidesPerView: 1.5,
    spaceBetween: 40,
    autoplay: {
    delay: 300000,
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    breakpoints: {
    640: { slidesPerView: 2.5 },
    768: { slidesPerView: 2.75 },
    1080: { slidesPerView: 3.25 },
    1280: { slidesPerView: 3.75 },
    },
}); */


document.querySelectorAll('.spg-swiper').forEach(function (el) {

   swiperautoplay = el.getAttribute('data-autoplay');
   const autoplayEnabled = swiperautoplay === 'true' || swiperautoplay === true;
   console.log('Autoplay enabled:', swiperautoplay);

   const autoplayDelay = parseInt(el.dataset.swiperdelay, 10) || 500;
    console.log('Autoplay delay:', autoplayDelay);


    const swiper = new Swiper(el, {
        centeredSlides: true,
        loop: true,
        speed: 500,
        slidesPerView: 1.5,
        spaceBetween: 40,

        autoplay: autoplayEnabled
            ? { delay: autoplayDelay }   // your default
            : false,

        navigation: {
            nextEl: el.querySelector('.swiper-button-next'),
            prevEl: el.querySelector('.swiper-button-prev'),
        },

        breakpoints: {
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 2.75 },
            1080: { slidesPerView: 3.25 },
            1280: { slidesPerView: 3.75 },
        },
    });

});