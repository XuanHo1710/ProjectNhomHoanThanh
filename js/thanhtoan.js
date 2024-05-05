const btnAccept = document.querySelector('.btn-accept-js');

const listInputRadio = document.querySelectorAll('input[type="radio"]');

const infor = JSON.parse(localStorage.getItem('infor'));
console.log(infor)

const orderSecondName = document.querySelector('.order-second span strong');
orderSecondName.innerHTML = `${infor.name}`;

const orderInfor = document.querySelector('.order-second .p-2 p.my-2');
orderInfor.innerHTML = `
    <span class="mx-2">•</span>
    <strong>Người nhận hàng:</strong>
    Anh ${infor.name}, ${infor.phone}
`;

const totalDue = document.querySelector('.order-second .p-2 p.my-2 span.text-danger');
totalDue.innerHTML = `${infor.total}`;


btnAccept.addEventListener('click', () => {
    let ok = 0;
    listInputRadio.forEach(radio => {
        if(radio.checked)
        {
            ok = 1;
            const containerBody = btnAccept.closest('article');
            containerBody.innerHTML = `
            <div class="d-flex" style="justify-content: center; align-items: center; padding: 250px 0">
                <h1 style="font-size: 100px">Chúc mừng bạn đã bị SCAM </h1>
            </div>
            `;

            // Xóa giỏ hàng khi đặt hàng thành công
            localStorage.setItem("cart", JSON.stringify([]));

            localStorage.removeItem("infor");
        
            setTimeout(() => {
                window.location.href = "../html/sanpham.html";
            }, 5000)
        } 
    })

    if(ok == 0){
        alert("Bạn phải chọn hình thức thanh toán trước đã !!!");
    }
})

const orderListProduct = document.querySelector('.order-list-product');
listCart.forEach(cartItem => {
    orderListProduct.innerHTML += `
    <div class="order-product-item">
        <p class="fw-semibold fs-14px">Giao trước 12h00 Ngày mai (5/04)</p>
        <div class="d-flex">
            <a href="../html/chitietsanpham.html?product_id=${cartItem.id}"><img src=${cartItem.thumbnail[0]} alt=""
                    style="height:80px; width: 75px;">
            </a>
            <a href="../html/chitietsanpham.html?product_id=${cartItem.id}" class="pt-2 text-decoration-none text-dark fs-14px ms-3"
                style="font-weight: 600;">
                ${cartItem.title}
            </a>
        </div>
        <div class="d-flex ms-5">
            <p style="margin-left: 41px;">Màu: đen</p>
            <p class="ms-5">Số lượng: ${cartItem.quantity}</p>
        </div>
    </div>
    `
}) 



