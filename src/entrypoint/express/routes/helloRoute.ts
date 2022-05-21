import { Router } from 'express';

const routesUser = Router();

routesUser.get('/', (req, res) => {
  return res.json({ message: 'Hello dev!!!' });
});

export default routesUser;
