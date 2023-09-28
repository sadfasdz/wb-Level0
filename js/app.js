const payImmediatelyCheckbox = document.querySelector(
  ".pay-immediately__checkbox"
);

const basketOrderBtn = document.querySelector(".basket__order-btn");

const modalBtnsPayment = document.querySelectorAll("[data-payment]");

payImmediatelyCheckbox.addEventListener("change", () => {
  if (payImmediatelyCheckbox.checked) {
    basketOrderBtn.textContent = "Оплатить 2 101 063 сом";
  } else {
    basketOrderBtn.textContent = "Заказать";
  }
});

// accordion

const basketAccordions = document.querySelectorAll(".accordion__top");

basketAccordions.forEach((value, index) => {
  value.nextElementSibling.style.maxHeight = `${value.nextElementSibling.scrollHeight}px`;
  value.addEventListener("click", function () {
    console.log(this.classList.contains(".accordion__checkbox"));
    console.log(this.classList);

    let contentAccordion = this.nextElementSibling;
    if (contentAccordion.style.maxHeight !== "0px") {
      document
        .querySelectorAll(".accordion__top-img")
        [index].classList.add("accordion__top-img--close");

      if (this.classList.contains("accordion__present-top")) {
        setTimeout(() => {
          document.querySelector(".accordion__checkbox").style.display = "none";
          document.querySelector(".accordion__info-present").style.display =
            "block";
          document.querySelector(".accordion__present-top").style.borderBottom =
            "1px solid rgba(0, 0, 0, 0.10)";
        }, 400);
      }

      contentAccordion.style.maxHeight = "0px";
      contentAccordion.style.overflow = "hidden";
    } else {
      document
        .querySelectorAll(".accordion__top-img")
        [index].classList.remove("accordion__top-img--close");

      if (this.classList.contains("accordion__present-top")) {
        setTimeout(() => {
          document.querySelector(".accordion__checkbox").style.display =
            "block";
          document.querySelector(".accordion__info-present").style.display =
            "none";
          document.querySelector(".accordion__present-top").style.borderBottom =
            "";
        }, 400);
      }

      contentAccordion.style.maxHeight = `${contentAccordion.scrollHeight}px`;
      setTimeout(() => {
        contentAccordion.style.overflow = "visible";
      }, 600);
    }
  });
});

//

// modal-delivery

// modal

function removeClassModal(e) {
  e.stopPropagation();
  console.log(e.target);
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__btn-close")
  ) {
    document.body.style.position = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, parseInt(document.body.style.top || "0") * -1);
    document.querySelector(".modal--active").classList.remove("modal--active");
  }
}

const openModalBtns = document.querySelectorAll(".open-modal");
const basketModals = document.querySelectorAll(".modal");

basketModals.forEach((modal) => {
  modal.addEventListener("click", removeClassModal);
});

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target);
    let path = e.target.getAttribute("data-path");
    document
      .querySelector(`[data-target = ${path}]`)
      .classList.add("modal--active");

    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.paddingRight = "17px";
    document.body.style.position = "fixed";
  });
});

// tabs

const tabItem = document.querySelectorAll(".delivery-modal__tabs-btn-item");
const tabContent = document.querySelectorAll(".delivery-modal__tabs-inner");

tabItem.forEach((item) => {
  item.addEventListener("click", open);
});

function open(e) {
  const tabTarget = e.target;
  const button = tabTarget.dataset.button;

  tabItem.forEach((item) => {
    item.classList.remove("delivery-modal__tabs-btn-item--active");
  });

  tabTarget.classList.add("delivery-modal__tabs-btn-item--active");

  tabContent.forEach(function (item) {
    item.classList.remove("delivery-modal__tabs-inner--active");
  });

  document
    .querySelector(`#${button}`)
    .classList.add("delivery-modal__tabs-inner--active");
}

//accordion checkbox
const listItems = document.querySelector(".delivery-method__products-list");

const mainBasketCheckbox = document.querySelector(".accordion__checkbox input");
mainBasketCheckbox.checked = true;
const basketProductsCheckboxes = document.querySelectorAll(
  ".item__product-img-container .label-container input"
);

const productsDate = document.querySelector("[data-date]");
console.log(productsDate);
const basketProductsCount = document.querySelectorAll(".item-counter__num");
console.log(basketProductsCount);

// function addProductDate(value) {}

basketProductsCheckboxes.forEach((value, index) => {
  value.checked = true;

  //function
  if (value.checked) {
    listItems.innerHTML += `<li class="delivery-method__products-item">
           <img src="${value.parentNode.nextElementSibling.src}" alt="" /> 
            ${
              basketProductsCount[index].value > 1
                ? `<div class="delivery-method__products-item-count">${
                    value.dataset.count
                      ? value.dataset.count
                      : basketProductsCount[index].value
                  }</div>`
                : ""
            }
            
          </li>`;

    productsDate.innerHTML += `${
      value.dataset.count
        ? `<li class="delivery-method__products-item"><img src="${
            value.parentNode.nextElementSibling.src
          }" alt="" />
        <div class="delivery-method__products-item-count">${
          basketProductsCount[index].value - value.dataset.count
        }</div>
      </li>`
        : ""
    }`;
  }
});

mainBasketCheckbox.addEventListener("change", function () {
  listItems.innerHTML = "";
  productsDate.innerHTML = "";
  if (this.checked) {
    basketProductsCheckboxes.forEach((checkmark) => {
      checkmark.checked = true;
    });
    basketProductsCheckboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        listItems.innerHTML += `<li class="delivery-method__products-item">
           <img src="${checkbox.parentNode.nextElementSibling.src}" alt="" /> 
            ${
              basketProductsCount[index].value > 1
                ? `<div class="delivery-method__products-item-count">${
                    checkbox.dataset.count
                      ? checkbox.dataset.count
                      : basketProductsCount[index].value
                  }</div>`
                : ""
            }
            
          </li>`;

        productsDate.innerHTML += `${
          checkbox.dataset.count
            ? `<li class="delivery-method__products-item"><img src="${
                checkbox.parentNode.nextElementSibling.src
              }" alt="" />
        <div class="delivery-method__products-item-count">${
          basketProductsCount[index].value - checkbox.dataset.count
        }</div>
      </li>`
            : ""
        }`;
      }
    });
  } else {
    basketProductsCheckboxes.forEach((checkmark) => {
      checkmark.checked = false;
    });
  }

  if (listItems.textContent === "") {
    listItems.previousElementSibling.style.display = "none";
  } else {
    listItems.previousElementSibling.style.display = "block";
  }

  if (productsDate.textContent === "") {
    productsDate.previousElementSibling.style.display = "none";
  } else {
    productsDate.previousElementSibling.style.display = "block";
  }
});

function checkCheckedInput(basketProductsCheckboxes) {
  for (input of basketProductsCheckboxes) {
    if (input.checked === false) {
      return false;
    }
  }
  return true;
}

basketProductsCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    listItems.innerHTML = "";
    productsDate.innerHTML = "";
    basketProductsCheckboxes.forEach((value, index) => {
      if (value.checked) {
        listItems.innerHTML += `<li class="delivery-method__products-item">
           <img src="${value.parentNode.nextElementSibling.src}" alt="" /> 
            ${
              basketProductsCount[index].value > 1
                ? `<div class="delivery-method__products-item-count">${
                    value.dataset.count
                      ? value.dataset.count
                      : basketProductsCount[index].value
                  }</div>`
                : ""
            }
            
          </li>`;

        productsDate.innerHTML += `${
          value.dataset.count
            ? `<li class="delivery-method__products-item"><img src="${
                value.parentNode.nextElementSibling.src
              }" alt="" />
        <div class="delivery-method__products-item-count">${
          basketProductsCount[index].value - value.dataset.count
        }</div>
      </li>`
            : ""
        }`;
      }
    });

    if (listItems.textContent === "") {
      listItems.previousElementSibling.style.display = "none";
    } else {
      listItems.previousElementSibling.style.display = "block";
    }

    if (productsDate.textContent === "") {
      productsDate.previousElementSibling.style.display = "none";
    } else {
      productsDate.previousElementSibling.style.display = "block";
    }
  });
});

basketProductsCheckboxes.forEach((value) => {
  value.addEventListener("change", () => {
    if (checkCheckedInput(basketProductsCheckboxes)) {
      mainBasketCheckbox.checked = true;
    } else {
      mainBasketCheckbox.checked = false;
    }
  });
});

//form
const formInps = document.querySelectorAll(".basket__recipient-inp");

let valid = true;

const btnForm = document.querySelector(".basket__order-btn");

btnForm.addEventListener("click", (e) => {
  e.preventDefault();

  let trueInp = true;

  for (let inp of formInps) {
    if (inp.value.length === 0) {
      trueInp = false;
      break;
    }
  }

  if (trueInp === false) {
    valid = false;
  }

  if (valid === false) {
    alert("вы не прошли валидацию");
  } else {
    alert("submit");
  }

  // const form = document.querySelector(".basket__recipient-form");
  // form.addEventListener("submit", () => {
  //   console.log(123);
  // });
});

const form = document.querySelector(".basket__recipient-form");
form.addEventListener("submit", () => {
  console.log(123);
});

// validation

formInps.forEach((input) => {
  input.addEventListener("focus", function () {
    if (this.nextElementSibling.style.display === "") {
      this.addEventListener("blur", function () {
        switch (this.dataset.input) {
          case "name":
            if (/[0-9]/.test(this.value)) {
              this.nextElementSibling.style.display = "block";
              valid = false;
              this.classList.add("input-error");
            }
            break;
          case "surname":
            if (/[0-9]/.test(this.value)) {
              this.nextElementSibling.style.display = "block";
              valid = false;
              this.classList.add("input-error");
            }
            break;
          case "phone":
            if (!/^\+. \d{3} \d{3} \d{2} \d{2}$/.test(this.value.trim())) {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            }
            break;
          case "mail":
            const EMAIL_REGEXP =
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            if (!EMAIL_REGEXP.test(this.value)) {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            }
            break;
          case "INN":
            if (
              (this.value.length > 14 || this.value.length < 14) &&
              this.value.length !== 0
            ) {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            }
            break;

          default:
            break;
        }
      });
    } else if (input.nextElementSibling.style.display === "block") {
      this.addEventListener("input", function () {
        switch (this.dataset.input) {
          case "INN":
            if (this.value.length === 14) {
              this.nextElementSibling.style.display = "";
              valid = true;

              this.classList.remove("input-error");
            } else {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            }
            break;
          case "name":
            if (/[0-9]/.test(this.value)) {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            } else {
              this.nextElementSibling.style.display = "";
              valid = true;

              this.classList.remove("input-error");
            }
            break;
          case "surname":
            if (/[0-9]/.test(this.value)) {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            } else {
              this.nextElementSibling.style.display = "";
              valid = true;

              this.classList.remove("input-error");
            }
            break;
          case "phone":
            if (!/^\+. \d{3} \d{3} \d{2} \d{2}$/.test(this.value.trim())) {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            } else {
              this.nextElementSibling.style.display = "";
              this.classList.remove("input-error");
              valid = true;
            }
            break;
          case "mail":
            const EMAIL_REGEXP =
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            if (!EMAIL_REGEXP.test(this.value)) {
              this.nextElementSibling.style.display = "block";
              valid = false;

              this.classList.add("input-error");
            } else {
              this.nextElementSibling.style.display = "";
              valid = true;

              this.classList.remove("input-error");
            }
            break;
          default:
            break;
        }
      });
    }
  });

  // console.log(this.nextElementSibling.style.display);
  input.addEventListener("input", function () {
    if (this.value.length > 0) {
      this.previousElementSibling.style.display = "block";
      setTimeout(() => {
        this.previousElementSibling.style.transform = "translateY(-30px)";
      }, 0);
    } else {
      this.previousElementSibling.style.transform = "translateY(0px)";
      setTimeout(() => {
        this.previousElementSibling.style.display = "none";
      }, 100);
    }
  });
});
