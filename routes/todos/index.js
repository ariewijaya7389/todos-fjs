var express = require("express");
var Todo = require('../../models/todos');
var router = express.Router();
router.get("/", function (req, res, next) {
  // Todo.find(function (err, todos) {
  //     if (err) return console.error(err);
  //     res.render('todos', {
  //         title: 'Todos',
  //         todos: todos
  //     })
  // })

  Todo.findAsync()
    .then(function (todos) {
      res.render("todos", {
        title: "Todos",
        todos: todos
      });
    })
    .catch(next)
    .error(console.error);
});


module.exports = router;