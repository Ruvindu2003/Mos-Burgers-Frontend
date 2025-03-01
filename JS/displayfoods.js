document.addEventListener("DOMContentLoaded", () => {
    const foodContainer = document.getElementById("food-container");
    const categoryNameElement = document.getElementById("category-name");

    // Get category name from query string
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');

    // Fetch products from the API based on the category name
    fetch(`http://localhost:8080/Product/product-search-by-category/${categoryName}`)
        .then(response => response.json())
        .then(products => {
            if (products && products.length > 0) {
                // Set the category name as a heading
                categoryNameElement.textContent = products[0].category;

                // Clear the food container before rendering
                foodContainer.innerHTML = "";

                // Render each product within the selected category
                let itemsHTML = '';

                products.forEach(product => {
                    itemsHTML += `
                        <div class="card">
                            <img src="${product.image_path}" alt="${product.name}">
                            <div class="card-content">
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                                <p class="price">Price: Rs${product.price.toFixed(2)}</p>
                                <button class="enabled-btn" onclick="addToCart('${categoryName}', ${product.id})">Add to Cart</button>
                            </div>
                        </div>
                    `;
                });

                foodContainer.innerHTML = itemsHTML;
            } else {
                categoryNameElement.textContent = "No Items Found";
                foodContainer.innerHTML = `<p>No items found for this category.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            categoryNameElement.textContent = "Error";
            foodContainer.innerHTML = `<p>There was an error fetching the products. Please try again later.</p>`;
        });
});
