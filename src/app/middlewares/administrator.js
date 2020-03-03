import User from '../models/User';

export default async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  const { administrator } = user.dataValues;
  if (administrator) return next();

  return res.status(401).json({ error: 'Hohoho! Action not permitted' });
};
