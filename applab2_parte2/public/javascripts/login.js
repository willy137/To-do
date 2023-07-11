function recarga(){
    document.querySelector("#user").value="",
    document.querySelector("#password").value="";
}
window.onload= recarga();
function logearse(){
    if(validator()){
        let user=document.querySelector("#user").value;
        let contra=document.querySelector("#password").value;
        let dat=JSON.stringify({usuario:user,password:contra});
        fetch("/users/login2",{
            method:'post',
            body:dat,
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json())
        .then(dat=>{
            let aviso=document.querySelector("#aviso");
            let h4=document.createElement("h4");
            if(dat=="error"){
                h4.innerHTML="Usuario o contraseña incorrectos"
                aviso.appendChild(h4);
                setTimeout(()=>{
                    aviso.innerHTML=""
                },5000)
            }else {
                window.location.href=`/todo`;
            }
        })

    }
}

function validator(){
    let user=document.querySelector("#user");
    let password=document.querySelector("#password");
    let cont=0;
    if(user.value==0){
        user.focus();
        cont=1;
    }else if(password.value==0){
        password.focus();
        cont=1;
    }
    if(cont==0){
        return true;
    }else{
        return false;
    }
}