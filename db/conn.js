const mongoose = require('mongoose')

async function main() {
    try {        
        mongoose.set('strictQuery', true)
        await mongoose.connect('mongodb+srv://joao:UV5eKhOdYFEPFgp9@cluster0.o45wjnb.mongodb.net/?retryWrites=true&w=majority')
        console.log('Conectado ao banco!');
    } catch (error) {
        console.log(`Erro ${error}`);
    }
//UV5eKhOdYFEPFgp9
}

module.exports = main