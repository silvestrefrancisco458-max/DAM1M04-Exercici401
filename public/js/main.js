document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // TEMA
  // =====================
  const selector = document.querySelector('#themeSelector')

  if (selector) {
    const temaGuardado = localStorage.getItem('tema') || 'clar'
    document.body.className = 'theme-' + temaGuardado
    selector.value = temaGuardado

    selector.addEventListener('change', () => {
      const tema = selector.value
      localStorage.setItem('tema', tema)
      document.body.className = 'theme-' + tema
    })
  }

  // =====================
  // TOGGLE KPI
  // =====================
  const btnKPI = document.querySelector('#toggleKPI')
  const panelKPI = document.querySelector('#kpiPanel')

  if (btnKPI && panelKPI) {
    btnKPI.addEventListener('click', () => {
      panelKPI.classList.toggle('hidden')
    })
  }

  // =======================
  // 🎨 TOGGLE COLORES STOCK
  // =======================
  const btnColors = document.querySelector('#toggleColors')

  if (btnColors) {
    btnColors.addEventListener('click', () => {
      document.body.classList.toggle('no-stock-colors')
    })
  }

})