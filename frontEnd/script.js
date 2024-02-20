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
                    <button class="edit" data-bombid="${bomb.name}">Edit</button>
                    <button class="delete" data-bombid="${bomb.name}">Delete</button>
                </li>
            `);
        return `<ul>${liElements.join('')}</ul>`;
    } catch (error) {
        console.error(`Error creating HTML: ${error.message}`);
        throw error;
    }
};

const main = async () => {
    const rootElement = document.getElementById("root");
    try {
        const bathBombHTML = await renderBathBombHTML();
        rootElement.insertAdjacentHTML("beforeend", bathBombHTML);
    } catch (error) {
        console.error(`Error in main: ${error.message}`);
    }
};

// const renderBombList = async () => {
//     const users = await fetchData("http://localhost:8080/api/bath");
//     userListElement.innerHTML = await usersHTML(users);
//     userListElement.addEventListener('click', handleUserListClick);
// };

// const handleUserListClick = async (event) => {
//     const target = event.target;
//     const userId = target.dataset.userid;
//     if (target.classList.contains('delete')) {
//         // Handle delete button click
//         await deleteUserData(userId);
//         awaBomb();

//     }
// }

// const populateEditForm = (userData) => {
//     // Populate the edit form with the user data
//     editUserForm.querySelector('#editFirstName').value = userData.name.first;
//     editUserForm.querySelector('#editMiddleName').value = userData.name.middle;
//     editUserForm.querySelector('#editLastName').value = userData.name.last;
//     editUserForm.querySelector('#editEmail').value = userData.email;
//     editUserForm.querySelector('#editShippingCountry').value = userData.shipping.country;
//     editUserForm.querySelector('#editShippingZip').value = userData.shipping.zip;
//     editUserForm.querySelector('#editShippingCity').value = userData.shipping.city;
//     editUserForm.querySelector('#editShippingAddress').value = userData.shipping.address;
//     editUserForm.querySelector('#editInvoiceCountry').value = userData.invoice.country;
//     editUserForm.querySelector('#editInvoiceZip').value = userData.invoice.zip;
//     editUserForm.querySelector('#editInvoiceCity').value = userData.invoice.city;
//     editUserForm.querySelector('#editInvoiceAddress').value = userData.invoice.address;
//     // Set a data attribute on the edit form to store the user ID
//     editUserForm.dataset.userid = userData.id;
// };

// const handleEditUserSubmit = async (e) => {
//     e.preventDefault();
//     const userId = editUserForm.dataset.userid; // Correctly extract the user ID
//     const updatedUser = {
//         id: parseInt(userId),
//         name: {
//             first: e.target.querySelector('#editFirstName').value,
//             middle: e.target.querySelector('#editMiddleName').value,
//             last: e.target.querySelector('#editLastName').value,
//         },
//         email: e.target.querySelector('#editEmail').value,
//         shipping: {
//             country: e.target.querySelector('#editShippingCountry').value,
//             zip: e.target.querySelector('#editShippingZip').value,
//             city: e.target.querySelector('#editShippingCity').value,
//             address: e.target.querySelector('#editShippingAddress').value,
//         },
//         invoice: {
//             country: e.target.querySelector('#editInvoiceCountry').value,
//             zip: e.target.querySelector('#editInvoiceZip').value,
//             city: e.target.querySelector('#editInvoiceCity').value,
//             address: e.target.querySelector('#editInvoiceAddress').value,
//         },
//     };
//     try {
//         let method;

//         if (userId) {
//             // If userId is present, it's an existing user, decide between PUT and PATCH
//             method = 'PATCH'; // Change this to 'PATCH' if needed
//         } else {
//             // If userId is not present, it's a new user creation (POST)
//             method = 'POST';
//         }

//         const response = await fetch(`/api/users${userId ? `/${userId}` : ''}`, {
//             method,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedUser),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('User updated/created successfully:', result);

//         // Call a function to update the UI or handle the result as needed

//     } catch (error) {
//         console.error('Error updating/creating user:', error.message);
//     }
// };


// const deleteUserData = async (userId) => {

//     await fetch(`http://localhost:8080/api/users/${userId}`, { method: 'DELETE' });
// };


// const handleAddUserSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const jsonData = {
//         name: {
//             first: formData.get('first'),
//             middle: formData.get('middle'),
//             last: formData.get('last'),
//         },
//         email: formData.get('email'),
//         shipping: {
//             country: formData.get('addShippingCountry'),
//             zip: formData.get('addShippingZip'),
//             city: formData.get('addShippingCity'),
//             address: formData.get('addShippingAddress'),
//         },
//         invoice: {
//             country: formData.get('addInvoiceCountry'),
//             zip: formData.get('addInvoiceZip'),
//             city: formData.get('addInvoiceCity'),
//             address: formData.get('addInvoiceAddress'),
//         },
//     };

//     try {
//         const response = await fetch('/api/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(jsonData),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const newUser = await response.json();
//         console.log('New user created successfully:', newUser);

//         // Handle UI updates or redirection if needed

//     } catch (error) {
//         console.error('Error creating new user:', error.message);
//     }
// };


// const formDataToObject = (formData) => {
//     const object = {};
//     formData.forEach((value, key) => {
//         object[key] = value;
//     });
//     return object;
// };


window.addEventListener("load", main);
