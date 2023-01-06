import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const usuarios = [];
const tweetes = [];

app.post('/sign-up', (req, res) => {
    const usuario = req.body;
    usuarios.push(usuario);
    res.send("OK");

});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    if(usuarios.find(u => u.username === tweet.username)){
        tweetes.push(tweet);
        res.send("OK");
    }else{
        res.send("UNAUTHORIZED");
    }
});
app.listen(5000, () => {console.log("Rodando...")});