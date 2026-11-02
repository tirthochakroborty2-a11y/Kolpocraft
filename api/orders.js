import {getDb,json,methodNotAllowed} from "./_db.js";
export default async function handler(req,res){
 if(req.method!=="POST") return methodNotAllowed(res,["POST"]);
 try{
  const d=req.body||{}, keys=["customerName","phone","address","productId","productName","variant","quantity","unitPrice","totalPrice"];
  if(keys.some(k=>d[k]===undefined||d[k]===null||String(d[k]).trim()==="")) return json(res,400,{error:"সব প্রয়োজনীয় তথ্য পূরণ করুন।"});
  if(!/^[0-9+\\-\\s]{8,20}$/.test(String(d.phone))) return json(res,400,{error:"সঠিক ফোন নম্বর দিন।"});
  const qty=Math.max(1,Math.min(20,Number(d.quantity)||1)), unit=Math.max(0,Math.round(Number(d.unitPrice)||0)), total=qty*unit;
  if(total!==Math.round(Number(d.totalPrice))) return json(res,400,{error:"দামের তথ্য মেলেনি। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।"});
  const id=crypto.randomUUID(), sql=getDb();
  await sql`INSERT INTO orders(id,customer_name,phone,address,product_id,product_name,variant,quantity,unit_price,total_price,note,status)
   VALUES(${id},${String(d.customerName).slice(0,100)},${String(d.phone).slice(0,20)},${String(d.address).slice(0,500)},${String(d.productId).slice(0,40)},${String(d.productName).slice(0,200)},${String(d.variant).slice(0,30)},${qty},${unit},${total},${String(d.note||"").slice(0,1000)},"New")`;
  return json(res,200,{ok:true,orderId:id});
 }catch(e){console.error(e);return json(res,500,{error:"অর্ডার সংরক্ষণ করা যায়নি। Database সেটআপ পরীক্ষা করুন।"});}
}
