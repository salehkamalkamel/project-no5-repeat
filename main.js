const menuToggler = document.querySelector(".menu-toggler");
const primaryNav = document.querySelector(".primary-nav");
const cartCard = document.querySelector("[data-cart]");
const itemDelBtn = document.querySelector("[data-item-del");
const cartCardContent = document.querySelector(".cart-card-content");
const supImgs = document.querySelectorAll("[data-sup-show] img");
const mainImg = document.querySelector(".main-show img");
let quantity = document.querySelector("[data-quantity]");
let dataBase = [
  {
    id: 44112003,
    productSrcImg: document.querySelector("[data-cart-item-img]").src,
    h1: "Fall Limited Edition Sneakers",
    price: +document.querySelector("[data-price]").textContent.replace("$", ""),
    quantity: +quantity.textContent,
  },
];
let totalQuantity = dataBase
  .map((ele) => {
    return +ele.quantity;
  })
  .reduce((a, c) => {
    return a + c;
  }, 0);

document.querySelector(".cart-icon-items").textContent = totalQuantity;

let currentImg;

menuToggler.addEventListener("click", () => {
  primaryNav.classList.toggle("active");
  menuToggler.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  const isCartBtn = e.target.matches("[data-cart-button]");
  let userSection;
  if (isCartBtn) {
    userSection = e.target.closest("[data-cart]");
    itemDelBtn.addEventListener("click", () => {
      document.querySelector(".cart-icon-items").textContent = 0;
      cartCardContent.innerHTML = `<p class="empty-cart-state">
      Your cart is empty.
      </p>`;
    });
    userSection.classList.toggle("active");
  }
  if (e.target.closest("[data-cart]") == null && e.target != itemDelBtn) {
    cartCard.classList.remove("active");
  }
});

supImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
    currentImg = img.getAttribute("src");
    mainImg.src = currentImg.replace("-thumbnail", "");
    document.querySelectorAll("[data-sup-show] img.active").forEach((ele) => {
      if (ele != e.target) {
        ele.classList.remove("active");
      }
    });
  });
});

document
  .querySelector("[data-minus-quantity]")
  .addEventListener("click", () => {
    if (+quantity.textContent > 1) {
      quantity.textContent--;
    }
  });

document.querySelector("[data-add-quantity]").addEventListener("click", () => {
  quantity.textContent++;
});

document.querySelector(".add-to-cart").addEventListener("click", (e) => {
  let item = {
    id: 44112003,
    productSrcImg: document.querySelector("[data-cart-item-img]").src,
    h1: "Fall Limited Edition Sneakers",
    price: +document.querySelector("[data-price]").textContent.replace("$", ""),
    quantity: +quantity.textContent,
  };

  if (!dataBase.length) {
    dataBase.push(item);
    addElementToCart(item);
  } else {
    dataBase[0].quantity += item.quantity;
    document.querySelector(
      ".price"
    ).textContent = `$${item.price} * ${dataBase[0].quantity} `;
    document.querySelector(".final-price").textContent = `$${
      item.price * dataBase[0].quantity
    }.00`;
  }
  totalQuantity = dataBase
    .map((ele) => {
      return +ele.quantity;
    })
    .reduce((a, c) => {
      return a + c;
    }, 0);

  document.querySelector(".cart-icon-items").textContent = totalQuantity;
});

function addElementToCart(item) {
  dataBase.forEach(() => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-content-item");
    cartItem.innerHTML = `<div class="item-img">
                  <img src="images/image-product-1-thumbnail.jpg" alt="" />
                </div>
                <div class="item-details normal-font">
                  <p class="cart-item-heading">${item.h1}</p>
                  <div class="cart-item-price">
                    <p class="price">$${item.price} * ${item.quantity}</p>
                    <p class="final-price">$${item.price * item.quantity}</p>
                  </div>
                </div>
                <div class="item-icon" data-item-del></div>`;
    document.querySelector(".add-to-cart").addEventListener("click", () => {
      document.querySelector(".empty-cart-state").classList.add("full");
      cartCardContent.prepend(cartItem);
      document.querySelector(".checkout-btn").classList.add("active");
    });
  });
}

// document.querySelector(".add-to-cart").addEventListener("click", () => {
//   let item = {
//     id: 44112003,
//     productSrcImg: document.querySelector("[data-cart-item-img]").src,
//     h1: "Fall Limited Edition Sneakers",
//     price: +document.querySelector("[data-price]").textContent.replace("$", ""),
//     quantity: +quantity.textContent,
//   };

//   for (let i = 0; i < dataBase.length; i++) {
//     if (dataBase[i].id == item.id) {
//       dataBase[i].quantity += item.quantity;
//     } else {
//       dataBase.push(item);
//     }
//   }
//   addEleToCart(item);
// });

// function addEleToCart(item) {
//   const cartItem = document.createElement("div");
//   cartCard.classList.add("cart-content-item");
//   cartItem.innerHTML = `<div class="item-img">
//                   <img src="images/image-product-1-thumbnail.jpg" alt="" />
//                 </div>
//                 <div class="item-details normal-font">
//                   <p class="cart-item-heading">${item.h1}</p>
//                   <div class="cart-item-price">
//                     <p class="price">$${item.price} * ${item.quantity}</p>
//                     <p class="final-price">$${item.price * item.quantity}</p>
//                   </div>
//                 </div>
//                 <div class="item-icon" data-item-del></div>`;
//   cartCardContent.append(cartItem);
//   console.log(cartCardContent);
// }
