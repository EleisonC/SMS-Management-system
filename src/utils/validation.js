module.exports = {
  validateMessage: (req,res,next)=>{
     const body = req.body
     if(!body.hasOwnProperty('message') || body.message === ""){
         return res.status(400).json({message:"Message field is required"})
     }
     if(!body.hasOwnProperty('senderId') || body.senderId === ""){
         return res.status(400).json({message:"Sender ID is a required field"})
     }
     if(!body.hasOwnProperty('status') || body.status === ""){
         Object.assign(req.body, {status : "unread"})
     }
     if(!body.hasOwnProperty('receiverId') || body.receiverId === ""){
         return res.status(400).json({message:"Receiver ID is a required field"})
     }
     next();
 },
 validateContact: (req,res,next)=>{
     const body = req.body
     if(!body.hasOwnProperty('phoneNumber') || body.phoneNumber === ""){
         return res.status(400).json({message:"Phone number field is required"})
     }
     if(!body.hasOwnProperty('name') || body.name === ""){
         return res.status(400).json({message:"Contact Name field is required"})
     }
     next();
 }
 }
 