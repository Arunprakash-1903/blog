const mongoose=require('mongoose')
const slugify=require("slugify")
const marked=require("marked")
const createDomPurifier=require("dompurify")
const { JSDOM }=require("jsdom")
const dompurify=createDomPurifier(new JSDOM().window)
const articleSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
       required:true

    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:()=>Date.now()
    },
    slug:{
        type:String,
        required:true,
        unique:true

    },
    sanitizedHTML:{
        type:String,
        required:true
    }

})
articleSchema.pre("validate",function (next) {
    if(this.title){

      this.slug=slugify(this.title,{lower:true,strict:true})
    }
    if(this.markdown){
        this.sanitizedHTML=dompurify.sanitize(marked(this.markdown))
    }
    next()
 
})
module.exports=mongoose.model('Article',articleSchema)
