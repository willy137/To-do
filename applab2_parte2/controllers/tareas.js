const Lista=require("../models").Lista;
const Item = require("../models").Item;

exports.lista=function(req,res){
    req.session.id_lis=req.body.id;
    res.json(true)
}

exports.listar=function(req,res){
    let id=req.session.id_lis;
    Lista.findByPk(id)
    .then((result) => { 
        result.getItems()
        .then(item=>{
            res.render('../views/tareas',{"lista":result,"tarea":item})
        })
    }).catch((err) => {
        res.render("ERROR AL LISTAR LOS ITEMS DE LA LISTA")
    });

}

exports.agregar=function (req,res){
    const dat=req.body;
    Lista.findByPk(dat.id_lista)
    .then((result) => {
        if(result.estado=="Resuelto"){
            res.json(false)
        }else{
            Item.create({
                id_items:null,
                titulo:dat.titulo,
                fecha_creacion:dat.fecha_creacion,
                fecha_resolucion:dat.fecha_resolucion,
                descripcion:dat.descripcion,
                prioridad:dat.prioridad,
                fecha_limite:dat.fecha_limite,
                estado:dat.estado,
                id_lista:dat.id_lista
            }).then(item=>{
                res.json(item)
            })
        }
    }).catch((err) => {
        res.render("ERROR AL AGREGAR ITEMS")
    });
    
}

exports.eliminar= function(req,res){
    const dat=req.body;
    Item.findByPk(dat.id)
    .then((result) => {
        Lista.findByPk(result.id_lista).
        then((lis)=>{
            if(lis.activa==0){
                dat.id=0;
                res.json(dat)
            }else{
                result.destroy().then(resu=>{
                res.json(dat)  
                })
            }
       })
    }).catch((err) => {
        res.render("ERROR AL BORRAR ITEMS")
    });
}

exports.modif=function(req,res){
    req.session.id_item=req.body.id;
    res.json(true);
}

exports.modifica= function(req,res){
    let id=req.session.id_item;
    Item.findByPk(id)
    .then((result)=>{
        res.render("modificartarea",{"item":result,"lis":result.id_lista})
    })
    .catch(err=>{
        res.render("ERROR AL Modificar ITEMS")
    })

}

exports.actualizar=function (req,res){
    let datos=req.body;
    let fecha=new Date()
    Item.findByPk(datos.id)
    .then((result) => {
        result.titulo=datos.titulo;
        result.descripcion=datos.descripcion;
        result.prioridad=datos.prioridad;
        result.fecha_limite=datos.fecha_lim;
            if(result.estado=="Sin resolver" &&datos.estado=="Resuelto"){
                result.fecha_resolucion=fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();
            }
        result.estado=datos.estado;
        result.save().then(resp=>{
            res.json(true);
        })
    }).catch((err) => {
        res.json(false);
    });
}