document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.wpc_container').forEach(function (gallery) {
    const pagination = gallery.parentNode.querySelector('.my-gallery__pagination');
    if (!pagination) return;
    const itemsPerPage = parseInt(pagination.getAttribute('data-items-per-page'), 10) || 12;
    const items = Array.from(gallery.querySelectorAll('.wpc_card'));
    if (items.length <= itemsPerPage) return;

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
        btn.className = 'my-gallery__pagination-btn' + (p === page ? ' active' : '');
        btn.onclick = () => showPage(p);
        pagination.appendChild(btn);
      }
    }

    showPage(currentPage);
  });
});