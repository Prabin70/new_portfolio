import { config } from "dotenv";

config();

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

export { port, mongoUri };
