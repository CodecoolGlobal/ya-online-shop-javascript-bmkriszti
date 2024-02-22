document.addEventListener('DOMContentLoaded', () => {
    const productsInCart = JSON.parse(localStorage.getItem('productsInCart'));

    

    if (productsInCart && productsInCart.length > 0) {
        const parsedProductsInCart = productsInCart.map(product => JSON.parse(product));

        const cartHtml = (products) => {
            let HTML = '';
            let totalPrice = 0;

            products.forEach(product => {
                HTML += `
                    <div class='cart' id="${product.id}">
                        <h2>${product.name}</h2>
                        <p>Price: ${product.price}Ft</p>
                    </div>
                `;
                totalPrice += parseInt(product.price);
            });

            HTML += `<h3>Total Price: ${totalPrice}Ft</h3>`;
            return HTML;
        }

        document.getElementById('cart-container').insertAdjacentHTML('beforeend', cartHtml(parsedProductsInCart));
    } else {
        document.getElementById('cart-container').innerHTML = "<p>No products in cart.</p>";
    }
});
