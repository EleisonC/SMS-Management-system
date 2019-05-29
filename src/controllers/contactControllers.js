const models = require("../models")
module.exports = class ContactsController{
    async getContacts(req,res){
        const contacts = await  models.Contact.findAll()
        return res.status(200).json(contacts)
    }
    async getSingleContact(req,res){
        try {
            const {id} = req.params
            const contact = await  models.Contact.findById(id)
            if(!contact) res.status(404).json({'message':'Contact with ID '+ id+ " does not exist"})
            res.status(200).json(contact)
           } catch (error) {
            console.log("an error occured", error)
           }
    }
    async insertContact(req,res){
        try {
            const contact = await  models.Contact.create(req.body)
            if(!contact) res.status(404).json({'message':'Insertion failed '})
            res.status(201).json(contact)
           } catch (error) {
            console.log(error)
           }
    }

    async deleteContact(req,res){
        try {
            const {id} = req.params
            const del = await models.Contact.destroy({where:{id}})
            if(del<=0){
                return res.status(404).json({message:' Deletion failed, contact was not found'})
            }
            return res.status(200).json({message:"successfully deleted"})
        } catch (error) {
            console.log("the error is ", error)
        }
    }
}