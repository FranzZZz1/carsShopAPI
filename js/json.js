fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((json) => showProduct(json));

function showProduct(json) {
  let allProducts = json.products;
  for (const product of allProducts) {
    const toHtml = (product) => `
			  <div
				  class="sort__item ${product.category} all"
				  data-id="${product.id}"
				  data-price="${product.price}"
				  data-score="${product.rating}"
				  data-popular="${product.stock}"
				  data-filter="${product.category}"
				>
				  <div class="sort__body">
					<div class="sort__img-body">
					  <img class="sort__img" data-img="${product["images"][0]}" src="${product["images"][0]}" alt="${product.title}" />
					</div>
					<div class="sort__title" data-title>${product.title}</div>
					<div class="sort__divider"></div>
					<div class="sort__sub-title">
					  ${product.description}
					</div>
					<div class="rating rating__set">
						<div class="rating__body">
						<div class="rating__active"></div>
						<div class="rating__items">
							<input type="radio" name="rating" value="1" class="rating__item">
							<input type="radio" name="rating" value="2" class="rating__item">
							<input type="radio" name="rating" value="3" class="rating__item">
							<input type="radio" name="rating" value="4" class="rating__item">
							<input type="radio" name="rating" value="5" class="rating__item">
						</div>
						</div> 	
						<div class="rating__value">${product.rating}</div> 
						<div class="rating__popular">${product.stock}</div>
					  </div>
					<div class="sort__purchase">
					  <div class="sort__price" data-outPrice>$${product.price}</div>
					  <div class="calc__price visually-hidden" data-InnerPrice="${product.price}">${product.price}</div>
					  <div class="sort__buy-btn" data-cart data-id="${product.id}">Buy</div>
					  </div>
					<div class="sort__more-btn" data-btn="open-modal" data-id="${product.id}">Подробнее</div>
					<div data-counter class="visually-hidden">1</div>
				  </div>
				</div>
  `;
    function render() {
      html = allProducts.map(toHtml).join("");
      document.querySelector("#cars").innerHTML = html;
    }
    render();
	pullRating();
	pullFilter();
  }
}
