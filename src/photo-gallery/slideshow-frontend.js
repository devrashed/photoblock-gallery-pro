// Frontend JavaScript for My Gallery Slideshow
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all slideshows on the page
    const slideshows = document.querySelectorAll('.my-gallery__slideshow');
    
    slideshows.forEach(slideshow => {
        new SlideshowGallery(slideshow);
    });
    
    // Initialize lightbox galleries
    const lightboxGalleries = document.querySelectorAll('[data-layout="lightbox"]');
    lightboxGalleries.forEach(gallery => {
        new LightboxGallery(gallery);
    });
    
    // Initialize grid pagination
    const gridGalleries = document.querySelectorAll('.my-gallery__grid');
    gridGalleries.forEach(gallery => {
        if (gallery.dataset.showPagination === 'true') {
            new PaginationGallery(gallery);
        }
    });
});

// Slideshow Gallery Class
class SlideshowGallery {
    constructor(element) {
        this.slideshow = element;
        this.slides = Array.from(element.querySelectorAll('.my-gallery__slide'));
        this.thumbnails = Array.from(element.querySelectorAll('.my-gallery__slideshow-thumb'));
        this.currentSlide = 0;
        this.isPlaying = element.dataset.autoPlay === 'true';
        this.autoPlaySpeed = parseInt(element.dataset.autoPlaySpeed) || 3000;
        this.transitionEffect = element.dataset.transitionEffect || 'slide';
        
        this.counter = element.querySelector('.my-gallery__slideshow-counter .current');
        this.total = element.querySelector('.my-gallery__slideshow-counter .total');
        this.prevBtn = element.querySelector('.my-gallery__slideshow-prev');
        this.nextBtn = element.querySelector('.my-gallery__slideshow-next');
        this.playPauseBtn = element.querySelector('.my-gallery__slideshow-play-pause');
        
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Start autoplay if enabled
        if (this.isPlaying) {
            this.startAutoPlay();
        }
        
        // Update counter
        this.updateCounter();
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Play/pause button
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
        
        // Thumbnail clicks
        this.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        this.slideshow.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
            }
        });
        
        // Make slideshow focusable
        this.slideshow.setAttribute('tabindex', '0');
        
        // Pause on hover
        this.slideshow.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.pauseAutoPlay();
            }
        });
        
        this.slideshow.addEventListener('mouseleave', () => {
            if (this.isPlaying && !this.isPaused) {
                this.startAutoPlay();
            }
        });
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.slides.length || index === this.currentSlide) {
            return;
        }
        
        // Remove active class from current slide and thumbnail
        this.slides[this.currentSlide].classList.remove('active');
        if (this.thumbnails[this.currentSlide]) {
            this.thumbnails[this.currentSlide].classList.remove('active');
        }
        
        // Apply transition effect
        if (this.transitionEffect === 'slide') {
            this.slides[this.currentSlide].classList.add(index > this.currentSlide ? 'prev' : 'next');
        }
        
        this.currentSlide = index;
        
        // Add active class to new slide and thumbnail
        this.slides[this.currentSlide].classList.add('active');
        if (this.thumbnails[this.currentSlide]) {
            this.thumbnails[this.currentSlide].classList.add('active');
        }
        
        // Update counter
        this.updateCounter();
        
        // Scroll thumbnail into view
        this.scrollThumbnailIntoView();
        
        // Clean up transition classes after animation
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('prev', 'next');
            });
        }, 600);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseAutoPlay();
            this.isPlaying = false;
            this.isPaused = true;
        } else {
            this.startAutoPlay();
            this.isPlaying = true;
            this.isPaused = false;
        }
        
        if (this.playPauseBtn) {
            this.playPauseBtn.dataset.playing = this.isPlaying ? 'true' : 'false';
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlaySpeed);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    updateCounter() {
        if (this.counter) {
            this.counter.textContent = this.currentSlide + 1;
        }
        if (this.total) {
            this.total.textContent = this.slides.length;
        }
    }
    
    scrollThumbnailIntoView() {
        if (this.thumbnails[this.currentSlide]) {
            const thumbnailsContainer = this.slideshow.querySelector('.my-gallery__slideshow-thumbnails');
            const activeThumbnail = this.thumbnails[this.currentSlide];
            
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
    }
}

// Lightbox Gallery Class
class LightboxGallery {
    constructor(element) {
        this.gallery = element;
        this.items = Array.from(element.querySelectorAll('.my-gallery__lightbox-item'));
        this.modal = null;
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        this.createModal();
        this.setupEventListeners();
    }
    
    createModal() {
        this.modal = this.gallery.querySelector('.my-gallery__lightbox-modal');
        if (!this.modal) {
            // Create modal if it doesn't exist
            this.modal = document.createElement('div');
            this.modal.className = 'my-gallery__lightbox-modal';
            this.modal.innerHTML = `
                <div class="my-gallery__lightbox-backdrop"></div>
                <div class="my-gallery__lightbox-container">
                    <button class="my-gallery__lightbox-close" aria-label="Close lightbox">×</button>
                    <button class="my-gallery__lightbox-prev" aria-label="Previous image">❮</button>
                    <button class="my-gallery__lightbox-next" aria-label="Next image">❯</button>
                    <div class="my-gallery__lightbox-content">
                        <img class="my-gallery__lightbox-image" src="" alt="" />
                        <div class="my-gallery__lightbox-caption"></div>
                    </div>
                </div>
            `;
            this.gallery.appendChild(this.modal);
        }
        
        this.modalImage = this.modal.querySelector('.my-gallery__lightbox-image');
        this.modalCaption = this.modal.querySelector('.my-gallery__lightbox-caption');
        this.closeBtn = this.modal.querySelector('.my-gallery__lightbox-close');
        this.prevBtn = this.modal.querySelector('.my-gallery__lightbox-prev');
        this.nextBtn = this.modal.querySelector('.my-gallery__lightbox-next');
        this.backdrop = this.modal.querySelector('.my-gallery__lightbox-backdrop');
    }
    
    setupEventListeners() {
        // Item clicks
        this.items.forEach((item, index) => {
            const thumb = item.querySelector('.my-gallery__lightbox-thumb');
            if (thumb) {
                thumb.addEventListener('click', () => this.openLightbox(index));
            }
        });
        
        // Modal controls
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeLightbox());
        }
        
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => this.closeLightbox());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousImage());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightbox();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.closeBtn.focus();
    }
    
    closeLightbox() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    updateLightbox() {
        const item = this.items[this.currentIndex];
        if (!item) return;
        
        const fullImage = item.dataset.fullImage;
        const caption = item.dataset.caption;
        const alt = item.dataset.alt;
        
        if (this.modalImage) {
            this.modalImage.src = fullImage;
            this.modalImage.alt = alt;
        }
        
        if (this.modalCaption) {
            this.modalCaption.innerHTML = caption || '';
        }
        
        // Update navigation button states
        this.updateNavigationButtons();
    }
    
    updateNavigationButtons() {
        if (this.prevBtn) {
            this.prevBtn.classList.toggle('disabled', this.currentIndex === 0);
        }
        
        if (this.nextBtn) {
            this.nextBtn.classList.toggle('disabled', this.currentIndex === this.items.length - 1);
        }
    }
    
    previousImage() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateLightbox();
        }
    }
    
    nextImage() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.updateLightbox();
        }
    }
}

// Pagination Gallery Class
class PaginationGallery {
    constructor(element) {
        this.gallery = element;
        this.items = Array.from(element.querySelectorAll('.wpc-gallery__item, .my-gallery__lightbox-item'));
        this.itemsPerPage = parseInt(element.dataset.itemsPerPage) || 12;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        
        this.init();
    }
    
    init() {
        this.createPagination();
        this.updateDisplay();
    }
    
    createPagination() {
        let paginationContainer = this.gallery.parentNode.querySelector('.my-gallery__pagination');
        
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.className = 'my-gallery__pagination';
            this.gallery.parentNode.appendChild(paginationContainer);
        }
        
        this.paginationContainer = paginationContainer;
        this.renderPagination();
    }
    
    renderPagination() {
        let html = '';
        
        // Previous button
        html += `<button class="my-gallery__pagination-btn" data-page="prev" ${this.currentPage === 1 ? 'disabled' : ''}>‹ Prev</button>`;
        
        // Page numbers
        for (let i = 1; i <= this.totalPages; i++) {
            const isActive = i === this.currentPage ? 'active' : '';
            html += `<button class="my-gallery__pagination-btn ${isActive}" data-page="${i}">${i}</button>`;
        }
        
        // Next button
        html += `<button class="my-gallery__pagination-btn" data-page="next" ${this.currentPage === this.totalPages ? 'disabled' : ''}>Next ›</button>`;
        
        this.paginationContainer.innerHTML = html;
        
        // Add event listeners
        this.paginationContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('my-gallery__pagination-btn')) {
                const page = e.target.dataset.page;
                
                if (page === 'prev' && this.currentPage > 1) {
                    this.currentPage--;
                } else if (page === 'next' && this.currentPage < this.totalPages) {
                    this.currentPage++;
                } else if (!isNaN(page)) {
                    this.currentPage = parseInt(page);
                }
                
                this.updateDisplay();
                this.renderPagination();
            }
        });
    }
    
    updateDisplay() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        
        this.items.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
}