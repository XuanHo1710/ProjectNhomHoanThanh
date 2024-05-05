
// Lấy database

const JsonProduct = localStorage.getItem("productTest");
let ProductList = JSON.parse(JsonProduct);



const categoryProduct = () => {
    const productCategoryId = window.location.href.split('?')[1];
    let categoryActive = document.querySelector(`ul li a[href="./sanpham.html?${productCategoryId}"]`);

    if(productCategoryId){
        ProductList = ProductList.filter(product => product.product_category_id == productCategoryId);
        categoryActive.classList.add('active');
    } else {
        categoryActive = document.querySelector(`ul li a[href="./sanpham.html"]`);
        if(categoryActive){
            categoryActive.classList.add('active');
        }
    }
}
categoryProduct();
// End lấy database



// Lọc theo giá nếu có

const formFilter = document.querySelector('.form-filter');
if(formFilter){
    formFilter.addEventListener('submit', (e) => {
        e.preventDefault();
        const optValues = formFilter.querySelectorAll('select option');
        optValues.forEach(opt => {
            if(opt.selected){
                if(opt.value == '15'){
                    ProductList = JSON.parse(JsonProduct);
                    ProductList = ProductList.filter(product => (parseInt(product.price) * (1 - parseFloat(product.discountPercent)))  <= 15000000);
                }
                else if(opt.value == '16-20'){
                    ProductList = JSON.parse(JsonProduct);
                    ProductList = ProductList.filter(product => (parseInt(product.price) * (1 - parseFloat(product.discountPercent)))  > 15000000 && (parseInt(product.price) * (1 - parseFloat(product.discountPercent)))  <= 20000000);
                }
                else if(opt.value == '21-30')
                {
                    ProductList = JSON.parse(JsonProduct);
                    ProductList = ProductList.filter(product => (parseInt(product.price) * (1 - parseFloat(product.discountPercent)))  > 20000000 && (parseInt(product.price) * (1 - parseFloat(product.discountPercent)))  <= 30000000);
                }
                else
                {
                    ProductList = JSON.parse(JsonProduct);
                    ProductList = ProductList.filter(product => (parseInt(product.price) * (1 - parseFloat(product.discountPercent)))  > 30000000);
                }
                DrawPagination();
                DrawProductItem();
            }
        })
    })
}

// Hết lọc theo giá

  





// Pagination

// const listProductItems = document.querySelectorAll('.content-product-item');
let currentPage = 1;
let limitPage = 8;
let skipPage = (currentPage - 1) * limitPage;
let totalPage = Math.ceil(1.0 * ProductList.length / limitPage);

const DrawPagination = () => { 
    const pagination = document.querySelector('.content-pagination');
    currentPage = 1;
    limitPage = 8;
    skipPage = (currentPage - 1) * limitPage;
    totalPage = Math.ceil(1.0 * ProductList.length / limitPage);

    if (ProductList.length > 0 && pagination) {
        let elementUL = ``;
        elementUL += `<li page="first"><<</li>`;
        for (let i = 1; i <= totalPage; i++) {
            elementUL += `<li page=${i}>${i}</li>`;
        }
        elementUL += `<li page="last">>></li>`;

        pagination.innerHTML = `
        <ul>
        ${elementUL}
        </ul>`;
    }
    if (pagination) {
        const PagePagination = pagination.querySelectorAll('ul li');
        if (PagePagination.length > 0) {
            PagePagination.forEach(page => {
    
                // Default la trang 1
                if (page.getAttribute('page') == "1") {
                    page.classList.add('active');
                }
                // End Default la trang 1
    
                page.addEventListener('click', () => {
                    //Xóa class active
                    PagePagination.forEach(itemPage => itemPage.classList.remove('active'));
                    //End xóa class active
    
    
                    if (page.getAttribute('page').match('[0-9]{1}')) {
                        page.classList.add('active');
                        currentPage = parseInt(page.getAttribute('page'));
                        skipPage = (currentPage - 1) * limitPage;
                        
                        categoryProduct();


                        DrawProductItem();
                    } else if (page.getAttribute('page') == "first") {
                        const pageFirst = pagination.querySelector(`ul li[page="1"]`);
                        pageFirst.classList.add('active');
                        currentPage = 1;
                        skipPage = (currentPage - 1) * limitPage;

                        categoryProduct();
                    
                        DrawProductItem();
                    } else if (page.getAttribute('page') == "last") {
                        const pageLast = pagination.querySelector(`ul li[page="${PagePagination.length - 2}"]`);
                        pageLast.classList.add('active');
                        currentPage = PagePagination.length - 2;
                        skipPage = (currentPage - 1) * limitPage;

                        
                        categoryProduct();


                        DrawProductItem();
                    }
                })
            });
        }
    }
}
DrawPagination();

// End Pagination

// Draw Product
const DrawProductItem = () => {
    const listProduct = document.querySelector('.content-main .content-product-list');
    if (listProduct) {
        let ItemProduct = ``;
        if (ProductList.length > 0) {
            for (let i = skipPage; i <= limitPage + skipPage - 1; i++) {
                if (ProductList[i]) {
                    ItemProduct += `
                        <div class="col-6 col-md-4 col-lg-3" style="padding: 5px;">
                            <div class="card">
                                <a href="../html/chitietsanpham.html?product_id=${ProductList[i].id}" class="text-dark">
                                  <div class="card-header">
                                      <img src=${ProductList[i].thumbnail[0]} alt="" class="card-img-top">
                                  </div>
                                  <div class="card-body p-2">
                                      <h2 style="font-size: 17px; font-weight: 700;">${ProductList[i].title}</h2>
                                      <h3>Giảm đến 1 triệu khi trả góp qua thẻ Visa của Muadee by HDBank</h3>
                                      <div class="list-price">
                                          <span class="list-price-old">${parseInt(ProductList[i].price).toLocaleString()}đ</span>
                                          <span class="list-price-new d-inline-block ms-3 text-danger">${(parseInt(ProductList[i].price) * (1 - parseFloat(ProductList[i].discountPercent))).toLocaleString()}đ</span>
                                      </div>
                                      <div class="product-action mt-2">
                                          <span class="product-action-heart active"><i class="fas fa-heart"></i></span>
                                          <div class="product-action-list-star">
                                              <span class="star active"><i class="fas fa-star"></i></span>
                                              <span class="star active"><i class="fas fa-star"></i></span>
                                              <span class="star active"><i class="fas fa-star"></i></span>
                                              <span class="star active"><i class="fas fa-star"></i></span>
                                              <span class="star mr-1"><i class="fas fa-star"></i></span>
                                              <span class="product-action-sold">${ProductList[i].countSold} đã bán</span>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="card-footer p-1 text-end">
                                      <button class="btn btn-danger">Xem chi tiết</button>
                                  </div>
                                </a>
                            </div>
                        </div>
                 `
                }
            }
            listProduct.innerHTML = ItemProduct;
        } else {
            listProduct.innerHTML = `<h2 class="h2 text-center mt-5">Sản phẩm này hiện không bán</h2>`;
        }
    }
}

DrawProductItem();
//End Draw Product

// Draw Product Sale

const DrawProductSale = () => {
    ProductList = JSON.parse(JsonProduct);

    const ProductsSale = ProductList.filter(productItem => {
        if(parseFloat(productItem.discountPercent) >= 0.3)
            return true;
        return false;
    });

    if(ProductsSale.length >= 8){
        const listProductSaleActive = 
        document.querySelector('#slider-show-product-sale .carousel-item.slider-1 .content-product-list');
        const listProductSale = document.querySelector('#slider-show-product-sale .carousel-item.slider-2 .content-product-list');
        if(listProductSaleActive){
            for(let i = 0; i < 4; i++)
                listProductSaleActive.innerHTML += `
                <div class="col-lg-3" style="padding: 5px;">
                    <div class="card">
                        <a href="../html/chitietsanpham.html?product_id=${ProductsSale[i].id}" class="text-dark">
                        <div class="card-header">
                            <img src=${ProductsSale[i].thumbnail[0]} alt="" class="card-img-top">
                            <div class="card-sale">Giảm ${parseFloat(ProductsSale[i].discountPercent) * 100}%</div>
                        </div>
                        <div class="card-body p-2">
                            <h3>${ProductsSale[i].title} </h3>
                            <div class="list-price d-flex" style="justify-content: space-between; align-items: center;">
                                <span class="list-price-old" style="font-size: 12px;">${parseInt(ProductsSale[i].price).toLocaleString()}đ</span>
                                <span class="list-price-new d-inline-block ml-3 text-danger" style="font-size: 14px;">${(parseInt(ProductsSale[i].price) * (1 - parseFloat(ProductsSale[i].discountPercent))).toLocaleString()}đ</span>
                            </div>
                            <div class="product-action mt-2">
                                <span class="product-action-heart active"><i class="fas fa-heart"></i></span>
                                <div class="product-action-list-star">
                                    <span class="star active"><i class="fas fa-star"></i></span>
                                    <span class="star active"><i class="fas fa-star"></i></span>
                                    <span class="star active"><i class="fas fa-star"></i></span>
                                    <span class="star active"><i class="fas fa-star"></i></span>
                                    <span class="star mr-1"><i class="fas fa-star"></i></span>
                                    <span class="product-action-sold">${ProductsSale[i].countSold} đã bán</span>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
            
                `;
        }
        
        if(listProductSale){
            for(let i = 4; i < 8; i++)
            listProductSale.innerHTML += `
            <div class="col-lg-3" style="padding: 5px;">
                <div class="card">
                    <a href="../html/chitietsanpham.html?product_id=${ProductsSale[i].id}" class="text-dark">
                    <div class="card-header">
                        <img src=${ProductsSale[i].thumbnail[0]} alt="" class="card-img-top">
                        <div class="card-sale">Giảm ${parseFloat(ProductsSale[i].discountPercent) * 100}%</div>
                    </div>
                    <div class="card-body p-2">
                        <h3>${ProductsSale[i].title} </h3>
                        <div class="list-price d-flex" style="justify-content: space-between; align-items: center;">
                            <span class="list-price-old" style="font-size: 12px;">${parseInt(ProductsSale[i].price).toLocaleString()}đ</span>
                            <span class="list-price-new d-inline-block ml-3 text-danger" style="font-size: 14px;">${(parseInt(ProductsSale[i].price) * (1 - parseFloat(ProductsSale[i].discountPercent))).toLocaleString()}đ</span>
                        </div>
                        <div class="product-action mt-2">
                            <span class="product-action-heart active"><i class="fas fa-heart"></i></span>
                            <div class="product-action-list-star">
                                <span class="star active"><i class="fas fa-star"></i></span>
                                <span class="star active"><i class="fas fa-star"></i></span>
                                <span class="star active"><i class="fas fa-star"></i></span>
                                <span class="star active"><i class="fas fa-star"></i></span>
                                <span class="star mr-1"><i class="fas fa-star"></i></span>
                                <span class="product-action-sold">${ProductsSale[i].countSold} đã bán</span>
                            </div>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        
            `;
        }

    }
    
}

DrawProductSale();

// End Draw Product Sale




const wrapNotifyCart = document.querySelector('.wrap__notify-cart');

let listCart = [];
let listCartJSON = localStorage.getItem("cart");
if (!listCartJSON) {
    localStorage.setItem("cart", JSON.stringify(listCart));
    listCartJSON = localStorage.getItem("cart");
}


const DrawCart = (listCart) => {
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
}



const deleteCart = (listCart) => {
    const listBtnDelete = document.querySelectorAll('.wrap__item-notify-nav a');
    listBtnDelete.forEach(deleted => {
        deleted.addEventListener('click', () => {
            const productId = deleted.getAttribute('product-id');

            // Xóa trên giao diện
            const parrentCartItem = deleted.closest('.wrap__item-notify-nav');
            wrapNotifyCart.removeChild(parrentCartItem);
            // Hết xóa trên giao diện

            //Xóa trên cart ở localStor

            listCart = listCart.filter(cartItem => cartItem.id != productId);

            localStorage.setItem("cart", JSON.stringify(listCart));
            //Hết xóa trên cart ở localStor
        })
    })
}

listCart = JSON.parse(listCartJSON);
if (listCart.length > 0) {
    DrawCart(listCart);

    // Xoá giỏ hàng
    deleteCart(listCart);
    // Hết xóa giỏ hàng
} else {
    // Vẽ giao diện thông báo không có sản phẩm nào trong giỏ hàng
    wrapNotifyCart.innerHTML += `
        <div>
            <img class = " mt-2 mb-2" style = 'width:50px;' src="../img/icons8-fast-cart-96.png" alt="">
            <h6 style = "color:#c3c3c3;">Giỏ hàng của bạn đang trống</h6>
        </div>
        `;
}




// Xử lý link liên kết các trang chi tiết sản phẩm
const listCartItemLink = document.querySelectorAll('.wrap__notify-cart .wrap__item-notify-nav div[style="width: 52%"]');
const linkReLoad = () => {
    if (listCartItemLink) {
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


