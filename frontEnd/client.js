let productsInCart = []

async function fetchAndDisplayClientPage() {
    try {
        const response = await fetch('/api/bath')
        const products = await response.json()

        console.log(products)

        products.forEach(product => {
            const productHtml = `
        <div class='cart' id="${product.id}">
            <h2>${product.name}</h2>
            <p>Description: ${product.description}</p>
            <p>Size: ${product.size}</p>
            <p>Price: ${product.price}</p>
            <p>Ingredients: ${product.ingredients}</p>
            <p>Quantity: ${product.quantity}</p>
            <img src="${product.picture}" alt="${product.name} Image">
            <button class="addToCart" value='${JSON.stringify(product)}'>Add to cart</button>
        </div>
            `
            document.getElementById('p-container').insertAdjacentHTML('beforeend', productHtml)

        });
        document.querySelectorAll('.addToCart').forEach(button => {
            button.addEventListener('click', () => {
                const productData = button.value;
                addToCart(productData);
             
                document.getElementById('cart-container').innerHTML = ''
                let totalPrice = 0
                productsInCart.forEach(data => {
                    const product = JSON.parse(data)
                    document.getElementById('cart-container').insertAdjacentHTML('beforeend', nicerCart(product))
                    totalPrice += parseInt(product.price)
                })
                document.getElementById('cart-container').insertAdjacentHTML('beforeend', `<h3>Total Price: ${totalPrice}</h3>
                                                                                            <button id="buy">Go to cart</button>`);
                document.getElementById('buy').addEventListener('click', ()=>{
                    window.location.href = 'http://localhost:8080/cart'
                })
            });
        })
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

fetchAndDisplayClientPage()

function addToCart(product) {
    productsInCart.push(product);

localStorage.setItem('productsInCart', JSON.stringify(productsInCart)); 
}

function nicerCart(product) {
    let productHTML = ''

    productHTML += `
    <h2>${product.name}</h2>
    <p>Price: ${product.price}</p>
`;

return productHTML;
}

