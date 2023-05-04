const {createRecord} = require("../controllers/recordsController")

const createRecordHandler = async (req, res) => {
    const {record, pokemonId} = req.body
    try {
        const newRecord = await createRecord(record, pokemonId)
        res.status(201).json(newRecord)
    } catch (error) {

        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createRecordHandler
}