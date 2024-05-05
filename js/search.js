// Kết quả tìm kiếm
const inputGroupResult = document.querySelector('.input-group-result');
const inputSearch = document.querySelector('input[aria-label="Username"]');
const listProductFind = JSON.parse(localStorage.getItem('productTest'));



inputSearch.onkeyup = function(){
    const resultListProduct = listProductFind.filter(product => {
        const keywordRegex = new RegExp(inputSearch.value, 'i');
        if(product.title.match(keywordRegex))
            return true;
        return false;
    })

    inputGroupResult.innerHTML = ``;
    if(resultListProduct.length > 0){
        resultListProduct.forEach(productMini => {
            inputGroupResult.innerHTML += `
                <a href="../html/chitietsanpham.html?product_id=${productMini.id}" class="input-group-result-item d-flex">
                    <img src=${productMini.thumbnail[0]} alt="" class="w-25">
                    <div class="input-group-result-detail text-dark">
                        <h5>${productMini.title}</h5>
                        <p>Giá: <span style="color: red;">${parseInt(productMini.price).toLocaleString()}đ</span></p>
                    </div>
                </a>   
            `;
        })
    } else inputGroupResult.innerHTML = `<h5 class="d-flex" style="align-items: center; justify-content: center;">Not Found</h5>`;
};

inputSearch.addEventListener('click', () => {
    inputGroupResult.classList.toggle('show');
    
})


// End kết quả tìm kiếm