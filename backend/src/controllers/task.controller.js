const taskModel = require('../models/task.model');
const mongoose = require("mongoose");

// Create task
async function createTask(req, res) {
    try {
        const { title, description, completed } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required."
            });
        }

        const task = await taskModel.create({
            title,
            description,
            completed,
            user: req.user.userId
        });

        res.status(201).json({
            message: "Task created successfully.",
            task
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to create task.",
            error: err.message
        });
    }
}


// Get all tasks belonging to logged-in user
async function getAllTasks(req, res) {
    try {
        const userId = req.user.userId;

        const tasks = await taskModel.find({
            user: userId
        });

        res.status(200).json({
            message: "Tasks fetched successfully.",
            tasks
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to get tasks.",
            error: err.message
        });
    }
}


// Get one task belonging to the logged-in user
async function getTask(req, res) {
    try {
        const userId = req.user.userId;
        const taskId = req.params.id;

        const userTask = await taskModel.findOne({
            _id: taskId,
            user: userId
        });

        if (!userTask) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.status(200).json({
            message: "User task.",
            task: userTask
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to get task.",
            error: err.message
        });
    }
}


// Update task belonging to the logged-in user
async function updateTask(req, res) {
    try {
        const userId = req.user.userId;
        const taskId = req.params.id;

        const { title, description, completed } = req.body;

        const task = await taskModel.findOneAndUpdate(
            {
                _id: taskId,
                user: userId
            },
            {
                title,
                description,
                completed
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.status(200).json({
            message: "Task updated successfully.",
            task
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to update task.",
            error: err.message
        });
    }
}


// Delete task belonging to the logged-in user
async function deleteTask(req, res) {
    try {
        const userId = req.user.userId;
        const taskId = req.params.id;

        const task = await taskModel.findOneAndDelete({
            _id: taskId,
            user: userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.status(200).json({
            message: "Task deleted successfully.",
            task
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to delete task.",
            error: err.message
        });
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
};