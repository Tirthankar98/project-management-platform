const Project = require("../models/project.model");
const Task = require("../models/task.model");

exports.getDashboardStats = async (req, res) => {
    try {
        // Count total projects
        const totalProjects = await Project.countDocuments();

        // Count total tasks
        const totalTasks = await Task.countDocuments();

        // Count completed tasks
        const completedTasks = await Task.countDocuments({
            status: "Completed",
        });

        // Count pending tasks
        const pendingTasks = await Task.countDocuments({
            status: "Pending",
        });

        // Count in-progress tasks
        const inProgressTasks = await Task.countDocuments({
            status: "In Progress",
        });

        // Count overdue tasks
        const overdueTasks = await Task.countDocuments({
            dueDate: { $lt: new Date() },
            status: { $ne: "Completed" },
        });

        // Return dashboard statistics
        return res.status(200).json({
            success: true,
            data: {
                totalProjects,
                totalTasks,
                completedTasks,
                pendingTasks,
                inProgressTasks,
                overdueTasks,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};