import express from 'express';
import mongoose from "mongoose";

const server = express();

const database=[];
server.use(express.json());

await mongoose.connect("mongodb+srv://BOOSEONG:kore3179*@forsale.eesslvl.mongodb.net/Arom?retryWrites=true&w=majority&appName=FORSALE")
// mongodb+srv://BOOSEONG:<db_password>@forsale.eesslvl.mongodb.net/?retryWrites=true&w=majority&appName=FORSALE

const userSchema = new mongoose.Schema({
    id:{type: String, required : true, unique : true},
    password: String,
});

const userModel = mongoose.model("user", userSchema);



server.post("/user", async(req, res) => {
    const result = await userModel.create(req.body);
    res.send(result);
})
server.get("/user", async (req, res) => {
    const result = await userModel.find();
    res.send(result);
})

server.get("/user/:id", async(req, res) => {
    const result = await userModel.findOne({ id : req.params.id})
    res.send(result);
})
server.patch("/user/:id", async (req,res) => {
    const data = req.body;
    const id = req.params.id;

    const result = await userModel.findOneAndUpdate({id : id}, data)

    res.send(result);
})
server.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    const result = await userModel.findOneAndDelete({id : id});
    res.send(result);
})

server.post('/', (req, res) => {
    res.send('POST 요청을 받았습니다.')
})

server.patch('/', (req, res) => {
    res.send('Patch 요청을 받았습니다.')
})
server.delete('/', (req, res) => {
    res.send('Delete 요청을 받았습니다.')
})
server.get('/', (req, res) => {
    res.send('Hello world');
} )
server.get('/', (req,res)=> {
    console.log(req.params.email)
    res.send('GET 요청을 받았습니다.')
})
// server.post("/user", (req, res) => {
//     database.push(req.body);
//     console.log(req.body);
//     res.send(req.body);
// })
server.get("/user", (req, res) => {
    res.send(database);
})
// server.get("/user/:id", (req, res) => {
//     const user = database.find((user) => {
//         if(user.id === req.params.id) return user;

//     });
//     res.send(user);
// })
server.patch("/user/:id", (req,res) => {
    const id = req.params.id;
    const data = req.body;

    const user = database.find((user)=> {
        if(user.id === id) {
            user.password = data.password;
            return user;
        }
    });
    res.send(user);
})
server.delete("/user/:id", (req,res) => {
    const id = req.params.id;
    const idx = database.indexOf(database.find(user=>user.id === id));

    database.splice(idx,1);
    res.send(database)
})
server.listen(3000, () => {console.log("서버 실행됨")});

