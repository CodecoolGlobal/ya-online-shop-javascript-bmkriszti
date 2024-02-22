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
    document.getElementById('cart-container').insertAdjacentHTML('beforeend', cartHtml(parsedProductsInCart) + `<button id='checkout'>Check out here</button>`)
    document.getElementById('checkout').addEventListener('click', ()=>{
        window.alert('Thank you for visiting our online shop. Please note that this is a test page for demonstration purposes, and no actual purchases have been made. We appreciate your interest in our products and hope you enjoyed browsing our selection. If you have any questions or feedback, feel free to contact us. Thank you for your money though.')
    } )
})
