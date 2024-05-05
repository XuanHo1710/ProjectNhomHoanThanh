const wrapListItemCart = document.querySelector('.wrap__list-item-cart');
const wrapNotifyCart = document.querySelector('.wrap__notify-cart');
let listCart = [];
let listCartJSON = localStorage.getItem("cart");

if(!listCartJSON){
    localStorage.setItem("cart", JSON.stringify(listCart));
    listCartJSON = localStorage.getItem("cart");
}


const DrawCart = (listCart) => {
    // wrapListItemCart.innerHTML = `
    // <div>
    //     <input type="radio" class="form-check-input">
    //     <label for="" class="form-check-label">Chọn tất cả</label>
    // </div>
    // `;
    listCart.forEach(cartItem => {
        wrapListItemCart.innerHTML += `
        <div class="block__item-cart">
            <div class="ms-3 d-flex"> 
                <div style="width: 100px;height: 100px;">
                    <img src=${cartItem.thumbnail[0]} style="width: 100%;" alt="">
                </div>
            </div>

            <div class="ms-3 me-3 w-100">
                <div class="block__info-item-cart d-flex align-items-center mb-4">
                    <a class="item__info-cart flex-grow-1" href="../html/chitietsanpham.html?product_id=${cartItem.id}">${cartItem.title}</a>
                    <i class="fa-solid fa-trash" product-id=${cartItem.id} style="color: #000000;"></i>
                </div>
                <div class="block__price-item-cart d-flex">
                    <div class="block__price-cart d-flex flex-grow-1">
                        <p class="text-danger"> <strong>${(parseInt(cartItem.price) * (1 - parseFloat(cartItem.discountPercent))).toLocaleString()}đ</strong></p>
                        <p class="p_price-sales">${parseInt(cartItem.price).toLocaleString()}đ</p>
                    </div>
                    <div class="block__grow-cart ">
                        <div class="block__grow d-flex align-items-center justify-content-center">
                            <span>-</span>
                            <input class="block__input-grow" type="text" value=${cartItem.quantity}>
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
}


const DrawCartHeader = (listCart) => {
    if (listCart.length > 0){
        wrapNotifyCart.innerHTML = ``;
        listCart.forEach(cartItem => {
            wrapNotifyCart.innerHTML += `
            <div class="wrap__item-notify-nav" cart-id=${cartItem.id}>
                <img style="width: 20%;" src=${cartItem.thumbnail[0]} alt="">
                <div style="width: 52%">
                    <h6 class="text-start ms-2">${cartItem.title}</h6>
                    <p class="text-break text-start ms-2">Số lượng: ${cartItem.quantity}</p>
                </div>
                <div class="ms-3">
                    <p class="text-danger" style="width: 14px;">${(parseInt(cartItem.price) * (1 - parseFloat(cartItem.discountPercent))).toLocaleString()}đ</p>
                    <a href="#" class="ms-5" product-id=${cartItem.id}>
                        <i class="fa-solid fa-trash" style="color: #000000;"></i>
                    </a>
                </div>
            </div>
            `;
        })
    } else {
        wrapNotifyCart.innerHTML += `
        <div>
            <img class = " mt-2 mb-2" style = 'width:50px;' src="../img/icons8-fast-cart-96.png" alt="">
            <h6 style = "color:#c3c3c3;">Giỏ hàng của bạn đang trống</h6>
        </div>
        `;
    }
}


const deleteCartHeader = (listCart) => {
    const listBtnDelete = document.querySelectorAll('.wrap__item-notify-nav a');
    listBtnDelete.forEach(deleted => {
        deleted.addEventListener('click', () => {
            const productId = deleted.getAttribute('product-id');

            // Xóa trên giao diện
            const parrentCart = deleted.closest('.wrap__item-notify-nav');
            wrapNotifyCart.removeChild(parrentCart);

            // Xoá 2 bên
            const cartMini = document.querySelector(`.block__item-cart i[product-id=${productId}]`);
            const parrentCartItem = cartMini.closest('.block__info-item-cart');
            wrapListItemCart.removeChild(parrentCartItem);
            // Hết xóa trên giao diện

            //Xóa trên cart ở localStor
          
            listCart = listCart.filter(cartItem => cartItem.id != productId);

            localStorage.setItem("cart", JSON.stringify(listCart));
            //Hết xóa trên cart ở localStor

            // Update giá
            updatePrice.innerHTML =  `${parseInt(totalPrice(listCart)).toLocaleString()}đ`;
        })
    })
}

const deleteCart = (listCart) => {
    const listBtnDelete = document.querySelectorAll('.block__info-item-cart i');
    listBtnDelete.forEach(deleted => {
        deleted.addEventListener('click', () => {
            const productId = deleted.getAttribute('product-id');

            // Xóa trên giao diện
            const parrentCartItem = deleted.closest('.block__item-cart');
            wrapListItemCart.removeChild(parrentCartItem);

             // Xoá 2 bên
            const cartMini = document.querySelector(`.wrap__item-notify-nav a[product-id=${productId}]`);
            const parrentCart = cartMini.closest('.wrap__item-notify-nav');
            wrapNotifyCart.removeChild(parrentCart);
            // Hết xóa trên giao diện

            //Xóa trên cart ở localStor
          
            listCart = listCart.filter(cartItem => cartItem.id != productId);

            localStorage.setItem("cart", JSON.stringify(listCart));
            //Hết xóa trên cart ở localStor

            // Update giá
            updatePrice.innerHTML =  `${parseInt(totalPrice(listCart)).toLocaleString()}đ`;
        })
    })
}



const updatePrice = document.querySelector('.block__subToltal-gioHang strong');


const totalPrice = (listCart) => {
    let price = 0;
    listCart.forEach(cartItem => price += parseInt(cartItem.price) * (1 - parseFloat(cartItem.discountPercent)) * parseInt(cartItem.quantity)  )
    return price;
}




listCart = JSON.parse(listCartJSON);
if(listCartJSON){
    DrawCartHeader(listCart);
    DrawCart(listCart);
    deleteCartHeader(listCart);
    deleteCart(listCart);
    updatePrice.innerHTML =  `${parseInt(totalPrice(listCart)).toLocaleString()}đ`;

    // Xoá giỏ hàng

    // Hết xóa giỏ hàng
} else {
    const parentWrapList = wrapListItemCart.closest('.wrap__notify-nav-body');
    // Vẽ giao diện thông báo không có sản phẩm nào trong giỏ hàng
    wrapListItemCart.innerHTML += `
            <h2 class="text-primary">Không có sản phẩm nào trong giỏ hàng</h2>
        `;
}

// Xử lý link liên kết các trang chi tiết sản phẩm
const listCartItemLink = document.querySelectorAll('.wrap__notify-cart .wrap__item-notify-nav div[style="width: 52%"]');
const linkReLoad = () => {
    if(listCartItemLink){
        listCartItemLink.forEach(item => {
            item.addEventListener('click', () => {
                console.log(item)
                const product_id = item.closest('.wrap__item-notify-nav').getAttribute('cart-id');
                window.location.href = `../html/chitietsanpham.html?product-id=${product_id}`
            })
        })
    }
}

linkReLoad();


// Kiểm tra USER

const buyNow = document.querySelector('.buyNow-JS');
buyNow.addEventListener('click', () => {
    const token = localStorage.getItem("token");
    if(token){
        window.location.href = "../html/dathang.html";
    } else window.location.href = "../html/dangnhap.html";
})


