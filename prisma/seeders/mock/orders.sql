
-- crear orden de compra
INSERT INTO orders (id, total_price, status, client_id)
	VALUES (##, 120.0, 'Recepcionando compra...', ##);

INSERT INTO order_items (amount, order_id, product_id)
	VALUES (1, ## ,##)
	VALUES (2, ## ,##)
	VALUES (3, ## ,##)
	VALUES (4, ## ,##)
	VALUES (5, ## ,##)
