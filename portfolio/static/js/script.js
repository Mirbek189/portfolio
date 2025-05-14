document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.hidden');

  function checkVisibility() {
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        item.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();  // Инициализируем проверку видимости при загрузке страницы
});
