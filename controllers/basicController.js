const basicController={};

basicController.get= ('/',(req,res)=>{
    res.json({
        msg: 'welcome to the api'
    })
})
;
module.exports = basicController;