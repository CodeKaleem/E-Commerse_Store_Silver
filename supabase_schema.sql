-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  price DECIMAL(10, 2),
  category TEXT,
  image_url TEXT NOT NULL,
  rotation_images TEXT[], -- Array of image URLs for 360 view
  badge TEXT,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0
);

-- Enable RLS (Optional, for now we assume public access/admin key)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admin CRUD" ON public.products FOR ALL USING (true); -- Replace with proper Auth check later

CREATE TABLE IF NOT EXISTS public.service_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  service_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending'
);

ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert" ON public.service_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All" ON public.service_inquiries FOR ALL USING (true);


-- E-Commerce Tables
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Orders" ON public.orders FOR ALL USING (true);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Order Items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Order Items" ON public.order_items FOR ALL USING (true);
