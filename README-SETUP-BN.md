# KOLPOCRAFT — Vercel Hosting Setup

এই সংস্করণটি Vercel-এর জন্য: static frontend + `/api` serverless functions + Neon Postgres database। Cloudflare Functions/Wrangler লাগবে না।

## Deploy করার আগে
1. https://neon.tech/ এ Free Postgres project তৈরি করুন।
2. Neon SQL Editor-এ `database-schema.sql`-এর SQL চালান।
3. `product.html`-এ `WHATSAPP_NUMBER="8801XXXXXXXXX"` নিজের WhatsApp নম্বর দিয়ে বদলান (country code-সহ digits only)।
4. ZIP Extract করে GitHub repository-তে upload করুন।
5. https://vercel.com/ এ repository Import করে Deploy করুন।
6. Vercel → Project Settings → Environment Variables-এ যোগ করুন:
   - `DATABASE_URL` = Neon connection string
   - `ADMIN_PASSWORD` = নিজের শক্তিশালী Admin password
7. Save করে Redeploy করুন।

## URL
- Storefront: Vercel project URL
- Admin: `/admin.html`

## ফিচার
Home, ১৪টি পণ্য, Product Details, variant/quantity, order form, database order save, WhatsApp order summary, admin order dashboard/status, review submit/approval, dark/light mode, mobile responsive design।

## গুরুত্বপূর্ণ
- ওয়েবসাইটে কোনো online payment gateway বা payment form নেই; payment instructions WhatsApp-এ ম্যানুয়ালি দেওয়া হবে।
- WhatsApp message খুলবে; ক্রেতাকে নিজে Send চাপতে হবে।
- Admin API-তে Bearer password ব্যবহার করা হয়েছে। Production-এ Vercel Deployment Protection/অতিরিক্ত access protection যোগ করা ভালো।
- API-তে advanced CAPTCHA/rate limiting/SMS verification নেই।
- Product covers CSS mockup; বাস্তব product image বসাতে হবে।
- Normal base price, Medium +৳50, Premium +৳100 surcharge প্রকৃত নিয়ম অনুযায়ী যাচাই করুন।
- Customer login নেই।
