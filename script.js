// seleciona os elementos do Formulário
const form = document.querySelector('form');
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista de despesas
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")


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


// captura o evento de submit do formulário
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

        // cria a div expense-info
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");


        // cria o nome da despesa (strong)
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense

        // cria a categoria da despesa (span)
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Cria o elemento span para o valor da despesa.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")

        // Formata o valor da despesa para o padrão BRL e define o HTML do elemento.
        // Remove "R$", espaços em branco e converte para maiúsculas antes de formatar.
        expenseAmount.innerHTML = `<small>R$</small>${formatCurrencyBRL(newExpense.amount
            .toUpperCase().replace("R$", "").trim())}` // formata o valor para o padrão BRL

        // adiciona o icone de remover o item da lista
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "./img/remove.svg")

        // adiciona as informações dentro da div expense-info
        expenseInfo.append(expenseName, expenseCategory)

        // adiciona os elementos ao item da lista (li)
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // adiciona o item da lista (li) na lista de despesas (ul)
        expenseList.append(expenseItem)

        // atualiza os totais
        updateTotals()

    } catch (error) {
        console.log("Erro ao adicionar despesa:", error);
    }

}

// adiciona os totais
function updateTotals() {
    try {
        // recupera todos os itens da lista de despesas
        const items = expenseList.children

        // atualiza a quantidade de itens da lista dinamicante no plural e singular
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // variavel para incrementar o total
        let total = 0;

        // percorre os item (li) da lista (ul) de despesas
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount").textContent

            // regex para remover tudo que não for número mantendo a vírgula e substituindo por ponto
            let value = itemAmount.replace(/[^\d,]/g, "").replace(",",".");

            // converte o valor para float
            value = parseFloat(value);

            // verifica se o valor é um número válido
            if (isNaN(value)) {
                return alert("Não foi possível calcular o total, verifique os valores das despesas.");
            }

            // incrementa o valor total
            total += Number(value)
        }

        // cria a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // formata o total para o padrão BRL e remove o símbolo R$ do valor
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "").trim();

        // limpa o conteúdo atual
        expensesTotal.innerHTML = "";

        // adiciona o símbolo e o total formatado
        expensesTotal.append(symbolBRL, total);

    } catch (error) {
        console.log("Erro ao atualizar totais:", error);
    }
}