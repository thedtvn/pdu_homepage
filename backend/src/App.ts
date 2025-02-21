import dotenv from 'dotenv'
import { join } from 'path';
import App from './Classes/App';

dotenv.config({ path: join(__dirname, "/../../.env") });

let app = new App();


app.init();