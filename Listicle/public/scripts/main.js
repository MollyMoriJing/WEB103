document.addEventListener('DOMContentLoaded', () => {
  // Simple enhancement: animate cards on load
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, idx) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(8px)';
    setTimeout(() => {
      card.style.transition = 'opacity 300ms ease, transform 300ms ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 60 * idx);
  });

  // Category filter
  const filter = document.getElementById('categoryFilter');
  if (filter) {
    filter.addEventListener('change', () => {
      const value = filter.value;
      cards.forEach((card) => {
        const matches = value === 'all' || card.dataset.category === value;
        card.style.display = matches ? '' : 'none';
      });
    });
  }
});


