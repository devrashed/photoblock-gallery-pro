document.addEventListener('DOMContentLoaded', function() {
  // Initialize all galleries on the page
  const galleries = document.querySelectorAll('.wpct-gallery');
  
  galleries.forEach(gallery => {
    initializeGallery(gallery);
  });
});

function initializeGallery(gallery) {
  const grid = gallery.querySelector('.wpct_gallery__grid');
  const pagination = gallery.querySelector('.wpct_gallery__pagination');
  
  if (!grid || !pagination) return;
  
  const showPagination = grid.dataset.showPagination === 'true';
  const itemsPerPage = parseInt(grid.dataset.itemsPerPage) || 12;
  const totalItems = parseInt(grid.dataset.totalItems) || 0;
  
  if (!showPagination || totalItems <= itemsPerPage) {
    pagination.style.display = 'none';
    return;
  }
  
  const items = Array.from(grid.querySelectorAll('.wpct_gallery__item'));
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let currentPage = 1;
  
  // Get pagination elements
  const prevBtn = pagination.querySelector('.wpct_gallery__pagination-prev');
  const nextBtn = pagination.querySelector('.wpct_gallery__pagination-next');
  const currentPageSpan = pagination.querySelector('.current-page');
  const totalPagesSpan = pagination.querySelector('.total-pages');
  
  // Update pagination display
  function updatePagination() {
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Show/hide items based on current page
    items.forEach((item, index) => {
      const itemPage = Math.floor(index / itemsPerPage) + 1;
      if (itemPage === currentPage) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Scroll to gallery top
    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Event listeners
  prevBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });
  
  // Initialize first page
  updatePagination();
}

// Handle dynamic content (if galleries are added via AJAX)
function reinitializeGalleries() {
  const galleries = document.querySelectorAll('.wpct-gallery');
  galleries.forEach(gallery => {
    // Check if already initialized
    if (!gallery.dataset.initialized) {
      initializeGallery(gallery);
      gallery.dataset.initialized = 'true';
    }
  });
}

// Export for potential use in other scripts
window.wpctGallery = {
  reinitialize: reinitializeGalleries
};