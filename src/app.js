import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const usuarios = [];
const tweetes = [];

app.post('/sign-up', (req, res) => {
    const usuario = req.body;
    if(!usuario.username || !usuario.avatar){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    usuarios.push(usuario);
    res.status(201).send("OK");
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    if(!tweet.username || !tweet.tweet){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    if(usuarios.find(u => u.username === tweet.username)){
        tweetes.push(tweet);
        res.status(201).send("OK");
    }else{
        res.status(401).send("UNAUTHORIZED");
    }
});

app.get('/tweets', (req, res) => {
    let ultimosTweets = [];
    if(tweetes.length <= 10){
        ultimosTweets = tweetes;
    }else{
        ultimosTweets = tweetes.slice(tweetes.length-10, tweetes.length);
    }
    const tweetsAvatar = ultimosTweets.map(t => {
        const usuario = usuarios.find(u => u.username === t.username);
        return {username: t.username, avatar: usuario.avatar, tweet: t.tweet};
    });
    res.send(tweetsAvatar);
});
app.listen(5000, () => {console.log("Rodando...")});