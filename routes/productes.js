// routes/productes.js
// Rutas para gestionar PRODUCTES:
// - Llistat con paginació y cerca
// - Formulari d'afegir
// - Formulari d'editar
// - Delete

const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// GET /productes -> Llistat de productes amb paginació i cerca
router.get('/', async (req, res) => {
    const pagina = parseInt(req.query.pagina || '0', 10);
    const cerca = req.query.cerca || '';

    const limit = 10;
    const offset = pagina * limit;

    let where = '';
    const params = [];

    // Si hay texto de búsqueda, filtramos por nombre o categoría
    if (cerca) {
        where = 'WHERE name LIKE ? OR category LIKE ?';
        params.push(`%${cerca}%`, `%${cerca}%`);
    }

    try {
        const connection = await getConnection();

        // Contamos total de productos para saber si hay página siguiente
        const [countRows] = await connection.execute(
            `SELECT COUNT(*) AS total FROM products ${where}`,
            params
        );
        const total = countRows[0].total;

        // Obtenemos productos con paginación
        const [products] = await conn.execute(
            `SELECT id, name, category, price, stock, active
            FROM products
            ${where}
            ORDER BY id ASC
            LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        await connection.end();

        const tePaginaAnterior = pagina > 0;
        const tePaginaSiguiente = offset + limit < total;

        res.render('productes/list', {
            products,
            pagina,
            cerca,
            tePaginaAnterior,
            tePaginaSiguiente,
            total,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.render('productes/list', {
            products: [],
            pagina,
            cerca,
            tePaginaAnterior: false,
            tePaginaSiguiente: false,
            total: 0,
        });
    }
});

// GET /productes/afegir  -> formulario vacío para crear producto
router.get('/afegir', (req, res) => {
    res.render('productes/form', {
        mode: 'create',// lo usamos en la vista para cambiar título/botones
        actionUrl: '/productes/create',// endpoint al que hace POST
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
        const connection = await getConnection();
        const [rows] = await connection.execute(
            `SELECT id, name, category, price, stock, active
            FROM products
            WHERE id = ?`,
            [id]
        );
        await connection.end();

        if (rows.length) {
            // Si no existe el producto, volvemos al listado
            return res.redirect('/productes');
        }

        res.render('productes/form', {
            mode: 'edit',
            actionUrl: '/productes/update',// endpoint al que hace POST
            product: rows[0],
        });
    } catch (error) {
        console.error('Error al obtener producto:', err);
        res.redirect('/productes');
    }
});

// POST /productes/create -> recibe datos del formulario de creación
router.post('/create', async (req, res) => {
    const { name, category, price, stock, active } = req.body;

    try {
        const connection = await getConnection();
        await connection.execute(
            `INSERT INTO products (name, category, price, stock, active, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())`,
            [name, category, parseFloat(price), parseInt(stock, 10), active ? 1 : 0]
        );
        await connection.end();
    } catch (error) {
        console.error('Error al crear producto:', err);
    }

    res.redirect('/productes');
});

// POST /productes/update -> recibe datos del formulario de edición
router.post('/update', async (req, res) => {
    const { id, name, category, price, stock, active } = req.body;

    try {
        const connection = await getConnection();
        await connection.execute(
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
        await connection.end();
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }

    res.redirect('/productes');
});

// POST /productes/delete -> recibe id del producto a eliminar
router.post('/delete', async (req, res) => {
    const { id } = req.body;

    try {
        const connection = await getConnection();
        await connection.execute(
            `DELETE FROM products WHERE id = ?`,
            [parseInt(id, 10)]
        );
        await connection.end();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }

    res.redirect('/productes');
});

module.exports = router;