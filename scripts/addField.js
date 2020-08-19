// adicionando novos formulários ao clicar no botão "+ Novo horário"
// procurando o botão. quando clicar no botão (evento)
document.querySelector('#add-time').addEventListener('click', cloneField);


// executar uma ação
function cloneField() {
    // duplicando os campos. quais campos? .schedule-item - boolean: true ou false
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    // limpando os campos do formulário, caso já estejam preenchidos
    const fields = newFieldContainer.querySelectorAll('input');
    // para cada campo (field), limpar
    fields.forEach(function(field) {        
        field.value = ""; // pegando o field do momento e limpando ele
    });
    // colocar na página. onde na página? #schedule-items
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}