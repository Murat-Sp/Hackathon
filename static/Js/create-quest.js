const btnSave = document.querySelector('#btnSave');

btnSave.addEventListener('click', (event)=>{
    event.preventDefault();

    window.location.href = "task-fill";
});
