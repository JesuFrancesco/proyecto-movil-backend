import dotenv from "dotenv";
import * as log4js from "log4js";

// env
dotenv.config();

// logger
log4js.configure({
  appenders: {
    consola: { type: "console" },
    detailed: { type: "file", filename: "errors.log", level: "error" },
  },
  categories: {
    default: { appenders: ["consola"], level: "info" },
    errors: { appenders: ["detailed"], level: "error" },
  },
});

const logger = log4js.getLogger();

const config = {
  env: process.env.NODE_ENV || "dev",
  supabaseURL: process.env.SUPABASE_URL || "none",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "none",
  originAddress: process.env.ORIGIN_ADDRESS || "none",
};

export { config, logger };
