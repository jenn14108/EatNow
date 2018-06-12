var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Inside get")
  res.render('todo', { title: 'To-Do', todo_task:0});
});

router.post('/', function(req, res, next) {
  console.log("Inside post")
  const todo_task = req.body.todo_task
  console.log(req.body.todo_task)
  res.render('todo', { title: 'To-Do', todo_task:todo_task});
});

module.exports = router;
