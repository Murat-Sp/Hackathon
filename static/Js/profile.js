const backToTestBtn = document.querySelector('.backToTestBtn');

document.getElementById("upload-profile-pic").addEventListener("change", async function (event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    let fileInput = document.getElementById("upload-profile-pic").files[0];
    let formData = new FormData();
    formData.append("file", fileInput);

    let response = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    let result = await response.text();
    console.log(result);
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

