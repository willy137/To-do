const User=require("../models").Usuario;
const bcryp=require("bcrypt");

exports.login= function(req,res){
    res.render("../views/login");
}

exports.login2= async function(req,res){
    const dat=req.body;
    const usuario= await User.findAll(
        {where:{nom_usuario:dat.usuario}});
    if(usuario.length==1){
        const vali=await bcryp.compare(dat.password,usuario[0].password)
        console.log(vali)
        if(vali){
            req.session.isAutenticated=true;
            req.session.iduser=usuario[0].id;
            res.json(true);
        }
    }else{
        res.json("error")
    }
    
}

exports.registro =function (req,res){
    res.render("../views/registrarse");
}
exports.logout= function (req,res){
    req.session.destroy();
    res.redirect("/users/login")
}

exports.registrarse= async function(req,res){
    const dat= req.body;
    console.log("aca")
    const verificar= await User.findAll({where:{nom_usuario:dat.usuario}})
    if(verificar.length==0){
        const salt= await bcryp.genSalt(10);
        let con=await bcryp.hash(dat.password,salt);
        await User.create({
            id:null,
            nom_usuario:dat.usuario,
            nombre_completo:dat.nombre,
            password:con
        }).then(result=>{
            res.json("correcto");
        })
    }else{
        res.json("nom_user")
    }
}
