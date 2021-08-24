new ProductList(new Cart());

// ==============================================
// ProductTop 
// ==============================================
let productsTop;
async function fetchProducts() {
	const response = await fetch('products.json');
	productsTop = await response.json();
	await convertCurency();
	renderProducts();
}
fetchProducts();

function renderProducts() {
	const productsBestSelling = document.querySelector(".box-selling-card");
	productsBestSelling.innerHTML = '';
	for (const product of productsTop) {
		productsBestSelling.innerHTML += `
			<article class="best-selling-card">
				<img src="img/${product.imgUrl}" alt="${product.title}">
				<h2>${product.title}</h2>
				<p>${product.convertedPrice} ${product.corrency}</p>
				<button class="btn btn-primary buy" data-id="${product.id}">
				Order&nbspNow
			</button>
			</article>
			`;
	}
}
// ==============================================
// Product-post
// ==============================================
let productsPost;
async function fetchProductPost() {
	const response = await fetch('product-post.json');
	productsPost = await response.json();
	postCardProducts();
}
fetchProductPost();

function postCardProducts() {
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
// ==============================================
// Currency 
// ==============================================
async function convertCurency() {
	const startCurrency = 'USD';
	const targetCurrency = document.querySelector('.currency-input').value;
	const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${startCurrency}`);
	const keyCurerency = await response.json();
	const rate = keyCurerency.rates[targetCurrency];
	for (const product of productsTop) {
		product.convertedPrice = (product.price * rate).toFixed(2);
		product.corrency = targetCurrency;
	}
}

document.querySelector('.convert-currency')
	.addEventListener('click', async () => {
		await convertCurency();
		renderProducts();
	})
// ==============================================
// Clock 
// ==============================================
function updateClock() {
	const clock = document.querySelector('.clock');
	clock.innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
// ==============================================

