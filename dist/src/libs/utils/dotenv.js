"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
(0, dotenv_1.config)({ path: envFile });
//# sourceMappingURL=dotenv.js.map