const models = require("../models");
module.exports = class SmsController {
  async getAll(req, res) {
      const messages = await models.Messages.findAll();
      return res.status(200).json(messages);
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const message = await models.Messages.findById(id);
      if (!!message) {
        return res.status(200).json(message);
      }else{
      return res.status(404).json({ message: "Message with ID " + id + " was not found" });
      }
      
    } catch (error) {
      console.log(error)

    }
  }

  async getAllBySender(req, res) {
    const { id } = req.params;
    try {
      const messages = await models.Messages.findAll({
        where: { senderId: id },
        raw: true
      });
      if (messages.length>0) return res.status(200).json(messages);
      return res.status(404).json({ message: `No messages from a sender with id ${id}` });
      
    } catch (error) {
      console.log("Error occured ", error);
    }
  }
  async getAllByRecepient(req, res) {
    const { id } = req.params;
    try {
      const messages = await models.Messages.findAll({
        where: { receiverId: id },
        raw: true
      });
      if (messages.length > 0) return res.status(200).json(messages);
      return res.status(404).json({ message: `No messages from a sender with id ${id}` });
    } catch (error) {
      console.log("an error occured ", error);
    }
  }
  async sendNewMessage(req, res) {
    console.log(req.body.status);
    try {
      const saved = await models.Messages.create(req.body);
      return res.status(201).json(saved);
    } catch (error) {
      return res.status(400).json({message:`${error.message}`})
    }
   
  }

  async deleteMessage(req,res){
    try {
        const {id} = req.params
        const delMes = await models.Messages.destroy({where:{id}})
        if(delMes<=0){
            return res.status(404).json({message:' Deletion failed, message was not found'})
        }
        return res.status(200).json({message:"Successfully deleted"})
    } catch (error) {
        console.log("Error is ", error)
    }
}
};