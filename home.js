// Fetch and display all dishes on the home page
async function loadDishes() {
  try {
    const response = await fetch('data.json');
    const dishes = await response.json();
    
    const container = document.getElementById('allDishes');
    
    dishes.forEach(dish => {
      // Create article element
      const article = document.createElement('article');
      article.className = 'dish';
      
      // Create image
      const img = document.createElement('img');
      img.src = Array.isArray(dish.images) ? dish.images[0] : dish.image;
      img.alt = dish.title;
      
      // Create dish info container
      const dishInfo = document.createElement('div');
      dishInfo.className = 'dish-info';
      
      // Create title
      const h2 = document.createElement('h2');
      h2.textContent = dish.title;
      
      // Create description
      const p = document.createElement('p');
      p.textContent = dish.description;
      
      // Create footer container
      const footer = document.createElement('div');
      footer.className = 'dish-footer';
      
      // Create price
      const price = document.createElement('span');
      price.className = 'price';
      price.textContent = dish.price;
      
      // Create link to detail page
      const link = document.createElement('a');
      link.href = `menu.html?id=${dish.id}`;
      link.className = 'btn-add';
      link.textContent = 'Voir le plat';
      
      // Assemble elements
      footer.appendChild(price);
      footer.appendChild(link);
      
      dishInfo.appendChild(h2);
      dishInfo.appendChild(p);
      dishInfo.appendChild(footer);
      
      article.appendChild(img);
      article.appendChild(dishInfo);
      
      container.appendChild(article);
    });
  } catch (error) {
    console.error('Error loading dishes:', error);
  }
}

// Load dishes when page loads
document.addEventListener('DOMContentLoaded', loadDishes);
