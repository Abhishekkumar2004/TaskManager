const express=require('express')
const taskController=require('../controllers/task.controller');
const authMiddleware=require('../middleware/auth.middleware');

const router=express.Router();

// Create
// POST /api/tasks
router.post('/',authMiddleware.IsValidUser,taskController.createTask);

// Get all
// GET /api/tasks
router.get('/',authMiddleware.IsValidUser,taskController.getAllTasks);

// Get one
// GET /api/tasks/:id
router.get('/:id',authMiddleware.IsValidUser,taskController.getTask);

// Update
// PUT /api/tasks/:id
router.put('/:id',authMiddleware.IsValidUser,taskController.updateTask)

// Delete
// DELETE /api/tasks/:id
router.delete('/:id',authMiddleware.IsValidUser,taskController.deleteTask)

module.exports=router