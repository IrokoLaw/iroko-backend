import { config } from 'dotenv';

// Initializing dotenv
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

config({ path: envFile });
