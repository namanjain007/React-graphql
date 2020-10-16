const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://NAMAN:JKWwcrWrz2inwwY@cluster0.qhlay.mongodb.net/Graphqldb?retryWrites=true&w=majority',{ useNewUrlParser: true });
mongoose.connection.once('open',() => {
    console.log('Connected to the database');
});

const app = express();

//cross origin as react server and graphql server are two different ports..
app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.get('/',(req,res) => {
    res.send("<h1>Hello World</h1>");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Process running on Port ${PORT}`));