
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
        <span>${bomb.name}</span>
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


const handleUserListClick = async (event) => {
    const target = event.target;
    const bombId = target.dataset.bombid;

    console.log("Clicked bombId:", bombId); // Log the bombId to check its value

    if (target.classList.contains('delete')) {
        await deleteUserData(bombId);
        await renderBombList();
    }
};

const populateEditForm = (product) => {

    editBombForm.querySelector('#editName').value = product.name;
    editBombForm.querySelector('#editDescription').value = product.description;
    editBombForm.querySelector('#editSize').value = product.size;
    editBombForm.querySelector('#editPrice').value = product.price;
    editBombForm.querySelector('#EditIngredients').value = product.ingredients.join(', ');
    editBombForm.querySelector('#EditQuantity').value = product.quantity;
    editBombForm.querySelector('#EditPicture').value = product.picture;

    // Set a data attribute on the edit form to store the user ID
    editBombForm.dataset.userid = product.id;
};

const deleteUserData = async (bombId) => {
    await fetch(`http://localhost:8080/api/products/${bombId}`, { method: 'DELETE' });
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
    userListElement.addEventListener('click', handleUserListClick);
});

window.addEventListener("load", main);

a