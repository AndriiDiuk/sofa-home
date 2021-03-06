// =====================================================
// function fetchProducts() {
// 	fetch('products.json')
// 		.then(response => response.json())
// 		.then(productsFromServer => products = productsFromServer)
// 		.then(() => renderProducts())
// 	   .catch(err => alert(err.message));
// }
// =====================================================
// ProductTop ---------------------------------------------
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
				<a href="#" class="selling-btn">order now</a>
			</article>
			`;
	}
}

// Products-2020-collections ----------------------------
function renderTab(products, category) {
	let html = '';
	const productsByCategory = products.filter(product => product.category === category);
	for (const product of productsByCategory) {
		html += `
				<article class="armchairs-tab">
				${product.quantity === 0 ? "OUT OF STOCK" : ""} 
						<a href="card.html"><img src="img/${product.img}" alt="${product.title}"></a>
						<span>${product.title}</span>
						<p>${product.convertedPrice} ${product.corrency}</p>
						<a class="btn-tab" href="#">Order Now</a>
				</article>
			`;
	}
	const productsContainer = document.querySelector('.armchairs-conteiner');
	productsContainer.innerHTML = html;
}

let products;
async function fetchCollections() {
	const response = await fetch('products-2020-collections.json');
	products = await response.json();
	await convertCurency();
	renderTab(products, 'armchairs');
}

document.querySelector('.tab-armchairs')
	.addEventListener('click', () => {
		renderTab(products, 'armchairs');
	});
document.querySelector('.tab-lamps')
	.addEventListener('click', () => renderTab(products, 'lamps'));
document.querySelector('.tab-tables')
	.addEventListener('click', () => renderTab(products, 'tables'));

fetchCollections();

// Product-post -----------------------------------------
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
// Currency ------------------------------------------
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
	for (const product of products) {
		product.convertedPrice = (product.price * rate).toFixed(2);
		product.corrency = targetCurrency;
	}
}

document.querySelector('.convert-currency')
	.addEventListener('click', async () => {
		await convertCurency();
		renderProducts();
		renderTab(products, 'armchairs');
	})

// Clock -------------------------------------------
function updateClock() {
	const clock = document.querySelector('.clock');
	clock.innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);