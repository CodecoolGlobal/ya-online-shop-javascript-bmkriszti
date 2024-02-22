document.addEventListener('DOMContentLoaded', () => {
    const productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
    const parsedProductsInCart = productsInCart.map(products => JSON.parse(products))

    console.log(productsInCart);

    const cartHtml = (product)=>{
     let HTML = ``
        product.forEach(p=>{
            HTML+= `
            <h2>${p.name}</h2>
            <p>Price: ${p.price}</p>
        `
        })
        return HTML
    }
    document.getElementById('cart-container').insertAdjacentHTML('beforeend', cartHtml(parsedProductsInCart))
})