import * as Yup from 'yup';

import File from '../models/File';
import Order from '../models/Order';
import Product from '../models/Product';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'amount', 'price', 'createdAt'],
      order: [['createdAt', 'desc']],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
        },
        {
          model: File,
          as: 'receipt',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      amount: Yup.number().required(),
      price: Yup.number().required(),
      product_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const productExist = await Product.findByPk(req.body.product_id);

    if (!productExist)
      return res
        .status(400)
        .json({ error: 'Does not correspond a valid product' });

    const order = await Order.create({ ...req.body, user_id: req.userId });
    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name'],
        },
      ],
    });

    if (order.user_id !== req.userId)
      return res.status(401).json({
        error: "You don't habe permission to cancel this order",
      });

    order.canceled_at = new Date();
    await order.save();

    // Queue Cancellation Email

    return res.json(order);
  }
}

export default new OrderController();
