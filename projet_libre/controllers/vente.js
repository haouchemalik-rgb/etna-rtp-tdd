const Vente = require('../models/vente');

exports.getAllVentes = async (req, res) => {
    try {
        const ventes = await Vente.findAll();
        res.status(200).json(ventes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des ventes.', error });
    }
};

exports.addVente = async (req, res) => {
    const { date, prix, monster_id, magasin_id, dresseur_id } = req.body;
    try {
        const vente = await Vente.create({ date, prix, monster_id, magasin_id, dresseur_id });
        res.status(201).json(vente);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la vente.', error });
    }
};
