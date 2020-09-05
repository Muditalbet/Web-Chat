const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const messageController = require("../controllers/messageController");

router.get("/", catchErrors(messageController.getMessages)); 

module.exports = router;