/**
 * Frontend Lightbox JavaScript for WordPress Gallery Block
 * File: frontend-lightbox.js
 * Version: 1.0.0
 * 
 * This script handles:
 * - Lightbox modal functionality
 * - Image navigation (left/right arrows)
 * - Keyboard controls (arrow keys, escape)
 * - Pagination integration
 * - Caption display
 * - Responsive behavior
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGalleryPlugin);
    } else {
        initializeGalleryPlugin();
    }

    /**
     * Main initialization function
     */
    function initializeGalleryPlugin() {
        // Initialize all gallery lightboxes on the page
        initializeGalleryLightboxes();
        
        // Initialize pagination for all galleries
        initializeGalleryPagination();
    }

    /**
     * Initialize all lightbox galleries on the page
     */
    function initializeGalleryLightboxes() {
        const lightboxGalleries = document.querySelectorAll('.my-gallery__lightbox-grid');
        
        lightboxGalleries.forEach(gallery => {
            setupLightboxGallery(gallery);
        });
    }

    /**
     * Setup lightbox functionality for a single gallery
     * @param {Element} gallery - The lightbox gallery container
     */
    function setupLightboxGallery(gallery) {
        const galleryContainer = gallery.closest('.my-gallery');
        const modal = galleryContainer.querySelector('.my-gallery__lightbox-modal');
        
        // Check if modal exists
        if (!modal) {
            console.warn('Lightbox modal not found for gallery');
            return;
        }
        
        const modalImage = modal.querySelector('.my-gallery__lightbox-image');
        const modalCaption = modal.querySelector('.my-gallery__lightbox-caption');
        const closeBtn = modal.querySelector('.my-gallery__lightbox-close');
        const prevBtn = modal.querySelector('.my-gallery__lightbox-prev');
        const nextBtn = modal.querySelector('.my-gallery__lightbox-next');
        const backdrop = modal.querySelector('.my-gallery__lightbox-backdrop');
        
        let currentImageIndex = 0;
        let visibleImages = []; // Will store currently visible images based on pagination
        let keyboardHandler = null; // Store keyboard handler for cleanup
        
        /**
         * Update visible images based on pagination and current visibility
         */
        function updateVisibleImages() {
            const allItems = Array.from(gallery.querySelectorAll('.my-gallery__lightbox-item:not(.hidden)'));
            visibleImages = allItems.map((item, index) => ({
                element: item,
                fullImage: item.dataset.fullImage || item.querySelector('img').src,
                caption: item.dataset.caption || '',
                alt: item.dataset.alt || '',
                originalIndex: index
            }));
        }
        
        // Initial update of visible images
        updateVisibleImages();
        
        /**
         * Open lightbox modal with specified image
         * @param {number} imageIndex - Index of the image to display
         */
        function openLightbox(imageIndex) {
            if (imageIndex < 0 || imageIndex >= visibleImages.length) return;
            
            currentImageIndex = imageIndex;
            const imageData = visibleImages[currentImageIndex];
            
            // Set image source and alt text
            modalImage.src = imageData.fullImage;
            modalImage.alt = imageData.alt;
            
            // Handle image loading
            modalImage.onload = function() {
                // Image loaded successfully
                this.style.opacity = '1';
            };
            
            modalImage.onerror = function() {
                // Fallback if image fails to load
                console.warn('Failed to load lightbox image:', imageData.fullImage);
                this.alt = 'Image failed to load';
            };
            
            // Set caption (show/hide based on gallery settings)
            const showCaptions = gallery.dataset.showCaptions === 'true';
            if (showCaptions && imageData.caption) {
                modalCaption.innerHTML = imageData.caption;
                modalCaption.style.display = 'block';
            } else {
                modalCaption.style.display = 'none';
            }
            
            // Show modal
            modal.style.display = 'flex';
            document.body.classList.add('lightbox-open');
            
            // Add active class after a short delay for smooth animation
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
            
            // Update navigation buttons
            updateNavigationButtons();
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Setup keyboard navigation
            setupKeyboardNavigation();
            
            // Focus management for accessibility
            closeBtn.focus();
        }
        
        /**
         * Close lightbox modal
         */
        function closeLightbox() {
            modal.classList.remove('active');
            document.body.classList.remove('lightbox-open');
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Remove keyboard navigation
            removeKeyboardNavigation();
            
            // Return focus to the thumbnail that opened the lightbox
            if (visibleImages[currentImageIndex]) {
                const thumbnailImg = visibleImages[currentImageIndex].element.querySelector('img');
                if (thumbnailImg) {
                    thumbnailImg.focus();
                }
            }
        }
        
        /**
         * Navigate to next image in lightbox
         */
        function nextImage() {
            if (currentImageIndex < visibleImages.length - 1) {
                openLightbox(currentImageIndex + 1);
            }
        }
        
        /**
         * Navigate to previous image in lightbox
         */
        function prevImage() {
            if (currentImageIndex > 0) {
                openLightbox(currentImageIndex - 1);
            }
        }
        
        /**
         * Update navigation button states
         */
        function updateNavigationButtons() {
            // Hide navigation if only one image
            if (visibleImages.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                return;
            }
            
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            
            // Update previous button
            if (currentImageIndex <= 0) {
                prevBtn.classList.add('disabled');
                prevBtn.disabled = true;
            } else {
                prevBtn.classList.remove('disabled');
                prevBtn.disabled = false;
            }
            
            // Update next button
            if (currentImageIndex >= visibleImages.length - 1) {
                nextBtn.classList.add('disabled');
                nextBtn.disabled = true;
            } else {
                nextBtn.classList.remove('disabled');
                nextBtn.disabled = false;
            }
        }
        
        /**
         * Setup keyboard navigation
         */
        function setupKeyboardNavigation() {
            keyboardHandler = function(e) {
                // Only handle keyboard events when this lightbox is active
                if (!modal.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        e.preventDefault();
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (!prevBtn.disabled) {
                            prevImage();
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (!nextBtn.disabled) {
                            nextImage();
                        }
                        break;
                    case ' ': // Spacebar
                        e.preventDefault();
                        if (!nextBtn.disabled) {
                            nextImage();
                        }
                        break;
                }
            };
            
            document.addEventListener('keydown', keyboardHandler);
        }
        
        /**
         * Remove keyboard navigation
         */
        function removeKeyboardNavigation() {
            if (keyboardHandler) {
                document.removeEventListener('keydown', keyboardHandler);
                keyboardHandler = null;
            }
        }
        
        // Event Listeners for Lightbox Controls
        
        /**
         * Thumbnail click handlers - Open lightbox
         */
        gallery.addEventListener('click', function(e) {
            const lightboxThumb = e.target.closest('.my-gallery__lightbox-thumb');
            if (!lightboxThumb) return;
            
            e.preventDefault();
            
            // Update visible images before opening (in case pagination changed)
            updateVisibleImages();
            
            const lightboxItem = lightboxThumb.closest('.my-gallery__lightbox-item');
            const imageIndex = visibleImages.findIndex(img => img.element === lightboxItem);
            
            if (imageIndex !== -1) {
                openLightbox(imageIndex);
            }
        });
        
        /**
         * Close button click handler
         */
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closeLightbox();
            });
        }
        
        /**
         * Backdrop click to close
         */
        if (backdrop) {
            backdrop.addEventListener('click', function(e) {
                if (e.target === backdrop) {
                    closeLightbox();
                }
            });
        }
        
        /**
         * Previous button click handler
         */
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (!prevBtn.disabled) {
                    prevImage();
                }
            });
        }
        
        /**
         * Next button click handler
         */
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (!nextBtn.disabled) {
                    nextImage();
                }
            });
        }
        
        /**
         * Update visible images when pagination changes
         * This observer will detect when pagination hides/shows items
         */
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
                    shouldUpdate = true;
                }
            });
            
            if (shouldUpdate) {
                updateVisibleImages();
            }
        });
        
        // Observe all lightbox items for visibility changes
        const lightboxItems = gallery.querySelectorAll('.my-gallery__lightbox-item');
        lightboxItems.forEach(item => {
            observer.observe(item, { 
                attributes: true, 
                attributeFilter: ['class', 'style'] 
            });
        });
    }

    /**
     * Initialize pagination functionality for all galleries
     */
    function initializeGalleryPagination() {
        const galleries = document.querySelectorAll('.my-gallery');
        
        galleries.forEach(gallery => {
            const paginationContainer = gallery.querySelector('.my-gallery__pagination');
            if (!paginationContainer) return;
            
            const gridContainer = gallery.querySelector('.my-gallery__grid, .my-gallery__lightbox-grid');
            if (!gridContainer) return;
            
            const totalItems = parseInt(gridContainer.dataset.totalItems) || 0;
            const itemsPerPage = parseInt(gridContainer.dataset.itemsPerPage) || 12;
            const showPagination = gridContainer.dataset.showPagination === 'true';
            
            if (!showPagination || totalItems <= itemsPerPage) {
                paginationContainer.style.display = 'none';
                return;
            }
            
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            let currentPage = 1;
            
            /**
             * Create pagination buttons
             */
            function createPaginationButtons() {
                paginationContainer.innerHTML = '';
                
                for (let i = 1; i <= totalPages; i++) {
                    const button = document.createElement('button');
                    button.className = 'my-gallery__pagination-btn';
                    button.textContent = i;
                    button.setAttribute('data-page', i);
                    button.setAttribute('aria-label', `Go to page ${i}`);
                    
                    if (i === currentPage) {
                        button.classList.add('active');
                        button.setAttribute('aria-current', 'page');
                    }
                    
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        goToPage(i);
                    });
                    
                    paginationContainer.appendChild(button);
                }
            }
            
            /**
             * Navigate to specific page
             * @param {number} page - Page number to navigate to
             */
            function goToPage(page) {
                if (page < 1 || page > totalPages || page === currentPage) return;
                
                currentPage = page;
                
                // Calculate which items to show
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                
                // Hide all items first
                const allItems = gridContainer.querySelectorAll('.my-gallery__item, .my-gallery__lightbox-item');
                allItems.forEach((item, index) => {
                    if (index >= startIndex && index < endIndex) {
                        item.classList.remove('hidden');
                        item.style.display = '';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });
                
                // Update active pagination button
                const paginationButtons = paginationContainer.querySelectorAll('.my-gallery__pagination-btn');
                paginationButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.removeAttribute('aria-current');
                    
                    if (parseInt(btn.dataset.page) === currentPage) {
                        btn.classList.add('active');
                        btn.setAttribute('aria-current', 'page');
                    }
                });
                
                // Scroll to gallery top smoothly
                const galleryTop = gallery.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: galleryTop,
                    behavior: 'smooth'
                });
            }
            
            // Initialize pagination
            createPaginationButtons();
            goToPage(1); // Show first page by default
        });
    }

    /**
     * Handle window resize - Update lightbox positioning if needed
     */
    window.addEventListener('resize', debounce(function() {
        const activeModals = document.querySelectorAll('.my-gallery__lightbox-modal.active');
        activeModals.forEach(modal => {
            // Force a reflow to ensure proper positioning
            const container = modal.querySelector('.my-gallery__lightbox-container');
            if (container) {
                container.style.maxWidth = '90%';
                container.style.maxHeight = '90%';
            }
        });
    }, 250));

    /**
     * Debounce function to limit how often a function can be called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Handle page unload - Clean up event listeners
     */
    window.addEventListener('beforeunload', function() {
        // Remove any active keyboard listeners
        document.body.classList.remove('lightbox-open');
        document.body.style.overflow = '';
    });

})();