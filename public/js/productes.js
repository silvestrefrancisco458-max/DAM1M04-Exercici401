document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#formProducte')

  if (!form) return

  form.addEventListener('submit', (e) => {
    let ok = true

    const name = document.querySelector('#name')
    const category = document.querySelector('#category')
    const price = document.querySelector('#price')
    const stock = document.querySelector('#stock')

    const errorName = document.querySelector('#errorName')
    const errorCategory = document.querySelector('#errorCategory')
    const errorPrice = document.querySelector('#errorPrice')
    const errorStock = document.querySelector('#errorStock')

    // reset
    errorName.textContent = ''
    errorCategory.textContent = ''
    errorPrice.textContent = ''
    errorStock.textContent = ''

    name.classList.remove('input-error')
    category.classList.remove('input-error')
    price.classList.remove('input-error')
    stock.classList.remove('input-error')

    // VALIDACIONES
    if (name.value.trim().length < 3) {
      errorName.textContent = 'Nom massa curt'
      name.classList.add('input-error')
      ok = false
    }

    if (category.value.trim().length < 2) {
      errorCategory.textContent = 'Categoria obligatoria'
      category.classList.add('input-error')
      ok = false
    }

    if (!(price.valueAsNumber > 0)) {
      errorPrice.textContent = 'Preu incorrecte'
      price.classList.add('input-error')
      ok = false
    }

    if (!Number.isInteger(Number(stock.value)) || stock.value < 0) {
      errorStock.textContent = 'Stock incorrecte'
      stock.classList.add('input-error')
      ok = false
    }

    if (!ok) e.preventDefault()
  })

})