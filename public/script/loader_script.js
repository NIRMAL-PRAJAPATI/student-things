let secdiv = document.querySelector('#secdiv');
let second = 0;

setInterval(() => {
    if(second == 0) {
        location.replace('/')
    }
    secdiv.innerHTML = `<p>You will be redirected to registration page after <h5 class="border mx-1 text-danger">${second}</h5>seconds</p>`;

    second--;
}, 1000)