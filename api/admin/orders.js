import {getDb,json,methodNotAllowed} from "../_db.js";
function authorized(req){const pass=process.env.ADMIN_PASSWORD;return !!pass&&(req.headers.authorization||"")===`Bearer ${pass}`;}
export default async function handler(req,res){
 if(!authorized(req))return json(res,401,{error:"Unauthorized"});
 try{
  const sql=getDb();
  if(req.method==="GET"){const rows=await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 500`;return json(res,200,{orders:rows});}
  if(req.method==="PATCH"){const d=req.body||{},allowed=["New","Confirmed","Processing","Shipped","Completed","Cancelled"];if(!d.id||!allowed.includes(d.status))return json(res,400,{error:"Invalid data"});await sql`UPDATE orders SET status=${d.status} WHERE id=${d.id}`;return json(res,200,{ok:true});}
  return methodNotAllowed(res,["GET","PATCH"]);
 }catch(e){console.error(e);return json(res,500,{error:"Admin API error"});}
}
