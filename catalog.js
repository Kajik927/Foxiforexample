// ============================================
// CATALOG PAGE — Filter & Search Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.getElementById('catalogGrid');
  const cards = Array.from(grid.querySelectorAll('.cat-card'));
  const countEl = document.getElementById('catalogCount');
  const emptyEl = document.getElementById('catalogEmpty');
  const searchInput = document.getElementById('searchInput');

  let activeCategory = 'all';
  let activeRes = 'all';
  let searchQuery = '';

  // ---- CATEGORY FILTER ----
  document.getElementById('categoryFilter').addEventListener('click', (e) => {
    const item = e.target.closest('.filter-item');
    if (!item) return;
    document.querySelectorAll('#categoryFilter .filter-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeCategory = item.dataset.filter;
    applyFilters();
  });

  // ---- RESOLUTION FILTER ----
  document.getElementById('resFilter').addEventListener('click', (e) => {
    const item = e.target.closest('.filter-item');
    if (!item) return;
    document.querySelectorAll('#resFilter .filter-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeRes = item.dataset.res;
    applyFilters();
  });

  // ---- SEARCH ----
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });

  // ---- RESET ----
  function resetAll() {
    activeCategory = 'all';
    activeRes = 'all';
    searchQuery = '';
    searchInput.value = '';
    document.querySelectorAll('#categoryFilter .filter-item').forEach((i, idx) => i.classList.toggle('active', idx === 0));
    document.querySelectorAll('#resFilter .filter-item').forEach((i, idx) => i.classList.toggle('active', idx === 0));
    applyFilters();
  }
  document.getElementById('resetFilters').addEventListener('click', resetAll);
  document.getElementById('resetFilters2').addEventListener('click', resetAll);

  // ---- APPLY FILTERS ----
  function applyFilters() {
    let visible = 0;
    cards.forEach((card, i) => {
      const cat = card.dataset.category;
      const res = card.dataset.res;
      const text = card.innerText.toLowerCase();

      const catMatch = activeCategory === 'all' || cat === activeCategory;
      const resMatch = activeRes === 'all' || res === activeRes;
      const searchMatch = !searchQuery || text.includes(searchQuery);

      const show = catMatch && resMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) {
        visible++;
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, visible * 40);
      }
    });

    // Update count
    countEl.textContent = `// ${visible} товар${visible === 1 ? '' : visible >= 2 && visible <= 4 ? 'а' : 'ов'}`;

    // Show/hide empty state
    if (visible > 0) {
      emptyEl.classList.remove('visible');
      emptyEl.classList.add('hidden');
    } else {
      emptyEl.classList.remove('hidden');
      emptyEl.classList.add('visible');
    }
  }

  // Initial animation
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 50);
  });

});
