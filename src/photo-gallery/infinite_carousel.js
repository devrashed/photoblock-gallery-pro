document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.wpg-section');
  
  sliders.forEach(slider => {
    const btn = slider.querySelector('.wpg-pause-btn');
    const article = slider.querySelector('.wpg-article');
    
    if (btn && article) {
      btn.addEventListener('click', function() {
        article.classList.toggle('wpg-paused');
        btn.textContent = article.classList.contains('wpg-paused') ? 'Play' : 'Pause';
      });
    }
  });
});