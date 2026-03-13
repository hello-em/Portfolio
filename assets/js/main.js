// Check if jQuery is loaded before using it
if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function($) {
        // Check if AOS library is loaded before initializing
        if (typeof AOS !== 'undefined') {
            AOS.init({
                offset: 100,
                once: true,
                duration: 800,
                throttleDelay: 50,
                disable: window.innerWidth < 768
            });
        } else {
            console.warn('AOS library not loaded');
        }
    });
} else {
    console.warn('jQuery not loaded');
}