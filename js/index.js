const productsPostJson =
	`[
    {
        "id": "1",
        "title": "<b>15% off</b> on Tables & Cabinets",
        "imgUrl": "img/tables-cabinets.png"
    },
    {
        "id": "2",
        "title": "All-White Collection in Store",
        "imgUrl": "img/all-white-collection.png"
    },
    {
        "id": "3",
        "title": "<b>NEW!</b> Modern Collection by ARM",
        "imgUrl": "img/modern-collection.png"
    }
]`;

const productsJson =
	`[
    {
        "id": "1",
        "title": "Lord armchair, Miedel Home",
        "imgUrl": "img/lord-armchair.png",
        "description": "Lord armchair Miedel Home",
        "price": 1200
    },
    {
        "id": "2",
        "title": "Banana",
        "imgUrl": "img/ultimate-green-chair.png",
        "description": "Ultimate Green chair, XODO",
        "price": 900
    },
    {
        "id": "3",
        "title": "Girl",
        "imgUrl": "img/valetta-armchair.png",
        "description": "Valetta armchair, ZIX studio",
        "price": 3100
    }
]`;

// Product-post
function postCardProducts(productsPost) {
	const productsPostCard = document.querySelector(".product-post");
	productsPostCard.innerHTML = '';
	for (const product of productsPost) {
		productsPostCard.innerHTML += `
		<article class="product-post-card">
				<img src="${product.imgUrl}" alt="${product.title}">
				<h2>${product.title}</h2>
				<a href="#">Learn more</a>
			</article>
			`;
	}
}
const productsPost = JSON.parse(productsPostJson);
postCardProducts(productsPost);

// Best-selling Products
function renderProducts(products) {
	const productsBestSelling = document.querySelector(".box-selling-card");
	productsBestSelling.innerHTML = '';
	for (const product of products) {
		productsBestSelling.innerHTML += `
			<article class="best-selling-card">
				<img src="${product.imgUrl}" alt="${product.title}">
				<h2>${product.title}</h2>
				<p>${product.price} USD</p>
				<a href="#" class="selling-btn">order now</a>
			</article>
			`;
	}
}

const products = JSON.parse(productsJson);
renderProducts(products);
