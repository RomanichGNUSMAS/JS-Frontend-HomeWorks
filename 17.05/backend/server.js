require('dotenv').config({ quiet: true });
const express = require('express');
const fs = require('node:fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const secret = process.env.API_SECRET;

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json());


function validateData(req, res, next) {
    const { title, author, price, photo } = req.body;
    if (!title || !author || !price || !photo) {
        return res.status(401).json({ message: "please fill all inputs" })
    }
    next()
}

function validateUserData(type) {
    return function (req, res, next) {
        switch (type) {
            case "login": {
                const { email, password } = req.body;
                if (!email.trim() || !password.trim()) return res.status(401).json({ message: "please fill valid register" });
                next();
            }
            case "register": {
                const { name, email, password } = req.body;
                if(!name || !email || !password) return res.status(401).json({ message: "please fill valid register" });
                if (!name.trim() || !email.trim() || !password.trim()) return res.status(401).json({ message: "please fill valid register" });
                next();
            }
        }

    }
}

app.get('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
    res.json(data.products);
})

app.get('/products/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const { id } = req.params;
    const found = data.products.find(d => d.id == id);
    if (found) {
        return res.json(found);
    }
    res.status(404).json({ message: "product not found" });
})

app.post('/products', validateData, (req, res) => {
    const { title, author, price, photo } = req.body;
    const newObject = {
        id: Date.now(), title, author, price: +price, photo, rating: 0, comments: []
    }
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
    data.products.push(newObject);
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    res.status(201).json({ message: "successfully created" });
})

app.post('/api/regist', validateUserData('register'), (req, res) => {
    const { name, email, password } = req.body;
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
    const found = users.find(user => user.email == email);
    if(found) return res.status(409).json({ message:"the user with this mail already exists"})
    const newUser = {
        name, email, password: bcrypt.hashSync(password, 10)
    }
    users.push(newUser);
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    res.sendStatus(201);
})

app.post('/api/login', validateUserData('login'), (req, res) => {
    const { password,email } = req.body;
    const users = JSON.parse(fs.readFileSync('./users.json','utf-8'));
    const found = users.find(user => user.email == email);
    if(!found) return res.sendStatus(404)
    const compare = bcrypt.compare(password,found.password);
    if(!compare) return res.status(401).json({ message:"invalid password try again"});
    const key = jwt.sign({ email },secret);
    res.status(201).json({ message:"logged in succesfully",token:key });
})

app.post('/api/verifyKey', (req,res) => {
    const { token } = req.body;
    try {
        const verify = jwt.verify(token,secret);
        return res.status(200)
    } catch {
        res.sendStatus(403)
    }
})

app.patch('/products/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.log(id)
    const fileres = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const data = fileres.products;
    for (let i = 0; i < data.length; ++i) {
        if (data[i].id == id) {
            data[i] = {
                ...data[i], ...body
            }
            fs.writeFileSync('./data.json', JSON.stringify(fileres))
            return res.sendStatus(204);
        }
    }
    res.sendStatus(404);
})

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const found = data.products.find(d => d.id == id);
    if (!found) return res.sendStatus(404);
    const newObj = {
        products: data.products.filter(d => d.id != id)
    }
    fs.writeFileSync('./data.json', JSON.stringify(newObj, null, 2))
    res.sendStatus(204);
})

app.listen(process.env.PORT || 3000)