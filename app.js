const { default: mongoose } = require('mongoose');
const validator=require('validator')
const mangoose=require('mongoose');
mangoose.connect("mongodb://127.0.0.1:27017/minato").then(()=>console.log("Connected"))

const play=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ctype:String,
    videos: Number,
    author:String,
    email:{
        type:String,
        required:true,
        unique:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Email is invalid')
            }
        }
    },
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }

})
const Playlist=mongoose.model("Playlist",play)

const wait=async()=>{
    try{
        // const newCollection1= new Playlist({
        //     name:"Node JS",
        //     ctype:"Back End",
        //     videos:20,
        //     author:"Thapa",
        //     active:true
        // })
        // const newCollection2= new Playlist({
        //     name:"Angular JS",
        //     ctype:"Front End",
        //     videos:50,
        //     author:"Thapa",
        //     active:true
        // })
        // const newCollection3= new Playlist({
        //     name:"Express JS",
        //     ctype:"Back End",
        //     videos:20,
        //     author:"Thapa",
        //     active:true
        // })
        const newCollection4= new Playlist({
            name:"MongoDb",
            ctype:"DataBase",
            videos:30,
            author:"Thapa",
            email:'gjhgjkgjvbk',
            active:true
        })
        await Playlist.insertMany([newCollection4])//newCollection1,newCollection2,newCollection3,

    }catch(e){
        console.log(e)
    }

}
wait()

const read=async()=>{
    const result=await Playlist.find({author:"Thapa"}).select({name:1}).sort({name:1})
    console.log(result)
}
// read()

const update=async(_id)=>{
    try{
    const result=await Playlist.findByIdAndUpdate({_id},{
        $set:{
            name:"JavaScript b"
        }
    },{
        // new :true,
        useFindAndModify:true
    })
    console.log(result)
}
catch(e){
    console.log(e)
}
}

// update("65bfcd52b2540544b33f5dcb")

const deleteDoc=async(course)=>{
    try{
    const result=await Playlist.deleteOne({name:course})
    console.log(result)
}
catch(e){
    console.log(e)
}
}
// deleteDoc("Node JS")

