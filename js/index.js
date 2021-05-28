// =====================================================
// function fetchProducts() {
// 	fetch('products.json')
// 		.then(response => response.json())
// 		.then(productsFromServer => products = productsFromServer)
// 		.then(() => renderProducts())
// 	   .catch(err => alert(err.message));
// }
// =====================================================
// Product ---------------------------------------------
let products;
async function fetchProducts() {
	const response = await fetch('products.json');
	products = await response.json();
	await convertCurency();
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
				<p>${product.convertedPrice} ${product.corrency}</p>
				<a href="#" class="selling-btn">order now</a>
			</article>
			`;
	}
}

// products-2020-collections ----------------------------
let collections;
async function fetchCollections() {
	const response = await fetch('products-2020-collections.json');
	collections = await response.json();
	await convertCurency();
	renderCollections()
}
fetchCollections();

function renderCollections() {
	const productsCollections = document.querySelector(".armchairs-conteiner");
	productsCollections.innerHTML = '';


	if (collections.idСollections === collections.id) {
		for (const product of collections) {
			productsCollections.innerHTML += `
		<article class="armchairs-tab">
					<a href="card.html"><img src="img/${product.imgUrl}" alt="${collections.title}"></a>
					<span>${product.title}</span>
					<p>${product.convertedPrice} ${product.corrency}</p>
					<a class="btn-tab" href="#">Order Now</a>
			</article>
		`;
		}
	}
}

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
	for (const product of products) {
		product.convertedPrice = (product.price * rate).toFixed(0);
		product.corrency = targetCurrency;
	}
	for (const product of collections) {
		product.convertedPrice = (product.price * rate).toFixed(0);
		product.corrency = targetCurrency;
	}
}

document.querySelector('.convert-currency')
	.addEventListener('click', async () => {
		await convertCurency();
		renderProducts();
		renderCollections();
	})
// Clock -------------------------------------------
function updateClock() {
	const clock = document.querySelector('.clock');
	clock.innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
