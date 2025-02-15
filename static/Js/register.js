const BtnSignUp = document.querySelector('#SignUp');
const BtnSignIn = document.querySelector('#SignIn');
const InputEmail = document.querySelector('#InputEmail');
const InputPassword = document.querySelector('#InputPassword');
const InputUserName = document.querySelector('#InputUserName');


BtnSignIn.addEventListener('click', (event)=>{ 
    event.preventDefault();

    let InputEmailValue = InputEmail.value;
    let InputPasswordValue = InputPassword.value;

    if(InputEmailValue == adminEmail && InputPasswordValue == adminPassword){
        window.location.href = 'dashboard.html';
    }else{
        alert('Не правильно введені данні!')
    }
}); 

BtnSignUp.addEventListener('click', (event)=>{
    event.preventDefault();
    let InputUserNameVal = InputUserName.value;
    let InputEmailValue = InputEmail.value;
    let InputPasswordValue = InputPassword.value;

    if(InputEmailValue == ''|| InputPasswordValue == ''|| InputUserNameVal == ''){
        alert('Не правильно введені данні!');
        return;
    }


    window.location.href = 'dashboard.html';
});


let adminEmail = 'admin';
let adminPassword = 'admin';

