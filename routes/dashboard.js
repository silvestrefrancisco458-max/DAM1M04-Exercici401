// routes/dashboard.js
// Rutas para la página principal (Dashboard) con dos pestañas:
// - KPI (resumen ejecutivo)
// - Llistats (últimes vendes, top productes)

const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// GET /  -> Dashboard
router.get('/', async (req, res) => {
    // Leemos qué pestaña quiere ver el usuario (kpi o llistats)
    const tab = req.query.tab || 'kpi'; // Por defecto mostramos KPI

    let kpi = {};
    let lists = {};

    try {
        const connection = await getConnection();

        // KPI: Vendes d'avui + número de comandes d'avui
        const [rowsToday] = await connection.execute(
            `SELECT IF NULL(SUM(total), 0) AS totalToday, COUNT(*) AS ordersToday 
            FROM sales
            WHERE DATE(sale_date) = CURDATE()`
        );

        // KPI: Vendes del mes + número de comandes del mes

        const [rowsMonth] = await connection.execute(
            `SELECT IF NULL(SUM(total), 0) AS totalMonth, COUNT(*) AS ordersMonth
            FROM sales
            WHERE YEAR(sale_date) = YEAR(CURDATE()) 
                AND MONTH(sale_date) = MONTH(CURDATE())`
        );

        // KPI: Productes amb stock baix (ejemplo: stock < 5)
        const [lowStockProducts] = await connection.execute(
            `SELECT id, name, stock
            FROM products
            WHERE stock < 5
            ORDER BY stock ASC
            LIMIT 10`
        );

        // Llistats: Últimes 5 vendes
        const [lastSales] = await connection.execute(
            `SELECT s.id, s.sale_date, c.name AS customer_name, s.total
            FROM sales s
            JOIN customers c ON c.id = s.customer_id
            ORDER BY s.sale_date DESC
            LIMIT 5`
        );

        // Llistats: Top 5 productes més venuts (por cantidad)
        // Llistats: Top 5 productes més venuts (por cantidad)
        const [topProducts] = await connection.execute(
            `SELECT p.id, p.name, SUM(si.qty) AS total_quantity
            FROM sale_items si
            JOIN products p ON p.id = si.product_id
            GROUP BY p.id, p.name
            ORDER BY total_quantity DESC
            LIMIT 5`
        );

        await connection.end();

        // Montamos objetos para la vista
        kpi = {
            totalToday: rowsToday[0].totalToday,
            ordersToday: rowsToday[0].ordersToday,
            totalMonth: rowsMonth[0].totalMonth,
            ordersMonth: rowsMonth[0].ordersMonth,
            lowStockProducts,
        };

        lists = {
            lastSales,
            topProducts,
        };
    } catch (err) {
    console.error('Error en dashboard:', err);
    }

    // Renderizamos la vista dashboard.hbs
    res.render('dashboard', {
        tab,
        kpi,
        lists,
    });
});

module.exports = router;