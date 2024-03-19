let form = document.querySelector("#form");
  const singup = () => {
    event.preventDefault
    let payload = {
      firstname: document.querySelector("#firstName").value,
      lastname: document.querySelector("#lastName").value,
      email: document.querySelector("#email").value,
      pass: document.querySelector("#pass").value,
    }
    console.log()
    let usremail = localStorage.setItem("userdata", payload.email)


    // console.log(payload)
    fetch("https://cyan-dugong-cape.cyclic.app/users/register", {

      method: "POST",
      headers: {
        "Content-type": "application/json"
      },

      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        // alert(res.msg)
        Swal.fire(
          'Register',
          'Successful',
          'success'
        )
        setTimeout(() => {
          window.location.href = "#"
        }, 3000);
        localStorage.setItem("username", payload.firstname);
        localStorage.setItem("email", payload.email)
      }
      )
      .catch(err => console.log(err.message))

  }

  const login = () => {
    let logindata = {
      email: document.querySelector("#email-login").value,
      pass: document.querySelector("#pass-login").value,
    }
    console.log(logindata)
    
      fetch("https://cyan-dugong-cape.cyclic.app/users/login", {

        method: "POST",
        headers: {
          "Content-type": "application/json"
        },

        body: JSON.stringify(logindata)
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          if (res.token) {
            localStorage.setItem("token", res.token)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
            setTimeout(() => {
              window.location.href = ("./index.html")
            }, 3000);

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
            setTimeout(() => {
              window.location.href = "#";
            }, 3000);
          }
        })
        .catch(err => console.log(err))
    
  }
  let logo = document.querySelector("#logo-image");
  logo.addEventListener("click", () => {
    window.location.href = "./index.html"
  })

  let userslogo = document.querySelector("#user-icon")
  userslogo.addEventListener("click", () => {
    window.location.href = "./login.html"
  })
  let cartlogo = document.querySelector("#cart-icon")
  cartlogo.addEventListener("click", () => {
    let tokendata = localStorage.getItem("token")
    if (tokendata) {
      window.location.href = "./cart.html"
    } else {
      window.location.href = "#"
    }

  })
  let tokendata = localStorage.getItem("token");
  let userIcon = document.querySelector("#user-icon");
  let userLogout = document.querySelector("#user-logout");
  if (tokendata) {
    userIcon.style.display = "none";
    userLogout.style.display = "block";
  } else {
    // userIcon.style.display = "none";
    userLogout.style.display = "block";
  }
  userLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
  window.location.href = "./index.html";
});
