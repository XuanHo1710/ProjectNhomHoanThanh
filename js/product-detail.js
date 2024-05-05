const JsonProduct = localStorage.getItem("productTest");
const ProductList = JSON.parse(JsonProduct);

const productId = window.location.href.split('?')[1].split('=')[1];

const ProductItem = ProductList.filter((product) => productId == product.id)[0];

// Vẽ giao diện bên caroulse
const carousel = document.querySelector('#carouselExampleControls .carousel-inner');
const wrapImg = document.querySelector('.wrap_list-item-img');

carousel.innerHTML =`
        <div class="carousel-item active">
            <img src=${ProductItem.thumbnail[0]} class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src=${ProductItem.thumbnail[1]} class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src=${ProductItem.thumbnail[2]} class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src=${ProductItem.thumbnail[3]} class="d-block w-100" alt="...">
        </div>
`

ProductItem.thumbnail.forEach((img, index) => {
    wrapImg.innerHTML += `
        <div class="wrap1_img-item">
            <div type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="${index}"
            aria-current="true" aria-label="Slide ${index}" class="wrap_img-item">
                <img class="img_bottom-carousel" src=${img} alt="">
            </div>
        </div>
    `

})
// Hết vẽ giao diện bên caroulse

const cardTitle = document.querySelector('.card-title');
cardTitle.innerHTML = `${ProductItem.title}`

// Đổ dữ liệu vào thông số
const wrapType = document.querySelector('.wrap__types .row');
ProductItem.description.configuration.forEach(cfg => {
    wrapType.innerHTML += `
    <div class="col-4 c4-addcss">
        <div class="ctn-info-other">
            <strong>
                ${cfg.gen} <br>${cfg.ram_rom} <br>${cfg.type}
            </strong>
            <p class="price-style">${cfg.price} đ</p>
        </div>
    </div>
    ` 
});

wrapType.innerHTML += `
<div class="col">
    <p>Chọn màu để xem</p>
    <div class="wrap__chose-color-img">
    <img src="../img/gh-cr0.webp" style="width: 50px;" alt="">
    <p class="chose-color-pc ms-1">Đen</p>
    </div>
</div>
`
// Hết đổ dữ liệu vào thông số


// Đổ dữ liệu phần mô tả sản phẩm
const outstanding = document.querySelector('.Outstanding');
outstanding.innerHTML = `
    <ul>
        <li>Thiết kế laptop sang trọng thích hợp giúp bạn bỏ vào balo mang theo bên mình
        </li>
        <li>CPU Intel Core i5-11400H cho phép bạn thỏa thích chiến các tựa game nặng</li>
        <li>Ổ cứng SSD 512GB giúp bạn lưu trữ nhiều thông tin, dữ liệu mà không cần sao chép
            quá USB
        </li>
        <li>Màn hình 15.6 inch cùng tính năng chống lóa sẽ bảo vệ mắt của bạn trong quá
            trình chơi
            game</li>
        <li>Trang bị nhiều cổng kết nối giúp quá trình nhận và chia sẻ dữ liệu trở nên dễ
            dàng,
            thuận tiện</li>
    </ul>
    <h2>Predator Triton 500 SE PT516-52s-75E3</h2>
    <p style="text-align: justify;">Là sản phẩm được thiết kế với những ưu điểm nổi bật về hiệu năng vô cùng mạnh mẽ và ấn tượng.
    Bên cạnh đó, laptop sở hữu vẻ ngoài vô cùng nhỏ gọn và tinh tế giúp cho các game thủ
    thuận
    tiện hơn trong việc di chuyển. Chắc chắn rằng đây sẽ là sản phẩm </p>
    <p class="text-center">
        <img src=${ProductItem.description.thumbnailDescription[0]} style="width: 60%;" alt="">
    </p>
    <h2>DUY TRÌ HIỆU SUẤT TỐI ĐA</h2>
    <p style="text-align: justify;">Duy trì nhiệt độ thấp trong sức nóng của trận chiến. Công nghệ 5th Gen AeroBlade™ 3D
    Fan, mỡ
    tản nhiệt kim loại lỏng và ống dẫn nhiệt vector duy trì hiệu suất cao nhất, ngay cả
    khi cuộc
    rượt đuổi trở nên căng thẳng.</p>
    <p style="text-align: center;">
        <img src=${ProductItem.description.thumbnailDescription[1]} style="width: 100%" alt="">
    </p>
    <h2>NVIDIA® GEFORCE RTX™ 40 SERIES</h2>
    <p style="text-align: justify;">GPU máy tính xách tay NVIDIA® GeForce RTX™ 40 Series có tốc độ vượt trội dành cho các
    game
    thủ và nhà sáng tạo nội dung. Chúng được trang bị kiến trúc NVIDIA Ada Lovelace cực
    kỳ hiệu
    quả, mang lại bước nhảy vọt về cả hiệu suất và đồ họa do AI hỗ trợ.</p>
    <p style="text-align: center;">
        <img src=${ProductItem.description.thumbnailDescription[2]} style="width: 100%" alt="">
    </p>

    <h2>THẾ GIỚI ĐẦY ÁNH SÁNG</h2>
    <p style="text-align: justify;">Hòa mình vào khung cảnh rộng lớn 18 inch được chiếu sáng bằng đèn neon với tỷ lệ
    khung hình
    16:10. WQXGA1 hoạt động ở tần số làm mới 240Hz nhanh như chớp1 trong khi gam màu
    DCI-P3
    100%1 mang đến cho bạn trải nghiệm màu sắc chân thực. Hỗ trợ NVIDIA® G-SYNC® và
    Advanced
    Optimus giúp khung hình của bạn hoàn hảo và không bị rách hình.</p>
    <p style="text-align: center;">
        <img src=${ProductItem.description.thumbnailDescription[3]} style="width: 100%" alt="">
    </p>



`
// Hết đổ dữ liệu phần mô tả sản phẩm


// Xử lý đổ dữ liệu vào cart

const wrapButtonCart = document.querySelector('.wrap__button-cart');
wrapButtonCart.innerHTML = `
    <button class="	btn btn-outline-danger" btn-type='buy' productId=${ProductItem.id}>
        Mua ngay
    </button>
    <button class="btn btn-outline-secondary" btn-type='add-cart' productId=${ProductItem.id}>
        Thêm vào giỏ
    </button>
`;

const listWrapButtonCart = document.querySelectorAll('.wrap__button-cart button');

const wrapNotifyCart = document.querySelector('.wrap__notify-cart');
const DrawCart = (listCart) => {
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
            
            listCart = listCart.filter(cartItem => cartItem.id !== productId);

            localStorage.setItem("cart", JSON.stringify(listCart));
            //Hết xóa trên cart ở localStor
        })
    })
}

let listCart = [];
let listCartJSON = localStorage.getItem("cart");
if(!listCartJSON){
    localStorage.setItem("cart", JSON.stringify(listCart));
    listCartJSON = localStorage.getItem("cart");
}

listCart = JSON.parse(listCartJSON);


DrawCart(listCart);
deleteCart(listCart);

listWrapButtonCart.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('btn-type');
        const productId = btn.getAttribute('productId');
        if(type == 'buy'){
            // Đợi quang huy đưa giao diện rồi xử lý
            listCart = JSON.parse(localStorage.getItem("cart"));
            ProductItem.quantity  = 1; // 1 Sản phẩm được thêm vào
            let ok = 0; // Tìm sản phẩm thêm bị trùng nếu trùng thì tăng số lượng
            listCart.forEach(cartItem => {
                if(cartItem.id == productId)
                    {
                        cartItem.quantity += 1;
                        ok = 1;
                    }
            });

            if(ok == 0){
                listCart.push(ProductItem);
            }

            localStorage.setItem("cart", JSON.stringify(listCart));

            window.location.href = "../html/dathang.html";

        } else if (type == 'add-cart'){
            alert('Đã thêm vào giỏ hàng');

            // Đảm bảo dữ liệu động
            listCart = JSON.parse(localStorage.getItem("cart"));
            ProductItem.quantity  = 1; // 1 Sản phẩm được thêm vào
            let ok = 0; // Tìm sản phẩm thêm bị trùng nếu trùng thì tăng số lượng
            listCart.forEach(cartItem => {
                if(cartItem.id == productId)
                    {
                        cartItem.quantity += 1;
                        ok = 1;
                    }
            });


            if(ok == 0){
                listCart.push(ProductItem);
            }

            localStorage.setItem("cart", JSON.stringify(listCart));
            DrawCart(listCart);
            deleteCart(listCart);
        }
    })
})


// Hết xử lý đổ dữ liệu vào cart


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

