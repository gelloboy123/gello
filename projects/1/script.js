document.addEventListener("DOMContentLoaded", function() {
    const btnAboutme = document.getElementById('btn-AboutMe');
    const divAboutme = document.getElementById('div-AboutMe');

    btnAboutme.addEventListener('click', function() {
        if (divAboutme.classList.contains('hide')) {
            divAboutme.classList.remove('hide');
            btnAboutme.textContent = "SHOW LESS";
        } else {
            divAboutme.classList.add('hide');
            btnAboutme.textContent = "ABOUT ME";
        }
    });s
});