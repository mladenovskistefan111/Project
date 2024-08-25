const Todo = require('./models/todo');

async function getTodos(res) {
    try {
        const todos = await Todo.find().exec(); // Use async/await with .exec()
        res.json(todos); // Return all todos in JSON format
    } catch (err) {
        res.status(500).send(err); // Send error with status code
    }
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', async function (req, res) {
        // Use async/await for getTodos
        await getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', async function (req, res) {
        try {
            await Todo.create({
                text: req.body.text,
                done: false
            });
            // Get and return all the todos after creation
            await getTodos(res);
        } catch (err) {
            res.status(500).send(err); // Send error with status code
        }
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', async function (req, res) {
        try {
            await Todo.deleteOne({ _id: req.params.todo_id }).exec();
            // Get and return all todos after deletion
            await getTodos(res);
        } catch (err) {
            res.status(500).send(err); // Send error with status code
        }
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // Load the single view file
    });
};
