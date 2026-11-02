import { neon } from "@neondatabase/serverless";
export function getDb(){ if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing"); return neon(process.env.DATABASE_URL); }
export function json(res,status,body){ return res.status(status).setHeader("Content-Type","application/json; charset=utf-8").send(JSON.stringify(body)); }
export function methodNotAllowed(res,allowed){res.setHeader("Allow",allowed.join(", "));return json(res,405,{error:"Method not allowed"});}
