document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#formClient')

  if (!form) return

  form.addEventListener('submit', (e) => {
    let ok = true

    const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const phone = document.querySelector('#phone')

    const errorName = document.querySelector('#errorName')
    const errorEmail = document.querySelector('#errorEmail')
    const errorPhone = document.querySelector('#errorPhone')

    errorName.textContent = ''
    errorEmail.textContent = ''
    errorPhone.textContent = ''

    name.classList.remove('input-error')
    email.classList.remove('input-error')
    phone.classList.remove('input-error')

    // VALIDACIONES
    if (name.value.trim().length < 2) {
      errorName.textContent = 'Nom obligatori'
      name.classList.add('input-error')
      ok = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email.value)) {
      errorEmail.textContent = 'Email no valid'
      email.classList.add('input-error')
      ok = false
    }

    if (phone.value.length < 9) {
      errorPhone.textContent = 'Telefon curt'
      phone.classList.add('input-error')
      ok = false
    }

    if (!ok) e.preventDefault()
  })

})