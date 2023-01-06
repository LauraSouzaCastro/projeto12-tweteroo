import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const usuarios = []

app.post('/sign-up', (req, res) => {
    const usuario = req.body
    usuarios.push(usuario);
    console.log(usuarios)
    res.send("OK");

});
app.listen(5000, () => {console.log("Rodando...")});