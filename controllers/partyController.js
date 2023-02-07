const Party = require('../models/party')
const PartyModel = require('../models/party')
const checkPartyBuget = (buget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)


    if (priceSum > buget) {
        return false
    }
}
const PartyController = {
    create: async (req, res) => {
        try {
            const party = {
                tittle: req.body.tittle,
                author: req.body.author,
                description: req.body.description,
                buget: req.body.buget,
                image: req.bodyimage,
                services: req.body.services,
            }
            //bugget< servicos, nao criao servico

            if (party.services && !checkPartyBuget(party.buget, party.services)) {
                return res.status(406).json({ msg: "O seu orçamento é insuficiente" })

            }

            const response = await PartyModel.create(Party)

            res.status(201).json({ response, msg: "Festa criada com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    },

    getAll: async (req,res) =>{
        try {
            const parties = await PartyModel.find()

            res.json(parties)


        } catch (error) {
           console.log(error) 
        }


    },
    get: async (req, res) => {
        try {
            //tem que trazer o id pra aplicação de alguma forma
            //trazer o id pela URL
            const id = req.params.id 
            //passa o ID e ele procura no banco
            const party = await PartyModel.findById(id)
            res.json(party)

            if(!party){
                return res.status(404).json({msg: "Festa não encontrada"})
            }


        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req,res) => {
        try {
            
            const id = req.params.id;
            const party = await PartyModel.findById(id)

            if(!party){
                return res.status(404).json({msg: "Serviço não encontrado"})
            }

            const deletedParty = await PartyModel.findByIdAndDelete(id)
            res.status(200).json({deletedParty, msg: "Serviço excluido com sucesso"})

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req,res) => {
        try {
            
            const id = req.params.id;

            const party = {
                tittle: req.body.tittle,
                author: req.body.author,
                description: req.body.description,
                buget: req.body.buget,
                image: req.bodyimage,
                services: req.body.services,
            }   
            

            const updatedParty = await PartyModel.findByIdAndUpdate(id, party)

            if (party.services && !checkPartyBuget(party.buget, party.services)) {
                return res.status(406).json({ msg: "O seu orçamento é insuficiente" })

            }

            if(!updatedParty){
                return res.status(404).json({msg: "Serviço não encontrado"})
            }


            res.status(200).json({party, msg: "Festa atualizada com sucesso"})

        } catch (error) {
            console.log(error)
        }
    },
    



}

module.exports = PartyController