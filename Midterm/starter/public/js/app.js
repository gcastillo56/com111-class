// Offline SVG Fallback for missing/broken sprites
const DEFAULT_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="100%" height="100%" fill="#2b3035"/>
    <circle cx="100" cy="100" r="60" fill="none" stroke="#6c757d" stroke-width="8"/>
    <line x1="40" y1="100" x2="160" y2="100" stroke="#6c757d" stroke-width="8"/>
    <circle cx="100" cy="100" r="18" fill="#2b3035" stroke="#6c757d" stroke-width="8"/>
    <text x="50%" y="185" font-family="sans-serif" font-size="14" fill="#adb5bd" text-anchor="middle">No Image</text>
  </svg>
`);

// DOM Elements
const catalogGrid = document.getElementById('catalog-grid');
const catalogSection = document.getElementById('catalog-section');
const catalogCount = document.getElementById('catalog-count');
const catalogSubtitle = document.getElementById('catalog-subtitle');
const loadingSpinner = document.getElementById('loading-spinner');
const errorView = document.getElementById('error-view');
const errorMessage = document.getElementById('error-message');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const errorResetBtn = document.getElementById('error-reset-btn');
const brandReset = document.getElementById('brand-reset');

// Modal Elements
const modalElement = document.getElementById('characters-modal');
const characterModal = new bootstrap.Modal(modalElement);
const modalName = document.getElementById('modal-name');
const modalId = document.getElementById('modal-id');
const modalImg = document.getElementById('modal-img');
const modalTypes = document.getElementById('modal-types');
const modalExp = document.getElementById('modal-exp');
const modalHeight = document.getElementById('modal-height');
const modalWeight = document.getElementById('modal-weight');
const modalAbilities = document.getElementById('modal-abilities');
const modalMoves = document.getElementById('modal-moves');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Navigation state
let currentPrevId = null;
let currentNextId = null;
let isModalOpen = false;

modalElement.addEventListener('shown.bs.modal', () => { isModalOpen = true; });
modalElement.addEventListener('hidden.bs.modal', () => { isModalOpen = false; });

/**
 * Fetch and render the catalog list from the student's Express API
 */
async function loadCatalog(searchQuery = '') {
  showLoading(true);
  hideError();

  try {
    // Define your search enpoint here.
    const endpoint = '/api';

    const response = await fetch(endpoint);
    if (response.status === 404) {
      showError(`No character matched "${searchQuery}".`);
      return;
    }
    if (!response.ok) throw new Error(`Server responded with status ${response.status}`);

    const data = await response.json();
    const list = Array.isArray(data) ? data : (data.results || []);

    if (list.length === 0) {
      showError(searchQuery ? `No character found matching "${searchQuery}".` : 'The catalog is empty.');
      return;
    }

    renderCatalog(list, searchQuery);
  } catch (err) {
    showError(`Failed to communicate with backend API: ${err.message}`);
  } finally {
    showLoading(false);
  }
}

/**
 * Render catalog cards inside the scrollable container
 */
function renderCatalog(characterList, searchQuery) {
  catalogSection.classList.remove('d-none');
  catalogGrid.innerHTML = '';
  catalogCount.textContent = `${characterList.length} entries`;
  catalogSubtitle.textContent = searchQuery ? `Search Results for "${searchQuery}"` : 'All Characters';

  characterList.forEach((character) => {
    const col = document.createElement('div');
    col.className = 'col';

    const card = document.createElement('div');
    card.className = 'card h-100 char-card bg-body-tertiary border-secondary-subtle text-center p-2';
    card.addEventListener('click', () => openDetail(character.id || character.name));

    const img = document.createElement('img');
    img.className = 'card-img-top char-card-img mx-auto my-2';
    img.alt = character.name;
    img.src = character.image || DEFAULT_IMAGE;
    img.onerror = () => { img.onerror = null; img.src = DEFAULT_IMAGE; };

    const body = document.createElement('div');
    body.className = 'card-body p-1';

    const idBadge = document.createElement('span');
    idBadge.className = 'badge bg-secondary-subtle text-secondary-emphasis mb-1';
    idBadge.textContent = character.id ? `#${String(character.id).padStart(3, '0')}` : '';

    const title = document.createElement('h6');
    title.className = 'card-title text-capitalize mb-1 fw-bold text-truncate';
    title.textContent = character.name;

    body.append(idBadge, title);
    card.append(img, body);
    col.appendChild(card);
    catalogGrid.appendChild(col);
  });
}

/**
 * Fetch single Character detail and open/update modal
 */
async function openDetail(identifier) {
  if (identifier === null || identifier === undefined) return;

  try {
    // Set the enpoint for retrieving the information.
    const response = await fetch(`/api`);

    if (response.status === 404) {
      if (isModalOpen) characterModal.hide();
      showError(`Character "${identifier}" was not found.`);
      return;
    }

    if (!response.ok) {
      throw new Error(`Server status ${response.status}`);
    }

    const character = await response.json();
    populateModal(character);

    if (!isModalOpen) {
      characterModal.show();
    }
  } catch (err) {
    if (isModalOpen) characterModal.hide();
    showError(`Error loading character details: ${err.message}`);
  }
}

/**
 * Populate modal DOM elements with backend payload
 */
function populateModal(character) {
  modalName.textContent = character.name || 'Unknown';
  modalId.textContent = character.id ? `#${String(character.id).padStart(3, '0')}` : '#???';

  modalImg.src = character.image || DEFAULT_IMAGE;
  modalImg.onerror = () => { modalImg.onerror = null; modalImg.src = DEFAULT_IMAGE; };

  modalExp.textContent = character.experience ?? '-';
  modalHeight.textContent = character.height ?? '-';
  modalWeight.textContent = character.weight ?? '-';

  // Render Types
  modalTypes.innerHTML = '';
  (character.types || []).forEach((type) => {
    const badge = document.createElement('span');
    badge.className = 'badge bg-info text-uppercase px-3 py-2';
    badge.textContent = type;
    modalTypes.appendChild(badge);
  });

  // Render Abilities
  modalAbilities.innerHTML = '';
  (character.abilities || []).forEach((ability) => {
    const badge = document.createElement('span');
    badge.className = 'badge bg-secondary text-capitalize';
    badge.textContent = ability;
    modalAbilities.appendChild(badge);
  });

  // Render Moves
  modalMoves.innerHTML = '';
  const moves = character.moves || [];
  if (moves.length === 0) {
    modalMoves.innerHTML = '<span class="text-secondary small">No moves listed</span>';
  } else {
    moves.forEach((move) => {
      const badge = document.createElement('span');
      badge.className = 'badge border border-secondary text-body-secondary text-capitalize';
      badge.textContent = move;
      modalMoves.appendChild(badge);
    });
  }

  // Bind Circular Navigation IDs provided by Backend
  currentPrevId = character.prevId ?? null;
  currentNextId = character.nextId ?? null;

  prevBtn.disabled = currentPrevId === null;
  nextBtn.disabled = currentNextId === null;
}

// Event Listeners: Modal Left/Right Navigation
prevBtn.addEventListener('click', () => {
  if (currentPrevId !== null) openDetail(currentPrevId);
});

nextBtn.addEventListener('click', () => {
  if (currentNextId !== null) openDetail(currentNextId);
});

// Keyboard Arrow Navigation inside Modal
document.addEventListener('keydown', (e) => {
  if (!isModalOpen) return;
  if (e.key === 'ArrowLeft' && currentPrevId !== null) {
    openDetail(currentPrevId);
  } else if (e.key === 'ArrowRight' && currentNextId !== null) {
    openDetail(currentNextId);
  }
});

// Event Listeners: Search & Reset
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    clearSearchBtn.classList.remove('d-none');
    loadCatalog(query);
  } else {
    resetToFullCatalog();
  }
});

function resetToFullCatalog() {
  searchInput.value = '';
  clearSearchBtn.classList.add('d-none');
  loadCatalog();
}

clearSearchBtn.addEventListener('click', resetToFullCatalog);
errorResetBtn.addEventListener('click', resetToFullCatalog);
brandReset.addEventListener('click', (e) => {
  e.preventDefault();
  resetToFullCatalog();
});

// UI Helper Functions
function showLoading(isLoading) {
  loadingSpinner.classList.toggle('d-none', !isLoading);
  if (isLoading) catalogSection.classList.add('d-none');
}

function showError(msg) {
  catalogSection.classList.add('d-none');
  errorMessage.textContent = msg;
  errorView.classList.remove('d-none');
}

function hideError() {
  errorView.classList.add('d-none');
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => loadCatalog());