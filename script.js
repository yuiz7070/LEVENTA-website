// ===============================

// 1. منوی دسته بندی

// ===============================

const categoryBtn = document.getElementById("categoryBtn");

const categoryMenu = document.getElementById("categoryMenu");

const categoryDropdown = document.getElementById("categoryDropdown");

if (categoryBtn && categoryMenu) {

  categoryBtn.addEventListener("click", function () {

    categoryMenu.classList.toggle("show");

  });

}

document.addEventListener("click", function(event) {

  if (

    categoryDropdown &&

    categoryMenu &&

    !categoryDropdown.contains(event.target)

  ) {

    categoryMenu.classList.remove("show");

  }

});

// ===============================

// 2. جستجوی محصولات

// ===============================

function searchProducts() {

  const input = document.getElementById("productSearch");

  if (!input) return;

  // یکسان‌سازی حروف فارسی
  function normalize(text) {
      return text.trim()
          .replace(/[يى]/g, "ی")
          .replace(/ك/g, "ک")
          .replace(/[\s\u200c]+/g, "");
  }

  const searchText = normalize(input.value);

  if (searchText === "") {
      alert("لطفاً نام محصول را وارد کنید");
      return;
  }

  // دسته‌بندی محصولات
  const categories = {
      "روكابينتی": "roshoii.html",
      "توالت": "toilet.html",
      "شیرآلات": "shir.html",
      "وانحمام": "bath.html",
      "تجهیزاتحمام": "bath.html"
  };

  // پیدا کردن دسته‌بندی
  const matchedCategory = Object.keys(categories).find(
      key => normalize(key) === searchText
  );

  if (matchedCategory) {

      window.location.href = categories[matchedCategory];

  } else {

      alert("محصول مورد نظر یافت نشد!");

  }
}

document.getElementById("productSearch")?.addEventListener(

  "keydown",

  function(event) {

    if (event.key === "Enter") {

      searchProducts();

    }

  }

);

// ===============================

// 3. اطلاعات سبد خرید

// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {

  localStorage.setItem("cart", JSON.stringify(cart));

}

// ===============================

// 4. دکمه های محصولات

// ===============================

document.querySelectorAll(".product-card").forEach(product => {

  const plus = product.querySelector(".plus");

  const minus = product.querySelector(".minus");

  const qty = product.querySelector(".qty");

  const addCart = product.querySelector(".add-cart");

  if (plus && qty) {

    plus.addEventListener("click", () => {

      qty.textContent = Number(qty.textContent) + 1;

    });

  }

  if (minus && qty) {

    minus.addEventListener("click", () => {

      qty.textContent = Math.max(

        1,

        Number(qty.textContent) - 1

      );

    });

  }

  if (addCart && qty) {

    addCart.addEventListener("click", () => {

      const name = product.querySelector("h3")?.textContent.trim();

      const price = Number(product.dataset.price);

      const quantity = Number(qty.textContent);

      const image = product.querySelector("img")?.getAttribute("src");

      if (!name || !Number.isFinite(price) || price <= 0 || !image) {

        alert("مشخصات محصول یا قیمت آن کامل نیست!");

        return;

      }

      const item = cart.find(p => p.name === name);

      if (item) {

        item.quantity += quantity;

      } else {

        cart.push({

          name,

          price,

          quantity,

          image

        });

      }

      saveCart();

      updateCount();

      alert(name + " به سبد خرید اضافه شد ❤️");

    });

  }

});

// ===============================

// 5. شمارنده سبد خرید

// ===============================

function updateCount() {

  const count = document.getElementById("cart-count");

  if (count) {

    count.textContent = cart.reduce(

      (sum, item) => sum + item.quantity,

      0

    );

  }

}

// ===============================

// 6. نمایش محصولات در سبد خرید

// ===============================

function updateCart() {

    const container = document.getElementById("cart-items");
  
    if (!container) return;
  
    container.innerHTML = "";
  
    if (cart.length === 0) {
  
      container.innerHTML = "<p>سبد خرید شما خالی است.</p>";
  
    }
  
    cart.forEach((item, index) => {
  
      container.innerHTML += `
  
        <div class="cart-item">
  
          <img src="${item.image}" width="100" alt="${item.name}">
  
          <h3>${item.name}</h3>
  
          <p>${item.price.toLocaleString("fa-IR")} تومان</p>
  
          <button onclick="changeCartQty(${index}, -1)">−</button>
  
          <span>${item.quantity}</span>
  
          <button onclick="changeCartQty(${index}, 1)">+</button>
  
          <button onclick="removeItem(${index})">حذف</button>
  
        </div>
  
      `;
  
    });
  
    const total = cart.reduce(
  
      (sum, item) => sum + item.price * item.quantity,
  
      0
  
    );
  
    const totalElement = document.getElementById("cart-total");
  
    if (totalElement) {
  
      totalElement.textContent =
  
        total.toLocaleString("fa-IR") + " تومان";
  
    }
  
  }
  
  // ===============================
  
  // 7. تغییر تعداد در سبد خرید
  
  // ===============================
  
  function changeCartQty(index, amount) {
  
    cart[index].quantity += amount;
  
    if (cart[index].quantity <= 0) {
  
      cart.splice(index, 1);
  
    }
  
    saveCart();
  
    updateCart();
  
    updateCount();
  
  }
  
  // ===============================
  
  // 8. حذف محصول
  
  // ===============================
  
  function removeItem(index) {
  
    cart.splice(index, 1);
  
    saveCart();
  
    updateCart();
  
    updateCount();
  
  }
  
  // ===============================
  
  // 9. ادامه خرید
  
  // ===============================
  
  function checkout() {
  
    if (cart.length === 0) {
  
      alert("سبد خرید شما خالی است!");
  
      return;
  
    }
  
    alert("برای ثبت سفارش آماده‌اید!");
  
  }
  
  // ===============================
  
  // 10. اجرای اولیه
  
  // ===============================
  
  updateCount();
  
  updateCart();

  const modal = document.getElementById("imageZoomModal");
const zoomImage = document.getElementById("zoomImage");
const zoomContainer = document.getElementById("zoomContainer");

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const zoomReset = document.getElementById("zoomReset");
const zoomClose = document.getElementById("zoomClose");

let scale = 1;

function updateZoom() {
    zoomImage.style.transform = `scale(${scale})`;

    zoomImage.classList.toggle("zoomed", scale > 1);

    zoomContainer.style.cursor =
        scale > 1 ? "zoom-out" : "zoom-in";
}

// کلیک روی عکس محصولات
document.addEventListener("click", function(e) {
    const img = e.target.closest("img");

    if (!img) return;

    zoomImage.src = img.dataset.zoomImage || img.src;
    zoomImage.alt = img.alt || "تصویر محصول";

    scale = 1;
    updateZoom();

    modal.classList.add("active");
});

// بستن تصویر
function closeZoom() {
    modal.classList.remove("active");
    zoomImage.src = "";
    scale = 1;
    updateZoom();
}

zoomClose.addEventListener("click", closeZoom);

// بزرگ‌نمایی
zoomIn.addEventListener("click", function() {
    scale = Math.min(scale + 0.25, 4);
    updateZoom();
});

// کوچک‌نمایی
zoomOut.addEventListener("click", function() {
    scale = Math.max(scale - 0.25, 1);
    updateZoom();
});

// بازگشت به اندازه اصلی
zoomReset.addEventListener("click", function() {
    scale = 1;
    updateZoom();
});

// زوم با کلیک روی تصویر
zoomContainer.addEventListener("click", function(e) {
    if (e.target !== zoomImage) return;

    scale = scale > 1 ? 1 : 2;
    updateZoom();
});

// زوم با چرخ موس
zoomContainer.addEventListener("wheel", function(e) {
    e.preventDefault();

    if (e.deltaY < 0) {
        scale = Math.min(scale + 0.2, 4);
    } else {
        scale = Math.max(scale - 0.2, 1);
    }

    updateZoom();
}, { passive: false });

// بستن با کلیک روی فضای مشکی
modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        closeZoom();
    }
});

// بستن با کلید Escape
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeZoom();
    }
});
// بزرگ‌نمایی با دو انگشت در موبایل
let initialDistance = 0;
let initialScale = 1;

function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;

    return Math.sqrt(dx * dx + dy * dy);
}

zoomContainer.addEventListener("touchstart", function(e) {
    if (e.touches.length === 2) {
        initialDistance = getTouchDistance(e.touches);
        initialScale = scale;
    }
}, { passive: true });

zoomContainer.addEventListener("touchmove", function(e) {
    if (e.touches.length === 2) {
        e.preventDefault();

        const currentDistance = getTouchDistance(e.touches);

        scale = Math.min(
            4,
            Math.max(1, initialScale * currentDistance / initialDistance)
        );

        updateZoom();
    }
}, { passive: false });

zoomContainer.addEventListener("touchend", function() {
    initialDistance = 0;
}, { passive: true });

document.querySelectorAll(".product-card").forEach(card => {

  const oldPriceElement = card.querySelector(".old-price");
  const newPriceElement = card.querySelector(".new-price");

  const oldPrice = Number(
      oldPriceElement.textContent.replace(/[^0-9]/g, "")
  );

  const discount = Number(card.dataset.discount) || 0;

  const newPrice = Math.round(
      oldPrice * (1 - discount / 100)
  );

  oldPriceElement.textContent =
      "قیمت : " + oldPrice.toLocaleString("EN-IR") + " ریال";

  newPriceElement.textContent =
      "قیمت جدید: " + newPrice.toLocaleString("EN-IR") + " ریال";

});