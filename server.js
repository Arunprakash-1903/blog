
const express=require("express");
const app=express();
const mongoose=require("mongoose")
const Article=require("./models/articles");
const router = require("./routes/articles");
const methodOverride=require('method-override')
const PORT=process.env.PORT || 3000
mongoose.connect("mongodb+srv://arun:SfwxxfNZkY6vRg9q@cluster0.1h3ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true
} )
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.set('view engine','ejs')
const ArticleRouter=require("./routes/articles")
app.use("/articles",ArticleRouter)

app.get('/', async (req, res)=> {
   const articles=await Article.find().sort({createdAt:"desc"})
    res.render('articles/index',{articles:articles})
  });



app.listen(PORT,()=>{
    console.log("Runing at port 3000");
})
//mongodb+srv://arun:<password>@cluster0.1h3ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://arun:<password>@cluster0.1h3ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://arun:<password>@cluster0.1h3ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority