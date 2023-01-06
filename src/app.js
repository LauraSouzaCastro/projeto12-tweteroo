import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const usuario = {username: "", avatar: ""};

app.post('/sign-up', (req, res) => {
	usuario.username = req.body.username;
    usuario.avatar = req.body.avatar;
    res.send(usuario);
});
app.listen(5000, () => {console.log("Rodando...")});