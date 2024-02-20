
const userListElement = document.getElementById('root');
const addBombForm = document.getElementById('addBombForm');
const editBombForm = document.getElementById('editBombForm');


const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        throw error;
    }
};

const renderBathBombHTML = async () => {
    try {
        const bombs = await fetchData("/api/bath");
        const liElements = bombs.map(bomb => `
    <li>
        <span>
        <p>Product name: ${bomb.name}</p>
        <p>Product id: ${bomb.id}</p>
        <p>Product price: ${bomb.price}</p>
        </span>
        <button class="edit" data-bombid="${bomb.id}">Edit</button>
        <button class="delete" data-bombid="${bomb.id}">Delete</button>
    </li>
`);
        return `<ul>${liElements.join('')}</ul>`;
    } catch (error) {
        console.error(`Error creating HTML: ${error.message}`);
        throw error;
    }
};

document.querySelector("#addBombForm").addEventListener("submit", async (e) => {
    try {
        e.preventDefault()

        let sendThis = {
            id: document.getElementById("addId").value,
            name: document.getElementById("addName").value,
            description: document.getElementById("addDescription").value,
            size: document.getElementById("addSize").value,
            price: document.getElementById("addPrice").value,
            ingredients: document.getElementById("addIngredients").value,
            quantity: document.getElementById("addQuantity").value,
            picture: document.getElementById("addPicture").value
        }
        const resp = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendThis)
        })
        const respData = await resp.json()
        // alert(respData.message)
    } catch (error) {
        // alert(error)
    }
})


const main = async () => {
    const rootElement = document.getElementById("root");
    try {

        const bathBombHTML = await renderBathBombHTML();
        rootElement.insertAdjacentHTML("beforeend", bathBombHTML);
    } catch (error) {
        console.error(`Error in main: ${error.message}`);
    }
};

const renderBombList = async () => {
    const users = await fetchData("http://localhost:8080/api/bath");
    userListElement.innerHTML = await renderBathBombHTML();
};


const handleProductListClick = async (event) => {
    const target = event.target;
    const bombId = target.dataset.bombid;
    console.log("Clicked bombId:", bombId);

    if (target.classList.contains('edit')) {
        try {
            const productData = await editProductData(bombId);
            console.log(productData)
            populateEditForm(productData);
        } catch (error) {
            console.error('Error handling edit click:', error.message);
        }
    } else if (target.classList.contains('delete')) {
        await deleteUserData(bombId);
        await renderBombList();
    }
};

const populateEditForm = (product) => {
    if (product) {
        editBombForm.querySelector('#editId').value = product.id;
        editBombForm.querySelector('#editName').value = product.name;
        editBombForm.querySelector('#editDescription').value = product.description;
        editBombForm.querySelector('#editSize').value = product.size;
        editBombForm.querySelector('#editPrice').value = product.price;
        editBombForm.querySelector('#EditIngredients').value = product.ingredients;
        editBombForm.querySelector('#EditQuantity').value = product.quantity;
        editBombForm.querySelector('#EditPicture').value = product.picture;
        editBombForm.dataset.bombid = product.id;
    } else {
        console.log('Product data not found');
    }
};

const editProductData = async (bombId, updatedProduct) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${bombId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const productData = await response.json();
        return productData;
    } catch (error) {
        console.error(`Error updating product data: ${error.message}`);
        throw error;
    }
};

const deleteUserData = async (bombId) => {
    await fetch(`http://localhost:8080/api/products/${bombId}`, { method: 'DELETE' });
};

const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    const productId = editBombForm.dataset.bombid;
    console.log(productId)
    const updatedProduct = {
        id: parseInt(productId),
        name: e.target.querySelector('#editName').value,
        description: e.target.querySelector('#editDescription').value,
        size: e.target.querySelector('#editSize').value,
        price: e.target.querySelector('#editPrice').value,
        ingredients: e.target.querySelector('#EditIngredients').value,
        quantity: e.target.querySelector('#EditQuantity').value,
        picture: e.target.querySelector('#EditPicture').value,
    };
    try {
        let method;
        if (productId) {
            method = 'PATCH';
        }
        const response = await fetch(`/api/products/${productId ? `${productId}` : ''}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Product updated/created successfully:', result);
    } catch (error) {
        console.error('Error updating/creating product:', error.message);
    }
};


const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return object;
};

window.addEventListener("load", async () => {
    await renderBombList();
    userListElement.addEventListener('click', handleProductListClick);
    editBombForm.addEventListener('submit', handleEditUserSubmit)
});

window.addEventListener("load", main);