
let products;
// function fetchProducts() {
// 	fetch('products.json')
// 		.then(response => response.json())
// 		.then(productsFromServer => products = productsFromServer)
// 		.then(() => renderProducts())
// 	   .catch(err => alert(err.message));
// }
async function fetchProducts() {
	const response = await fetch('products.json');
	products = await response.json();
	renderProducts();
}
fetchProducts();

function renderProducts() {
	const productsBestSelling = document.querySelector(".box-selling-card");
	productsBestSelling.innerHTML = '';
	for (const product of products) {
		productsBestSelling.innerHTML += `
			<article class="best-selling-card">
				<img src="img/${product.imgUrl}" alt="${product.title}">
				<h2>${product.title}</h2>
				<p>${product.price} USD</p>
				<a href="#" class="selling-btn">order now</a>
			</article>
			`;
	}
}
// ----------------------------------
const productsPostJson =
	`[
    {
        "id": "1",
        "title": "15% off on Tables & Cabinets",
        "imgUrl": "tables-cabinets.png"
    },
    {
        "id": "2",
        "title": "All-White Collection in Store",
        "imgUrl": "all-white-collection.png"
    },
    {
        "id": "3",
        "title": "NEW! Modern Collection by ARM",
        "imgUrl": "modern-collection.png"
    }
]`;
// Product-post
function postCardProducts(productsPost) {
	const productsPostCard = document.querySelector(".product-post");
	productsPostCard.innerHTML = '';
	for (const product of productsPost) {
		productsPostCard.innerHTML += `
		<article class="product-post-card">
				<img src="img/${product.imgUrl}" alt="${product.title}">
				<h2>${product.title}</h2>
				<a href="#">Learn more</a>
			</article>
			`;
	}
}
const productsPost = JSON.parse(productsPostJson);
postCardProducts(productsPost);
