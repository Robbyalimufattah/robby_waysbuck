const { tb_product, tb_user} = require('../../models')
const fs = require('fs');

exports.addProduct = async (req, res) => {
    try {
        const productExist = await tb_product.findOne({
            where: {
              title: req.body.title,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
        });
      
        if (productExist) {
            return res.status(400).send({
                status: "Failed",
                message: "Product already registered",
            })
        }
        
        const { data } = req.body;
        // code here
        let newProduct = await tb_product.create({
            ...data,
            title: req.body.title,
            price: req.body.price,
            image: req.file.filename,
            idUser: req.tb_user.id
        })
            
        // code here
        res.send({
            status: 'Success...',
            data: {
                newProduct,
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Server Error",
        });
    }   
};

exports.getProducts = async (req, res) => {
    try {
        let data = await tb_product.findAll({
            include: [
              {
                model: tb_user,
                as: "user",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "password"],
                },
              },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });
    
        data = JSON.parse(JSON.stringify(data))
    
        data = data.map((item) => {
            return {
                ...item,
                image: process.env.FILE_PATH + item.image
            }
        })
    
        res.send({
            status: "Success on Getting Products",
            data:{
                products: data
            },
        });
    } catch (error) {
        res.send({
        status: "Failed",
        message: "Server Error",
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await tb_product.findOne({
            where: {
                id
            },
            include: [
                {
                    model: tb_user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", "email"]
                    },
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"]
            }
        });
    
        data = JSON.parse(JSON.stringify(data))
    
        res.send({
            status: "Success...",
            message: `Showing Product with id: ${id}`,
            data: {
                product: data
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
        status: "Failed",
        message: "Server Error",
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {data} = req.body;
        
        let product = {
            ...data,
            title: req.body.title,
            price: req.body.price,
            image: req.file.filename,
        }
        
        let updatedProduct = await tb_product.update(product, {
            where: {
                id
            },
        });

        updatedProduct = JSON.parse(JSON.stringify(updatedProduct))
    
        res.send({
            status: 'Success...',
            message: `Product id: ${id} Updated`,
            data: {
                product: updatedProduct
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
        status: "Failed",
        message: "Server Error",
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try { 
        const { id } = req.params;

        const product = await tb_product.findOne({
            where: {
              id
            },
            attributes: ["image"],
        });

        let imageFile = 'uploads/' + product.image

        // Delete image file
        fs.unlink(imageFile, (err => {
            if (err) console.log(err);
            else console.log("\nDeleted file: " + imageFile);
        }));

        await tb_product.destroy({
            where: {
                id
            },
        });

        res.send({
            status: 'Success...',
            message: `Deleted Product id: ${id}`,
            data: {
                id
            }
        });
    } catch (error) {
        res.send({
        status: "Failed",
        message: "Server Error",
        });
    }
};