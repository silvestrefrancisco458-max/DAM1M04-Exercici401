const db = require('../db/connection')

// LISTADO
exports.list = async (req, res) => {
  const pagina = parseInt(req.query.pagina) || 0
  const cerca = req.query.cerca || ''
  const limit = 10
  const offset = pagina * limit

  const text = `%${cerca}%`

  const [productes] = await db.query(`
    SELECT * FROM products
    WHERE name LIKE ? OR category LIKE ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `, [text, text, limit, offset])

  res.render('productes/list', {
    productes,
    pagina,
    cerca
  })
}

// FORM AFEGIR
exports.afegir = (req, res) => {
  res.render('productes/form', {
    action: '/create'
  })
}

// FORM EDITAR
exports.editar = async (req, res) => {
  const id = req.query.id

  const [[producte]] = await db.query(
    'SELECT * FROM products WHERE id=?',
    [id]
  )

  res.render('productes/form', {
    producte,
    action: '/Update'
  })
}