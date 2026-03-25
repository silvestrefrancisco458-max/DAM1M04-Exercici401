const express = require('express')
const router = express.Router()
const db = require('../db/connection')

// DASHBOARD
router.get('/', async (req, res) => {
  // KPIs
  const [[avui]] = await db.query(`
    SELECT 
      COUNT(*) AS comandesAvui,
      COALESCE(SUM(total), 0) AS vendesAvui
    FROM sales
    WHERE DATE(sale_date) = CURDATE()
  `)

  const [[mes]] = await db.query(`
    SELECT 
      COUNT(*) AS comandesMes,
      COALESCE(SUM(total), 0) AS vendesMes
    FROM sales
    WHERE YEAR(sale_date)=YEAR(CURDATE())
      AND MONTH(sale_date)=MONTH(CURDATE())
  `)

  const [[stockBaix]] = await db.query(`
    SELECT COUNT(*) AS total
    FROM products
    WHERE stock <= 5
  `)

  // Últimas ventas
  const [ultimesVendes] = await db.query(`
    SELECT sales.sale_date, sales.total, customers.name AS client
    FROM sales
    JOIN customers ON sales.customer_id = customers.id
    ORDER BY sale_date DESC
    LIMIT 5
  `)

  // Top productos
  const [topProductes] = await db.query(`
    SELECT products.name, SUM(sale_items.qty) AS totalVenut
    FROM sale_items
    JOIN products ON sale_items.product_id = products.id
    GROUP BY products.id
    ORDER BY totalVenut DESC
    LIMIT 5
  `)

  res.render('dashboard', {
    avui,
    mes,
    stockBaix: stockBaix.total,
    ultimesVendes,
    topProductes
  })
})

module.exports = router