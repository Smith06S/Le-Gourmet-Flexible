// Get the ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const dishId = urlParams.get('id');

let currentImages = [];
let currentImageIndex = 0;

// Fetch and display dish details
async function loadDishDetail() {
  try {
    const response = await fetch('data.json');
    const dishes = await response.json();
    
    // Find the dish by ID
    const dish = dishes.find(d => d.id == dishId);
    
    if (!dish) {
      document.getElementById('dishDetail').innerHTML = '<p>Pizza non trouvée.</p>';
      return;
    }
    
    // Set the page title
    document.title = `${dish.title} - Pizzaiolo`;
    
    // Populate the page with dish information
    document.getElementById('dishTitle').textContent = dish.title;
    document.getElementById('dishPrice').textContent = `Prix: ${dish.price}`;
    document.getElementById('dishIngredients').textContent = dish.ingredients;
    document.getElementById('dishHistory').textContent = dish.history;
    
    // Handle images (main image and carousel if multiple images)
    const mainImage = document.getElementById('mainImage');
    
    // Use images array if provided, otherwise fall back to single image
    if (Array.isArray(dish.images)) {
      currentImages = dish.images;
    } else if (dish.image) {
      currentImages = [dish.image];
    }
    
    // Display the first image
    mainImage.src = currentImages[0];
    mainImage.alt = dish.title;
    
    // Show carousel controls if there are multiple images
    if (currentImages.length > 1) {
      document.getElementById('carouselControls').style.display = 'flex';
      updateImageCounter();
      setupCarousel();
    } else {
      document.getElementById('imageCounter').style.display = 'none';
    }
    
  } catch (error) {
    console.error('Error loading dish detail:', error);
    document.getElementById('dishDetail').innerHTML = '<p>Erreur lors du chargement des données.</p>';
  }
}

// Setup carousel controls
function setupCarousel() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  prevBtn.addEventListener('click', showPreviousImage);
  nextBtn.addEventListener('click', showNextImage);
}

// Show previous image in carousel
function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  updateCarousel();
}

// Show next image in carousel
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  updateCarousel();
}

// Update carousel display
function updateCarousel() {
  const mainImage = document.getElementById('mainImage');
  mainImage.src = currentImages[currentImageIndex];
  updateImageCounter();
}

// Update image counter display
function updateImageCounter() {
  const counter = document.getElementById('imageCounter');
  counter.textContent = `Image ${currentImageIndex + 1} / ${currentImages.length}`;
}

// Load dish detail when page loads
document.addEventListener('DOMContentLoaded', loadDishDetail);
