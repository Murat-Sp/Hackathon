const startBtn = document.querySelector('#startBtn');

startBtn.addEventListener('click', ()=>{
    window.location.href = 'predStart.html';


});

document.addEventListener("DOMContentLoaded", function() {
    let savedImage = localStorage.getItem("profileImage");
    let profilePic = document.getElementById("profile-pic");

    if (savedImage) {
        profilePic.src = savedImage; // Відображаємо фото профілю, якщо воно є
    }
});
