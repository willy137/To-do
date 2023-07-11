function listar(id){
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