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
      result = formatResponse(200, true, 'Todos fetched successfully', todos, {
        totalItems:  totalItems,
        totalPages: Math.ceil(todos.length / limit),
        perPageItems: limit,
        currentPage: page,
        pageSize:  todos.length,
        hasMorePage: (todos.length > (page * limit))
      })
    
      res.json(result);
    });

});

// Create a todo
router.post('/', (req, res) => {
  const todo = Todo({
    title: req.body.title,
    description: req.body.description,
    is_completed: false,
  });
  todo.save((err, todo) => {
    if (err) {
      return res.json(formatResponse(500, false, err.message || 'An error occurred while creating the todo'));
    }
    return res.json(formatResponse(201, true, 'Todo created successfully', [todo]));
  });
});

// Edit a todo
router.put('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .exec((err, todo) => {
      if (err) {
        return res.json(formatResponse(500, false, err.message || 'An error occurred while fetching the todo'));
      }
      todo.title = req.body.title ?? todo.title;
      todo.description = req.body.description ?? todo.description;
      todo.is_completed = req.body.is_completed ?? todo.is_completed;
      todo.save((err, todo) => {
        if (err) {
          return res.json(formatResponse(500, false, err.message || 'An error occurred while updating the todo'));
        }
        return res.json(formatResponse(200, true, 'Todo updated successfully', [todo]));
      })
    });
});

// Delete a todo
router.delete('/:id', (req, res) => {
  Todo.remove({
    _id: req.params.id
  }).exec((err, result) => {
    if (err) {
      return res.json(formatResponse(500, false, err.message || 'An error occurred while deleting the todo'));
    }
    if (result.deletedCount == 0) {
      return res.json(formatResponse(404, false, 'Todo not found'));
    }
    return res.json(formatResponse(200, true, 'Todo deleted successfully'))
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