import * as Yup from 'yup';

import Item from '../models/Item';

class ItemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      price: Yup.number().required(),
      step_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { id, name, description, price, step_id } = await Item.create(
      req.body
    );
    return res.json({ id, name, description, price, step_id });
  }

  async delete(req, res) {
    const response = await Item.destroy({ where: { id: req.params.id } });

    if (response > 0) return res.json({ message: 'Item was deleted' });

    return res.json({ message: 'Item not exist' });
  }
}

export default new ItemController();
