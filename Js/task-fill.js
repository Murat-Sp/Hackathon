const btnAddTask = document.querySelector('#btnAddTask');
const btnSaveAll = document.querySelector('#btnSaveAll');
const InputAnswerS = document.querySelector('#InputAnswerS');
const UlTask = document.querySelector('#UlTask');


btnAddTask.addEventListener('click', (event)=>{
    event.preventDefault();

    if(UlTask.children.length >= 6){
        alert('Максимальна кількість варіантів — 6!');
        return;
    }

    let InputAnswersValue = InputAnswerS.value.trim();

    if(InputAnswersValue == ''|| InputAnswersValue ==null){
        alert('Заповніть поле відповідей!');
        return;
    }


        const newEl = document.createElement('li');
        const newElP = document.createElement('p');
        newElP.textContent = InputAnswersValue;
        newEl.classList.add('newEl');
        newElP.classList.add('newElP');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';

        deleteBtn.addEventListener('click', ()=>{
            UlTask.removeChild(newEl);
        });

        const Btncheckbox = document.createElement('input');
        Btncheckbox.type = 'checkbox';
        
        newEl.appendChild(newElP);
        newEl.appendChild(deleteBtn);
        UlTask.appendChild(newEl);
        newEl.appendChild(Btncheckbox);


        InputAnswerS.value = '';

});

btnSaveAll.addEventListener('click', (event)=>{
    event.preventDefault();

    window.location.href = 'dashboard.html';
});


