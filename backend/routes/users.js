const express = require('express');
const admin = require('firebase-admin');

module.exports = (db) => {
    const router = express.Router();

    // GET: todos los usuarios
    router.get('/', async (req, res) => {
        try {
            const snapshot = await db.collection('clientes').get();
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // POST: agregar usuario
    router.post('/', async (req, res) => {
        try {
            const { nombre, email } = req.body;
            const docRef = await db.collection('clientes').add({
                nombre,
                email,
                puntos: 0,
                creadoEn: admin.firestore.FieldValue.serverTimestamp()
            });
            res.status(201).json({ success: true, id: docRef.id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};