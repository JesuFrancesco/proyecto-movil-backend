
-- -- Obtener productos en base a genero
-- SELECT * FROM products p
-- 	INNER JOIN product_attachments pa ON p.id = pa.product_id
-- 	INNER JOIN product_tags pt ON p.id = pt.product_id
-- 	WHERE pt.category_id = 1;

-- -- carrito de compras
-- SELECT * FROM shopping_carts sc 
-- 	INNER JOIN cart_items sci ON sc.id = sci.cart_id
-- 	INNER JOIN products p ON p.id = sci.product_id
-- 	INNER JOIN product_attachments pa ON p.id = pa.product_id
-- 	WHERE sc.client_id = 0;

	
-- -- lista de deseados
-- SELECT * FROM wishlists w 
-- 	INNER JOIN wishlist_items wi ON w.id = wi.wishlist_id
-- 	INNER JOIN products p ON p.id = wi.product_id
-- 	INNER JOIN product_attachments pa ON p.id = pa.product_id
-- 	WHERE w.client_id = 0;

-- -- pedidos en curso
-- SELECT * FROM orders o
-- 	INNER JOIN order_items oi ON o.id = oi.order_id
-- 	INNER JOIN products p ON p.id = oi.product_id
-- 	INNER JOIN product_attachments pa ON p.id = pa.product_id
-- 	WHERE o.client_id = 0;
-- 	VALUES (6, ## ,##);