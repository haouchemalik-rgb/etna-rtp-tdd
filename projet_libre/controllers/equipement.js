const Equipement = require('../models/equipement');

exports.getAllEquipements = async (req, res) => {
    try {
        const equipements = await Equipement.findAll();
        res.status(200).json(equipements);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des équipements.', error });
    }
};

exports.addEquipement = async (req, res) => {
    const { nom, type_id, arene_id } = req.body;
    try {
        const equipement = await Equipement.create({ nom, type_id, arene_id });
        res.status(201).json(equipement);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'équipement.', error });
    }
};
