const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// List all todo
router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const totalItems = await Todo.countDocuments().then(count => count)

  await Todo.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .exec((err, todos) => {
      if (err) {
        return res.json({ error: err });
      }
      result = formatResponse(200, true, 'Todos fetched successfully', todoItems, {
        totalItems:  todos.length,
        totalPages: Math.ceil(todos.length / limit),
        perPageItems: limit,
        currentPage: page,
        pageSize: todoItems.length,
        hasMorePage: (todos.length > (page * limit))
      })
    
      res.json(result);
    });

});

// Create a todo
router.post('/create', (req, res) => {
  const todo = Todo({
    title: req.body.title,
    content: req.body.content,
  });
  todo.save((err, todo) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ data: todo });
  });
});

// Edit a todo
router.put('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .exec((err, todo) => {
      if (err) {
        return res.json({ error: err });
      }
      todo.title = req.body.title ?? todo.title;
      todo.content = req.body.content ?? todo.content;
      todo.completed = req.body.completed ?? todo.completed;
      todo.save((err, todo) => {
        if (err) {
          return res.json({ error: err });
        }
        return res.json({ data: todo });
      })
    });
});

// Delete a todo
router.delete('/:id', (req, res) => {
  Todo.remove({
    _id: req.params.id
  }).exec((err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    if (result.deletedCount == 0) {
      return res.json({ data: 'No Todo Found with given id' });
    }
    return res.json({ data: 'Deleted Successfully' });
  })
});


const formatResponse = (code = 200, status = true, message = "", item = [], meta = {}) => {
  return {
    code: code,
    status: status,
    message: message,
    item: item,
    meta: meta
  };
}

module.exports = router;