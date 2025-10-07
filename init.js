const mongoose = require('mongoose');
const Chat=require("./models/chat.js");
main().then((result)=>{console.log("successful");})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  await insertsamplechats();
}
async function insertsamplechats(){
  const existing = await Chat.find();
  if (existing.length > 0) {
    console.log("Sample chats already exist. Skipping insertion.");
    return;
  }

let chats=[{
     from:"neha",
   to:"gaya",
   msg:"hey send me your graph sheets",
   created_at:new Date()
},
{
     from:"babita",
   to:"gayatri",
   msg:"hey send me your page sheets",
   created_at:new Date()
},{
 from:"neru",
   to:"kuru",
   msg:"hey send me your booksheets",
   created_at:new Date()},{
 from:"kampu",
   to:"dimpu",
   msg:"hey send me your blue sheets",
   created_at:new Date()},{
     from:"rashmi",
   to:"radhu",
   msg:"hey send me your green sheets",
   created_at:new Date()
   }];

   await Chat.insertMany(chats);

  }
   module.exports = { Chat };
   
