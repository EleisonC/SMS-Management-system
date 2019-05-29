const contactRouter = require("express").Router();
const ContactsController = require("../controllers/contactControllers")
const { validateContact } = require("../utils/validation")
const contactsController = new ContactsController()

// Contact endpoints
contactRouter.get("/", contactsController.getContacts)
contactRouter.get("/:id", contactsController.getSingleContact)
contactRouter.delete("/:id", contactsController.deleteContact)
contactRouter.post("/",validateContact,contactsController.insertContact)

module.exports = contactRouter;
