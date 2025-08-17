// Importa las herramientas necesarias
const express = require('express');
const { MongoClient } = require('mongodb'); // El cliente para conectar a MongoDB
require('dotenv').config(); // Carga las variables del archivo .env

// Inicializa la aplicación de Express
const app = express();
const port = 3000;

// Obtiene la "llave" (Connection String) desde el archivo .env
const client = new MongoClient(process.env.DATABASE_URL);

// Variable para guardar la conexión a la base de datos
let db;

// Función para conectar a la base de datos
async function connectToDb() {
  try {
    // Conecta el cliente al servidor de MongoDB
    await client.connect();
    console.log('✅ Conectado exitosamente a la base de datos');
    
    // Especifica la base de datos que quieres usar (puedes ponerle el nombre que quieras)
    db = client.db('junta_db'); 
    
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos', err);
    process.exit(1); // Si hay un error, detiene la aplicación
  }
}

// Ruta de prueba (la dejamos para verificar que el servidor sigue funcionando)
app.get('/', (req, res) => {
  res.send('¡La cocina de Junta.pe está funcionando y conectada a la despensa!');
});

// Inicia el servidor SOLO DESPUÉS de conectar a la base de datos
connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
  });
});