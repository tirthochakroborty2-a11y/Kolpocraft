import {getDb,json,methodNotAllowed} from "./_db.js";
export default async function handler(req,res){
 try{
  const sql=getDb();
  if(req.method==="GET"){
   const pid=String(req.query.productId||""); if(!pid)return json(res,400,{error:"productId required"});
   const rows=await sql`SELECT customer_name AS name,rating,comment,created_at FROM reviews WHERE product_id=${pid} AND approved=true ORDER BY created_at DESC LIMIT 30`;
   return json(res,200,{reviews:rows});
  }
  if(req.method==="POST"){
   const d=req.body||{},rating=Number(d.rating);
   if(!d.productId||!d.name||!d.comment||!Number.isInteger(rating)||rating<1||rating>5)return json(res,400,{error:"সব তথ্য সঠিকভাবে দিন।"});
   await sql`INSERT INTO reviews(id,product_id,customer_name,rating,comment,approved) VALUES(${crypto.randomUUID()},${String(d.productId).slice(0,40)},${String(d.name).slice(0,80)},${rating},${String(d.comment).slice(0,1000)},false)`;
   return json(res,200,{ok:true,message:"রিভিউ জমা হয়েছে। অনুমোদনের পর দেখানো হবে।"});
  }
  return methodNotAllowed(res,["GET","POST"]);
 }catch(e){console.error(e);return json(res,500,{error:"রিভিউ API-তে সমস্যা হয়েছে।"});}
}
