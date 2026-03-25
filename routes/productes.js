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
router.get('/productes', async (req, res) => {
  const pagina = parseInt(req.query.pagina) || 0
  const cerca = req.query.cerca || ''
  const limit = 10
  const offset = pagina * limit

  const text = `%${cerca}%`

  const [productes] = await db.query(`
    SELECT * FROM products
    WHERE name LIKE ? OR category LIKE ?
    LIMIT ? OFFSET ?
  `, [text, text, limit, offset])

  res.render('productes/list', {
    productes,
    pagina,
    cerca
  })
})

// AFEGIR
router.get('/producteAfegir', (req, res) => {
  res.render('productes/form', {
    action: '/create'
  })
})

// EDITAR
router.get('/producteEditar', async (req, res) => {
  const id = req.query.id

  const [[producte]] = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [id]
  )

  res.render('productes/form', {
    producte,
    action: '/Update'
  })
})

module.exports = router