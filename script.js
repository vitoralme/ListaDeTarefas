let listaDeTarefas = [] 
let itemAEditar = null;

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItarefas = document.getElementById("lista-de-itens")
const ulItarefasConcluidas = document.getElementById("itens-comprados")
const listaRecuperada = localStorage.getItem('listaDeTarefas')

function salvarEdicao() {
    if (itemAEditar !== null) {
        const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
        listaDeTarefas[itemAEditar].valor = itemEditado.value;
        console.log(listaDeTarefas);
        itemAEditar = null;
        mostrarTarefa();
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault()
    salvarTarefa()
    mostrarTarefa()
    itensInput.focus()

})

function atualizaLocalStorage() {
    localStorage.setItem('listaDeTarefas', JSON.stringify(listaDeTarefas))
}

if('listaRecuperada'){
    listaDeTarefas = JSON.parse(listaRecuperada)
    mostrarTarefa()
} else{
    listaDeTarefas = []
}

function salvarTarefa() {
    const tarefas = itensInput.value;
    const checarDuplicado = listaDeTarefas.some((elemento) => elemento.valor.toUpperCase() === tarefas.toUpperCase())

    if (checarDuplicado) {
        alert("Tarefa já existe.")
    } else {
         listaDeTarefas.push({
            valor: tarefas,
            checar: false
        })
    }

    itensInput.value = ''
}   

    function mostrarTarefa() {
        ulItarefas.innerHTML = ''
        ulItarefasConcluidas.innerHTML = ''

        listaDeTarefas.forEach((elemento,index) => {
            if(elemento.checar) {
                ulItarefasConcluidas.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
                `    
                } else {
            ulItarefas.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number (itemAEditar) ? 'disabled' : ''}></input>
            </div>
            <div>
            ${ index === Number (itemAEditar) ?'<button onClick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}

                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`
        }
        })

        const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

        inputsCheck.forEach(i => {
            i.addEventListener('click', (evento) => {
                const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
                listaDeTarefas[valorDoElemento].checar = evento.target.checked
                mostrarTarefa()
            })
        
    })

    const deletarTarefas = document.querySelectorAll(".deletar")

    deletarTarefas.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeTarefas.splice(valorDoElemento,1)
            mostrarTarefa()
        })
    })

    const editarTarefas = document.querySelectorAll(".editar")

    editarTarefas.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarTarefa()
        })
    })

    atualizaLocalStorage()

}

    function salvarEdicao() {
            const itemEditado = document.querySelector(`[data-value = "${itemAEditar}" ] input[type="text"]`)
            listaDeTarefas[itemAEditar].valor = itemEditado.value
            console.log(listaDeTarefas)
            itemAEditar = -1
            mostrarTarefa()
}
