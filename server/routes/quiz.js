const express=require('express');
const router=express.Router();
const quiz=require('../models/quiz.js');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

router.post('/quiz',async(req,res)=>{
           try{
                const {quizName,quizType,questions,CreatedAt,impressions}=req.body;
                const ques=new quiz({quizName, quizType,questions,CreatedAt,impressions});
            
                await ques.save();
                res.json(ques);
            
}catch(error){
    errorHandler(res,error);
}
});

router.get('/quiz/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
      const data = await quiz.findById(id);
      if (data) {
          data.impressions += 1;
          await data.save(); 
          res.json(data);
      } else {
          res.status(404).json({ error: 'data not found' });
      }
  } catch (error) {
      errorHandler(res, error);
  }
});

router.get('/quiz',async(req,res)=>{
    try{
            const data = await quiz.find({});
            res.json(data);
    }catch(error){
        errorHandler(res,error);
    }
});
router.delete('/quiz/:id', async (req, res) => {
    try {
      const quizs = await quiz.findById(req.params.id);
  
      if (!quizs) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      await quizs.deleteOne({ _id: req.params.id });
  
      res.json({ message: 'Quiz deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports=router;