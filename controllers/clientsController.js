const db = require('../db/connection')

// LISTADO
exports.list = async (req, res) => {
  const pagina = parseInt(req.query.pagina) || 0
  const cerca = req.query.cerca || ''
  const limit = 10
  const offset = pagina * limit

  const text = `%${cerca}%`

  const [clients] = await db.query(`
    SELECT *,
    (SELECT COUNT(*) FROM sales WHERE customer_id = customers.id) AS compres
    FROM customers
    WHERE name LIKE ? OR email LIKE ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `, [text, text, limit, offset])

  res.render('clients/list', {
    clients,
    pagina,
    cerca
  })
}

// FORM AFEGIR
exports.afegir = (req, res) => {
  res.render('clients/form', {
    action: '/create'
  })
}

// FORM EDITAR
exports.editar = async (req, res) => {
  const id = req.query.id

  const [[client]] = await db.query(
    'SELECT * FROM customers WHERE id=?',
    [id]
  )

  res.render('clients/form', {
    client,
    action: '/Update'
  })
}

// FITXA CLIENT
exports.fitxa = async (req, res) => {
  const id = req.query.id

  const [[client]] = await db.query(
    'SELECT * FROM customers WHERE id=?',
    [id]
  )

  const [vendes] = await db.query(`
    SELECT * FROM sales
    WHERE customer_id=?
    ORDER BY sale_date DESC
    LIMIT 10
  `, [id])

  res.render('clients/fitxa', {
    client,
    vendes
  })
}