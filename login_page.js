const buttonLogin = document.querySelector("#entrar-conta");
buttonLogin.addEventListener("click", (e) => {
console.log("Button clicked.");
  e.preventDefault();
  let user = document.getElementById("usuario").value;
  let password = document.getElementById("senha").value; 
  console.log(user.value);
  
  if(document.getElementById("usuario").value === "" || document.getElementById("senha").value === "" ) {
      Swal.fire({
        icon: 'error',
        title: 'Oxe...',
        text: 'Você precisa inserir um usuário e senha para logar',
      })
  } else {
    localStorage.setItem("usuario", user);
    localStorage.setItem("senha", password);
    window.location = "index.html";
  } 
});

const cadastrar = document.querySelector("#nova-conta");
cadastrar.addEventListener("click", function(e) {
  e.preventDefault();
})