function actualizar(){
    if(validar()){
        let id=document.querySelector("#id").value
        let titulo=document.querySelector("#nom").value;
        let descrip=document.querySelector("#des").value;
        let priori=document.querySelector("#priori").value;
        let fech=document.querySelector("#fech").value;
        let estado=document.querySelector("#estado").value;
        let aviso=document.querySelector("#aviso");
        let dat=JSON.stringify({id:id, titulo:titulo,
             descripcion:descrip, prioridad:priori,
            fecha_lim:fech,estado:estado})
        fetch("/item/actualizar",{
            method:'put',
            body:dat,
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json())
        .then(data=>{
            aviso.innerHTML="";
            if(data){
                let li=document.createElement("li");
                li.className="confirmar"
                li.innerHTML="Se ha realizado la modificacion con exito";
                aviso.appendChild(li);
            }else{
                let li=document.createElement("li");
                li.className="confirmar"
                li.innerHTML="Ocurrio un error al modificar el item";
                aviso.appendChild(li);
            }
            setTimeout(() => {
                aviso.innerHTML=""
            }, 4000);
        })
    }
}

function validar(){
    if(comprobar()){

        return true
    }
    return false
}

function comprobar(){
    let titulo=document.querySelector("#nom").value;
    let descrip=document.querySelector("#des").value;
    let error=[];
    if(titulo.length>100 || titulo.length==0){
         error.push("Error El titulo debe ser como Maximo 100 caracteres y Minimo de 1")
    }
    if(descrip.length>400||descrip.length==0){
        error.push("Error la descripcion es un Maximo de 400 caracteres y Minimo de 1")
    }
    let ul=document.querySelector("#errores")
    ul.innerHTML="";
    if(error.length!=0){
        for(let i=0;i<error.length;i++){
            let li=document.createElement("li")
            li.innerHTML=error[i];
            ul.appendChild(li)
        }
        return false
    }
    return true;
}