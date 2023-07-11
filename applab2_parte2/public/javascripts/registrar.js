function registrado(){
    if(valido()){
        let user=document.querySelector("#user").value;
        let nom=document.querySelector("#namec").value;
        let contra=document.querySelector("#password").value;
        let dat=JSON.stringify({usuario:user,nombre:nom,password:contra});
        fetch("/users/registrado",{
            method:'post',
            body:dat,
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json())
        .then(dat=>{
            let aviso=document.querySelector("#aviso");
            let h4=document.createElement("h4");
            if(dat=="correcto"){
                h4.innerHTML="Se ha registrado con exito"
                aviso.appendChild(h4);
                setTimeout(()=>{
                    window.location.href="/users/login";
                },5000)
            }else if("nom_user"){
                h4.innerHTML="Nombre de usuario ya existente";
                aviso.appendChild(h4);
            }
        })
    }
}

function valido(){
    let contra=document.querySelector("#password").value;
    let nom =document.querySelector("#namec").value;
    let aviso=document.querySelector("#aviso");
    let h4=document.createElement("h4");
    let user =document.querySelector("#user").value;
    let dat=0;
    if(user.length<4){
        h4.innerHTML="Usuario debe tener minimo 4 caracteres";
        aviso.appendChild(h4)
        dat+=1;
    }else if(nom<5){
        h4.innerHTML="Nombre debe tener minimo 4 caracteres";
        aviso.appendChild(h4)
        dat+=1;
    }else if(contra.length<6){
        h4.innerHTML="La contraseña debe tener minimo 6 caracteres";
        aviso.appendChild(h4)
        dat+=1;
    }
    setTimeout(()=>{
        aviso.innerHTML="";
    },3000)
    if(dat==0){
        return true;
    }else{
        return false;
    }
}