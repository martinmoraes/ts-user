import express from 'express';
import routesUser from './routes/helloRoute';

export default class EntryPointExpress {
  execute() {
    const app = express();

    app.use(express.json());
    app.use(routesUser);

    app.listen(3333, () => {
      console.log('Server started on port 3333');
    });
  }
}
