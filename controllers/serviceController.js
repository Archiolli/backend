const { Service: ServiceModel } = require('../models/service')


const serviceController = {

    create: async (req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }
            const response = await ServiceModel.create(service)
            
            res.status(201).json({response, msg: "serviço criado com sucesso!"})




        } catch (error) {
            console.log(error);
        }
    },
    //pega todos os registros
    getAll: async(req,res) => {
        try {
            //pega os servicos de uma determinada colection (no caso a de serviços)
            const services = await ServiceModel.find()
            //manda a resposta em json pro frontend
            res.json(services)
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
            const service = await ServiceModel.findById(id)
            res.json(service)

            if(!service){
                return res.status(404).json({msg: "Serviço não encontrado"})
            }


        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req,res) => {
        try {
            
            const id = req.params.id;
            const service = await ServiceModel.findById(id)

            if(!service){
                return res.status(404).json({msg: "Serviço não encontrado"})
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id)
            res.status(200).json({deletedService, msg: "Serviço excluido com sucesso"})

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req,res) => {
        try {
            
            const id = req.params.id;

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }            
            

            const updatedService = await ServiceModel.findByIdAndUpdate(id, service)

            

            if(!updatedService){
                return res.status(404).json({msg: "Serviço não encontrado"})
            }

            res.status(200).json({service, msg: "Serviço atualizado com sucesso"})

        } catch (error) {
            console.log(error)
        }
    },



}


module.exports = serviceController