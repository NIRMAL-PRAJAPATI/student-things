let slidebtn = document.querySelector('#projectslider');
let projectbox = document.querySelector('#addprojectbox');
let upofaddproject = document.querySelector('#upofaddproject');
let projectdeletebtn = document.querySelector('#projectdeletebtn');
let bodytag = document.querySelector('#bodytag');

slidebtn.addEventListener("click", () => {
    let check = slidebtn.innerHTML;

    if(check == "Slidedown to add project") {
        upofaddproject.style.position = "absolute";
    slidebtn.innerHTML = "Close";
    projectbox.style.marginTop = "0px";
    upofaddproject.style.marginLeft = "-10px";
    }
    else {
        slidebtn.innerHTML = "Slidedown to add project";
        projectbox.style.marginTop = "-585px";
        upofaddproject.style.position = "";
        upofaddproject.style.marginLeft = "0px";
    }
})

let projectdeleter = (url) => {
    document.body.style.overflow = 'hidden';

        bodytag.innerHTML = `<div class="position-fixed d-flex text-center justify-content-center align-items-center w-100 h-100" style="background-color: rgba(0, 0, 0, 0.5);">
          <div class="bg-white m-4 p-5">
            <h3>Are You Sure !</h3>
            <p class="text-secondary">Would you like to delete the selected project from your profile?</p>
            <button id="nobtn" class="btn btn-danger">Don't</button>
            <button id="yesbtn" class="btn btn-primary">Yes, Delete</button>
          </div>
        </div>`;
        bodytag.style.marginLeft = "-10px";

        let nobtn = document.querySelector('#nobtn');
        let yesbtn = document.querySelector('#yesbtn');
    
        nobtn.addEventListener("click", () => {
          document.body.style.overflow = '';
            bodytag.innerHTML = ``;
        })

        yesbtn.addEventListener("click", () => {
            projectdeletebtn.href = url;
            projectdeletebtn.click();
        })
}