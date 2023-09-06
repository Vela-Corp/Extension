let html = /*html*/ `

<div class="table-box" >
<button id="showProducts">Hiện/Đóng sản phẩm</button>
<div class="box-list">
<div class="list">
</div>

</div>
</div>
`
const wrapper = document.createElement('div');
wrapper.innerHTML += html;
document.body.appendChild(wrapper);
const box = document.querySelector('.table-box');
const box_list1 = document.querySelector('.box-list');
const box_list = document.querySelector('.list');
function extractProductInfo() {
    const products = [];
    const productElements = document.querySelector('.listproduct')
    const liItems = productElements.querySelectorAll('.listproduct > .item');
    const owlStageOuter = productElements.querySelectorAll('.listproduct > .owl-stage-outer .owl-stage .item');

    // Kết hợp kết quả từ cả hai truy vấn
    const li = [...liItems, ...owlStageOuter];
    console.log(li);
    li.forEach((productElement) => {
        const name = productElement.querySelector('h3')
        const price = productElement.querySelector('strong.price:not(.twoprice)')
        const desc = productElement.querySelector('.prods-group')
        const desc2 = productElement.querySelector('.utility')
        const desc3 = productElement.querySelector('.item-compare')
        const img = productElement.querySelector('img.thumb, img:not(.thumb)');
        const product = {
            name: name || null,
            price: price || null,
            img: img || null,
            desc: desc || desc2 || desc3 || " "
        };
        // if (li.length > 0) {
        //     li.forEach((liElement) => {
        //         // Sử dụng element <li> ở đây
        //         const name = liElement.querySelector('h3')
        //         const price = liElement.querySelector('strong.price:not(.twoprice)')
        //         const desc = liElement.querySelector('.prods-group')
        //         const img = liElement.querySelector('img.thumb, img:not(.thumb)');
        //         const product = {
        //             name: name || "",
        //             price: price || "",
        //             img: img,
        //             desc: desc || ""
        //         };

        //     });
        // }
        // else {

        //     products.push(product)
        // }
        // Tạo một đối tượng sản phẩm và thêm vào mảng products
        products.push(product)
    });
    // Trả về danh sách sản phẩm
    return products;
}


const productData = extractProductInfo();
chrome.runtime.sendMessage({ products: productData });
console.log(productData);
const showProductsButton = document.getElementById('showProducts');
showProductsButton.addEventListener('click', () => {
    box_list1.classList.toggle('active');

});
productData.forEach((product, index) => {

    const productElement = document.createElement('div');
    productElement.classList.add('product');


    productElement.innerHTML = `
    <div class="product__image">
        <img src="${product?.img?.currentSrc || product?.img?.dataset?.src}" alt="${product?.name?.innerText}">
    </div>
    <div class="product__info">
        <div class="product__name">${product?.name?.innerText}</div>
        <div class="product__price">${product?.price?.innerText}</div>
    </div>
    <div class="products__desc">
    <p>${product?.desc?.innerText}</p>
    </div>
    `;
    box_list.appendChild(productElement);
});