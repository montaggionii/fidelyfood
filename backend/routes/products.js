const express = require('express');
const admin = require('firebase-admin');

module.exports = (db) => {
    const router = express.Router();

    // GET: todos los productos
    router.get('/', async (req, res) => {
        try {
            const snapshot = await db.collection('productos').get();
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // POST: agregar producto
    router.post('/', async (req, res) => {
        try {
            const { nombre, precio, restauranteID } = req.body;
            const docRef = await db.collection('productos').add({
                nombre,
                precio: Number(precio) || 0,
                restauranteID,
                creadoEn: admin.firestore.FieldValue.serverTimestamp()
            });
            res.status(201).json({ success: true, id: docRef.id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};