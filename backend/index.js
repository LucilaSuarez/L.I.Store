require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./data/db');
const adminRoutes = require('./routes/adminRoutes');
const productosRoutes = require('./routes/productosRoutes');
const ventasRoutes = require('./routes/ventaRoutes');


app.use(cors());           
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const port = 3030;

app.get("/", (req, res) => {
  res.send("Backend corriendo");
});

app.use("/admin", adminRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);



const conexionDB = async () => {
  try {
    await db.authenticate();
    console.log("Conexión OK a la base de datos");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
};

app.listen(port, () => {
  conexionDB();
  console.log(`Servidor corriendo en http://localhost:${port}`);
});