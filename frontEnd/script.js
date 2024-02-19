const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        return data

    } catch (error) {
        console.error(`Error Fetching data: ${error.message}`);
        throw error
    }
}

const main = async () => {
    const response = await fetch("/api/bath")
    const bombs = await response.json()
    const rootElement = document.getElementById("root")
    try {
        rootElement.insertAdjacentHTML("beforeend", bathBombHTML(bombs))
    } catch (error) {
        console.error(`Error in main: ${error.message}`);
    }
};

const bathBombHTML = async () => {
    try {
        const bombs = await fetchData("/api/bath");
        const liElements = bombs.map(bomb => `
                <li>
                    <span>${bomb.name}</span>
                    <button class="edit" data-bombid="bomb">Edit</button>
                    <button class="delete" data-bombid="bomb">Delete</button>
                </li>
            `);
        return `<ul>${liElements.join('')}</ul>`;
    } catch (error) {
        console.error(`Error creating HTML: ${error.message}`);
        throw error;
    }
};

window.addEventListener("load", main);