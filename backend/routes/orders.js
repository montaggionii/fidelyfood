const express = require('express');
const admin = require('firebase-admin');

module.exports = (db) => {
    const router = express.Router();

    // GET: todas las órdenes
    router.get('/', async (req, res) => {
        try {
            const snapshot = await db.collection('ordenes').get();
            const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // POST: crear orden y actualizar puntos del cliente
    router.post('/', async (req, res) => {
        try {
            const { clienteID, productos, total } = req.body;

            // Crear la orden
            const docRef = await db.collection('ordenes').add({
                clienteID,
                productos,
                total: Number(total) || 0,
                creadoEn: admin.firestore.FieldValue.serverTimestamp()
            });

            // Calcular puntos
            const puntosGanados = Math.floor(Number(total) || 0); // 1 punto por cada 1€

            // Actualizar puntos del cliente
            const clienteRef = db.collection('clientes').doc(clienteID);
            await clienteRef.update({
                puntos: admin.firestore.FieldValue.increment(puntosGanados)
            });

            res.status(201).json({ success: true, id: docRef.id, puntosGanados });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};