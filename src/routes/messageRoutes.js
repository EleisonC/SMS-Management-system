const messageRouter = require("express").Router();
const MessagesController = require("../controllers/messageController");
const { validateMessage } = require("../utils/validation");
const messageController = new MessagesController()

//messages endpoint
messageRouter.get("/", messageController.getAll)
messageRouter.get("/:id", messageController.getOne)
messageRouter.delete("/:id", messageController.deleteMessage)
messageRouter.get("/sent/:id",messageController.getAllBySender)
messageRouter.get("/received/:id",messageController.getAllByRecepient)
messageRouter.post("/",validateMessage,messageController.sendNewMessage)

module.exports = messageRouter;