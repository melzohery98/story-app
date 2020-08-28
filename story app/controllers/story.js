const express= require('express');
const router = express.Router();
const {ensureUser} = require('../config/authGuard');
const Story = require('../models/Story');
const user = require('../models/User');

router.get('/add', ensureUser, (req, res)=>{
    res.render('story/add',{
        layout:'layouts/layoutIn'
    });
});
router.get('/',ensureUser,async (req, res) =>{
    try{
     const stories =   await Story.find({statues:'public'})
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean()
        res.render('story/index',{
            layout:'layouts/layoutIn',
            stories,
            loggedUser:req.user
        });
    }
    catch(err){
       console.log(err)
    }
});


router.post('/',async (req, res)=>{
    try{
        req.body.user = req.user.id;
       await Story.create(req.body);
    

        res.redirect('/dashboard');
    }catch(err){
        res.render('errors/500')
    }
});

router.get('/:storyId',ensureUser, async(req, res)=>{
    try{
        const story = await Story.findOne({_id:req.params.storyId})
        .populate('user')
        .lean();
        res.render('story/show',{
            layout:'layouts/layoutIn',
            story,
            loggedUser:req.user

        })
    }catch(err){
        console.log(err);
        res.render('errors/500')
    }
});

router.get('/edit/:storyId',ensureUser,async (req, res)=>{

    try{
        const story =await Story.findOne({_id:req.params.storyId})
        .lean();
        if(story.user != req.user.id){
            res.redirect('/stories');
        }else{
            res.render('story/edit',{
                layout:'layouts/layoutIn',
                story
            });
        
    }
    }catch(err){
        res.render('errors/404', {layout:'layouts/layoutIn'})        
    }


  
});

router.post('/:storyId', async (req, res)=>{
    try{
        const story =await Story.findOneAndUpdate({_id:req.params.storyId},{$set:{
            title:req.body.title,
            statues:req.body.statues,
            body:req.body.body
        }});

        res.redirect('/dashboard');
    }catch(err){
        res.render('errors/404', {layout:'layouts/layoutIn'})
    }

});

router.post('/delete/:storyId',async(req, res)=>{
    try{
        await Story.remove({_id:req.params.storyId});
        res.redirect('/dashboard')
    }catch(err){
        res.render('errors/404', {layout:'layouts/layoutIn'})
    }
});

router.get('/user/:userId',ensureUser,async (req, res)=>{
    try{
        const stories = await Story.find({user:req.params.userId,statues:'public'})
        .populate('user')
        .sort('desc')
        .lean();
        res.render('story/index',{
            layout:'layouts/layoutIn',
            stories,
            loggedUser:req.user
        })
    }
    catch(err){
        res.render('errors/404', {layout:'layouts/layoutIn'})

    }
} );


module.exports = router;