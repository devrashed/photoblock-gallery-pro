/**
 * Masonry Gallery JavaScript
 * Handles masonry layout functionality, pagination, and responsive behavior
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMasonryGalleries);
    } else {
        initMasonryGalleries();
    }

    function initMasonryGalleries() {
        const masonryGalleries = document.querySelectorAll('.my-gallery__masonry');
        
        masonryGalleries.forEach(gallery => {
            initSingleMasonryGallery(gallery);
        });
    }

    function initSingleMasonryGallery(gallery) {
        const galleryData = {
            columns: parseInt(gallery.dataset.columns) || 3,
            gap: parseInt(gallery.dataset.gap) || 16,
            showCaptions: gallery.dataset.showCaptions === 'true',
            showPagination: gallery.dataset.showPagination === 'true',
            itemsPerPage: parseInt(gallery.dataset.itemsPerPage) || 12,
            totalItems: parseInt(gallery.dataset.totalItems) || 0,
            borderRadius: parseInt(gallery.dataset.borderRadius) || 8,
            borderWidth: parseInt(gallery.dataset.borderWidth) || 0,
            borderColor: gallery.dataset.borderColor || '#e0e0e0',
            borderStyle: gallery.dataset.borderStyle || 'solid',
            currentPage: 1
        };

        // Apply masonry styling
        applyMasonryStyles(gallery, galleryData);
        
        // Setup pagination if enabled
        if (galleryData.showPagination && galleryData.totalItems > galleryData.itemsPerPage) {
            setupMasonryPagination(gallery, galleryData);
        }

        // Handle responsive behavior
        handleMasonryResponsive(gallery, galleryData);

        // Load images and apply masonry layout
        loadMasonryImages(gallery, galleryData);
    }

    function applyMasonryStyles(gallery, data) {
        // Apply CSS custom properties for styling
        gallery.style.setProperty('--masonry-border-radius', `${data.borderRadius}px`);
        gallery.style.setProperty('--masonry-border-width', `${data.borderWidth}px`);
        gallery.style.setProperty('--masonry-border-color', data.borderColor);
        gallery.style.setProperty('--masonry-border-style', data.borderStyle);

        // Apply styles to masonry items
        const items = gallery.querySelectorAll('.my-gallery__masonry-item');
        items.forEach(item => {
            item.classList.add('masonry-style-applied');
            
            // Add custom styling
            const img = item.querySelector('img');
            if (img && data.borderWidth > 0) {
                img.style.border = `${data.borderWidth}px ${data.borderStyle} ${data.borderColor}`;
            }
            
            if (data.borderRadius > 0) {
                item.style.borderRadius = `${data.borderRadius}px`;
                if (img) {
                    img.style.borderRadius = `${data.borderRadius}px`;
                }
                
                const caption = item.querySelector('.my-gallery__masonry-caption');
                if (caption) {
                    caption.style.borderRadius = `0 0 ${data.borderRadius}px ${data.borderRadius}px`;
                }
            }
        });
    }

    function loadMasonryImages(gallery, data) {
        const items = gallery.querySelectorAll('.my-gallery__masonry-item');
        let loadedImages = 0;
        const totalImages = items.length;

        if (totalImages === 0) return;

        items.forEach(item => {
            const img = item.querySelector('img');
            if (!img) {
                loadedImages++;
                checkAllImagesLoaded();
                return;
            }

            // Add loading class
            img.classList.add('loading');

            const imageLoader = new Image();
            imageLoader.onload = function() {
                img.classList.remove('loading');
                img.classList.add('loaded');
                loadedImages++;
                checkAllImagesLoaded();
            };
            
            imageLoader.onerror = function() {
                img.classList.remove('loading');
                img.classList.add('error');
                loadedImages++;
                checkAllImagesLoaded();
            };

            // Start loading
            if (img.src) {
                if (img.complete) {
                    img.classList.add('loaded');
                    loadedImages++;
                    checkAllImagesLoaded();
                } else {
                    imageLoader.src = img.src;
                }
            } else {
                loadedImages++;
                checkAllImagesLoaded();
            }
        });

        function checkAllImagesLoaded() {
            if (loadedImages >= totalImages) {
                // All images loaded, apply masonry layout
                applyMasonryLayout(gallery, data);
                
                // Show pagination if needed
                if (data.showPagination) {
                    showMasonryPage(gallery, data, 1);
                }
            }
        }
    }

    function applyMasonryLayout(gallery, data) {
        // The CSS Grid layout is already handling the masonry-like appearance
        // This function can be extended for additional layout logic if needed
        gallery.classList.add('masonry-loaded');
        
        // Add staggered animation
        const items = gallery.querySelectorAll('.my-gallery__masonry-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    function setupMasonryPagination(gallery, data) {
        const paginationContainer = gallery.parentNode.querySelector('.my-gallery__pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(data.totalItems / data.itemsPerPage);
        
        // Generate pagination buttons
        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="my-gallery__pagination-btn ${i === 1 ? 'active' : ''}" 
                        data-page="${i}" type="button">
                    ${i}
                </button>
            `;
        }
        
        paginationContainer.innerHTML = paginationHTML;
        
        // Add event listeners
        const paginationButtons = paginationContainer.querySelectorAll('.my-gallery__pagination-btn');
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const page = parseInt(this.dataset.page);
                showMasonryPage(gallery, data, page);
                
                // Update active button
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                data.currentPage = page;
            });
        });
    }

    function showMasonryPage(gallery, data, page) {
        const items = gallery.querySelectorAll('.my-gallery__masonry-item');
        const startIndex = (page - 1) * data.itemsPerPage;
        const endIndex = startIndex + data.itemsPerPage;
        
        items.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
        
        // Scroll to gallery top
        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handleMasonryResponsive(gallery, data) {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                updateMasonryResponsive(gallery, data);
            }, 250);
        });
        
        // Initial responsive setup
        updateMasonryResponsive(gallery, data);
    }

    function updateMasonryResponsive(gallery, data) {
        const width = gallery.offsetWidth;
        let newColumns = data.columns;
        
        // Responsive breakpoints
        if (width <= 480) {
            newColumns = 1;
        } else if (width <= 768) {
            newColumns = Math.min(2, data.columns);
        } else if (width <= 900) {
            newColumns = Math.min(3, data.columns);
        } else if (width <= 1200) {
            if (data.columns > 4) {
                newColumns = 4;
            }
        } else if (width <= 1400) {
            if (data.columns > 5) {
                newColumns = 5;
            }
        }
        
        // Update grid columns
        gallery.style.gridTemplateColumns = `repeat(${newColumns}, 1fr)`;
        gallery.setAttribute('data-current-columns', newColumns);
    }

    // Utility function to refresh masonry gallery (useful for dynamic content)
    window.refreshMasonryGallery = function(galleryElement) {
        if (galleryElement && galleryElement.classList.contains('my-gallery__masonry')) {
            initSingleMasonryGallery(galleryElement);
        }
    };

    // Auto-refresh when images are dynamically added
    const observerConfig = { childList: true, subtree: true };
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is a masonry gallery or contains one
                        const masonryGalleries = node.classList && node.classList.contains('my-gallery__masonry') 
                            ? [node] 
                            : node.querySelectorAll ? node.querySelectorAll('.my-gallery__masonry') : [];
                        
                        masonryGalleries.forEach(gallery => {
                            if (!gallery.classList.contains('masonry-initialized')) {
                                gallery.classList.add('masonry-initialized');
                                initSingleMasonryGallery(gallery);
                            }
                        });
                    }
                });
            }
        });
    });

    // Start observing
    observer.observe(document.body, observerConfig);

    // Initialize existing galleries
    document.querySelectorAll('.my-gallery__masonry').forEach(gallery => {
        gallery.classList.add('masonry-initialized');
    });

    // Intersection Observer for lazy loading (optional enhancement)
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        lazyImageObserver.unobserve(img);
                    }
                }
            });
        });

        // Observe lazy images in masonry galleries
        document.querySelectorAll('.my-gallery__masonry img[data-src]').forEach(img => {
            lazyImageObserver.observe(img);
        });
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const activeGallery = document.querySelector('.my-gallery__masonry:focus-within');
        if (!activeGallery) return;

        const pagination = activeGallery.parentNode.querySelector('.my-gallery__pagination');
        if (!pagination) return;

        const activeBtn = pagination.querySelector('.my-gallery__pagination-btn.active');
        const buttons = pagination.querySelectorAll('.my-gallery__pagination-btn');
        
        if (e.key === 'ArrowLeft' && activeBtn && activeBtn.previousElementSibling) {
            e.preventDefault();
            activeBtn.previousElementSibling.click();
            activeBtn.previousElementSibling.focus();
        } else if (e.key === 'ArrowRight' && activeBtn && activeBtn.nextElementSibling) {
            e.preventDefault();
            activeBtn.nextElementSibling.click();
            activeBtn.nextElementSibling.focus();
        } else if (e.key === 'Home' && buttons.length > 0) {
            e.preventDefault();
            buttons[0].click();
            buttons[0].focus();
        } else if (e.key === 'End' && buttons.length > 0) {
            e.preventDefault();
            buttons[buttons.length - 1].click();
            buttons[buttons.length - 1].focus();
        }
    });

    // Touch/swipe support for mobile pagination
    let touchStartX = null;
    let touchEndX = null;

    document.addEventListener('touchstart', function(e) {
        if (e.target.closest('.my-gallery__masonry')) {
            touchStartX = e.changedTouches[0].screenX;
        }
    });

    document.addEventListener('touchend', function(e) {
        if (e.target.closest('.my-gallery__masonry') && touchStartX !== null) {
            touchEndX = e.changedTouches[0].screenX;
            handleMasonrySwipe(e.target.closest('.my-gallery'));
            touchStartX = null;
            touchEndX = null;
        }
    });

    function handleMasonrySwipe(gallery) {
        if (!gallery || touchStartX === null || touchEndX === null) return;
        
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        const pagination = gallery.querySelector('.my-gallery__pagination');
        if (!pagination) return;
        
        const activeBtn = pagination.querySelector('.my-gallery__pagination-btn.active');
        
        if (diff > 0 && activeBtn && activeBtn.nextElementSibling) {
            // Swipe left - next page
            activeBtn.nextElementSibling.click();
        } else if (diff < 0 && activeBtn && activeBtn.previousElementSibling) {
            // Swipe right - previous page
            activeBtn.previousElementSibling.click();
        }
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateMasonryOnScroll() {
        // Update any scroll-dependent masonry features here
        ticking = false;
    }
    
    document.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateMasonryOnScroll);
            ticking = true;
        }
    });

    // Export functions for external use
    window.MasonryGallery = {
        init: initMasonryGalleries,
        refresh: function(gallery) {
            if (gallery && gallery.classList.contains('my-gallery__masonry')) {
                initSingleMasonryGallery(gallery);
            }
        },
        showPage: function(gallery, page) {
            const galleryData = {
                itemsPerPage: parseInt(gallery.dataset.itemsPerPage) || 12
            };
            showMasonryPage(gallery, galleryData, page);
        }
    };

})();