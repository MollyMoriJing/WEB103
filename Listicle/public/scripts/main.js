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

  // Search and filter functionality
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const categoryValue = categoryFilter.value;
    
    cards.forEach((card) => {
      const title = card.querySelector('h3 a').textContent.toLowerCase();
      const text = card.querySelector('p').textContent.toLowerCase();
      const category = card.dataset.category.toLowerCase();
      
      const matchesSearch = searchTerm === '' || 
        title.includes(searchTerm) || 
        text.includes(searchTerm) || 
        category.includes(searchTerm);
      
      const matchesCategory = categoryValue === 'all' || card.dataset.category === categoryValue;
      
      const shouldShow = matchesSearch && matchesCategory;
      card.style.display = shouldShow ? '' : 'none';
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterCards);
  }
});


