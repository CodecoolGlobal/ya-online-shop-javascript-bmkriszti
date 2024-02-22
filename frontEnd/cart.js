document.addEventListener('DOMContentLoaded', () => {
    const productsInCart = JSON.parse(localStorage.getItem('productsInCart'));

    if (productsInCart && productsInCart.length > 0) {
        const parsedProductsInCart = productsInCart.map(product => JSON.parse(product));

        const cartHtml = (product)=>{
            let HTML = ``
            let totalPrice = 0;

            product.forEach(p=>{
                HTML+= `
                    <h2>${p.name}</h2>
                    <p>Price: ${p.price} Ft</p>
                `
                totalPrice += parseInt(p.price);
            })
            HTML += `<h3>Total Price: ${totalPrice} Ft</h3>`;
            return HTML;
        }
        document.getElementById('cart-container').insertAdjacentHTML('beforeend', cartHtml(parsedProductsInCart)+ `<button id='checkout'>Check out here</button>`);
    } else {
        document.getElementById('cart-container').innerHTML = "<p>No products in cart.</p>";
    }

    
    document.getElementById('cart-container').addEventListener('click', (event) => {
        if (event.target.id === 'checkout') {
            const confirmation = confirm('Thank you for visiting our online shop. Please note that this is a test page for demonstration purposes, and no actual purchases have been made. We appreciate your interest in our products and hope you enjoyed browsing our selection. If you have any questions or feedback, feel free to contact us. Thank you for your money though.');
            
            
            if (confirmation) {
                window.location.href = '/client'; 
            }
        }
    });
});
