let navbarbtn = document.querySelector('#navbar_btn');
let cookievalue = document.cookie;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  let newcookievalue = getCookie("sponzeall_user");

if(newcookievalue) {
    navbarbtn.innerHTML = `<a href="/profile/${newcookievalue}"><img src="img/sourceimg/user profile.png" height="40"></a>`;
} else {
    navbarbtn.innerHTML = `<a href="/login"><button class="btn btn-outline-primary border-bottom border-0"  style="margin: 0px -25px 0px 0px;" type="submit">LogIn</button></a>
          <a href="/registration"><button class="btn btn-outline-primary border-0 border-top" type="submit"> Register</button></a>`;
}