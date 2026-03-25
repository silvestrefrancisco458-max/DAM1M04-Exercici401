const db = require('../db/connection')

// LISTADO
exports.list = async (req, res) => {

  const [vendes] = await db.query(`
    SELECT sales.id, sales.sale_date, sales.total, customers.name AS client
    FROM sales
    JOIN customers ON sales.customer_id = customers.id
    ORDER BY sale_date DESC
    LIMIT 10
  `)

  res.render('vendes/list', { vendes })
}

// DETALLE
exports.fitxa = async (req, res) => {
  const id = req.query.id

  const [[venda]] = await db.query(
    'SELECT * FROM sales WHERE id=?',
    [id]
  )

  const [linies] = await db.query(`
    SELECT sale_items.qty, sale_items.unit_price, sale_items.line_total, products.name
    FROM sale_items
    JOIN products ON sale_items.product_id = products.id
    WHERE sale_items.sale_id=?
  `, [id])

  res.render('vendes/fitxa', {
    venda,
    linies
  })
}

exports.afegir = async (req, res) => {

  const [clients] = await db.query('SELECT * FROM customers')
  const [productes] = await db.query('SELECT * FROM products')

  res.render('vendes/form', {
    clients,
    productes
  })
}