import * as Yup from 'yup';

import Order from '../models/Order';
import User from '../models/User';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: { provider_id: req.userId },
      attributes: ['id', 'address', 'price', 'createdAt', 'deliveryFee'],
      order: [['createdAt', 'desc']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
        },
      ],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      address: Yup.string().required(),
      price: Yup.number().required(),
      provider_id: Yup.number().required(),
      deliveryFee: Yup.number(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const order = await Order.create({ ...req.body, user_id: req.userId });
    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
        },
      ],
    });

    if (order.canceledAt)
      res.status(400).json({
        error: 'This order has been canceled previously',
      });

    if (order.provider_id !== req.userId)
      return res.status(401).json({
        error: "You don't have permission to cancel this order",
      });

    order.canceledAt = new Date();
    await order.save();

    // Queue Cancellation Email

    return res.json(order);
  }
}

export default new OrderController();
