let products = [];

async function getData() {
    const url = "http://localhost:3000/api/products";
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        products = data;
        displayProducts();
        console.log("Fetched products:", products);

    } catch (err) {
        console.error("Error loading products:", err);
    }
}
getData()


const path = "/images/";

function displayProducts() {
    const container = document.getElementById("products");
    if (!container) {
        console.error("Container #products not found.");
        return;
    }

    container.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement("li");
        li.className = "product-item";

        li.innerHTML = `
            <img src="${path}${product.image_url}" alt="${product.name}" class="product-image" />
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">£${product.price.toFixed(2)}</p>
            </div>
        `;
        console.log(`${path}${product.image}`);
        container.appendChild(li);
    });
}