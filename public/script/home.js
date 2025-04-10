let databtn = document.querySelector('#databaseaccess');
let datahref = document.querySelector('#databaseaccesshref');
let deletepopup = document.querySelector('#delete_popup');

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

let cookiecheck = getCookie("sponzeall_user");

databtn.addEventListener('click' , () => {
    if(cookiecheck) {
        datahref.href = "/users";
    } else {
        deletepopup.innerHTML = `<div class="position-fixed d-flex text-center justify-content-center align-items-center w-100 h-100" style="background-color: rgba(0, 0, 0, 0.5);">
          <div class="bg-white m-4 p-5">
            <h3>Access Denied !</h3>
            <p class="text-secondary">Registration required to see the data of students. Would you like to register?</p>
            <button id="nobtn" class="btn btn-danger">Don't</button>
            <a href="/registration"><button id="yesbtn" class="btn btn-primary">Register</button></a>
          </div>
        </div>`;
        document.body.style.overflow = 'hidden';

        let nobtn = document.querySelector('#nobtn');
    
        nobtn.addEventListener("click", () => {
          document.body.style.overflow = '';
            deletepopup.innerHTML = ``;
        })
    }
})