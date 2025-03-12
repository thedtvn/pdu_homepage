import dotenv from 'dotenv';
import "./Utils/Helper";
import { join } from 'path';
import App from './Classes/App';

let config = dotenv.config({ path: join(__dirname, "../../.env") });

let app = new App();

app.init();