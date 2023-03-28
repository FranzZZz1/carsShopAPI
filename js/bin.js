const binWrapper = document.querySelector(".bin__wrapper");

window.addEventListener("click", (event) => {
  let counter;

  //обнаружение + и - в корзине
  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    const counterWrapper = event.target.closest(".counter__wrapper");

    counter = counterWrapper.querySelector("[data-counter]");
  }

  //увеличение числа на 1
  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }

  //уменьшение числа на 1
  if (event.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (
      event.target.closest(".bin__wrapper") &&
      parseInt(counter.innerText) === 1
    ) {
      event.target.closest(".bin__item").remove();
      //вызов функций
      toggleCardStatus();

      calcBinPrice();
    }
  }

  //подсчет суммы только в корзине
  if (
    event.target.hasAttribute("data-action") &&
    event.target.closest(".bin__wrapper")
  ) {
    calcBinPrice();
  }

  if (event.target.hasAttribute("data-remove")) {
    event.target.closest(".bin__item").remove();
    toggleCardStatus();
    calcBinPrice();
  }
});

//////////////////////

window.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-cart")) {
    // console.log()
    const card = event.target.closest(".sort__item");

    const productInfo = {
      id: card.dataset.id,
      // imgSrc: card.dataset.img,
      imgSrc: card.querySelector(".sort__img").getAttribute("src"),
      // title: card.querySelector('[data-title]').innerText,
      title: card.querySelector(".sort__title").innerText,
      outPrice: card.querySelector("[data-outPrice]").innerText,
      InnerPrice: card.querySelector(".calc__price").innerText,
      counter: card.querySelector("[data-counter]").innerText,
    };

    const itemInBin = binWrapper.querySelector(`[data-id="${productInfo.id}"]`);

    if (itemInBin) {
      const counterEl = itemInBin.querySelector("[data-counter]");
      counterEl.innerText =
        parseInt(counterEl.innerText) + parseInt(productInfo.counter);
    } else {
      const binItemHtml = `
			<div class="bin__item" data-id="${productInfo.id}">
					  <div class="item__top">
						<div class="item__index"></div>
						<div class="item__img">
						  <img class="bin__img" src="${productInfo.imgSrc}" alt="${productInfo.title}" />
						</div>
						<div class="item__desc">
						  <div class="item__title">${productInfo.title}</div>
						  <div class="item__text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Nostrum et rerum repudiandae, natus aliquid voluptatum
							deleniti mollitia
						  </div>
	
						  <div class="item__details">
							<div class="counter__wrapper">
							  <div class="items__control" data-action="minus">
								-
							  </div>
							  <div class="items__current" data-counter>${productInfo.counter}</div>
							  <div class="items__control" data-action="plus">+</div>
						    </div>
						  	<div class="item__price">
								<div class="price__current">${productInfo.outPrice}</div>
								<div class="item__remove" data-remove>Удалить</div>
								<div class="calc__price visually-hidden">${productInfo.InnerPrice}</div>
						    </div>	
						  </div>
					  </div>
					</div>
			`;

      binWrapper.insertAdjacentHTML("beforeend", binItemHtml);
    }



    //Bin status - empty/full
    toggleCardStatus();

    calcBinPrice();
  }
});

//Проверка корзины на пустоту
function toggleCardStatus() {
  const binWrapper = document.querySelector(".bin__wrapper");
  const binEmptyBadge = document.querySelector("[data-bin-empty]");
  const itemCounter = document.querySelector('.bin__btn-counter')
  
  const orderForm = document.querySelector(".order__form");

  if (binWrapper.children.length > 0) {
    binEmptyBadge.style.display = "none";
    orderForm.classList.remove("visually-hidden");
	itemCounter.style.display = 'flex';
	itemCounter.innerText = binWrapper.children.length;
  } else {
    binEmptyBadge.style.display = "flex";
    orderForm.classList.add("visually-hidden");
	itemCounter.style.display = 'none'
	itemCounter.innerText = '0'
  }
}

//Подсчет суммы в корзине
function calcBinPrice() {
  const binWrapper = document.querySelector(".bin__wrapper");
  const binItems = document.querySelectorAll(".bin__item");

  const totalPriceEl = document.querySelector(".total__price");

  let priceTotal = 0;

  binItems.forEach(function (item) {
    const amountEl = item.querySelector("[data-counter]");
    const priceEl = item.querySelector(".calc__price");

    const currentPrice =
      parseInt(amountEl.innerText) * parseInt(priceEl.innerText);

    priceTotal += currentPrice;
  });

  let num = priceTotal;
  let numFormat = new Intl.NumberFormat("ru-Ru").format(num);

  totalPriceEl.innerText = numFormat;
  console.log(numFormat);
}

const bin = document.querySelector(".bin");

const headerContainer = document.querySelector(".header__container");
const binBtn = document.querySelector(".bin-btn");
const binClose = document.querySelector(".bin__close");

function myFunction(a, b, c) {
  if (a.matches) {
    // If media query matches
    document.body.style.marginRight = "17px";
    binBtn.style.marginRight = "17px";
    headerContainer.style.paddingRight = "67px";
  }
  if (b.matches) {
    document.body.style.marginRight = "0px";
    binBtn.style.marginRight = "0px";
    headerContainer.style.paddingRight = "50px";
  }
  if (c.matches) {
    document.body.style.marginRight = "0px";
    binBtn.style.marginRight = "0px";
    headerContainer.style.paddingRight = "50px";
  }
  if (d.matches) {
    // If media query matches
    document.body.style.marginRight = "17px";
    binBtn.style.marginRight = "17px";
    headerContainer.style.paddingRight = "67px";
  }
}
var a = window.matchMedia("(max-width: 1168px)");
var b = window.matchMedia("(max-width: 913px)");
var c = window.matchMedia("(min-width: 1168px)");
var d = window.matchMedia("(min-width: 1168px)");

binBtn.addEventListener("click", (e) => {
  bin.style.display = "block";
  bin.style.height = "100%";
  bin.style.overflow = "auto";
  document.body.style.overflow = "hidden";
  myFunction(a, b, c);
});

binClose.addEventListener("click", (e) => {
  bin.style.display = "none";
  bin.style.height = "auto";
  bin.style.overflow = "hidden";
  document.body.style.overflow = "auto";
  document.body.style.marginRight = "";
  headerContainer.style.paddingRight = "";
  binBtn.style.marginRight = "";
});
