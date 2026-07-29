const Workspace = require("../models/workspace.model");

const createWorkspace = async (req, res) => {

    const workspace = await Workspace.create({
        name: req.body.name,
        description: req.body.description,
        owner: req.user._id
    });

    res.status(201).json({
        success: true,
        workspace
    });

};

const getWorkspaces = async (req, res) => {

    const workspaces = await Workspace.find({
        owner: req.user._id
    });

    res.json({
        success: true,
        workspaces
    });

};
const getWorkspace = async (req, res) => {

    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
        return res.status(404).json({
            success: false,
            message: "Workspace not found"
        });
    }

    res.json({
        success: true,
        workspace
    });

};
const updateWorkspace = async (req, res) => {

    const workspace = await Workspace.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );
    if (!workspace) {
        return res.status(404).json({
            success: false,
            message: "Workspace not found"
        });
    }

    res.json({
        success: true,
        workspace
    });

};
const deleteWorkspace = async (req, res) => {

    const workspace = await Workspace.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id
    });

    if (!workspace) {
        return res.status(404).json({
            success: false,
            message: "Workspace not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Workspace deleted"
    });

};

module.exports = {
    createWorkspace,
    getWorkspaces,
    getWorkspace,
    updateWorkspace,
    deleteWorkspace
};