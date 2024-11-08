import "dotenv/config";
import { Client, DatabaseError } from "pg";
import fs from "fs";
import * as log4js from "log4js";

const sql = new Client({
  connectionString: process.env.DIRECT_URL,
});

log4js.configure({
  appenders: {
    consola: { type: "console" },
    detailed: { type: "file", filename: "errors.log", level: "error" },
  },
  categories: {
    default: { appenders: ["consola"], level: "info" },
    error: { appenders: ["detailed"], level: "error" },
  },
});

async function main() {
  const log = log4js.getLogger();
  const errorLog = log4js.getLogger("error");

  await sql.connect();
  log.info("Proceso iniciado");

  // supabase auth setup
  await sql.query(`
     create or replace function public.handle_new_user()
     returns trigger as $$
     begin
     insert into public.profiles (id, email)
         values (new.id, new.email);
         return new;
         end;
         $$ language plpgsql security definer;
         `);

  await sql.query(`
     create or replace trigger on_auth_user_created
         after insert on auth.users
         for each row execute procedure public.handle_new_user();
   `);

  await sql.query(`
     create or replace function public.handle_user_delete()
     returns trigger as $$
     begin
       delete from auth.users where id = old.id;
       return old;
     end;
     $$ language plpgsql security definer;
   `);

  await sql.query(`
    create or replace trigger on_profile_user_deleted
    after delete on public.profiles
    for each row execute procedure public.handle_user_delete()
    `);

  log.info(
    "Se han agregado los triggers y funciones que se vinculan con supabase."
  );

  // static
  const seedFromSQL = async (filePath: string) => {
    try {
      log.info(`${filePath} | Inicio de seeding de datos estáticos`);
      const data = fs.readFileSync(filePath, "utf-8");
      await sql.query(data);
      log.info(`${filePath} | migrado exitosamente`);
    } catch (error: unknown) {
      if (error instanceof DatabaseError) {
        if (error.code === "23505") {
          log.info(`${filePath} | Ignorando pkey ya establecida...`);
        } else {
          log.warn(
            `${filePath} | Algo salio mal en DB. Más detalle en errors.log`
          );
        }
        errorLog.error(error);
      } else {
        errorLog.error(error);
        log.error(`${filePath} | Algo salio mal.`);
        console.error(error);
      }
    }
  };

  // static
  await seedFromSQL("prisma/seeders/paises.sql");
  await seedFromSQL("prisma/seeders/ubigeos.sql");

  // mock
  await seedFromSQL("prisma/seeders/mock/cuentas.sql"); // working
  await seedFromSQL("prisma/seeders/mock/tags.sql"); // working
  await seedFromSQL("prisma/seeders/mock/notificaciones.sql"); // working
  await seedFromSQL("prisma/seeders/mock/brand_sellers.sql");
  await seedFromSQL("prisma/seeders/mock/products.sql");
  await seedFromSQL("prisma/seeders/mock/product_tags.sql");
  await seedFromSQL("prisma/seeders/mock/product_attachments.sql");

  log.info("Proceso de seeding terminado");

  process.exit();
}

main();
