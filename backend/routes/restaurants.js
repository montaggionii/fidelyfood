const express = require('express');
const admin = require('firebase-admin'); // lo necesitamos para FieldValue

module.exports = (db) => {
    const router = express.Router();

    // GET: listar todos los restaurantes
    router.get('/', async (req, res) => {
        try {
            const snapshot = await db.collection('restaurantes').get();
            const restaurants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.json(restaurants);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // POST: agregar un restaurante
    router.post('/', async (req, res) => {
        try {
            const { nombre, direccion, empresa } = req.body;
            const docRef = await db.collection('restaurantes').add({
                nombre,
                direccion: direccion || '',
                empresa: empresa || '',
                creadoEn: admin.firestore.FieldValue.serverTimestamp()
            });
            res.status(201).json({ success: true, id: docRef.id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};