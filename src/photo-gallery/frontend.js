document.addEventListener('DOMContentLoaded', function() {
  // Initialize all galleries on the page
  const galleries = document.querySelectorAll('.my-gallery');
  
  galleries.forEach(gallery => {
    initializeGallery(gallery);
  });

  function initializeGallery(gallery) {
    const grid = gallery.querySelector('.wpc-gallery__grid');
    const paginationContainer = gallery.querySelector('.my-gallery__pagination');
    
    if (!grid) return;
    
    // Force grid layout with inline styles
    const columns = parseInt(grid.dataset.columns) || 3;
    const gap = parseInt(grid.dataset.gap) || 16;
    
    // Apply grid styles directly
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gap = `${gap}px`;
    
    // Handle pagination if enabled
    const showPagination = grid.dataset.showPagination === 'true';
    const itemsPerPage = parseInt(grid.dataset.itemsPerPage) || 12;
    
    if (showPagination && paginationContainer) {
      const items = Array.from(grid.querySelectorAll('.wpc-gallery__item'));
      
      // Only initialize pagination if there are items to paginate
      if (items.length > 0) {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        let currentPage = 1;
        
        // Only show pagination if there are multiple pages
        if (totalPages > 1) {
          // Create pagination buttons
          createPaginationButtons(paginationContainer, totalPages);
          
          // Show initial page
          showPage(currentPage);
          
          // Handle pagination clicks
          paginationContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('my-gallery__pagination-btn')) {
              const page = parseInt(e.target.dataset.page);
              if (page && page !== currentPage && page >= 1 && page <= totalPages) {
                currentPage = page;
                showPage(currentPage);
                updateActiveButton(page);
                
                // Scroll to gallery top
                gallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
            }
          });
        } else {
          // Hide pagination if only one page
          paginationContainer.style.display = 'none';
        }
        
        function createPaginationButtons(container, totalPages) {
          container.innerHTML = '';
          container.style.display = 'block';
          
          // Previous button
          const prevBtn = document.createElement('button');
          prevBtn.className = 'my-gallery__pagination-btn my-gallery__pagination-prev';
          prevBtn.dataset.page = 'prev';
          prevBtn.textContent = '‹ Previous';
          prevBtn.disabled = true;
          container.appendChild(prevBtn);
          
          // Page number buttons
          for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.className = 'my-gallery__pagination-btn';
            button.dataset.page = i;
            button.textContent = i;
            
            if (i === 1) {
              button.classList.add('active');
            }
            
            container.appendChild(button);
          }
          
          // Next button
          const nextBtn = document.createElement('button');
          nextBtn.className = 'my-gallery__pagination-btn my-gallery__pagination-next';
          nextBtn.dataset.page = 'next';
          nextBtn.textContent = 'Next ›';
          nextBtn.disabled = totalPages === 1;
          container.appendChild(nextBtn);
        }
        
        function showPage(page) {
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          
          items.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
              item.classList.remove('hidden');
              item.style.display = '';
            } else {
              item.classList.add('hidden');
              item.style.display = 'none';
            }
          });
          
          // Update prev/next buttons
          const prevBtn = paginationContainer.querySelector('.my-gallery__pagination-prev');
          const nextBtn = paginationContainer.querySelector('.my-gallery__pagination-next');
          const totalPages = Math.ceil(items.length / itemsPerPage);
          
          if (prevBtn) {
            prevBtn.disabled = page === 1;
          }
          if (nextBtn) {
            nextBtn.disabled = page === totalPages;
          }
        }
        
        function updateActiveButton(page) {
          const buttons = paginationContainer.querySelectorAll('.my-gallery__pagination-btn:not(.my-gallery__pagination-prev):not(.my-gallery__pagination-next)');
          buttons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === page) {
              btn.classList.add('active');
            }
          });
        }
        
        // Handle prev/next clicks
        paginationContainer.addEventListener('click', function(e) {
          const totalPages = Math.ceil(items.length / itemsPerPage);
          
          if (e.target.classList.contains('my-gallery__pagination-prev') && currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updateActiveButton(currentPage);
            gallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else if (e.target.classList.contains('my-gallery__pagination-next') && currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updateActiveButton(currentPage);
            gallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      } else {
        // No items, hide pagination
        paginationContainer.style.display = 'none';
      }
    } else if (paginationContainer && !showPagination) {
      // Pagination disabled, hide container
      paginationContainer.style.display = 'none';
    }
  }
});