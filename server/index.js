const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const cors=require('cors');
const authRoutes=require('./routes/Auth');
const quizRoutes=require('./routes/quiz');
dotenv.config();
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/',(req,res)=>{
    res.json({
        masegge:'server is up and running'
    })
})
app.use('/api/auth',authRoutes);
app.use('/api/quiz',quizRoutes);
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("mongDB connection successful"))
        .catch((err) => console.error(err))
})



