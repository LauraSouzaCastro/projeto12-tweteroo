import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const usuarios = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const usuario = req.body;
    if (!usuario.username || !usuario.avatar || typeof usuario.username !== "string" || typeof usuario.avatar !== "string") {
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    usuarios.push(usuario);
    res.status(201).send("OK");
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    const user = req.headers.user;
    if (!user || !tweet.tweet || typeof user !== "string" || typeof tweet.tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (usuarios.find(u => u.username === user)) {
        tweets.push({ username: user, tweet: tweet.tweet });
        res.status(201).send("OK");
    } else {
        res.status(401).send("UNAUTHORIZED");
    }
});

app.get('/tweets', (req, res) => {
    const page = parseInt(req.query.page);
    if (page && page >= 1) {
        let ultimosTweets = [];
        if (tweets.length <= 10) {
            ultimosTweets = tweets;
        } else {
            ultimosTweets = tweets.slice(tweets.length - (10*page), tweets.length - (10*(page-1)));
        }
        const tweetsAvatar = ultimosTweets.map(t => {
            const usuario = usuarios.find(u => u.username === t.username);
            return { username: t.username, avatar: usuario.avatar, tweet: t.tweet };
        });
        res.send(tweetsAvatar);
    } else {
        res.status(400).send("Informe uma página válida!");
    }
    let ultimosTweets = [];
    if (tweets.length <= 10) {
        ultimosTweets = tweets;
    } else {
        ultimosTweets = tweets.slice(tweets.length - 10, tweets.length);
    }
    const tweetsAvatar = ultimosTweets.map(t => {
        const usuario = usuarios.find(u => u.username === t.username);
        return { username: t.username, avatar: usuario.avatar, tweet: t.tweet };
    });
    res.send(tweetsAvatar);
});

app.get('/tweets/:USERNAME', (req, res) => {
    const name = req.params.USERNAME;
    let tweetsUsuario = tweets.filter(t => t.username === name);
    const tweetsAvatar = tweetsUsuario.map(t => {
        const usuario = usuarios.find(u => u.username === t.username);
        return { username: t.username, avatar: usuario.avatar, tweet: t.tweet };
    });
    let ultimosTweets = [];
    if (tweetsAvatar.length <= 10) {
        ultimosTweets = tweetsAvatar;
    } else {
        ultimosTweets = tweetsAvatar.slice(tweetsAvatar.length - 10, tweetsAvatar.length);
    }

    res.send(ultimosTweets);
});
app.listen(5000, () => { console.log("Rodando...") });