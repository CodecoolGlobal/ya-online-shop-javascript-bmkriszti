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

window.addEventListener("load", main);
