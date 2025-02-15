const backToTestBtn = document.querySelector('.backToTestBtn');

document.getElementById("upload-profile-pic").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-image").src = e.target.result;
            localStorage.setItem("profileImage", e.target.result); // Збереження у браузері
        };
        reader.readAsDataURL(file);
    }
});

// Перевіряємо, чи є збережене фото
document.addEventListener("DOMContentLoaded", function() {
    let savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        document.getElementById("profile-image").src = savedImage;
    }
});


backToTestBtn.addEventListener('click', ()=>{
    window.location.href = 'dashboard';

});

