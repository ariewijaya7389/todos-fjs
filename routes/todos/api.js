var express = require("express");
var router = express.Router();

var Todo = require("../../models/todos");

router
  .route("/")

  //Read API
  .get(function (req, res, next) {
    Todo.findAsync({}, null, {
        sort: {
          "_id": 1
        }
      })
      .then(function (todos) {
        res.json(todos);
      })
      .catch(next)
      .error(console.error);
  })

  //Create API
  .post(function (req, res, next) {
    var todo = new Todo();
    console.log(req.body);
    todo.text = req.body.text;
    todo
      .saveAsync()
      .then(function (todo) {
        console.log("success");
        res.json({
          status: "success",
          todo: todo
        });
      })
      .catch(function (e) {
        console.log("fail");
        res.json({
          status: "error",
          error: e
        });
      })
      .error(console.error);
  });

router
  .route("/:id")

  //Read by ID API  
  .get(function (req, res, next) {
    Todo.findOneAsync({
        _id: req.params.id
      }, {
        text: 1,
        done: 1
      })
      .then(function (todo) {
        res.json(todo);
      })
      .catch(next)
      .error(console.error);
  })

  //Edit API
  .put(function (req, res, next) {
    var todo = {};
    var prop;
    for (prop in req.body) {
      todo[prop] = req.body[prop];
    }
    Todo.updateAsync({
          _id: req.params.id
        },
        todo
      )
      .then(function (updateTodo) {
        return res.json({
          status: "success",
          todo: updateTodo
        });
      })
      .catch(function (e) {
        return res.status(400).json({
          status: "fail",
          error: e
        });
      });
  })

  //Delete API
  .delete(function (req, res, next) {
    Todo.findByIdAndRemoveAsync(req.params.id)
      .then(function (deletedTodo) {
        res.json({
          status: "success",
          todo: deletedTodo
        });
      })
      .catch(function (e) {
        res.status(400).json({
          status: "fail",
          error: e
        });
      });
  });

module.exports = router;