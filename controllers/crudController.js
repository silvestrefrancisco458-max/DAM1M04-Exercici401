const db = require('../db/connection')

// CREATE
exports.create = async (req, res) => {
  const { taula } = req.body

  if (taula === 'productes') {
    const { name, category, price, stock } = req.body

    await db.query(`
      INSERT INTO products (name, category, price, stock)
      VALUES (?, ?, ?, ?)
    `, [name, category, price, stock])

    return res.redirect('/productes')
  }

  if (taula === 'clients') {
    const { name, email, phone } = req.body

    await db.query(`
      INSERT INTO customers (name, email, phone)
      VALUES (?, ?, ?)
    `, [name, email, phone])

    return res.redirect('/clients')
  }

  res.redirect('/')
}

// UPDATE
exports.update = async (req, res) => {
  const { taula, id } = req.body

  if (taula === 'productes') {
    const { name, category, price, stock } = req.body

    await db.query(`
      UPDATE products
      SET name=?, category=?, price=?, stock=?
      WHERE id=?
    `, [name, category, price, stock, id])

    return res.redirect('/productes')
  }

  if (taula === 'clients') {
    const { name, email, phone } = req.body

    await db.query(`
      UPDATE customers
      SET name=?, email=?, phone=?
      WHERE id=?
    `, [name, email, phone, id])

    return res.redirect('/clients')
  }

  res.redirect('/')
}

// DELETE
exports.remove = async (req, res) => {
  const { taula, id } = req.body

  if (taula === 'productes') {
    await db.query('DELETE FROM products WHERE id=?', [id])
    return res.redirect('/productes')
  }

  if (taula === 'clients') {
    await db.query('DELETE FROM customers WHERE id=?', [id])
    return res.redirect('/clients')
  }

  res.redirect('/')
}