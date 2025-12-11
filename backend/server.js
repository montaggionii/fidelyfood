const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const fs = require('fs');
require('dotenv').config();

// Inicializar Firebase
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Firestore (base de datos)

// Crear servidor
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----- ENDPOINTS DE PRUEBA -----
app.get('/', (req, res) => {
    res.send('Backend FidelyFood conectado a Firebase ✅');
});

// Ruta de prueba de Firebase: listar clientes
app.get('/test-firebase', async (req, res) => {
    try {
        const snapshot = await db.collection('clientes').get();
        const clientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ success: true, clientes });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Ruta de prueba de Firebase: crear cliente de prueba
app.post('/test-firebase', async (req, res) => {
    try {
        const newCliente = {
            nombre: 'Cliente Test',
            email: 'test@example.com',
            puntos: 0
        };
        const docRef = await db.collection('clientes').add(newCliente);
        res.json({ success: true, id: docRef.id });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ----- ENDPOINTS TEMPORALES DE TICKETS -----
let tickets = []; // temporal, mientras no uses Firestore para tickets

app.get('/tickets', (req, res) => {
    res.json(tickets);
});

app.post('/tickets', (req, res) => {
    const newTicket = req.body;
    tickets.push(newTicket);
    res.status(201).json(newTicket);
});

// ----- RUTAS EXISTENTES -----
const restaurantRoutes = require('./routes/restaurants')(db);
const productRoutes = require('./routes/products')(db);
const orderRoutes = require('./routes/orders')(db);
const userRoutes = require('./routes/users')(db);

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});