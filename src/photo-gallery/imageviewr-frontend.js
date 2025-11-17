/**
 * Image Browser Frontend JavaScript
 * Handles all interactive functionality for the Image Browser layout
 */

(function() {
    'use strict';

    // Global variables for image browser instances
    const imageBrowsers = new Map();

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeImageBrowsers();
    });

    /**
     * Initialize all image browser instances on the page
     */
    function initializeImageBrowsers() {
        const browsers = document.querySelectorAll('.my-gallery__imagebrowser');
        browsers.forEach((browser, index) => {
            const browserInstance = new ImageBrowser(browser, index);
            imageBrowsers.set(browser, browserInstance);
        });
    }

    /**
     * Main ImageBrowser Class
     */
    class ImageBrowser {
        constructor(element, id) {
            this.element = element;
            this.id = id;
            this.currentIndex = 0;
            this.images = [];
            this.isFullscreen = false;
            this.zoomLevel = 1;
            this.panX = 0;
            this.panY = 0;
            this.isDragging = false;
            this.dragStart = { x: 0, y: 0 };
            this.autoSlideInterval = null;
            this.touchStart = { x: 0, y: 0 };
            this.touchEnd = { x: 0, y: 0 };

            // Get settings from data attributes
            this.settings = {
                showThumbnails: this.element.dataset.showThumbnails === 'true',
                showNavigation: this.element.dataset.showNavigation === 'true',
                showCounter: this.element.dataset.showCounter === 'true',
                autoFullscreen: this.element.dataset.autoFullscreen === 'true',
                zoomEnabled: this.element.dataset.zoomEnabled === 'true',
                showCaptions: this.element.dataset.showCaptions === 'true',
                totalImages: parseInt(this.element.dataset.totalImages) || 0,
                transitionEffect: this.element.dataset.transitionEffect || 'fade'
            };

            this.init();
        }

        /**
         * Initialize the image browser
         */
        init() {
            this.collectImages();
            this.bindEvents();
            this.updateDisplay();

            // Auto fullscreen if enabled
            if (this.settings.autoFullscreen) {
                setTimeout(() => this.toggleFullscreen(), 500);
            }
        }

        /**
         * Collect all images and their data
         */
        collectImages() {
            const imageElements = this.element.querySelectorAll('.my-gallery__browser-image');
            this.images = Array.from(imageElements).map((img, index) => ({
                element: img,
                index: index,
                id: img.dataset.imageId || index,
                fullImage: img.dataset.fullImage || img.querySelector('img').src,
                alt: img.dataset.alt || '',
                caption: img.dataset.caption || '',
                img: img.querySelector('img')
            }));

            // Set first image as active
            if (this.images.length > 0) {
                this.images[0].element.classList.add('active');
            }
        }

        /**
         * Bind all event listeners
         */
        bindEvents() {
            // Navigation buttons
            const prevBtn = this.element.querySelector('.my-gallery__imagebrowser-prev');
            const nextBtn = this.element.querySelector('.my-gallery__imagebrowser-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.previousImage());
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.nextImage());
            }

            // Zoom controls
            const zoomIn = this.element.querySelector('.my-gallery__imagebrowser-zoom-in');
            const zoomOut = this.element.querySelector('.my-gallery__imagebrowser-zoom-out');
            const zoomReset = this.element.querySelector('.my-gallery__imagebrowser-zoom-reset');

            if (zoomIn) {
                zoomIn.addEventListener('click', () => this.zoomIn());
            }
            if (zoomOut) {
                zoomOut.addEventListener('click', () => this.zoomOut());
            }
            if (zoomReset) {
                zoomReset.addEventListener('click', () => this.resetZoom());
            }

            // Fullscreen control
            const fullscreenBtn = this.element.querySelector('.my-gallery__imagebrowser-fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
            }

            // Thumbnails
            const thumbnails = this.element.querySelectorAll('.my-gallery__imagebrowser-thumb');
            thumbnails.forEach((thumb, index) => {
                thumb.addEventListener('click', () => this.goToImage(index));
            });

            // Image click for zoom
            const viewer = this.element.querySelector('.my-gallery__imagebrowser-viewer');
            if (viewer && this.settings.zoomEnabled) {
                viewer.addEventListener('click', (e) => this.handleImageClick(e));
                viewer.addEventListener('mousedown', (e) => this.startDrag(e));
                viewer.addEventListener('mousemove', (e) => this.drag(e));
                viewer.addEventListener('mouseup', () => this.endDrag());
                viewer.addEventListener('mouseleave', () => this.endDrag());
                viewer.addEventListener('wheel', (e) => this.handleWheel(e));
            }

            // Touch events for mobile
            if (viewer) {
                viewer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
                viewer.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
                viewer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));

            // Fullscreen change events
            document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
            document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
            document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
            document.addEventListener('MSFullscreenChange', () => this.handleFullscreenChange());

            // Prevent context menu on images when zoomed
            this.images.forEach(img => {
                img.img.addEventListener('contextmenu', (e) => {
                    if (this.zoomLevel > 1) {
                        e.preventDefault();
                    }
                });
            });
        }

        /**
         * Navigate to previous image
         */
        previousImage() {
            if (this.images.length <= 1) return;
            
            const newIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
            this.goToImage(newIndex);
        }

        /**
         * Navigate to next image
         */
        nextImage() {
            if (this.images.length <= 1) return;
            
            const newIndex = (this.currentIndex + 1) % this.images.length;
            this.goToImage(newIndex);
        }

        /**
         * Navigate to specific image
         */
        goToImage(index) {
            if (index < 0 || index >= this.images.length || index === this.currentIndex) return;

            // Remove active class from current image
            if (this.images[this.currentIndex]) {
                this.images[this.currentIndex].element.classList.remove('active');
            }

            // Reset zoom when changing images
            this.resetZoom();

            // Set new current index
            this.currentIndex = index;

            // Add active class to new image
            this.images[this.currentIndex].element.classList.add('active');

            // Update display
            this.updateDisplay();

            // Trigger transition effect
            this.applyTransition();
        }

        /**
         * Apply transition effect
         */
        applyTransition() {
            const currentImg = this.images[this.currentIndex];
            if (!currentImg) return;

            // Add transition class temporarily
            currentImg.element.classList.add('transitioning');
            
            setTimeout(() => {
                currentImg.element.classList.remove('transitioning');
            }, 500);
        }

        /**
         * Update counter and thumbnail states
         */
        updateDisplay() {
            // Update counter
            const counter = this.element.querySelector('.my-gallery__imagebrowser-counter .current');
            if (counter) {
                counter.textContent = this.currentIndex + 1;
            }

            // Update thumbnail states
            const thumbnails = this.element.querySelectorAll('.my-gallery__imagebrowser-thumb');
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === this.currentIndex);
            });

            // Update navigation button states
            this.updateNavigationButtons();

            // Scroll active thumbnail into view
            this.scrollThumbnailIntoView();
        }

        /**
         * Update navigation button states
         */
        updateNavigationButtons() {
            const prevBtn = this.element.querySelector('.my-gallery__imagebrowser-prev');
            const nextBtn = this.element.querySelector('.my-gallery__imagebrowser-next');

            if (prevBtn) {
                prevBtn.disabled = this.images.length <= 1;
            }
            if (nextBtn) {
                nextBtn.disabled = this.images.length <= 1;
            }
        }

        /**
         * Scroll active thumbnail into view
         */
        scrollThumbnailIntoView() {
            const thumbnailsContainer = this.element.querySelector('.my-gallery__imagebrowser-thumbnails');
            const activeThumbnail = this.element.querySelector('.my-gallery__imagebrowser-thumb.active');

            if (thumbnailsContainer && activeThumbnail) {
                const containerRect = thumbnailsContainer.getBoundingClientRect();
                const thumbnailRect = activeThumbnail.getBoundingClientRect();

                if (thumbnailRect.left < containerRect.left || thumbnailRect.right > containerRect.right) {
                    activeThumbnail.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }
        }

        /**
         * Zoom in
         */
        zoomIn() {
            if (!this.settings.zoomEnabled) return;
            
            this.zoomLevel = Math.min(this.zoomLevel * 1.5, 5);
            this.applyZoom();
        }

        /**
         * Zoom out
         */
        zoomOut() {
            if (!this.settings.zoomEnabled) return;
            
            this.zoomLevel = Math.max(this.zoomLevel / 1.5, 1);
            if (this.zoomLevel === 1) {
                this.panX = 0;
                this.panY = 0;
            }
            this.applyZoom();
        }

        /**
         * Reset zoom
         */
        resetZoom() {
            this.zoomLevel = 1;
            this.panX = 0;
            this.panY = 0;
            this.applyZoom();
        }

        /**
         * Apply zoom and pan to current image
         */
        applyZoom() {
            const currentImg = this.images[this.currentIndex];
            if (!currentImg) return;

            const img = currentImg.img;
            const transform = `scale(${this.zoomLevel}) translate(${this.panX}px, ${this.panY}px)`;
            
            img.style.transform = transform;
            img.style.transformOrigin = 'center';
            
            // Update cursor
            if (this.zoomLevel > 1) {
                img.classList.add('zoomed');
                img.style.cursor = this.isDragging ? 'grabbing' : 'grab';
            } else {
                img.classList.remove('zoomed');
                img.style.cursor = 'zoom-in';
            }

            // Update zoom button states
            this.updateZoomButtons();
        }

        /**
         * Update zoom button states
         */
        updateZoomButtons() {
            const zoomIn = this.element.querySelector('.my-gallery__imagebrowser-zoom-in');
            const zoomOut = this.element.querySelector('.my-gallery__imagebrowser-zoom-out');
            const zoomReset = this.element.querySelector('.my-gallery__imagebrowser-zoom-reset');

            if (zoomIn) {
                zoomIn.disabled = this.zoomLevel >= 5;
            }
            if (zoomOut) {
                zoomOut.disabled = this.zoomLevel <= 1;
            }
            if (zoomReset) {
                zoomReset.disabled = this.zoomLevel === 1 && this.panX === 0 && this.panY === 0;
            }
        }

        /**
         * Handle image click for zoom
         */
        handleImageClick(e) {
            if (!this.settings.zoomEnabled) return;
            
            e.preventDefault();
            
            if (this.zoomLevel === 1) {
                // Zoom in to click point
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.zoomLevel = 2;
                this.panX = -x * 0.5;
                this.panY = -y * 0.5;
                this.applyZoom();
            }
        }

        /**
         * Start dragging for pan
         */
        startDrag(e) {
            if (!this.settings.zoomEnabled || this.zoomLevel <= 1) return;
            
            this.isDragging = true;
            this.dragStart.x = e.clientX - this.panX;
            this.dragStart.y = e.clientY - this.panY;
            
            e.preventDefault();
            this.applyZoom();
        }

        /**
         * Handle dragging for pan
         */
        drag(e) {
            if (!this.isDragging || !this.settings.zoomEnabled) return;
            
            this.panX = e.clientX - this.dragStart.x;
            this.panY = e.clientY - this.dragStart.y;
            
            // Constrain panning
            const maxPan = 200 * this.zoomLevel;
            this.panX = Math.max(-maxPan, Math.min(maxPan, this.panX));
            this.panY = Math.max(-maxPan, Math.min(maxPan, this.panY));
            
            this.applyZoom();
        }

        /**
         * End dragging
         */
        endDrag() {
            this.isDragging = false;
            this.applyZoom();
        }

        /**
         * Handle mouse wheel for zoom
         */
        handleWheel(e) {
            if (!this.settings.zoomEnabled || !e.ctrlKey) return;
            
            e.preventDefault();
            
            const delta = e.deltaY > 0 ? -1 : 1;
            const zoomFactor = 1.1;
            
            if (delta > 0) {
                this.zoomLevel = Math.min(this.zoomLevel * zoomFactor, 5);
            } else {
                this.zoomLevel = Math.max(this.zoomLevel / zoomFactor, 1);
                if (this.zoomLevel === 1) {
                    this.panX = 0;
                    this.panY = 0;
                }
            }
            
            this.applyZoom();
        }

        /**
         * Toggle fullscreen mode
         */
        async toggleFullscreen() {
            if (!this.isFullscreen) {
                await this.enterFullscreen();
            } else {
                await this.exitFullscreen();
            }
        }

        /**
         * Enter fullscreen mode
         */
        async enterFullscreen() {
            try {
                if (this.element.requestFullscreen) {
                    await this.element.requestFullscreen();
                } else if (this.element.webkitRequestFullscreen) {
                    await this.element.webkitRequestFullscreen();
                } else if (this.element.mozRequestFullScreen) {
                    await this.element.mozRequestFullScreen();
                } else if (this.element.msRequestFullscreen) {
                    await this.element.msRequestFullscreen();
                } else {
                    // Fallback for browsers that don't support fullscreen API
                    this.element.classList.add('fullscreen');
                    this.isFullscreen = true;
                    this.updateFullscreenButton();
                }
            } catch (err) {
                console.warn('Failed to enter fullscreen:', err);
                // Fallback
                this.element.classList.add('fullscreen');
                this.isFullscreen = true;
                this.updateFullscreenButton();
            }
        }

        /**
         * Exit fullscreen mode
         */
        async exitFullscreen() {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                } else {
                    // Fallback
                    this.element.classList.remove('fullscreen');
                    this.isFullscreen = false;
                    this.updateFullscreenButton();
                }
            } catch (err) {
                console.warn('Failed to exit fullscreen:', err);
                // Fallback
                this.element.classList.remove('fullscreen');
                this.isFullscreen = false;
                this.updateFullscreenButton();
            }
        }

        /**
         * Handle fullscreen change events
         */
        handleFullscreenChange() {
            const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || 
                                 document.mozFullScreenElement || document.msFullscreenElement);
            
            this.isFullscreen = isFullscreen || this.element.classList.contains('fullscreen');
            this.element.classList.toggle('fullscreen', this.isFullscreen);
            this.updateFullscreenButton();
        }

        /**
         * Update fullscreen button appearance
         */
        updateFullscreenButton() {
            const fullscreenBtn = this.element.querySelector('.my-gallery__imagebrowser-fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.setAttribute('aria-label', this.isFullscreen ? 'Exit fullscreen' : 'Click On Fullscreen');
                fullscreenBtn.setAttribute('title', this.isFullscreen ? 'Exit Fullscreen' : 'Click On Fullscreen');
            }
        }

        /**
         * Handle touch start
         */
        handleTouchStart(e) {
            if (e.touches.length === 1) {
                this.touchStart.x = e.touches[0].clientX;
                this.touchStart.y = e.touches[0].clientY;
            }
        }

        /**
         * Handle touch move
         */
        handleTouchMove(e) {
            if (!this.settings.zoomEnabled || e.touches.length !== 1) return;
            
            if (this.zoomLevel > 1) {
                // Pan when zoomed
                e.preventDefault();
                const touch = e.touches[0];
                this.panX += (touch.clientX - this.touchStart.x) * 2;
                this.panY += (touch.clientY - this.touchStart.y) * 2;
                
                const maxPan = 200 * this.zoomLevel;
                this.panX = Math.max(-maxPan, Math.min(maxPan, this.panX));
                this.panY = Math.max(-maxPan, Math.min(maxPan, this.panY));
                
                this.applyZoom();
                this.touchStart.x = touch.clientX;
                this.touchStart.y = touch.clientY;
            }
        }

        /**
         * Handle touch end
         */
        handleTouchEnd(e) {
            if (e.changedTouches.length !== 1) return;
            
            this.touchEnd.x = e.changedTouches[0].clientX;
            this.touchEnd.y = e.changedTouches[0].clientY;
            
            // Handle swipe for navigation (only when not zoomed)
            if (this.zoomLevel <= 1) {
                const swipeThreshold = 50;
                const swipeDistance = this.touchEnd.x - this.touchStart.x;
                
                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        this.previousImage();
                    } else {
                        this.nextImage();
                    }
                }
            }
        }

        /**
         * Handle keyboard navigation
         */
        handleKeyDown(e) {
            // Only handle keys if this browser is in focus or fullscreen
            if (!this.isFullscreen && !this.element.contains(document.activeElement)) {
                return;
            }

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousImage();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    this.nextImage();
                    break;
                case 'Escape':
                    if (this.isFullscreen) {
                        e.preventDefault();
                        this.exitFullscreen();
                    }
                    break;
                case 'f':
                case 'F':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleFullscreen();
                    }
                    break;
                case '+':
                case '=':
                    if (this.settings.zoomEnabled) {
                        e.preventDefault();
                        this.zoomIn();
                    }
                    break;
                case '-':
                case '_':
                    if (this.settings.zoomEnabled) {
                        e.preventDefault();
                        this.zoomOut();
                    }
                    break;
                case '0':
                    if (this.settings.zoomEnabled) {
                        e.preventDefault();
                        this.resetZoom();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToImage(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToImage(this.images.length - 1);
                    break;
            }
        }

        /**
         * Start auto slideshow
         */
        startAutoSlideshow(interval = 3000) {
            this.stopAutoSlideshow();
            this.autoSlideInterval = setInterval(() => {
                this.nextImage();
            }, interval);
        }

        /**
         * Stop auto slideshow
         */
        stopAutoSlideshow() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }

        /**
         * Destroy the image browser instance
         */
        destroy() {
            this.stopAutoSlideshow();
            // Remove event listeners would go here if needed
            imageBrowsers.delete(this.element);
        }
    }

    // Expose ImageBrowser class globally if needed
    window.ImageBrowser = ImageBrowser;

    // Auto-reinitialize when new content is loaded (for dynamic content)
    if (window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const newBrowsers = node.querySelectorAll ? 
                            node.querySelectorAll('.my-gallery__imagebrowser:not([data-initialized])') : [];
                        
                        newBrowsers.forEach((browser, index) => {
                            browser.setAttribute('data-initialized', 'true');
                            const browserInstance = new ImageBrowser(browser, imageBrowsers.size + index);
                            imageBrowsers.set(browser, browserInstance);
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

})();