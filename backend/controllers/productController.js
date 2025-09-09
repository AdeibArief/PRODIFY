import sql from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
    `;
    console.log("fetched products",products)
    res.status(200).json({success:true,data:products});

  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req, res) => {
    const {name, price ,image }=req.body;

    console.log(req.body);

    try {
       const newProduct = await sql`
        INSERT INTO products (name,price,image)
        VALUES (${name},${price},${image})
        RETURNING *
        `;

        console.log(newProduct);
        return res.status(201).json({success:true,data:newProduct[0]});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: 'Error creating product', error: error.message});
    }

};
export const getProduct = async (req, res) => {
    const {id}= req.params;

    try {
        const product= await sql`
        SELECT * FROM products WHERE id=${id}
        `
        res.status(201).json({success:true,data:product[0]});
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (req, res) => {
    const {id} =req.params;
    const {name,price,image}=req.body;

    try {
       const updatedProduct= await sql`
        UPDATE products 
        SET name=${name}, price=${price}, image=${image}
        WHERE id=${id}
        RETURNING *
        `

        if (updatedProduct.length===0){
            return res.status(404).json({
                success:false,
                message:"product not found"
            });
        }

        return res.status(200).json({success:true,data:updatedProduct[0]});
    } catch (error) {
        console.log(error);
    }

};
export const deleteProduct = async (req, res) => {
    const {id}=req.params;

    try {
        const deletedProduct=await sql`
        DELETE FROM products WHERE id=${id} RETURNING *
        `;

        if (deletedProduct.length===0) {
            res.status(404).json({success:false,message:'Not found'})
        }

        res.status(200).json({success:true,data:deletedProduct[0]});
    } catch (error) {
        console.log(error)
    }
};
