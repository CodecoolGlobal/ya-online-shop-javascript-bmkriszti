let productsInCart=[]


async function fetchAndDisplayClientPage(){
    try{
        const response = await fetch ('/api/bath')
        const products = await response.json()

        console.log(products)
        
        products.forEach(product => {
        const productHtml=`
        <div class='cart'>
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
                console.log(productsInCart);
                
                document.getElementById('cart-container').innerHTML = ''
                productsInCart.forEach(data=>{
                    const product = JSON.parse(data)
                    document.getElementById('cart-container').insertAdjacentHTML('beforeend', nicerCart(product))
                })
            });
        })
    }catch (error){
        console.log(error)
        alert (error)
    }
}    

fetchAndDisplayClientPage()

function addToCart(product) {
    productsInCart.push(product);
}
function nicerCart (product){
    let productHTML=''
    
        productHTML +=`
        <h2>${product.name}</h2>
        <p>Description: ${product.description}</p>
        <p>Size: ${product.size}</p>
        <p>Price: ${product.price}</p>
        <p>Ingredients: ${product.ingredients}</p>
        <p>Quantity: ${product.quantity}</p>
        <img src="${product.picture}" alt="${product.name} Image">
    `
    return productHTML
}
 export {productsInCart, fetchAndDisplayClientPage, addToCart, nicerCart};