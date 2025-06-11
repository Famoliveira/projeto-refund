// seleciona os elementos do Formulário
const form = document.querySelector('form');
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


// adiciona um evento de input ao campo amount
amount.oninput = () => {
    // regex para remover tudo que não for número
    let value = amount.value.replace(/\D/g, "")
    
    //transforma o valor em centavos
    value = Number(value) / 100
    
    // atualiza o valor formatado para o campo amount
    amount.value = formatCurrencyBRL(value)
    
}


// formata o valor para o padrão BR
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    
    return value // valor formatado
}

form.onsubmit = (event) => {
    event.preventDefault(); // previne o envio do formulário
    
    // captura os valores da despesa em um objeto
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    
    console.log(newExpense)
}