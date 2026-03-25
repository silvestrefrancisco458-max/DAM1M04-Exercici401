const express = require('express')
const router = express.Router()
const db = require('../db/connection')

// LISTADO
router.get('/vendes', async (req, res) => {
  const [vendes] = await db.query(`
    SELECT sales.*, customers.name AS client
    FROM sales
    JOIN customers ON sales.customer_id = customers.id
    ORDER BY sale_date DESC
    LIMIT 10
  `)

  res.render('vendes/list', { vendes })
})

// DETALLE
router.get('/vendaFitxa', async (req, res) => {
  const id = req.query.id

  const [[venda]] = await db.query(
    'SELECT * FROM sales WHERE id = ?',
    [id]
  )

  const [linies] = await db.query(`
    SELECT sale_items.*, products.name
    FROM sale_items
    JOIN products ON sale_items.product_id = products.id
    WHERE sale_items.sale_id = ?
  `, [id])

  res.render('vendes/fitxa', {
    venda,
    linies
  })
})

router.get('/vendaAfegir', async (req, res) => {
  const [clients] = await db.query('SELECT * FROM customers')
  const [productes] = await db.query('SELECT * FROM products')

  res.render('vendes/form', {
    clients,
    productes
  })
})


module.exports = router