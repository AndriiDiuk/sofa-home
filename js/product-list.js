class ProductList {
	constructor(cart) {
		this.cart = cart;
		this.container = document.querySelector('.armchairs-conteiner');
		this.productService = new ProductsService();
		this.sortDirection = 'ascending';
		this.tabsStart = 'armchairs';
		this.productService
			.getProducts()
			.then(() => this.renderTabs())
			.then(() => this.renderProducts())
			.then(() => this.addEventListeners())

	}
	async renderTabs() {
		const products = await this.productService.getProducts();
		const allBtnTabs = document.querySelector('.btn-tabs');
		const allTabsList = [];
		[...products].forEach(item => {
			return allTabsList.push(item.category);
		});
		allTabsList
			.reduce((uniq, item) => {
				return uniq.includes(item) ? uniq : [...uniq, item];
			}, [])
			.forEach(tabs => {
				allBtnTabs.innerHTML += `<button class="tabs" data-tabs="${tabs}">${tabs}</button>	`;
			});
	}
	async renderProducts() {
		let productListDomString = '';
		const products = await this.productService.getProducts();
		const startCurrency = 'USD';
		const targetCurrency = document.querySelector('.currency-input').value;
		const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${startCurrency}`);
		const keyCurerency = await response.json();
		const rate = keyCurerency.rates[targetCurrency];
		[...products]
			.sort((a, b) => this.sortDirection === 'ascending'
				? a.price - b.price
				: b.price - a.price)
			.forEach(product => {
				this.tabsStart === product.category
					? productListDomString +=
					`<article class="armchairs-tab product">
				${product.quantity === 0 ? "OUT OF STOCK" : ""} 
						<img src="img/${product.img}" alt="${product.title}"></a>
						<span>${product.title}</span>
						<p>${(product.price * rate).toFixed(2)} ${targetCurrency}</p>
						<div class="card-btn-conteiner">
							<button class="btn btn-info" data-bs-toggle="modal"
								data-bs-target="#productInfoModal" data-id="${product.id}">Info
							</button>
							<button class="btn btn-primary buy" data-id="${product.id}">
								Order&nbspNow
							</button>
						</div>
				</article>`
					: product.category
			});
		this.container.innerHTML = productListDomString;
	}

	async addEventListeners() {
		document
			.querySelectorAll('.product .btn-info')
			.forEach(button =>
				button.addEventListener('click', event =>
					this.handleProductInfoClick(event)
				)
			);
		document
			.querySelectorAll(
				'.armchairs-tab.product button.buy, #productInfoModal button.buy'
			)
			.forEach(button =>
				button.addEventListener('click', event =>
					this.handleProductBuyClick(event)
				)
			);
		document.querySelector('.sort-asc').addEventListener('click', async () => {
			this.sortDirection = 'ascending';
			await this.renderProducts();
			this.addEventListeners();
		});
		document.querySelector('.sort-desc').addEventListener('click', async () => {
			this.sortDirection = 'descending';
			await this.renderProducts();
			this.addEventListeners();
		});
		document.querySelector('.convert-currency').addEventListener('click', async () => {
			this.renderProducts();
		});
		let t = document.querySelectorAll('.tabs')
		t.forEach(item => {
			item.addEventListener('click', async () => {
				this.tabsStart = this.getAttribute('data-tabs');
				console.log(this.tabsStart);
				await this.renderProducts();
				this.addEventListeners();
			})
		})
	}
	async handleProductInfoClick(event) {
		const button = event.target; // Button that triggered the modal
		const id = button.dataset.id; // Extract info from data-* attributes
		const product = await this.productService.getProductById(id);
		const modal = document.querySelector('#productInfoModal');
		const productImg = modal.querySelector('.modal-body .card-img-top');
		productImg.setAttribute('src', 'img/' + product.img);
		productImg.setAttribute('alt', product.title);
		modal.querySelector('.modal-body .card-title').innerText = product.title;
		modal.querySelector('.modal-body .card-text').innerText =
			product.description;
		const btnBuy = modal.querySelector('button.buy');
		btnBuy.innerText = `${product.price} - Buy`;
		btnBuy.dataset.id = id;
	}
	handleProductBuyClick(event) {
		const button = event.target;
		const id = button.dataset.id;
		this.cart.addProduct(id);
		window.showAlert('Product added to cart');
	}
}