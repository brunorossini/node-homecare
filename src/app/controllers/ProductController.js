import * as Yup from 'yup';

import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const productExist = await Product.findOne({
      where: { name: req.body.name },
    });

    if (productExist)
      return res.status(400).json({ error: 'Product already exists.' });

    const { id, description, price } = await Product.create(req.body);
    return res.json({ id, description, price });
  }

  async index(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }
}

export default new ProductController();
