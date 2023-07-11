    function modificar(){
        let div=document.querySelector("#respuesta");
        div.innerHTML="";
        let p=document.createElement("p");
       if(comprobar()){
        let id=document.querySelector("#id").value
        let tit=document.querySelector("#titulo").value
        let estado=document.querySelector("#estado").value
        let dat=JSON.stringify({id:id, titulo:tit, estado:estado})
        fetch("/todo/actualizar",{
            method:'put',
            body:dat,
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(data=>{
            if(data!= null){
                if(data.error){
                    console.log("Error al Modificar")
                }else{
                    if(data=="No"){
                        p.innerHTML="No se puede modificar el estado por que las tareas no estan resueltas"
                        div.appendChild(p)
                    }else if(data=="/todo"){
                        p.innerHTML="Lista modificata con exito"
                        div.appendChild(p)
                    }else if(data=="No2"){
                        p.innerHTML="No se puede modificar el estado por que la Lista no tiene tareas"
                        div.appendChild(p)
                    }
                    setTimeout(() => {
                        div.innerHTML="";
                    }, 5000);
                }
            }
        })
       } 
    }

    function comprobar(){
        if(vali()){
            return true;
        }
        return false;
    }

    function vali(){
        let tit=document.querySelector("#titulo").value
        let error;
        let er=document.querySelector("#respuesta");
        er.innerHTML=""
        console.log(tit.length)
        if(tit.length>100){
            let p=document.createElement("p")
            p.innerHTML="Error,El titulo tiene como Maximo 100 caracteres"
            er.appendChild(p)
            return false
        }
        return true
    }