// routes/productes.js
// Rutas para gestionar PRODUCTES:
// - Llistat con paginació y cerca
// - Formulari d'afegir
// - Formulari d'editar
// - Delete

const express = require('express')
const router = express.Router()
const db = require('../db/connection')

// LISTADO
router.get('/clients', async (req, res) => {
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
    LIMIT ? OFFSET ?
  `, [text, text, limit, offset])

  res.render('clients/list', {
    clients,
    pagina,
    cerca
  })
})

// AFEGIR
router.get('/clientAfegir', (req, res) => {
  res.render('clients/form', {
    action: '/create'
  })
})

// EDITAR
router.get('/clientEditar', async (req, res) => {
  const id = req.query.id

  const [[client]] = await db.query(
    'SELECT * FROM customers WHERE id = ?',
    [id]
  )

  res.render('clients/form', {
    client,
    action: '/Update'
  })
})

// FITXA
router.get('/clientFitxa', async (req, res) => {
  const id = req.query.id

  const [[client]] = await db.query(
    'SELECT * FROM customers WHERE id = ?',
    [id]
  )

  const [vendes] = await db.query(`
    SELECT * FROM sales
    WHERE customer_id = ?
    ORDER BY sale_date DESC
    LIMIT 10
  `, [id])

  res.render('clients/fitxa', {
    client,
    vendes
  })
})

module.exports = router
