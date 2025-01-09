const express = require('express');
const app = express();
const venteRoutes = require('./routes/vente');
const equipementRoutes = require('./routes/equipement');
const sequelize = require('./config/database');
const Vente = require('./models/vente');
const Equipement = require('./models/equipement');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur !');
});

app.use('/ventes', venteRoutes);
app.use('/equipements', equipementRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion réussie à la base de données.');

        await Vente.sync();
        await Equipement.sync();

        console.log('Les tables ont été synchronisées avec succès.');
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
    }
})();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;