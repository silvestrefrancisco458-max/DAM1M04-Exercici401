USE minierp;

-- PRODUCTES (30)
INSERT INTO products (name, category, price, stock) VALUES
('Patates', 'Menjar', 2.50, 20),
('Tomàquets', 'Menjar', 3.00, 5),
('Llet', 'Begudes', 1.20, 15),
('Cafè', 'Begudes', 4.50, 3),
('Pa', 'Menjar', 1.00, 50),
('Formatge', 'Menjar', 5.00, 8),
('Suc taronja', 'Begudes', 2.80, 12),
('Aigua', 'Begudes', 0.80, 100),
('Cervesa', 'Begudes', 1.50, 40),
('Arròs', 'Menjar', 2.20, 25),
('Pasta', 'Menjar', 1.90, 30),
('Tonyina', 'Menjar', 3.50, 7),
('Galetes', 'Menjar', 2.00, 18),
('Xocolata', 'Menjar', 2.50, 9),
('Refresc', 'Begudes', 1.30, 60),
('Cereal', 'Menjar', 3.20, 10),
('Mantega', 'Menjar', 2.80, 6),
('Ous', 'Menjar', 2.40, 20),
('Iogurt', 'Menjar', 1.10, 22),
('Carn', 'Menjar', 7.50, 4),
('Peix', 'Menjar', 6.80, 3),
('Poma', 'Menjar', 1.50, 30),
('Plàtan', 'Menjar', 1.20, 28),
('Taronja', 'Menjar', 1.40, 26),
('Raïm', 'Menjar', 2.90, 12),
('Hamburguesa', 'Menjar', 4.00, 8),
('Pizza', 'Menjar', 5.50, 6),
('Gelat', 'Menjar', 2.70, 9),
('Aigua gas', 'Begudes', 1.10, 14),
('Te', 'Begudes', 3.00, 11);

-- CLIENTS (25)
INSERT INTO customers (name, email, phone) VALUES
('Joan', 'joan@mail.com', '600111111'),
('Maria', 'maria@mail.com', '600222222'),
('Pere', 'pere@mail.com', '600333333'),
('Anna', 'anna@mail.com', '600444444'),
('Laura', 'laura@mail.com', '600555555'),
('Marc', 'marc@mail.com', '600666666'),
('David', 'david@mail.com', '600777777'),
('Sara', 'sara@mail.com', '600888888'),
('Alex', 'alex@mail.com', '600999999'),
('Clara', 'clara@mail.com', '601111111'),
('Hugo', 'hugo@mail.com', '601222222'),
('Elena', 'elena@mail.com', '601333333'),
('Victor', 'victor@mail.com', '601444444'),
('Julia', 'julia@mail.com', '601555555'),
('Adrià', 'adria@mail.com', '601666666'),
('Nuria', 'nuria@mail.com', '601777777'),
('Ivan', 'ivan@mail.com', '601888888'),
('Paula', 'paula@mail.com', '601999999'),
('Dani', 'dani@mail.com', '602111111'),
('Noa', 'noa@mail.com', '602222222'),
('Eric', 'eric@mail.com', '602333333'),
('Sofia', 'sofia@mail.com', '602444444'),
('Leo', 'leo@mail.com', '602555555'),
('Lucas', 'lucas@mail.com', '602666666'),
('Marta', 'marta@mail.com', '602777777');

-- VENDES (ejemplo básico)
INSERT INTO sales (customer_id, total) VALUES
(1, 20.50),
(2, 35.00),
(3, 15.20),
(4, 40.00),
(5, 12.90);

-- LINEAS
INSERT INTO sale_items (sale_id, product_id, qty, unit_price, line_total) VALUES
(1, 1, 2, 2.50, 5.00),
(1, 3, 3, 1.20, 3.60),
(2, 5, 5, 1.00, 5.00),
(3, 2, 1, 3.00, 3.00),
(4, 10, 2, 2.20, 4.40);