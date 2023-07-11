
var autenticado= function(req,res,next){
    if(req.session.isAutenticated){
        return next()
    }else{
        res.redirect("/users/login")
    }
}

module.exports.autenticado=autenticado;