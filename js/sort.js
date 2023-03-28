let priceBtn = document.querySelector(".price-btn");
priceBtn.addEventListener("click", () => {
  let changeText = document.querySelector(".change");
  priceBtn.classList.add("active");
  priceBtn.classList.toggle("change-text");
  if (priceBtn.classList.contains("change-text")) {
    changeText.innerText = "сначала недорогие";
    dataSort("data-price");
  } else {
    changeText.innerText = "сначала дорогие";
    dataSortDesc("data-price");
  }
});
document.querySelector("#most-popular").onclick = () => {
  dataSort("data-popular");
};
let scoreBtn = document.querySelector(".higher-score");
document.querySelector("#higher-score").onclick = () => {
  dataSort("data-score");
};

let sortButtons = document.querySelector(".sort__buttons");
let sortButton = sortButtons.querySelectorAll(".sort__button");

for (var i = 0; i < sortButton.length; i++) {
  sortButton[i].addEventListener("click", function (event) {
    for (var j = 0; j < sortButton.length; j++) {
      sortButton[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}

function dataSort(sortType) {
  let sortList = document.querySelector(".sort__list");
  for (let i = 0; i < sortList.children.length; i++) {
    for (let j = i; j < sortList.children.length; j++) {
      if (
        +sortList.children[i].getAttribute(sortType) <
        +sortList.children[j].getAttribute(sortType)
      ) {
        replacedNode = sortList.replaceChild(
          sortList.children[j],
          sortList.children[i]
        );
        insertAfter(replacedNode, sortList.children[i]);
      }
    }
  }
}

function dataSortDesc(sortType) {
  let sortList = document.querySelector(".sort__list");
  for (let i = 0; i < sortList.children.length; i++) {
    for (let j = i; j < sortList.children.length; j++) {
      if (
        +sortList.children[i].getAttribute(sortType) >
        +sortList.children[j].getAttribute(sortType)
      ) {
        replacedNode = sortList.replaceChild(
          sortList.children[j],
          sortList.children[i]
        );
        insertAfter(replacedNode, sortList.children[i]);
      }
    }
  }
}

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

function pullFilter(){
	const filterBox = document.querySelectorAll('.sort__item')
	document.querySelector('.categories__list').addEventListener('click', (event) =>{
		if(event.target.tagName !== 'DIV') return false;
	
		let dataFilter = event.target.dataset['filter']
		console.log(dataFilter)
		
		filterBox.forEach((elem) => {
			elem.classList.remove('hide')
			if(!elem.classList.contains(dataFilter)){
				elem.classList.add('hide')
			}
		})
	})
}
pullFilter()

const filterOpen = document.querySelector('.categories__open').addEventListener('click', function(){
	document.querySelector('.categories__list').classList.toggle('open')
	document.querySelector('.categories__arrow').classList.toggle('rotate')
})