import { isUtf8 } from "buffer";
import express, { json } from "express"
import fs from "fs/promises";
import path, { parse } from "path";
import url from "url";

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


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
})








app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});