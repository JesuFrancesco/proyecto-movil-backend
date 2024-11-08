INSERT INTO public.product_ratings(
    id, score, text, created_at, client_id, product_id)
VALUES 
    (1, 5, 'Me encantó este anime, la trama es emocionante!', '2022-01-01 12:00:00', 1, 1),
    (2, 4, 'Un clásico del género, recomendado para fans de la ciencia ficción', '2022-02-15 14:00:00', 2, 3),
    (3, 3, 'La animación es un poco antigua, pero la historia es interesante', '2022-03-20 10:00:00', 3, 5),
    (4, 5, 'No esperaba que me gustara tanto, ¡es un anime imprescante!', '2022-04-01 18:00:00', 4, 2),
    (5, 2, 'No es lo que esperaba, la trama es un poco predecible', '2022-05-10 12:00:00', 5, 10),
    (6, 4, 'Me gustó la forma en que se desarrolla la trama, muy bien hecho', '2022-06-25 16:00:00', 6, 7),
    (7, 1, 'No logré conectar con los personajes, lo siento', '2022-07-01 10:00:00', 7, 9),
    (8, 5, '¡Un anime que no te puedes perder! La acción es impresionante', '2022-08-15 14:00:00', 8, 11),
    (9, 3, 'Es un anime decente, pero no es lo mejor que he visto', '2022-09-20 12:00:00', 9, 13),
    (10, 4, 'La música es increíble, la historia es emocionante', '2022-10-01 18:00:00', 10, 14);