// seleciona os elementos do Formulário
const form = document.querySelector('form');
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista de despesas
const expenseList = document.querySelector("ul")


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
    
    // chama a função para adicionar o item na lista
    expenseAdd(newExpense);
}

// adiciona a nova despesa
function expenseAdd(newExpense) {
    try {
        // cria o elemento (li class="expense") pra adicionar na lista (ul)
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense")

        // cria o icone da categoria (img)
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", `Icone da categoria ${newExpense.category_name}`)
        
        // adiciona os elementos ao item da lista (li)
        expenseItem.append(expenseIcon)
        
        // adiciona o item da lista (li) na lista de despesas (ul)
        expenseList.append(expenseItem)
        
    } catch (error) {
        console.log("Erro ao adicionar despesa:", error);
    }
}

