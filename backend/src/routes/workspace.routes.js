const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");

const {
    createWorkspace,
    getWorkspaces,
    getWorkspace,
    updateWorkspace,
    deleteWorkspace
} = require("../controllers/workspace.controller");

router.use(isAuthenticated);

router.post("/", createWorkspace);

router.get("/", getWorkspaces);

router.get("/:id", getWorkspace);

router.put("/:id", updateWorkspace);

router.delete("/:id", deleteWorkspace);

module.exports = router;