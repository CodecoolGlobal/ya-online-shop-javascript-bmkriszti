const fetchTheProducts = async function () {
    try {
        const response = await fetch('/api/bath')
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
            <button id="addToCart">Add to cart</button>
        `;
            productContainer.appendChild(productsDiv)
        })
    } catch (error) {
        console.log(error)
        alert(error)
    }
}    

fetchTheProducts()

// async function fetchClient() {
//     try {
//         const response = await fetch(`http://localhost:8080/client`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const products = await response.json()

//         console.log(products)

//         const productContainer = document.getElementById('container')

//         products.forEach(product => {
//             const productsDiv = document.createElement('div')
//             productsDiv.classList.add('product')
//             productsDiv.innerHTML = `
//             <h2>${product.name}</h2>
//             <p>Description: ${product.description}</p>
//             <p>Size: ${product.size}</p>
//             <p>Price: ${product.price}</p>
//             <p>Ingredients: ${product.ingredients}</p>
//             <p>Quantity: ${product.quantity}</p>
//             <img src="${product.picture}" alt="${product.name} Image">
//             <button id="addToCart">Add to cart</button>
//         `;
//             productContainer.appendChild(productsDiv)
//         })
//     } catch (error) {
//         console.log(error)
//         alert(error)
//     }
// }



// fetchClient()