

function borrado(id){
    let parametro=JSON.stringify({id:id})
    fetch("/todo/delete",{
        method:'delete',
        body:parametro,
        headers:{'Content-Type':'application/json'}
    })
    .then(res=>res.json())
    .then(data=>{
        let ul =document.querySelector("#aviso");
        let li=document.createElement("li");
        if(data.error){
            console.log("Error")
        }else if(data.listo=="si"){
            li.innerHTML="No se puede borrar la lista por que tiene tareas";
            ul.appendChild(li);
            window.scroll({
                top: 10,
                left: 100,
                behavior: 'smooth'
              });
            setTimeout(() => {
                ul.innerHTML="";
            }, 3000);
        }else{
            li.innerHTML=`Lista ${data.id} Eliminada con exito`;
            ul.appendChild(li);
            document.querySelector(`#item${data.id}`).remove();
            window.scroll({
                top: 10,
                left: 100,
                behavior: 'smooth'
              });
            setTimeout(() => {
                ul.innerHTML="";
            }, 3000);
        }
    })
}
function archivar(id){
    let param=JSON.stringify({id:id})
    fetch("/todo/archivar",{
        method:'put',
        body:param,
        headers:{'Content-Type':'application/json'}
    })
    .then(res=>res.json())
    .then(dat=>{
        let ul=document.querySelector("#aviso");
        let li=document.createElement("li");
        if(dat){
            li.innerHTML=`Lista ${id} Archivada con exito`;
            ul.appendChild(li);
            let borrar=document.querySelector(`#item${id}`).remove();
            window.scroll({
                top: 10,
                left: 100,
                behavior: 'smooth'
              });
            setTimeout(() => {
                ul.innerHTML="";
            }, 3000);
        }else{
            li.innerHTML=`Lista ${id} No se pudo Archivar por que no esta resuelta`;
            ul.appendChild(li);
            window.scroll({
                top: 10,
                left: 100,
                behavior: 'smooth'
              });
            setTimeout(() => {
                ul.innerHTML="";
            }, 3000);
        }
    })
}

function agregar(){
    if(document.querySelector("#item").value.trim()==""){
        document.querySelector("#item").focus()
    }else{
        let item=document.querySelector("#item").value;
        let fech=new Date()
        let creacion=fech.getFullYear()+"-"+(fech.getMonth()+1)+"-"+fech.getDate();
        item=JSON.stringify({"titulo":item,"fecha_creacion":creacion,"fecha_resolucion":null,"estado":"Sin resolver","id_usuario":document.querySelector("#user").textContent})
        fetch("/todo/add",{
            method:'post',
            body:item,
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json())
        .then(dat=>{
            if(dat.error){
               console.log("Error al agregar a lista")
            }else{
                // cada elemento
                let ul= document.querySelector("#lista");
                let a=document.createElement("a");
                let p=document.createElement("p");
                let p2=document.createElement("p");
                let p3=document.createElement("p");
                let p4=document.createElement("p");
                let p5=document.createElement("p");
                let a2=document.createElement("a");
                let a3=document.createElement("a");
                let a4=document.createElement("a");
                //seteamos los atributos y texto de os elementos
                p.innerHTML=dat.id_lista;
                p.setAttribute("class","id")
                p2.innerHTML=dat.titulo;
                p3.innerHTML=dat.fecha_creacion.substr(0,10);
                p4.innerHTML=!dat.fecha_resolucion? "Sin fecha":dat.fecha_resolucion.substr(0,10);
                p4.setAttribute("id","reso");
                p5.innerHTML=dat.estado;
                a2.innerHTML="borrar";
                a2.setAttribute("href",`javascript:borrado(${dat.id_lista})`)
                a3.innerHTML="Actualizar";
                a3.setAttribute("href",`javascript:modifica(${dat.id_lista})`)
                a4.innerHTML="Archivar";
                a4.setAttribute("href",`javascript:archivar(${dat.id_lista})`)
                a.innerHTML="ver tareas";
                a.setAttribute("href",`/item/${dat.id_lista}`)
                a.setAttribute("class","link")
                a2.setAttribute("class","link")
                a3.setAttribute("class","actualizar")
                a4.setAttribute("class","link")
                let li=document.createElement("li");
                li.setAttribute("id",`item${dat.id_lista}`);
                //lo agregamos al li
                li.appendChild(p);
                li.appendChild(p2);
                li.appendChild(p3);
                li.appendChild(p4);
                li.appendChild(a);
                li.appendChild(p5);
                li.appendChild(a2);
                li.appendChild(a3);
                li.appendChild(a4);
                //lo agregamos al ul
                ul.appendChild(li);               
            }
        })
    }
}

function item(id){
    let id2=JSON.stringify({id:id});
    fetch("/item",{
        method:'post',
        body:id2,
        headers:{'Content-Type':'application/json'}
    }).then(res=>res.json())
    .then(dat=>{
        console.log(dat)
        if(dat){
            window.location.href="http://localhost:3000/item/tareas";
        }
    })
}

function modifica(id){
    console.log(id)
    let id2=JSON.stringify({id:id});
    fetch("/todo/modificar",{
        method:'post',
        body:id2,
        headers:{'Content-Type':'application/json'}
    }).then(res=>res.json())
    .then(dat=>{
        console.log(dat)
        if(dat){
            window.location.href="http://localhost:3000/todo/modificacion";
        }
    })
}