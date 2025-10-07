const express=require("express");
const app=express();
const path=require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


const { Chat } = require("./init.js");


app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

let port=8080;


app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=>{
    console.log("listening");
})

app.get("/" ,(req,res)=>{
    res.send("working");
})



app.get("/chats",async(req,res)=>{
    let chatss=await Chat.find();
    console.log(chatss);
    res.render("index.ejs",{chatss});

})

app.get("/chats/new",async(req,res)=>{
   
    
    res.render("new.ejs");

})

app.post("/chats",async(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    
    await newChat.save().then((result)=>{console.log("data saved");})
    .catch((err)=>{console.log(err);});
    res.redirect("/chats");
});



app.get("/chats/:id/edits",async(req,res)=>{
   let {id}=req.params;
    let chat=await Chat.findById(id);
    
    res.render("edit.ejs",{chat});

})

app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:msg});
    res.redirect("/chats");
})

app.get("/chats/:id/delete",async(req,res)=>{
   let {id}=req.params;
    let dltdchat=await Chat.findByIdAndDelete(id);
    
    res.redirect("/chats");

})
