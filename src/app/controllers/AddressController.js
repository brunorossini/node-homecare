import * as Yup from 'yup';

import Address from '../models/Address';
import User from '../models/User';

class AdressController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      suburb: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    /*
     * Provider is not allowed to create an address
     */
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (isProvider)
      return res
        .status(401)
        .json({ error: "You don't have permission to create this address" });

    const address = await Address.create({ ...req.body, user_id: req.userId });
    return res.json(address);
  }

  async index(req, res) {
    const addresses = await Address.findAll({
      where: { user_id: req.userId },
      attributes: [
        'name',
        'street',
        'number',
        'complement',
        'suburb',
        'city',
        'state',
      ],
      order: [['createdAt', 'desc']],
    });
    return res.json(addresses);
  }

  async delete(req, res) {
    const response = await Address.destroy({ where: { id: req.params.id } });

    if (response > 0) return res.json({ message: 'Address was deleted' });

    return res.json({ message: 'Address not exist' });
  }
}

export default new AdressController();
