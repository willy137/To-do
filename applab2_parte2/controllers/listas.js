

const Lista=require("../models").Lista;


exports.Listar= function (req,res){
    Lista.findAll(
        {where:{ activa:1,
        id_usuario:req.session.iduser}}
      ).then((listas) => {
        if(listas.length==0){
            res.render("../views/todo",{"lista":listas,"id":req.session.iduser}); 
        }else{
            res.render("../views/todo",{"lista":listas}); 
        }
    }).catch((err) =>     {
        res.render("error",{"error":err}); 
      });
}

exports.agregar=function (req,res){
    const nuevo=req.body;
    console.log(nuevo)
    Lista.create({
           id_lista:null,
           titulo:nuevo.titulo,
           fecha_creacion:nuevo.fecha_creacion,
           fecha_resolucion:nuevo.fecha_resolucion,
           estado:nuevo.estado,
           id_usuario:req.session.iduser}
    ).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    });
}

exports.actualizar= function(req,res){
    let dat=req.body;
    Lista.findByPk(dat.id)
    .then((result) => {
        let conta=0;
        if(dat.estado=="Resuelto"){
           result.getItems()
           .then(resul=>{
            result.fecha_resolucion=new Date();
            for(let i=0;i<resul.length;i++){
               if(resul[i].estado!="Resuelto"){
                  conta+=1;
               }
            }
            if(resul.length==0){
               res.json("No2")
            }else if(conta==0){
               result.titulo=dat.titulo
               result.estado=dat.estado
               result.save()
               res.json("/todo")
            }else{
               let confirmar='No'
               res.json(confirmar)
            }
           })
        }else{
            result.titulo=dat.titulo;
            result.save().then(resulta=>{
            res.json("/todo");
           }).catch((err)=>{
           console.log("aca")
           res.json("error")})
        }
    }).catch((err) => {
        res.json("error")
    });

}

exports.modificar= function(req,res){
    req.session.id_lis=req.body.id;
    res.json(true);
}

exports.modificacion=function(req,res){
    Lista.findByPk(req.session.id_lis)
    .then((result) => {
        res.render("../views/modlistas",{"lis":result})
    }).catch((err) => {
        res.json("error");
    });

}

exports.borrar= function(req,res){
    const id={id:req.body.id,listo:"no"};
    Lista.findByPk(id.id)
    .then((result) => {
        result.getItems()
        .then((result2) => {
            if(result2.length != 0){
               id.listo="si"
            }else{
               result.destroy();
            }
            res.json(id)
        })
    }).catch((err) => {
        res.render("error")
    });

}

exports.archivar= function (req,res){
    let id=req.body.id;
    Lista.findByPk(id)
    .then((lista) => {
        if(lista.estado=="Resuelto"){
            lista.activa=0;
            lista.save()
            res.json(true);
         }else{
            res.json(false)
         }
    }).catch((err) => {
        res.render("ERROR INESPERADO AL TRATAR DE ARCHIVAR")
    });

}

exports.archivadas=  function (req,res){
    Lista.findAll({where:{activa:0,
    id_usuario:req.session.iduser}}).then(lis=>{
        res.render("../views/archivadas",{"listas":lis,"id":req.session.iduser});
    })
}