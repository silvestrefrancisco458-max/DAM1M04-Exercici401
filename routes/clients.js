// routes/productes.js
// Rutas para gestionar PRODUCTES:
// - Llistat con paginació y cerca
// - Formulari d'afegir
// - Formulari d'editar
// - Delete

const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// GET /productes?pagina=0&cerca=patates
router.get('/', async (req, res) => {
  const pagina = parseInt(req.query.pagina || '0', 10); // página actual (0 por defecto)
  const cerca = req.query.cerca || ''; // texto de búsqueda

  const limit = 10; // máximo 10 productes per pàgina
  const offset = pagina * limit;

  let where = '';
  const params = [];

  // Si hay texto de búsqueda, filtramos por nombre o categoría
  if (cerca) {
    where = `WHERE name LIKE ? OR category LIKE ?`;
    params.push(`%${cerca}%`, `%${cerca}%`);
  }

  try {
    const conn = await getConnection();

    // Contamos total de productos para saber si hay página siguiente
    const [countRows] = await conn.execute(
      `SELECT COUNT(*) AS total FROM products ${where}`,
      params
    );
    const total = countRows[0].total;

    // Obtenemos productos de la página actual
    const [products] = await conn.execute(
      `SELECT id, name, category, price, stock, active
       FROM products
       ${where}
       ORDER BY id ASC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    await conn.end();

    const tePaginaAnterior = pagina > 0;
    const tePaginaSeguent = offset + limit < total;

    res.render('productes/list', {
      products,
      pagina,
      cerca,
      tePaginaAnterior,
      tePaginaSeguent,
      total,
    });
  } catch (err) {
    console.error('Error llistat productes:', err);
    res.render('productes/list', {
      products: [],
      pagina,
      cerca,
      tePaginaAnterior: false,
      tePaginaSeguent: false,
      total: 0,
    });
  }
});

// GET /productes/afegir  -> formulario vacío para crear producto
router.get('/afegir', (req, res) => {
  res.render('productes/form', {
    mode: 'create', // lo usamos en la vista para cambiar título/botones
    actionUrl: '/productes/create', // endpoint al que hace POST
    product: {
      id: '',
      name: '',
      category: '',
      price: '',
      stock: '',
      active: 1,
    },
  });
});

// GET /productes/editar?id=4  -> formulario con datos del producto
router.get('/editar', async (req, res) => {
  const id = parseInt(req.query.id, 10);

  try {
    const conn = await getConnection();
    const [rows] = await conn.execute(
      `SELECT id, name, category, price, stock, active
       FROM products
       WHERE id = ?`,
      [id]
    );
    await conn.end();

    if (!rows.length) {
      // Si no existe el producto, volvemos al listado
      return res.redirect('/productes');
    }

    res.render('productes/form', {
      mode: 'edit',
      actionUrl: '/productes/update',
      product: rows[0],
    });
  } catch (err) {
    console.error('Error carregant producte:', err);
    res.redirect('/productes');
  }
});

// POST /productes/create  -> crear producto (equivalente a /create del enunciado)
router.post('/create', async (req, res) => {
  const { name, category, price, stock, active } = req.body;

  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO products (name, category, price, stock, active, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name, category, parseFloat(price), parseInt(stock, 10), active ? 1 : 0]
    );
    await conn.end();
  } catch (err) {
    console.error('Error creant producte:', err);
  }

  res.redirect('/productes');
});

// POST /productes/update  -> actualizar producto (equivalente a /Update del enunciado)
router.post('/update', async (req, res) => {
  const { id, name, category, price, stock, active } = req.body;

  try {
    const conn = await getConnection();
    await conn.execute(
      `UPDATE products
       SET name = ?, category = ?, price = ?, stock = ?, active = ?
       WHERE id = ?`,
      [
        name,
        category,
        parseFloat(price),
        parseInt(stock, 10),
        active ? 1 : 0,
        parseInt(id, 10),
      ]
    );
    await conn.end();
  } catch (err) {
    console.error('Error actualitzant producte:', err);
  }

  res.redirect('/productes');
});

// POST /productes/delete  -> borrar producto (equivalente a /Delete del enunciado)
router.post('/delete', async (req, res) => {
  const { id } = req.body;

  try {
    const conn = await getConnection();
    await conn.execute(`DELETE FROM products WHERE id = ?`, [parseInt(id, 10)]);
    await conn.end();
  } catch (err) {
    console.error('Error eliminant producte:', err);
  }

  res.redirect('/productes');
});

module.exports = router;
