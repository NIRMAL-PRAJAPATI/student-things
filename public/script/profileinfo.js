let personalbtn = document.querySelector('#personalbtn');
let name = document.querySelector('#floatingname');
let email = document.querySelector('#floatingemail');
let mobile = document.querySelector('#floatingmobile');
let birthdate = document.querySelector('#floatingbirthdate');
let imageinstruction = document.querySelector('#imageinstruction');
let profileimginput = document.querySelector('#profileimginput');
let form1 = document.querySelector('#personalform');

let residentialbtn = document.querySelector('#residentialbtn');
let address = document.querySelector('#floatingaddress');
let pincode = document.querySelector('#floatingpincode');
let city = document.querySelector('#floatingcity');
let state = document.querySelector('#floatingstate');
let country = document.querySelector('#floatingcountry');
let form2 = document.querySelector('#residentialform');

let professionbtn = document.querySelector('#professionbtn');
let type = document.querySelector('#floatingtype');
let qualification = document.querySelector('#floatingqualification');
let scwname = document.querySelector('#floatingscwname');
let skill = document.querySelector('#floatingskill');
let language = document.querySelector('#floatinglanguage');
let form3 = document.querySelector('#professionform');

let information = document.querySelector('#information');
let project = document.querySelector('#project');
let activity = document.querySelector('#activity');

// for personal button press things
personalbtn.addEventListener("click", () => {
    name.disabled = false;
    email.disabled = false;
    mobile.disabled = false;
    birthdate.disabled = false;
    profileimginput.disabled = false;

    personalbtn.innerHTML = "Save Information";

    const path = window.location.pathname;

    imageinstruction.innerHTML = "click the profile to change !";
    imageinstruction.style.margin = "-5px 0px -5px 0px";

    personalbtn.addEventListener("click", () => {
        form1.method = "post";
        form1.action = (`/profile/update/${path.slice(9)}`);
        form1.submit();
    });
})

// for residential button press things
residentialbtn.addEventListener("click", () => {
    pincode.disabled = false;
    address.disabled = false;
    city.disabled = false;
    state.disabled = false;
    country.disabled = false;

    residentialbtn.innerHTML = "Save Information";

    const path = window.location.pathname;

    residentialbtn.addEventListener("click", () => {
        form2.method = "post";
        form2.action = (`/profile/resinformation/${path.slice(9)}`);
        form2.submit();
    });
})

// for profesion button press things
professionbtn.addEventListener("click", () => {
    type.disabled = false;
    qualification.disabled = false;
    scwname.disabled = false;
    skill.disabled = false;
    language.disabled = false;

    professionbtn.innerHTML = "Save Information";

    const path = window.location.pathname;

    professionbtn.addEventListener("click", () => {
        form3.method = "post";
        form3.action = (`/profile/profinformation/${path.slice(9)}`);
        form3.submit();
    });
})


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  let newcookievalue = getCookie("sponzeall_user");

information.href = `/profile/${newcookievalue}`;
project.href = `project/${newcookievalue}`;
activity.href = `activity/${newcookievalue}`;