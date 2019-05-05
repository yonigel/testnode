import express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    // this.app.get('/', (req, res) => res.send('Hello World!'))

    this.app.use(express.static(path.join(__dirname, '/../dist')));

    this.app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
    });

    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;