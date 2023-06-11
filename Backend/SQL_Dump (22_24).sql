--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-06-11 22:24:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 849 (class 1247 OID 311298)
-- Name: item_type; Type: TYPE; Schema: public; Owner: althafnafi
--

CREATE TYPE public.item_type AS ENUM (
    'Food',
    'Beverage'
);


ALTER TYPE public.item_type OWNER TO althafnafi;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 311304)
-- Name: customers; Type: TABLE; Schema: public; Owner: althafnafi
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    balance numeric(10,2) DEFAULT 0
);


ALTER TABLE public.customers OWNER TO althafnafi;

--
-- TOC entry 214 (class 1259 OID 311303)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: althafnafi
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO althafnafi;

--
-- TOC entry 2626 (class 0 OID 0)
-- Dependencies: 214
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: althafnafi
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 223 (class 1259 OID 311382)
-- Name: menu_items; Type: TABLE; Schema: public; Owner: althafnafi
--

CREATE TABLE public.menu_items (
    id integer NOT NULL,
    restaurant_id bigint NOT NULL,
    image text,
    type public.item_type NOT NULL,
    price numeric(10,2) DEFAULT 0 NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.menu_items OWNER TO althafnafi;

--
-- TOC entry 222 (class 1259 OID 311381)
-- Name: menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: althafnafi
--

CREATE SEQUENCE public.menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_items_id_seq OWNER TO althafnafi;

--
-- TOC entry 2627 (class 0 OID 0)
-- Dependencies: 222
-- Name: menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: althafnafi
--

ALTER SEQUENCE public.menu_items_id_seq OWNED BY public.menu_items.id;


--
-- TOC entry 221 (class 1259 OID 311339)
-- Name: order_menu_items; Type: TABLE; Schema: public; Owner: althafnafi
--

CREATE TABLE public.order_menu_items (
    id integer NOT NULL,
    order_id bigint NOT NULL,
    item_id bigint NOT NULL,
    quantity integer DEFAULT 1
);


ALTER TABLE public.order_menu_items OWNER TO althafnafi;

--
-- TOC entry 220 (class 1259 OID 311338)
-- Name: order_menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: althafnafi
--

CREATE SEQUENCE public.order_menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_menu_items_id_seq OWNER TO althafnafi;

--
-- TOC entry 2628 (class 0 OID 0)
-- Dependencies: 220
-- Name: order_menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: althafnafi
--

ALTER SEQUENCE public.order_menu_items_id_seq OWNED BY public.order_menu_items.id;


--
-- TOC entry 219 (class 1259 OID 311329)
-- Name: orders; Type: TABLE; Schema: public; Owner: althafnafi
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_id bigint NOT NULL,
    address text NOT NULL,
    restaurant_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.orders OWNER TO althafnafi;

--
-- TOC entry 218 (class 1259 OID 311328)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: althafnafi
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO althafnafi;

--
-- TOC entry 2629 (class 0 OID 0)
-- Dependencies: 218
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: althafnafi
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 225 (class 1259 OID 311392)
-- Name: restaurants; Type: TABLE; Schema: public; Owner: althafnafi
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    image text,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.restaurants OWNER TO althafnafi;

--
-- TOC entry 224 (class 1259 OID 311391)
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: althafnafi
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_id_seq OWNER TO althafnafi;

--
-- TOC entry 2630 (class 0 OID 0)
-- Dependencies: 224
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: althafnafi
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- TOC entry 217 (class 1259 OID 311318)
-- Name: reviews; Type: TABLE; Schema: public; Owner: althafnafi
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    customer_id bigint NOT NULL,
    restaurant_id bigint NOT NULL,
    comment text,
    rating numeric(2,1) DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.reviews OWNER TO althafnafi;

--
-- TOC entry 216 (class 1259 OID 311317)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: althafnafi
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO althafnafi;

--
-- TOC entry 2631 (class 0 OID 0)
-- Dependencies: 216
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: althafnafi
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 226 (class 1259 OID 311433)
-- Name: session; Type: TABLE; Schema: public; Owner: althafnafi
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO althafnafi;

--
-- TOC entry 2423 (class 2604 OID 311307)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 2432 (class 2604 OID 311385)
-- Name: menu_items id; Type: DEFAULT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.menu_items ALTER COLUMN id SET DEFAULT nextval('public.menu_items_id_seq'::regclass);


--
-- TOC entry 2430 (class 2604 OID 311342)
-- Name: order_menu_items id; Type: DEFAULT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.order_menu_items ALTER COLUMN id SET DEFAULT nextval('public.order_menu_items_id_seq'::regclass);


--
-- TOC entry 2428 (class 2604 OID 311332)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 2434 (class 2604 OID 311395)
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- TOC entry 2425 (class 2604 OID 311321)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 2609 (class 0 OID 311304)
-- Dependencies: 215
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: althafnafi
--

COPY public.customers (id, username, password, email, balance) FROM stdin;
1	althafnaa	$2b$10$2ahvgjPaAGW6DVzCODwQz.C3mMlRiqRI4vhnnOWi49UFANWrcqCEa	althafnaa@gmail.com	745.60
3	zalfyzalfy	$2b$10$xDl8WC9suGEg12BgeV.Ie.54Zpj99hUnkApNUi/ln6Rwr/NgLWcoq	zalfy@gmail.com	0.00
2	senoseno	$2b$10$IO9zwXsoJGrwstH9OQ/HUu.0Uy7gFlZtdJfBi4WuUKUZSzd7oPtKC	seno@gmail.com	46.06
\.


--
-- TOC entry 2617 (class 0 OID 311382)
-- Dependencies: 223
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: althafnafi
--

COPY public.menu_items (id, restaurant_id, image, type, price, name, description) FROM stdin;
1	1	https://images.ctfassets.net/9tka4b3550oc/1FQSRLVXt2Q1lvXXkOyW6U/f306561ef7bfc5ab7c84a739a46d3629/Food_09.png?q=75&w=1280	Food	9.99	Original Recipe Chicken	Crispy and flavorful fried chicken.
2	1	https://i.ytimg.com/vi/KI2Ff-DO2pg/maxresdefault.jpg	Food	3.99	Mashed Potatoes with Gravy	Creamy mashed potatoes served with savory gravy.
3	2	https://www.taco-bell.ro/wp-content/uploads/crunchy-taco-540x274.png	Food	2.99	Crunchy Taco	A classic taco with a crispy shell and seasoned beef filling.
4	2	https://dinnerthendessert.com/wp-content/uploads/2020/07/Taco-Bell-Bean-Burrito-1x1-1.jpg	Food	5.99	Bean Burrito	A flavorful burrito filled with seasoned beans and cheese.
5	4	https://theeburgerdude.com/wp-content/uploads/2023/03/Shake-Shack-Blog-3-scaled-735x735.jpg	Food	8.99	ShackBurger	Juicy beef patty topped with cheese, lettuce, tomato, and ShackSauce.
6	4	https://topsecretrecipes.com/var/images/product/430.430/shake-shack-vanilla-milkshake-copycat-recipe_1.jpg	Beverage	4.99	Vanilla Milkshake	Creamy and rich vanilla-flavored milkshake.
7	5	https://www.dominos.com.au/ManagedAssets/AU/product/P016/AU_P016_en_hero_11800.gif?v-593160113	Food	12.99	Pepperoni Pizza	Classic pizza topped with pepperoni slices.
8	5	https://www.plainchicken.com/wp-content/uploads/2020/03/copycat+dominos+parmesan+bread+twists+font-427x375.jpg	Food	6.99	Garlic Parmesan Breadsticks	Breadsticks baked to perfection with a flavorful garlic and Parmesan coating.
9	3	https://www.cfacdn.com/img/order/menu/Online/Entrees/CFASpicySandwich_1080.png	Food	4.99	Chicken Sandwich	A tender chicken breast filet served on a toasted bun.
10	3	https://www.cfacdn.com/img/order/menu/Online/Sides%26treats/Small_Lowered_1217shoot_1080x1080.png	Food	2.49	Waffle Fries	Crispy waffle-cut fries seasoned to perfection.
11	6	https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0005_BigMac_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off	Food	4.99	Big Mac	Signature burger with two all-beef patties
12	6	https://s7d1.scene7.com/is/image/mcdonalds/DC_201909_4314_McChicken_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off	Food	3.99	McChicken	Crispy chicken patty with lettuce and mayo
13	7	https://globalassets.starbucks.com/assets/58db701349cb48738069e8c912e2b3ac.jpg?impolicy=1by1_wide_topcrop_630	Beverage	4.49	Caramel Macchiato	Espresso with caramel and steamed milk
14	7	https://www.digitalassets.starbucks.eu/sites/starbucks-medialibrary/files/Caramel-Frappuccino_0.jpeg	Beverage	5.99	Frappuccino	Blended coffee beverage with various flavors
15	8	https://www.subway.co.id/wp-content/uploads/2021/08/Italian-BMT-Front.png	Food	6.99	Italian BMT	Salami, pepperoni, and ham with veggies
16	8	https://www.subway.co.id/wp-content/uploads/2021/08/tuna-front.png	Food	5.99	Tuna Sub	Flaked tuna mixed with mayo and veggies
17	9	https://www.eatthis.com/wp-content/uploads/sites/4//media/images/ext/150960794/glazed-donut-box.jpg?quality=82&strip=1	Food	0.99	Glazed Donut	Classic donut with a sugar glaze
18	9	https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2023-04/dunkin-fan-favorite-coffee-flavor-zz-230413-e5d190.jpg	Beverage	2.49	Coffee	Freshly brewed coffee in various flavors
\.


--
-- TOC entry 2615 (class 0 OID 311339)
-- Dependencies: 221
-- Data for Name: order_menu_items; Type: TABLE DATA; Schema: public; Owner: althafnafi
--

COPY public.order_menu_items (id, order_id, item_id, quantity) FROM stdin;
1	1	10	3
2	1	9	2
3	2	6	2
4	2	5	3
5	3	8	4
6	3	7	2
\.


--
-- TOC entry 2613 (class 0 OID 311329)
-- Dependencies: 219
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: althafnafi
--

COPY public.orders (id, customer_id, address, restaurant_id, created_at) FROM stdin;
1	1	Jl. Kebagusan Dalam 1 No. 40	3	2023-06-11 05:09:01.232016
2	1	Jl. Kebagusan Dalam 1 No. 40	4	2023-06-11 14:19:14.875917
3	2	068 Hane Port, Apt. 188, 16304-8575, East Madonna, Maine, United States	5	2023-06-11 15:17:52.770046
\.


--
-- TOC entry 2619 (class 0 OID 311392)
-- Dependencies: 225
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: althafnafi
--

COPY public.restaurants (id, image, name, description) FROM stdin;
1	https://seeklogo.com/images/K/kfc-new-logo-72E6348046-seeklogo.com.png	KFC	Finger-licking good fried chicken and fast food.
2	https://1000logos.net/wp-content/uploads/2017/06/Taco-Bell-Logo-1994.png	Taco Bell	Mexican-inspired fast food with a variety of tacos and burritos.
3	https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042013/chick-fil-a.png	Chick-fil-A	Famous for its chicken sandwiches and waffle fries.
4	https://companieslogo.com/img/orig/SHAK-3a2893f1.png	Shake Shack	Gourmet burgers, hot dogs, and milkshakes.
5	https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/1200px-Dominos_pizza_logo.svg.png	Dominos Pizza	Delivery and takeout pizza with various toppings and sides.
6	https://logos-download.com/wp-content/uploads/2016/03/McDonalds_France_Logo_2003.png	McDonalds	World-famous fast food chain
7	https://www.freepnglogos.com/uploads/starbucks-logo-png-transparent-0.png	Starbucks	Coffeehouse chain
8	https://d26eb5y2jukpbz.cloudfront.net/ebs/archive/2019/media/OS_DE19085M_11.jpg	Subway	Sandwich restaurant franchise
9	https://seeklogo.com/images/D/dunkin-donuts-logo-1E269BA8F1-seeklogo.com.png	Dunkin Donuts	Global baked goods and coffee chain
\.


--
-- TOC entry 2611 (class 0 OID 311318)
-- Dependencies: 217
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: althafnafi
--

COPY public.reviews (id, customer_id, restaurant_id, comment, rating, created_at) FROM stdin;
1	1	3	The chicken sandwich was delightful!	4.0	2023-06-11 05:09:29.459009
2	1	4	Nice burgers!	5.0	2023-06-11 05:13:46.218857
3	2	5	The pizzas tastes delicious here :D	4.3	2023-06-11 15:18:50.717226
\.


--
-- TOC entry 2620 (class 0 OID 311433)
-- Dependencies: 226
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: althafnafi
--

COPY public.session (sid, sess, expire) FROM stdin;
8f5435a2-f8b2-4fab-9fc0-915cdd89b394	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T05:07:55.412Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 05:07:56
c250a352-6409-4cc8-ae06-1437dda77d93	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T05:09:29.593Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 05:09:30
0952a807-935e-4ef4-b475-decb25659ba3	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T05:10:58.464Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 05:10:59
832a7854-d4b3-443a-a65f-c7df66b443c4	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T05:13:17.324Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 05:13:18
83f8d890-82b2-4d34-b3d9-67f11b4dd52c	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T05:14:33.709Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 05:14:34
ecbf52e9-f1d9-4e0a-b224-b60c0a85e593	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T14:18:27.964Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 14:18:28
6fb9ad65-f4ca-4c2e-98e4-5affffdae816	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T14:41:25.498Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 14:41:26
008e3d56-efde-4cc4-b6fe-d9e19a08a1c3	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T14:41:36.278Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 14:41:37
35983ac8-8a9c-4dd8-b4cb-d6c38dd2b26b	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T04:50:23.314Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 14:42:57
f28d34b1-1b2a-43c4-820a-8eac5139c8f0	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T15:06:31.435Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 15:06:32
e22113be-07de-40ff-a5d0-e1fdd334731a	{"cookie":{"originalMaxAge":86400000,"expires":"2023-06-12T15:08:57.507Z","httpOnly":true,"path":"/"},"isAuth":true}	2023-06-12 15:08:58
\.


--
-- TOC entry 2632 (class 0 OID 0)
-- Dependencies: 214
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: althafnafi
--

SELECT pg_catalog.setval('public.customers_id_seq', 4, true);


--
-- TOC entry 2633 (class 0 OID 0)
-- Dependencies: 222
-- Name: menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: althafnafi
--

SELECT pg_catalog.setval('public.menu_items_id_seq', 18, true);


--
-- TOC entry 2634 (class 0 OID 0)
-- Dependencies: 220
-- Name: order_menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: althafnafi
--

SELECT pg_catalog.setval('public.order_menu_items_id_seq', 6, true);


--
-- TOC entry 2635 (class 0 OID 0)
-- Dependencies: 218
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: althafnafi
--

SELECT pg_catalog.setval('public.orders_id_seq', 3, true);


--
-- TOC entry 2636 (class 0 OID 0)
-- Dependencies: 224
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: althafnafi
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 9, true);


--
-- TOC entry 2637 (class 0 OID 0)
-- Dependencies: 216
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: althafnafi
--

SELECT pg_catalog.setval('public.reviews_id_seq', 3, true);


--
-- TOC entry 2436 (class 2606 OID 311316)
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- TOC entry 2438 (class 2606 OID 311312)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 2440 (class 2606 OID 311314)
-- Name: customers customers_username_key; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_username_key UNIQUE (username);


--
-- TOC entry 2448 (class 2606 OID 311390)
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);


--
-- TOC entry 2446 (class 2606 OID 311345)
-- Name: order_menu_items order_menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.order_menu_items
    ADD CONSTRAINT order_menu_items_pkey PRIMARY KEY (order_id, item_id);


--
-- TOC entry 2444 (class 2606 OID 311337)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2450 (class 2606 OID 311399)
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- TOC entry 2442 (class 2606 OID 311327)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 2453 (class 2606 OID 311439)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 2451 (class 1259 OID 311440)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: althafnafi
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 2465 (class 2606 OID 311403)
-- Name: menu_items menu_items_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE;


--
-- TOC entry 2461 (class 2606 OID 311428)
-- Name: order_menu_items order_menu_items_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.order_menu_items
    ADD CONSTRAINT order_menu_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.menu_items(id) ON DELETE SET NULL;


--
-- TOC entry 2462 (class 2606 OID 311356)
-- Name: order_menu_items order_menu_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.order_menu_items
    ADD CONSTRAINT order_menu_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 2463 (class 2606 OID 311375)
-- Name: order_menu_items order_menu_items_order_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.order_menu_items
    ADD CONSTRAINT order_menu_items_order_id_fkey1 FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 2464 (class 2606 OID 311423)
-- Name: order_menu_items order_menu_items_order_id_fkey2; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.order_menu_items
    ADD CONSTRAINT order_menu_items_order_id_fkey2 FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 2457 (class 2606 OID 311346)
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 2458 (class 2606 OID 311365)
-- Name: orders orders_customer_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey1 FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 2459 (class 2606 OID 311408)
-- Name: orders orders_customer_id_fkey2; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey2 FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 2460 (class 2606 OID 311413)
-- Name: orders orders_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE SET NULL;


--
-- TOC entry 2454 (class 2606 OID 311351)
-- Name: reviews reviews_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 2455 (class 2606 OID 311370)
-- Name: reviews reviews_customer_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_customer_id_fkey1 FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 2456 (class 2606 OID 311418)
-- Name: reviews reviews_customer_id_fkey2; Type: FK CONSTRAINT; Schema: public; Owner: althafnafi
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_customer_id_fkey2 FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


-- Completed on 2023-06-11 22:24:04

--
-- PostgreSQL database dump complete
--

