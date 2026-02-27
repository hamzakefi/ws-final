module.exports=function (req,res,next) {
    if (!req.user.isAdmin) {
        res.status(400).send({errors : [{msg:" not admin  "}]})

    }
    next()
}