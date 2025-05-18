// seleciona os inputs do forms.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// captura o evento de input.
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "") // regex pra aceitar apenas números

  value = Number(value) / 100 // transforma em centavos

  amount.value = formatCurrencyBRL(value)
}

// formatando pra BRL
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

form.onsubmit = (event) => {
  event.preventDefault()

  // captura as informaçoes do select dentro de um objeto
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // chama a função que vai adicionar os itens na lista
  expenseAdd(newExpense)
}

// adiciona um novo item a lista
function expenseAdd(newExpense) {
  try {
    // cria o elemento (li) pra adicionar na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // cria o icone do elemento
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // cria o nome da despesa
    const expenseName = document.createElement("Stong")
    expenseName.textContent = newExpense.expense

    // cria a categoria da despesa
    expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // adiciona nome e categoria na div expense-info
    expenseInfo.append(expenseName, expenseCategory)

    // cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`

    //cria o icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // adiciona o item na lista
    expenseList.append(expenseItem)

    // limpa o formulario
    formCleaner()

    // atualiza os totais
    updateTotals()
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}

// atualiza os totais
function updateTotals() {
  try {
    // recupera todos os itens (li) da lista (ul)
    const items = expenseList.children

    // atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`

    // variavel de incremento
    let total = 0

    // percorre cada item (li) da lista (ul)
    for(let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      // remove caracteres não numericos e substitui a "," por "." para calculos.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      // converte para float
      value = parseFloat(value)

      // verifica se é um numero valido
      if (isNaN(value)) {
        return alert("Não foi possivel calcular o total.")
      }

      // incrementa o valor total
      total += Number(value)
    }

    // Cria a span para adicionar o total formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // formata o valor e deixa a estilização do <small>R$</small>
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // limpa o conteudo do elemento
    expensesTotal.innerHTML = ""

    // adiciona o simbolo e o valor total
    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}

// evento que captura o clique nos itens da lista

expenseList.addEventListener("click", function(event) {
  // verifica se o evento é do icone de remover
  if (event.target.classList.contains("remove-icon")) {
    // obtem a li pai do item clicado
    const item = event.target.closest(".expense")

    // remove o item da lista
    item.remove()
  }

  // atualiza os totais
  updateTotals()
})

function formCleaner() {
  // limpa os inputs
  expense.value = ""
  category.value = ""
  amount.value = ""

  // foca novamente no input
  expense.focus()
}