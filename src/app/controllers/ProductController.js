import * as Yup from 'yup';

import Item from '../models/Item';
import Product from '../models/Product';
import Step from '../models/Step';

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

    const { id, description, price } = await Product.create({
      user_id: req.userId,
      ...req.body,
    });
    return res.json({ id, description, price });
  }

  async index(req, res) {
    const products = await Product.findAll({
      where: { user_id: req.params.providerId },
      attributes: ['id', 'name', 'description', 'price'],
      include: [
        {
          model: Step,
          attributes: ['name', 'min', 'max'],
          include: [
            {
              model: Item,
              attributes: ['name', 'description', 'price'],
            },
          ],
        },
      ],
    });
    return res.json(products);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const product = await Product.findByPk(req.params.id);

    const productExist = await Product.findOne({
      where: { name: req.body.name },
    });

    if (productExist && productExist.name !== product.name)
      return res
        .status(400)
        .json({ error: 'There is already a product with that name' });

    const { id, description, price } = await product.update(req.body);
    return res.json({ id, description, price });
  }

  async delete(req, res) {
    const response = await Product.destroy({ where: { id: req.params.id } });

    if (response > 0) return res.json({ message: 'Product was deleted' });

    return res.json({ message: 'Product not exist' });
  }
}

export default new ProductController();
