const novaTarefa = document.querySelector('.novaTarefa');
const addTarefa = document.querySelector('.addTarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

novaTarefa.addEventListener('keypress', function(evento){
    if(evento.keyCode === 13){
        if(!novaTarefa.value) return;
        criaTarefa(novaTarefa.value);
    }
});

function limpaInput(){
    novaTarefa.value = '';
    novaTarefa.focus();
}

function btnApagar(li){
    li.innerText += '';
    const apagar = document.createElement('button');
    apagar.innerText = 'Apagar';
    apagar.setAttribute('class', 'apagar');
    apagar.setAttribute('title' , 'Exluir essa tarefa');
    li.appendChild(apagar);
}

function criaTarefa(input){
    const li = criaLi();
    li.innerText = input;
    tarefas.appendChild(li);
    limpaInput();
    btnApagar(li);
    salvarTarefa();
}

addTarefa.addEventListener('click', function(){
if(!novaTarefa.value) return;
criaTarefa(novaTarefa.value);
});

document.addEventListener('click', function(evento){
    const event = evento.target;

    if(event.classList.contains('apagar')){
        event.parentElement.remove();
        salvarTarefa();
    }
});

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

addTarefasSalvas();