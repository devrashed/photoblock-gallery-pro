document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.masonry_img_gallery').forEach(function (gallery) {
    const itemsPerPage = parseInt(gallery.parentNode.querySelector('.my-gallery__pagination')?.getAttribute('data-items-per-page'), 10) || 12;
    const items = Array.from(gallery.querySelectorAll('.wpct_masonry_item'));
    const pagination = gallery.parentNode.querySelector('.my-gallery__pagination');
    if (!pagination || items.length <= itemsPerPage) return;

    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function showPage(page) {
      items.forEach((item, i) => {
        item.style.display = (i >= (page - 1) * itemsPerPage && i < page * itemsPerPage) ? 'block' : 'none';
      });
      pagination.innerHTML = '';
      for (let p = 1; p <= totalPages; p++) {
        const btn = document.createElement('button');
        btn.textContent = p;
        btn.className = p === page ? 'active' : '';
        btn.onclick = () => showPage(p);
        pagination.appendChild(btn);
      }
    }

    showPage(currentPage);
  });
});