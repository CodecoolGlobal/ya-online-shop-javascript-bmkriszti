import { isUtf8 } from "buffer";
import express, { json } from "express"
import fs from "fs/promises";
import path, { parse } from "path";
import url from "url";

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
const app = express()
app.use(express.json());

app.use(express.static(path.join(dirname, "../frontEnd")));


app.get("/api/bath", async (req, res) => {
    try {
        const data = await fs.readFile("./data.json", "utf-8")
        const parseData = JSON.parse(data)
        res.send(parseData)

    } catch (error) {
        console.log(error + "Error, cannot get api/bath")
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const productsId = parseInt(req.params.id);
        const data = await fs.readFile('./data.json', 'utf8');
        const products = JSON.parse(data);
        const updatedProduct = products.filter(bomb => bomb.id !== productsId);
        if (updatedProduct.length !== products.length) {
            await fs.writeFile('./data.json', JSON.stringify(updatedProduct), 'utf8');
            res.status(200).json({ state: 'DONE' });
        } else {
            res.status(404).json({ state: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ state: 'Error deleting product' });
    }
});


app.post('/api/products', async (req, res) => {
    try {
        const unparsedData = await fs.readFile("./data.json", 'utf8')
        const parsedData = JSON.parse(unparsedData)

        console.log(parsedData);

        parsedData.push({
            id: parseInt(req.body.id),
            name: req.body.name,
            description: req.body.description,
            size: req.body.size,
            price: req.body.price,
            ingredients: req.body.ingredients,
            quantity: req.body.quantitity,
            picture: req.body.picture
        }
        )
        await fs.writeFile("./data.json", JSON.stringify(parsedData))

        res.json({})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Ups, unexpected error" })
    }
})



app.get('/client', async (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
  });





app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});

