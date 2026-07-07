
$("#products").owlCarousel({
    loop:true,
    margin: 15,
    nav : true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause : true,
    dots : true,
    // loop: true,
    // responsiveClass:true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 3,
        }
    }
})
