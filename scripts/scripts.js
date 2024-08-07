'use strict';

// Advantages

document.addEventListener('DOMContentLoaded', function () {
    const pageContainer = document.querySelector('.page');
    const advantagesContainer = pageContainer.querySelector('.advantages');
    const items = advantagesContainer.querySelectorAll('.advantages__item');
    const prevButton = advantagesContainer.querySelector('.advantages__arrow_left');
    const nextButton = advantagesContainer.querySelector('.advantages__arrow_right');
    const dots = advantagesContainer.querySelectorAll('.advantages__dot');

    let currentIndex = 0;
    let itemsPerPage = 1;
    let totalPages;

    function updateNavigation() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalPages - 1;
    }

    function showItems() {
        const width = window.innerWidth;

        if (width >= 700 && width <= 1019) {
            itemsPerPage = 2;
        } else if (width < 700) {
            itemsPerPage = 1;
        } else {
            itemsPerPage = items.length;
        }

        totalPages = Math.ceil(items.length / itemsPerPage);

        if ((width >= 700 && width <= 1019) || width < 700) {
            items.forEach((item, index) => {
                item.style.display = index >= currentIndex * itemsPerPage && index < (currentIndex + 1) * itemsPerPage ? 'block' : 'none';
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('advantages__dot_active', index === currentIndex);
            });

            updateNavigation();
        } else {
            items.forEach(item => {
                item.style.display = 'block';
            });

            dots.forEach(dot => {
                dot.classList.remove('advantages__dot_active');
            });

            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    }

    function handleSwipeAdvantages(event) {
        if (event.type === 'swipeleft') {
            if (window.innerWidth < 1020 && currentIndex < totalPages - 1) {
                currentIndex++;
                showItems();
            }
        } else if (event.type === 'swiperight') {
            if (window.innerWidth < 1020 && currentIndex > 0) {
                currentIndex--;
                showItems();
            }
        }
    }

    showItems();

    prevButton.addEventListener('click', function () {
        if (window.innerWidth < 1020) {
            if (currentIndex > 0) {
                currentIndex--;
                showItems();
            }
        }
    });

    nextButton.addEventListener('click', function () {
        if (window.innerWidth < 1020) {
            if (currentIndex < totalPages - 1) {
                currentIndex++;
                showItems();
            }
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            if (window.innerWidth < 1020) {
                currentIndex = index;
                showItems();
            }
        });
    });

    window.addEventListener('resize', showItems);

    const hammerAdvantages = new Hammer(advantagesContainer);
    hammerAdvantages.on('swipeleft swiperight', handleSwipeAdvantages);
});

// Farm

document.addEventListener('DOMContentLoaded', function () {
    const pageContainer = document.querySelector('.page');
    const farmContainer = pageContainer.querySelector('.farm');
    const imgWrappers = farmContainer.querySelectorAll('.farm__img-wrapper');
    const blocks = farmContainer.querySelectorAll('.farm__block');
    const prevButton = farmContainer.querySelector('.farm__arrow_left');
    const nextButton = farmContainer.querySelector('.farm__arrow_right');
    const dots = farmContainer.querySelectorAll('.farm__dot');

    let currentIndex = 0;

    function updateNavigation() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled =
            (window.innerWidth <= 699 && currentIndex === imgWrappers.length - 1) ||
            (window.innerWidth >= 700 && window.innerWidth <= 1019 && currentIndex === blocks.length - 1);
    }

    function showBlocks() {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 700 && screenWidth <= 1019) {
            blocks.forEach((block, index) => {
                block.style.display = index === currentIndex ? 'flex' : 'none';
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('farm__dot_active', index === currentIndex);
            });

            updateNavigation();
        } else if (screenWidth <= 699) {
            imgWrappers.forEach((wrapper, index) => {
                wrapper.style.display = index === currentIndex ? 'block' : 'none';
            });

            const activeBlockIndex = Math.floor(currentIndex / 2);
            blocks.forEach((block, index) => {
                block.style.display = index === activeBlockIndex ? 'flex' : 'none';
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('farm__dot_active', index === currentIndex);
            });

            updateNavigation();
        } else {
            imgWrappers.forEach(wrapper => {
                wrapper.style.display = 'block';
            });

            dots.forEach(dot => {
                dot.classList.remove('farm__dot_active');
            });

            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    }

    function handleSwipeFarm(event) {
        if (event.type === 'swipeleft') {
            if (window.innerWidth <= 1019) {
                nextButton.click();
            }
        } else if (event.type === 'swiperight') {
            if (window.innerWidth <= 1019) {
                prevButton.click();
            }
        }
    }

    showBlocks();

    prevButton.addEventListener('click', function () {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 699) {
            if (currentIndex > 0) {
                currentIndex--;
                showBlocks();
            }
        } else if (screenWidth >= 700 && screenWidth <= 1019) {
            if (currentIndex > 0) {
                currentIndex--;
                showBlocks();
            }
        }
    });

    nextButton.addEventListener('click', function () {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 699) {
            if (currentIndex < imgWrappers.length - 1) {
                currentIndex++;
                showBlocks();
            }
        } else if (screenWidth >= 700 && window.innerWidth <= 1019) {
            if (currentIndex < blocks.length - 1) {
                currentIndex++;
                showBlocks();
            }
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            const screenWidth = window.innerWidth;
            currentIndex = index;
            showBlocks();
        });
    });

    window.addEventListener('resize', showBlocks);

    const hammerFarm = new Hammer(farmContainer);
    hammerFarm.on('swipeleft swiperight', handleSwipeFarm);
});

// Popup

const overlay = document.getElementById('overlay');

document.querySelectorAll('.advantages__item_icon').forEach(icon => {
    icon.addEventListener('click', event => {
        event.stopPropagation();
        const item = icon.closest('.advantages__item');

        if (item) {
            const popup = item.querySelector('.advantages__popup');

            if (popup) {
                popup.style.display = 'flex';
                overlay.style.display = 'block';

                const handleClickOutside = event => {
                    if (!popup.contains(event.target)) {
                        popup.style.display = 'none';
                        overlay.style.display = 'none';
                        document.removeEventListener('click', handleClickOutside);
                    }
                };

                document.addEventListener('click', handleClickOutside);
            }
        }
    });
});

document.querySelectorAll('.advantages__popup_close').forEach(close => {
    close.addEventListener('click', event => {
        event.stopPropagation();
        const popup = close.closest('.advantages__popup');
        if (popup) {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});

overlay.addEventListener('click', () => {
    document.querySelectorAll('.advantages__popup').forEach(popup => {
        popup.style.display = 'none';
    });
    overlay.style.display = 'none';
});
