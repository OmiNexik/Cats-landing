document.addEventListener('DOMContentLoaded', function() {
    initializeSwiper();
    handleMobileMenu();
    handleScrollEvents();
    initializeContactForm();
    initializeThemeToggle();
    initializeRopeAnimation();
    initializeCatalogFilter();
    initializePawCursorEffect();
    initializeBlogFeatures();
    initializeScrollToTop();
    initializeLazyLoading();
});

function initializeSwiper() {
    const featuredCatsSlider = new Swiper('.featured-cats__slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        },
        autoplay: {
            delay: 5000,
        },
    });

    const testimonialsSlider = new Swiper('.testimonials__slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 6000,
        },
    });
}

function handleMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('burger--active');
            nav.classList.toggle('nav--active');
            document.body.classList.toggle('no-scroll');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('burger--active');
                nav.classList.remove('nav--active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

}

function handleScrollEvents() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const thankYouModal = document.getElementById('thankYouModal');
    const modalClose = document.querySelector('.modal__close');
    const modalBtn = document.querySelector('.modal__btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const interestInput = document.getElementById('interest');
            
            if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
                return;
            }
            
            const formData = {
                name: nameInput.value,
                phone: phoneInput.value,
                interest: interestInput.value
            };
            
            console.log('Form submitted with data:', formData);
            
            contactForm.reset();
            
            if (thankYouModal) {
                thankYouModal.classList.add('modal--active');
            }
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            thankYouModal.classList.remove('modal--active');
        });
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            thankYouModal.classList.remove('modal--active');
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === thankYouModal) {
            thankYouModal.classList.remove('modal--active');
        }
    });
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    initializeRopeAnimation();
}

function initializeRopeAnimation() {
    const rope = document.querySelector('.hero__rope');
    if (!rope) return;
    
    const ropeContainer = document.querySelector('.hero__rope-container');
    if (!ropeContainer) return;
    
    gsap.set(rope, {
        transformOrigin: 'top center',
        cursor: 'none'
    });
    
    let swingAnimation;
    let mouseTrackAnimation;
    let lastMouseX = null;
    let lastMouseY = null;
    let isHovering = false;
    
    function createSwingAnimation() {
        if (swingAnimation) swingAnimation.kill();
        
        swingAnimation = gsap.timeline({
            repeat: -1, 
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        swingAnimation
            .to(rope, { 
                rotation: -3, 
                duration: 2,
                ease: 'sine.inOut'
            })
            .to(rope, { 
                rotation: 3, 
                duration: 2,
                ease: 'sine.inOut'
            });
            
        return swingAnimation;
    }
    
    function handleRopeMouseMove(e) {
        const ropeRect = ropeContainer.getBoundingClientRect();
        const ropeCenterX = ropeRect.left + ropeRect.width / 2;
        const ropeCenterY = ropeRect.top + ropeRect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distX = mouseX - ropeCenterX;
        const distY = mouseY - ropeCenterY;
        const distanceToRope = Math.sqrt(distX * distX + distY * distY);
        
        const interactionRadius = 300;
        
        if (distanceToRope > interactionRadius && !isHovering) {
            return;
        }
        

        if (distanceToRope <= interactionRadius && !isHovering) {
            handleRopeMouseEnter();
        }
        
        if (lastMouseX === null) {
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            return;
        }
        
        const mouseXDiff = mouseX - lastMouseX;
        const mouseYDiff = mouseY - lastMouseY;
        const mouseDist = Math.sqrt(mouseXDiff * mouseXDiff + mouseYDiff * mouseYDiff);
        
        if (mouseDist < 2) return;
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        
        const interactionIntensity = 1 - Math.min(distanceToRope / interactionRadius, 1);
        const pushDirection = distX > 0 ? 1 : -1;
        const pushAmount = Math.min(Math.abs(distX / 15), 35) * pushDirection * interactionIntensity;
        
        if (mouseTrackAnimation) mouseTrackAnimation.kill();
        
        const shakeIntensity = Math.min(mouseDist / 3, 8) * interactionIntensity;
        
        mouseTrackAnimation = gsap.timeline({
            onComplete: () => swingAnimation.paused() && swingAnimation.play()
        });
        
        swingAnimation.pause();
        
        mouseTrackAnimation
            .to(rope, {
                rotation: pushAmount,
                scale: 1 + (0.08 * interactionIntensity),
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(rope, {
                x: () => gsap.utils.random(-shakeIntensity, shakeIntensity),
                y: () => gsap.utils.random(-shakeIntensity, shakeIntensity),
                rotation: () => pushAmount + gsap.utils.random(-shakeIntensity * 1.5, shakeIntensity * 1.5),
                duration: 0.15,
                repeat: 5,
                yoyo: true,
                ease: 'sine.inOut'
            })
            .to(rope, {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
    }
    
    function handleRopeMouseEnter() {
        isHovering = true;
        swingAnimation.pause();
        
        gsap.to(rope, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    function handleRopeMouseLeave() {
        isHovering = false;
        lastMouseX = null;
        lastMouseY = null;
        
        if (mouseTrackAnimation) mouseTrackAnimation.kill();
        
        gsap.to(rope, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
            onComplete: () => {
                swingAnimation.play();
            }
        });
    }
    
    swingAnimation = createSwingAnimation();
    document.addEventListener('mousemove', handleRopeMouseMove);
    ropeContainer.addEventListener('mouseenter', handleRopeMouseEnter);
    ropeContainer.addEventListener('mouseleave', handleRopeMouseLeave);
}

function initializeCatalogFilter() {
    const breedFilter = document.getElementById('breedFilter');
    const genderFilter = document.getElementById('genderFilter');
    const ageFilter = document.getElementById('ageFilter');
    const statusFilter = document.getElementById('statusFilter');
    const sortOrder = document.getElementById('sortOrder'); 
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const resultsCount = document.getElementById('resultsCount');
    const catalogGrid = document.querySelector('.catalog-grid');

    if (!catalogGrid || !breedFilter || !genderFilter || !ageFilter || !statusFilter || !sortOrder || !clearFiltersBtn || !resultsCount) {
        console.warn('Catalog elements not found, skipping filter/sort initialization.');
        return; 
    }

    const allCards = Array.from(catalogGrid.querySelectorAll('.catalog-card'));

    const originalOrder = [...allCards];

    function applyFiltersAndSort() {
        const selectedBreed = breedFilter.value;
        const selectedGender = genderFilter.value;
        const selectedAge = ageFilter.value;
        const selectedStatus = statusFilter.value;
        const currentSortOrder = sortOrder.value;
        let visibleCount = 0;

        const filteredCards = allCards.filter(card => {
            const breedMatch = selectedBreed === 'all' || card.dataset.breed === selectedBreed;
            const genderMatch = selectedGender === 'all' || card.dataset.gender === selectedGender;
            const ageMatch = selectedAge === 'all' || card.dataset.ageGroup === selectedAge;
            const statusMatch = selectedStatus === 'all' || card.dataset.status === selectedStatus;
            const isVisible = breedMatch && genderMatch && ageMatch && statusMatch;
            card.style.display = isVisible ? '' : 'none'; 
            if (isVisible) visibleCount++;
            return isVisible;
        });

        let sortedCards;
        if (currentSortOrder === 'default') {
            sortedCards = filteredCards.sort((a, b) => originalOrder.indexOf(a) - originalOrder.indexOf(b));
        } else {
            sortedCards = [...filteredCards].sort((a, b) => {
                let valA, valB;
                if (currentSortOrder.startsWith('price')) {
                    valA = parseInt(a.dataset.price || '0', 10);
                    valB = parseInt(b.dataset.price || '0', 10);
                } else if (currentSortOrder.startsWith('age')) {
                    valA = parseInt(a.dataset.ageMonths || '0', 10);
                    valB = parseInt(b.dataset.ageMonths || '0', 10);
                }

                if (currentSortOrder.endsWith('-asc')) {
                    return valA - valB;
                } else if (currentSortOrder.endsWith('-desc')) {
                    return valB - valA;
                }
                return 0;
            });
        }

        while (catalogGrid.firstChild) {
            catalogGrid.removeChild(catalogGrid.firstChild);
        }
        
        sortedCards.forEach(card => catalogGrid.appendChild(card));

        resultsCount.textContent = `Найдено: ${visibleCount} котят`;
    }

    breedFilter.addEventListener('change', applyFiltersAndSort);
    genderFilter.addEventListener('change', applyFiltersAndSort);
    ageFilter.addEventListener('change', applyFiltersAndSort);
    statusFilter.addEventListener('change', applyFiltersAndSort);
    sortOrder.addEventListener('change', applyFiltersAndSort); 

    clearFiltersBtn.addEventListener('click', () => {
        breedFilter.value = 'all';
        genderFilter.value = 'all';
        ageFilter.value = 'all';
        statusFilter.value = 'all';
        sortOrder.value = 'default'; 
        applyFiltersAndSort(); 
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initialBreed = urlParams.get('breed');
    if (initialBreed && breedFilter.querySelector(`option[value="${initialBreed}"]`)) {
        breedFilter.value = initialBreed;
    }

    applyFiltersAndSort();
}

function initializePawCursorEffect() {
    const body = document.body;
    const cursorPaw = document.createElement('i');
    cursorPaw.className = 'fas fa-paw cursor-paw'; 
    body.appendChild(cursorPaw);

    let lastTrailTime = 0;
    const trailInterval = 100; 
    const randomPawInterval = 2500; 
    let mouseX = 0, mouseY = 0;
    let cursorVisible = false;
    let randomPawTimer = null; 

    function updateCursorPosition() {
        cursorPaw.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        requestAnimationFrame(updateCursorPosition);
    }

    body.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!cursorVisible) {
            cursorPaw.style.display = 'block';
            body.classList.add('paw-cursor-active');
            cursorVisible = true;
            requestAnimationFrame(updateCursorPosition); 
            startRandomPaws(); 
        }

        const now = Date.now();
        if (now - lastTrailTime > trailInterval) {
            lastTrailTime = now;
            createPawPrint(e.pageX, e.pageY); 
        }
    });
    
    body.addEventListener('mouseleave', () => {
         if(cursorVisible) {
             cursorPaw.style.display = 'none';
             body.classList.remove('paw-cursor-active');
             cursorVisible = false;
             stopRandomPaws(); 
         }
    });
     body.addEventListener('mouseenter', (e) => {
         if (!cursorVisible) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorPaw.style.display = 'block';
            body.classList.add('paw-cursor-active');
            cursorVisible = true;
            requestAnimationFrame(updateCursorPosition);
            startRandomPaws(); 
        }
    });

    function createPawPrint(x, y) {
        const pawPrint = document.createElement('i');
        pawPrint.className = 'fas fa-paw trail-paw'; 
        pawPrint.style.left = `${x - 10}px`; 
        pawPrint.style.top = `${y - 10}px`;
        pawPrint.style.transform = `rotate(${Math.random() * 60 - 30}deg)`; 

        body.appendChild(pawPrint);

        pawPrint.addEventListener('animationend', () => {
            pawPrint.remove();
        });
    }

    function createRandomPaw() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const randomX = Math.random() * viewportWidth;
        const randomY = Math.random() * viewportHeight;
        createPawPrint(randomX, randomY); 
    }

    function startRandomPaws() {
        if (!randomPawTimer) { 
             createRandomPaw(); 
             randomPawTimer = setInterval(createRandomPaw, randomPawInterval);
        }
    }

    function stopRandomPaws() {
        clearInterval(randomPawTimer);
        randomPawTimer = null;
    }
}

function initializeBlogFeatures() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return; 

    const allBlogCards = Array.from(blogGrid.querySelectorAll('.blog-card'));
    const searchInput = document.getElementById('blogSearchInput');
    const categoryLinks = document.querySelectorAll('.category-link');
    const tagLinks = document.querySelectorAll('.tag-link'); 
    const paginationList = document.querySelector('.pagination__list');
    const itemsPerPage = 5; 
    let currentPage = 1;
    let currentCategoryFilter = 'all'; 
    let currentTagFilter = null; 
    let currentSearchQuery = '';

    function getVisiblePosts() {
        return allBlogCards.filter(card => {
            const categoryMatch = currentCategoryFilter === 'all' || card.dataset.category === currentCategoryFilter;
            const searchMatch = currentSearchQuery === '' ||
                                card.textContent.toLowerCase().includes(currentSearchQuery);
            const tagMatch = currentTagFilter === null ||
                             (card.dataset.tags && card.dataset.tags.split(',').includes(currentTagFilter));

            return categoryMatch && searchMatch && tagMatch;
        });
    }

    function displayPage(posts, page) {
        blogGrid.innerHTML = ''; 
        page--; 

        const start = itemsPerPage * page;
        const end = start + itemsPerPage;
        const paginatedPosts = posts.slice(start, end);

        if (paginatedPosts.length === 0 && posts.length > 0) {
             currentPage = 1;
             displayPage(posts, currentPage);
             setupPagination(posts, currentPage);
             return;
        }
        if (paginatedPosts.length === 0 && posts.length === 0) {
            blogGrid.innerHTML = '<p>По вашему запросу ничего не найдено.</p>';
            return;
        }

        paginatedPosts.forEach(card => {
            blogGrid.appendChild(card);
        });
    }

    function setupPagination(posts, currentPage) {
        paginationList.innerHTML = '';
        const pageCount = Math.ceil(posts.length / itemsPerPage);

        if (pageCount <= 1) return; 

        const prevLi = document.createElement('li');
        prevLi.className = 'pagination__item';
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.innerHTML = '<i class="fas fa-arrow-left"></i>';
        prevLink.className = 'pagination__link pagination__link--prev';
        if (currentPage === 1) {
            prevLink.classList.add('pagination__link--disabled');
        } else {
            prevLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    displayPage(posts, currentPage);
                    setupPagination(posts, currentPage);
                }
            });
        }
        prevLi.appendChild(prevLink);
        paginationList.appendChild(prevLi);

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = 'pagination__item';
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = i;
            link.className = 'pagination__link';
            if (i === currentPage) {
                link.classList.add('pagination__link--active');
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayPage(posts, currentPage);
                setupPagination(posts, currentPage);
            });
            li.appendChild(link);
            paginationList.appendChild(li);
        }

        const nextLi = document.createElement('li');
        nextLi.className = 'pagination__item';
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.innerHTML = '<i class="fas fa-arrow-right"></i>';
        nextLink.className = 'pagination__link pagination__link--next';
        if (currentPage === pageCount) {
            nextLink.classList.add('pagination__link--disabled');
        } else {
            nextLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < pageCount) {
                    currentPage++;
                    displayPage(posts, currentPage);
                    setupPagination(posts, currentPage);
                }
            });
        }
        nextLi.appendChild(nextLink);
        paginationList.appendChild(nextLi);
    }

    function updateBlogView() {
        const filteredPosts = getVisiblePosts();
        displayPage(filteredPosts, currentPage);
        setupPagination(filteredPosts, currentPage);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase().trim();
            currentCategoryFilter = 'all'; 
            currentTagFilter = null; 
            currentPage = 1; 
            updateBlogView();
        });

        const searchForm = searchInput.closest('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', e => e.preventDefault());
        }
    }


    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentCategoryFilter = link.dataset.category;
            currentTagFilter = null; 
            currentSearchQuery = ''; 
            if(searchInput) searchInput.value = '';
            currentPage = 1; 

            categoryLinks.forEach(l => l.classList.remove('active-category'));
            link.classList.add('active-category');
            tagLinks.forEach(t => t.classList.remove('active-tag'));
            updateBlogView();
        });
    });

    tagLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentTagFilter = link.dataset.tag;
            currentCategoryFilter = 'all'; 
            currentSearchQuery = ''; 
            if(searchInput) searchInput.value = '';
            currentPage = 1; 

            tagLinks.forEach(t => t.classList.remove('active-tag'));
            link.classList.add('active-tag');
            categoryLinks.forEach(l => l.classList.remove('active-category'));
            if (categoryLinks.length > 0) categoryLinks[0].classList.add('active-category');
            updateBlogView();
        });
    });

    if(categoryLinks.length > 0) {
       categoryLinks[0].classList.add('active-category'); 
    }
    updateBlogView();
}

function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300; 

    if (!scrollToTopBtn) return; 

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazyload');

    if (!lazyImages.length) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (!src) return;

                img.setAttribute('src', src);
                img.classList.remove('lazyload');
                img.classList.add('lazyloaded'); // Optional: add a class for loaded images

                // Stop observing the image once it's loaded
                observer.unobserve(img);
            }
        });
    }, {
        // Optional: Adjust rootMargin to load images slightly before they enter viewport
        rootMargin: '0px 0px 100px 0px' // Load 100px below viewport
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
}
