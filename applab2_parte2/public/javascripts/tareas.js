

//agregar Tarea
function agregar(){
    let datos=[]
    let fech=new Date()
    let titulo=document.querySelector("#titulo").value;
    let detalle=document.querySelector("#descripcion").value;
    let prioridad=document.querySelector("#priori").value;
    let fechalim=document.querySelector("#fechlim").value;
    let creacion=fech.getFullYear()+"-"+(fech.getMonth()+1)+"-"+fech.getDate();
    let lis=document.querySelector("#id").textContent;
    console.log(fechalim)
    datos.push(titulo,detalle,prioridad,fechalim)
    if(validar(datos)){
        let item={"titulo":titulo,"fecha_creacion":creacion,"fecha_resolucion":null,"descripcion":detalle,
        "prioridad":prioridad,"fecha_limite":fechalim,"estado":"Sin resolver","id_lista":lis};
        item=JSON.stringify(item)
        fetch("add",{
            method:'post',
            body:`${item}`,
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json())
        .then(dat=>{
            if(dat.error){
                console.log("error con los datos")
            }else if(dat==false){
                let aviso=document.querySelector("#aviso");
                let li=document.createElement("li");
                li.innerHTML="No se puede agregar una tarea por que la lista esta resuelta";
                aviso.appendChild(li)
                window.scroll({
                    top: 10,
                    left: 100,
                    behavior: 'smooth'
                  });
                setTimeout(()=>{
                    aviso.innerHTML=""
                },4000)
            }
            else{
                console.log(dat.id_items)
                let ul=document.querySelector("#tareas");
                let li=document.createElement("li")
                li.setAttribute("id","item")
                let h6=document.createElement("h6");
                h6.innerHTML="id: "+dat.id_items;
                let p=document.createElement("p");
                p.innerHTML=dat.titulo;
                let p1=document.createElement("p")
                p1.innerHTML="Creada:"+dat.fecha_creacion.substr(0,10);
                let p2=document.createElement("p")
                p2.innerHTML="Resuelta:"+" Sin resolver"
                let p3=document.createElement("p")
                p3.innerHTML="Detalles:"+dat.descripcion;
                p3.setAttribute("class","det")
                let p4=document.createElement("p")
                p4.innerHTML="Prioridad:"+dat.prioridad;
                if(dat.prioridad=="Alta"){
                    p4.className="alta";
                }else if(dat.prioridad=="Media"){
                    p4.className="media";
                }else{
                    p4.className="baja";
                }
                let p5=document.createElement("p");
                p5.innerHTML="Fecha Limite:"+dat.fecha_limite.substr(0,10);
                let p6=document.createElement("p")
                p6.innerHTML="Estado:"+dat.estado;
                let a=document.createElement("a");
                a.setAttribute("href",`javascript:eliminar(${dat.id_items})`)
                a.setAttribute("class","link")
                a.innerHTML="Borrar";
                let a2=document.createElement("a");
                a2.setAttribute("href",`javascript:modificar(${dat.id_items})`)
                a2.setAttribute("class","link2")
                a2.innerHTML="Modificar";
                li.appendChild(h6);
                li.appendChild(p);
                li.appendChild(p1)
                li.appendChild(p2)
                li.appendChild(p3)
                li.appendChild(p4)
                li.appendChild(p5)
                li.appendChild(p6)
                li.appendChild(a)
                li.appendChild(a2)
                ul.appendChild(li)
                window.scroll({
                    top: 1000,
                    left: 100,
                    behavior: 'smooth'
                  });
            }
        }) 
       }
}
//eliminar Tarea
function eliminar(id){
    const id2=JSON.stringify({"id":id})
    fetch("delete",{
        method:'delete',
        body:`${id2}`,
        headers:{'Content-Type':'application/json'}
    }).then(res=>res.json())
    .then(dat=>{
        if(dat.error){
            console.log("ah ocurrido un error")
        }else{
            let lis=document.querySelectorAll("#item");
            if(dat.id!=0){
                console.log(dat,"aca pasa")
                for(let i=0;i<lis.length;i++){
                    let ids=lis[i].childNodes[0].textContent.substring(4);
                    if(ids==dat.id){
                        lis[i].remove()
                        let aviso=document.querySelector("#aviso");
                        let li=document.createElement("li")
                        li.innerHTML="Tarea id:"+dat.id+" Borrada con exito";
                        aviso.appendChild(li)
                        window.scroll({
                            top: 10,
                            left: 100,
                            behavior: 'smooth'
                        });
                        setTimeout(()=>{
                            aviso.innerHTML=""
                        },4000)
                    }
                }
            }else{
                let aviso=document.querySelector("#aviso");
                let li=document.createElement("li")
                li.innerHTML="No se puede borrar las tareas por que la lista esta archivada";
                aviso.appendChild(li)
                window.scroll({
                    top: 10,
                    left: 100,
                    behavior: 'smooth'
                    });
                setTimeout(()=>{
                    aviso.innerHTML=""
                },4000)
            }
        }
    })
}
function modificar(id){
    let id2=JSON.stringify({id:id});
    fetch("/item/modificar",{
        method:"post",
        body:id2,
        headers:{'Content-Type':'application/json'}
    }).then(res=>res.json())
    .then(dat=>{
        console.log(dat)
        if(dat){
            window.location.href="http://localhost:3000/item/modificacion"
        }
    })
}

//validar que los campos no esten vacios
function validar(datos){
    let con=0;
    let aviso=document.querySelector("#aviso");
    let dat=[];
    for(let i=0;i<datos.length;i++){
        if(datos[i]==""){
            con+=1;
        }
    }
    if(datos[0].length>100){
        dat.push("El titulo tiene un Maximo de 100 caracteres")
    }
    if(datos[1].length>400){
        dat.push("La Descripcion tiene un Maximo de 400 caracteres")
    }
    aviso.innerHTML="";
    if(con!=0){
        let li=document.createElement("li");
        li.setAttribute("class","aviso");
        li.innerHTML="No se aceptan campos en blanco";
        aviso.appendChild(li);
        return false;
    }
    if(dat.length==0 ){
        return true;
    }else{
        for(let i=0;i<dat.length;i++){
            let li=document.createElement("li");
            li.setAttribute("class","aviso")
            li.innerHTML=dat[i];
            aviso.appendChild(li);
        }
        return false
    }
}

//segun seleccionado en el checbox se llama a una funcion
function orden(dato){
    let items= document.querySelectorAll("#item")
    if(dato=="fechaC"){
        fechcreacion(items);
    }else if(dato=="fechaL"){
        fechLimite(items);
    }else if(dato=="priori"){
        prioridad(items);
    }
}

// orden por fecha de creacion
function fechcreacion(item){
    let orden=[];
    let min;
    let i;
    //trasformo el li en un array de objetos
    for(i=0;i<item.length;i++){
        min={ id:item[i].childNodes[0].textContent.substr(4),
            titulo:item[i].childNodes[1].textContent,
            creacion:item[i].childNodes[2].textContent.substr(7),
            resuelta:item[i].childNodes[3].textContent,
            detalles:item[i].childNodes[4].textContent,
            prioridad:item[i].childNodes[5].textContent,
            feL:item[i].childNodes[6].textContent,
            estado:item[i].childNodes[7].textContent
        }
        orden.push(min);
    }
    //ordeno el arreglo de items
    orden.sort((a,b)=> {
        if(a.creacion<b.creacion){
            return -1
        }else if(a.creacion>b.creacion){
            return 1
        }
        return 0
    })
    console.log(orden)
    //llamo a reubicar
    reubicar(orden);
}

function fechLimite(item){
    let orden=[];
    let min;
    let i;
    //trasformo el li en un array de objetos
    for(i=0;i<item.length;i++){
        min={ id:item[i].childNodes[0].textContent.substr(4),
            titulo:item[i].childNodes[1].textContent,
            creacion:item[i].childNodes[2].textContent.substr(7),
            resuelta:item[i].childNodes[3].textContent,
            detalles:item[i].childNodes[4].textContent,
            prioridad:item[i].childNodes[5].textContent,
            feL:item[i].childNodes[6].textContent,
            estado:item[i].childNodes[7].textContent
        }
        orden.push(min);
    }
    //ordeno el arreglo de items
    orden.sort((a,b)=> {
        if(a.feL<b.feL){
            return -1
        }else if(a.feL>b.feL){
            return 1
        }
        return 0
    })
    //llamo a reubicar
    reubicar(orden);
}

function prioridad(item){
    let orden=[];
    let min;
    let cant;
    let i;
    //trasformo el li en un array de objetos
    for(i=0;i<item.length;i++){
        if(item[i].childNodes[5].textContent=="Prioridad: Alta"){
            cant=1;
        }else if(item[i].childNodes[5].textContent=="Prioridad: Media"){
            cant=0;
        }else{
            cant=-1;
        }
        min={ id:item[i].childNodes[0].textContent.substr(4),
            titulo:item[i].childNodes[1].textContent,
            creacion:item[i].childNodes[2].textContent.substr(7),
            resuelta:item[i].childNodes[3].textContent,
            detalles:item[i].childNodes[4].textContent,
            prioridad:item[i].childNodes[5].textContent,
            feL:item[i].childNodes[6].textContent,
            estado:item[i].childNodes[7].textContent,
            priori:cant
        }
        orden.push(min);
    }
    //ordeno el arreglo de items
    orden.sort((a,b)=> {
        console.log(a.priori)
        if(a.priori<b.priori){
            console.log("1")
            return 1
        }else if(a.priori>b.priori){
            console.log("-1")
            return -1
        }else{
            console.log("0")
            return 0
        }
    })
    //llamo a reubicar
    reubicar(orden); 
}

//ordena las tareas del ul
function reubicar(orden){
    let ul=document.querySelector("#tareas")
    ul.innerHTML=""
    for(i=0;i<orden.length;i++){
        let li=document.createElement("li");
        li.setAttribute("id","item")
        let h6=document.createElement("h6");
        h6.innerHTML="id: "+orden[i].id;
        let p=document.createElement("p");
        p.innerHTML=orden[i].titulo;
        let p1=document.createElement("p")
        p1.innerHTML="Creada:"+orden[i].creacion;
        let p2=document.createElement("p")
        p2.innerHTML=orden[i].resuelta;
        let p3=document.createElement("p")
        p3.innerHTML=orden[i].detalles;
        p3.setAttribute("class","det")
        let p4=document.createElement("p")
        p4.innerHTML=orden[i].prioridad;
        if(orden[i].prioridad=="Prioridad: Alta"){
            p4.className="alta";
        }else if(orden[i].prioridad=="Prioridad: Media"){
            p4.className="media";
        }else{
            p4.className="baja";
        }
        let p5=document.createElement("p")
        p5.innerHTML=orden[i].feL;
        let p6=document.createElement("p")
        p6.innerHTML=orden[i].estado;
        let a=document.createElement("a");
        a.setAttribute("href",`javascript:eliminar(${orden[i].id})`)
        a.innerHTML="Borrar";
        a.setAttribute("class","link")
        let a2=document.createElement("a")
        let id=document.querySelector("#id").textContent;
        a2.innerHTML=" Modificar"
        a2.setAttribute("href",`modificar/${orden[i].id}/${id}`)
        a2.setAttribute("class","link2")
        li.appendChild(h6);
        li.appendChild(p);
        li.appendChild(p1)
        li.appendChild(p2)
        li.appendChild(p3)
        li.appendChild(p4)
        li.appendChild(p5)
        li.appendChild(p6)
        li.appendChild(a)
        li.appendChild(a2)
        ul.appendChild(li)
    }
}