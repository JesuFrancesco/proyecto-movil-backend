-- Iniciar nuevos chats
INSERT 
	INTO chats(id) 
	VALUES (1),
	(2),
	(3),
	(4),
	(5);

-- Crear mensajes
INSERT 
	INTO messages (id, text, status, profile_id) 
	VALUES 
    (1, 'hola, como estas', 1, '4d7d3e63-93bc-482e-9981-ed9c819553a9'),
	(2, 'hola, como estas', 2, '320a9921-3c2d-4b12-9552-c1908f547b36'),
	(3, 'hola, como estas', 3, 'b815b1a9-679c-437f-a033-33dd1d6f62f6'),
	(4, 'hola, como estas', 1, '288a5647-1edc-4961-9e85-2fd99c777f43'),
	(5, 'hola, como estas', 2, '80e1ed81-9fb3-4096-922d-8a8aa2e64775');

-- Asociar mensajes
insert into chat_messages (chat_id, message_id) 
	values 
        (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5);
