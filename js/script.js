// Seleção de elementos
const todoForm = document.querySelector("#todo-form")
console.log(todoForm)
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
console.log(cancelEditBtn)
let oldInputValue;//criando uma variável global

let user = localStorage.getItem("usuario")
document.getElementById("user-name").innerHTML = "Bem-vindo(a) " + user + "!";

// Funções
function searchTask() {
  let input = document.getElementById('input-search').value
  input = input.toLowerCase();
  let componentes = document.getElementsByClassName('todo');
  let nome = document.querySelectorAll('h3')
  let aux = componentes.length
  for (var i = 0; i < componentes.length; i++) { 
    if (!nome[i].innerText.toLowerCase().includes(input)) {
      componentes[i].style.display = "none"; 
      aux--;
    } else {
      componentes[i].style.display = "flex";              
    }
  }
 }

//estou esperando um texto, o texto da tarefa
const saveTodo = (text) => {
  const todo = document.createElement("div");//criando div
  todo.classList.add("todo");//adicionando class ao elemento
  
  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle)

  const doneBtn = document.createElement("button")
  doneBtn.classList.add("finish-todo")
  doneBtn.innerHTML = "<i class='fa-solid fa-check'></i>"//colocando o ícone
  todo.appendChild(doneBtn);//adicionando dentro do toto

  const editBtn = document.createElement("button")
  editBtn.classList.add("edit-todo")
  editBtn.innerHTML = "<i class='fa-solid fa-pen'></i>"//colocando o ícone
  todo.appendChild(editBtn);//adicionando dentro do toto

  const deletBtn = document.createElement("button")
  deletBtn.classList.add("remove-todo")
  deletBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>"//colocando o ícone
  todo.appendChild(deletBtn);//adicionando dentro do toto

  todoList.appendChild(todo);//colocando todo na lista geral, que está no html

  todoInput.value = ""
  todoInput.focus();
}

const toggleForms = () => {
  editForm.classList.toggle("hide");//se ñ tiver hide coloca, se tiver tira
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo")//pegando todos os todo pela classe

  todos.forEach((todo) => {//para cada todo

    let todoTitle = todo.querySelector("h3")//pegando o ritulo do todo que selecionei

    if(todoTitle.innerText === oldInputValue) {//comparando o titulo da interação atual se é igual ao anterior
      todoTitle.innerText = text //recebe o texto passado
    }
  })
}

// Eventos
todoForm.addEventListener("submit", (e) => {

  e.preventDefault();//pra não enviar o formulário quando pressionar o botão
  const inputValue = todoInput.value;
  if(inputValue) {//validando pra ver se o usuário digitou
    saveTodo(inputValue);
  }
})

//criando evento para botões
document.addEventListener("click", (e) => {//coloco o evento em todo o meu documento html, é mais fácil, visto que foram criados dinamicamente
  const targetEl = e.target //pegando o elemento que cliquei//elemento pai
  const parentEl = targetEl.closest("div")//estou escolhendo o elemento mais próximo, a div mais próxima do elemento pai
  let todoTitle;//pegando o título, nem todo elemento tem um

  if(parentEl && parentEl.querySelector("h3")) {//pré-requisitos pra ter um título
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if(targetEl.classList.contains("finish-todo")) {//checando pela classe do botão
    console.log("finish")
    parentEl.classList.toggle("done");//adicionando a class done para os todo que clico, uso o toggle pois se tñ tem a classe ele põe, se tem ele tira
  }

  if(targetEl.classList.contains("remove-todo")) {
    parentEl.remove()
  }

  if(targetEl.classList.contains("edit-todo")) {
   toggleForms()//

   editInput.value = todoTitle;
   //oldInputValue = todoTitle;//salvando o valor(texto) anterior para fazer alteração
   oldInputValue = todoTitle;
   console.log(oldInputValue)
  }
})

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms()
})


editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value

  if(editInputValue) {
    //atualizar o valor 
    updateTodo(editInputValue);
  }

  toggleForms();//colocando evento de voltar ao normal
})
