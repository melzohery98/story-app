const express = require('express');
const router = express.Router();
const {ensureUser, ensureGuest} = require('../config/authGuard');
const User = require('../models/User');
const Story = require('../models/Story')

router.get('/',ensureGuest, (req, res)=>{
    res.render('login',{
        layout:'layouts/layoutOut'
    });
});

router.get('/dashboard',ensureUser, async (req, res)=>{
    try{
        const stories = await Story.find({user:req.user.id}).lean();
        res.render('dashboard',{
            layout:'layouts/layoutIn',
            name:req.user.name,
            stories,
        })
    }
    catch(err){
        res.render('errors/404')
    }
})

module.exports = router;