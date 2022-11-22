const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var path = require('path');
const app = express();

app.use(express.json());
app.use(cors());



// mongoose.connect('mongodb://127.0.0.1:27017/react-todo'||process.env.MONGODB_URI, {
// 	useNewUrlParser: true, 
// 	useUnifiedTopology: true 
// }).then(() => console.log("Connected to MongoDB")).catch(console.error);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});
// if (process.env.NODE_ENV === "production" ) {
//  app.use(express.static("client/build"));
//  app.get("*", (req, res) => {
//  res.sendFile(path.join(__dirname + "/client/build/"));
//  });
// }
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
// app.use(express.static(path.join(__dirname, "client", "build")))

// // ...
// // Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 3001;
app.listen(port);
