let popup = document.querySelector('#delete_popup');
let confirmdeletebtn = document.querySelector('#condelbtn');

let confirmdelete = (id) => {
  document.body.style.overflow = 'hidden';

        popup.innerHTML = `<div class="position-fixed d-flex text-center justify-content-center align-items-center w-100 h-100" style="background-color: rgba(0, 0, 0, 0.5);">
          <div class="bg-white m-4 p-5">
            <h3>Are You Sure !</h3>
            <p class="text-secondary">Would you like to delete the selected student from the database?</p>
            <button id="nobtn" class="btn btn-danger">Don't</button>
            <button id="yesbtn" class="btn btn-primary">Yes, Delete</button>
          </div>
        </div>`;
    
        let nobtn = document.querySelector('#nobtn');
        let yesbtn = document.querySelector('#yesbtn');
    
        nobtn.addEventListener("click", () => {
          document.body.style.overflow = '';
            popup.innerHTML = ``;
        })

        yesbtn.addEventListener("click", () => {
            confirmdeletebtn.href = "/delete/" + id;
            confirmdeletebtn.click();
        })
}