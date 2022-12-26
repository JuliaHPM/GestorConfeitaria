const Cliente = require("../models/Cliente");
const bcrypt = require("bcrypt");
const { generateToken } = require("../services/Jwt");



module.exports = {

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const cliente = await Cliente.findOne({
                // attributes: ['id', 'nome', 'email', 'fotoPerfil'],
                where: {
                    email
                },
                include: [
                    // 'enderecos',
                    {
                        association: 'carrinho',
                        attributes: ['id']
                        //   include: [{
                        //     association: 'itens', 
                        //     attributes: [[sequelize.fn("sum", sequelize.col("quantidade")), "totalQuantity"],
                        // ], }]
                    },
                    // {
                    //   association: 'pedidos',
                    //   include: [{ association: 'itensPedido', }]
                    // }
                ]

            })

            if (!cliente)
                return res.status(400).json({ message: 'Usuário não encontrado!' });

            const passwordIsCorrect = await bcrypt.compare(senha, cliente.senha);

            if (!passwordIsCorrect)
                return res.status(400).json({ message: 'Senha inválida!' });



            const token = generateToken({
                id: cliente.id,
                admin: cliente.admin
            });


            return res.status(200).json({
                cliente,
                "token": token
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Erro ao logar', error: err })
        }

    }

}
