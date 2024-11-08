import app from "./app";

const port = 8080;

// == Entry point
app.listen(port, () => {
  console.log("Servidor iniciado en el puerto:", port);
});
