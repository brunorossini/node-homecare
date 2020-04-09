import * as Yup from 'yup';

import Item from '../models/Item';
import Step from '../models/Step';

class StepController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      min: Yup.number().required(),
      max: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { id, name, min, max, product_id } = await Step.create(req.body);
    return res.json({ id, name, min, max, product_id });
  }

  async index(req, res) {
    const step = await Step.findAll({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'min', 'max'],
      include: [
        {
          model: Item,
          attributes: ['id', 'name', 'description', 'price'],
        },
      ],
    });

    return res.json(step);
  }

  async delete(req, res) {
    const response = await Step.destroy({ where: { id: req.params.id } });

    if (response > 0) return res.json({ message: 'Step was deleted' });

    return res.json({ message: 'Step not exist' });
  }
}

export default new StepController();
