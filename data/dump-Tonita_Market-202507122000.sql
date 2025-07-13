--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-07-12 20:00:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Tonita_Market";
--
-- TOC entry 4904 (class 1262 OID 41275)
-- Name: Tonita_Market; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Tonita_Market" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-MX';


ALTER DATABASE "Tonita_Market" OWNER TO postgres;

\connect "Tonita_Market"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 41368)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id_cart_item integer NOT NULL,
    user_id integer,
    publication_id integer,
    quantity integer DEFAULT 1 NOT NULL,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    m_anulado boolean DEFAULT false
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 41367)
-- Name: cart_items_id_cart_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_cart_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_cart_item_seq OWNER TO postgres;

--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 229
-- Name: cart_items_id_cart_item_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_cart_item_seq OWNED BY public.cart_items.id_cart_item;


--
-- TOC entry 222 (class 1259 OID 41301)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id_category integer NOT NULL,
    name_category character varying(100) NOT NULL,
    description_category character varying(100) NOT NULL,
    m_anulado boolean DEFAULT false
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 41300)
-- Name: category_id_category_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_category_seq OWNER TO postgres;

--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 221
-- Name: category_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_category_seq OWNED BY public.category.id_category;


--
-- TOC entry 226 (class 1259 OID 41329)
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id_favorite integer NOT NULL,
    user_id integer,
    publication_id integer,
    m_anulado boolean DEFAULT false
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 41328)
-- Name: favorites_id_favorite_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_id_favorite_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_favorite_seq OWNER TO postgres;

--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 225
-- Name: favorites_id_favorite_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_id_favorite_seq OWNED BY public.favorites.id_favorite;


--
-- TOC entry 228 (class 1259 OID 41347)
-- Name: messages_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages_users (
    id_message integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    message text NOT NULL,
    sent_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    m_anulado boolean DEFAULT false
);


ALTER TABLE public.messages_users OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 41346)
-- Name: messages_users_id_message_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_users_id_message_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_users_id_message_seq OWNER TO postgres;

--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 227
-- Name: messages_users_id_message_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_users_id_message_seq OWNED BY public.messages_users.id_message;


--
-- TOC entry 224 (class 1259 OID 41309)
-- Name: publications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publications (
    id_publication integer NOT NULL,
    title_publication character varying(100) NOT NULL,
    description_publication character varying(500) NOT NULL,
    image_publication text,
    price_publication numeric(10,2),
    category_id integer,
    user_id integer,
    m_anulado boolean DEFAULT false
);


ALTER TABLE public.publications OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 41308)
-- Name: publications_id_publication_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publications_id_publication_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.publications_id_publication_seq OWNER TO postgres;

--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 223
-- Name: publications_id_publication_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publications_id_publication_seq OWNED BY public.publications.id_publication;


--
-- TOC entry 218 (class 1259 OID 41277)
-- Name: role_cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_cat (
    id_role_cat integer NOT NULL,
    name_role_cat character varying(100) NOT NULL,
    description_role character varying(250),
    m_anulado boolean DEFAULT false
);


ALTER TABLE public.role_cat OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 41276)
-- Name: role_cat_id_role_cat_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_cat_id_role_cat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_cat_id_role_cat_seq OWNER TO postgres;

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 217
-- Name: role_cat_id_role_cat_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_cat_id_role_cat_seq OWNED BY public.role_cat.id_role_cat;


--
-- TOC entry 234 (class 1259 OID 41402)
-- Name: sale_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sale_items (
    id_sale_item integer NOT NULL,
    sale_id integer,
    publication_id integer,
    quantity integer DEFAULT 1 NOT NULL,
    unit_price numeric(10,2) NOT NULL
);


ALTER TABLE public.sale_items OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 41401)
-- Name: sale_items_id_sale_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sale_items_id_sale_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sale_items_id_sale_item_seq OWNER TO postgres;

--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 233
-- Name: sale_items_id_sale_item_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sale_items_id_sale_item_seq OWNED BY public.sale_items.id_sale_item;


--
-- TOC entry 232 (class 1259 OID 41388)
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id_sale integer NOT NULL,
    user_id integer,
    total numeric(10,2) NOT NULL,
    sale_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    m_anulado boolean DEFAULT false
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 41387)
-- Name: sales_id_sale_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_id_sale_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_sale_seq OWNER TO postgres;

--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 231
-- Name: sales_id_sale_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_id_sale_seq OWNED BY public.sales.id_sale;


--
-- TOC entry 220 (class 1259 OID 41285)
-- Name: user_cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_cat (
    id_user_cat integer NOT NULL,
    name_cat character varying(100) NOT NULL,
    last_name_cat character varying(100) NOT NULL,
    alias_cat character varying(100),
    pass_cat character varying(255) NOT NULL,
    role_cat_id integer,
    m_anulado boolean DEFAULT false,
    email_cat character varying(255) NOT NULL,
    CONSTRAINT user_cat_pass_cat_check CHECK ((length((pass_cat)::text) >= 9))
);


ALTER TABLE public.user_cat OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 41284)
-- Name: user_cat_id_user_cat_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_cat_id_user_cat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_cat_id_user_cat_seq OWNER TO postgres;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_cat_id_user_cat_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_cat_id_user_cat_seq OWNED BY public.user_cat.id_user_cat;


--
-- TOC entry 4694 (class 2604 OID 41371)
-- Name: cart_items id_cart_item; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id_cart_item SET DEFAULT nextval('public.cart_items_id_cart_item_seq'::regclass);


--
-- TOC entry 4685 (class 2604 OID 41304)
-- Name: category id_category; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id_category SET DEFAULT nextval('public.category_id_category_seq'::regclass);


--
-- TOC entry 4689 (class 2604 OID 41332)
-- Name: favorites id_favorite; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id_favorite SET DEFAULT nextval('public.favorites_id_favorite_seq'::regclass);


--
-- TOC entry 4691 (class 2604 OID 41350)
-- Name: messages_users id_message; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages_users ALTER COLUMN id_message SET DEFAULT nextval('public.messages_users_id_message_seq'::regclass);


--
-- TOC entry 4687 (class 2604 OID 41312)
-- Name: publications id_publication; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publications ALTER COLUMN id_publication SET DEFAULT nextval('public.publications_id_publication_seq'::regclass);


--
-- TOC entry 4681 (class 2604 OID 41280)
-- Name: role_cat id_role_cat; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_cat ALTER COLUMN id_role_cat SET DEFAULT nextval('public.role_cat_id_role_cat_seq'::regclass);


--
-- TOC entry 4701 (class 2604 OID 41405)
-- Name: sale_items id_sale_item; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items ALTER COLUMN id_sale_item SET DEFAULT nextval('public.sale_items_id_sale_item_seq'::regclass);


--
-- TOC entry 4698 (class 2604 OID 41391)
-- Name: sales id_sale; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN id_sale SET DEFAULT nextval('public.sales_id_sale_seq'::regclass);


--
-- TOC entry 4683 (class 2604 OID 41288)
-- Name: user_cat id_user_cat; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cat ALTER COLUMN id_user_cat SET DEFAULT nextval('public.user_cat_id_user_cat_seq'::regclass);


--
-- TOC entry 4894 (class 0 OID 41368)
-- Dependencies: 230
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4886 (class 0 OID 41301)
-- Dependencies: 222
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category VALUES (1, 'Productos', 'Artículos para gatos como comida, juguetes y accesorios', false);
INSERT INTO public.category VALUES (2, 'Servicios', 'Servicios como veterinaria, baño, peluquería o cuidado', false);
INSERT INTO public.category VALUES (3, 'Adopciones', 'Publicaciones para adoptar gatos en búsqueda de hogar', false);


--
-- TOC entry 4890 (class 0 OID 41329)
-- Dependencies: 226
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4892 (class 0 OID 41347)
-- Dependencies: 228
-- Data for Name: messages_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.messages_users VALUES (1, 4, 2, 'Hola, ¿puedo saber más sobre tu publicación?', '2025-07-12 18:20:45.168428', false);
INSERT INTO public.messages_users VALUES (2, 4, 2, 'Hola, ¿puedo saber más sobre tu publicación? o lo hablamos mas tarde', '2025-07-12 19:00:32.437937', false);


--
-- TOC entry 4888 (class 0 OID 41309)
-- Dependencies: 224
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.publications VALUES (10, 'Gatoi en adopcion', 'Ideal para afilar uñas y evitar destrozos', 'https://imgur.com/rascador.jpg', NULL, 2, 3, true);
INSERT INTO public.publications VALUES (9, 'Rascador de cartón para gato', 'Ideal para gatitos pequeños y peludos', 'https://imgur.com/rascador.jpg', 12990.00, 1, 2, false);
INSERT INTO public.publications VALUES (11, 'Comida gatos adultos', 'Ideal para mantener alimentado a tu gato', 'https://imgur.com/rascador.jpg', 5990.00, 1, 2, false);
INSERT INTO public.publications VALUES (12, 'Rascador de gatos naranjas', 'Sólo para gatos naranjas (SIN DEVOLUCIÓN)', 'https://imgur.com/rascador.jpg', 46890.00, 1, 2, false);
INSERT INTO public.publications VALUES (13, 'Lavado de gatos', 'Mantén bañado a tu peludo amigo', 'https://imgur.com/rascador.jpg', 32000.00, 2, 2, false);
INSERT INTO public.publications VALUES (15, 'Corta uñas gatuno + cuchara de comida', 'El mejor duo-pack para tu gato', 'https://imgur.com/rascador.jpg', 22000.00, 2, 2, false);
INSERT INTO public.publications VALUES (16, 'Gatito en busca de hogar', 'Gatitto de 3 meses en busca de hogar', 'https://imgur.com/rascador.jpg', NULL, 3, 2, false);
INSERT INTO public.publications VALUES (14, 'Corte de uñas de gatos', 'Mantén tus brazos libre de rasguños', 'https://imgur.com/rascador.jpg', 2000.00, 2, 2, false);


--
-- TOC entry 4882 (class 0 OID 41277)
-- Dependencies: 218
-- Data for Name: role_cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role_cat VALUES (2, 'normal_cat', 'Usuario normal con permisos limitados', false);
INSERT INTO public.role_cat VALUES (1, 'admin_cat', 'Administrador con acceso completo', false);


--
-- TOC entry 4898 (class 0 OID 41402)
-- Dependencies: 234
-- Data for Name: sale_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4896 (class 0 OID 41388)
-- Dependencies: 232
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4884 (class 0 OID 41285)
-- Dependencies: 220
-- Data for Name: user_cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_cat VALUES (2, 'Barbarella', 'Bebs', 'Gemma', '$2b$10$Fa38XAInmduIZRx1.R14cuq.0IdCM7W2oGYz9xW.dKMWNSdWJKps2', 2, false, 'gemma@pm.cl');
INSERT INTO public.user_cat VALUES (3, 'Administrador', 'Admin', 'Adm', '$2b$10$8eCjkMb2DQUTshCmLPIWBOlhCJKfm6hLlbsyyZtlgLb9h19fx6H7q', 1, false, 'adm@pm.cl');
INSERT INTO public.user_cat VALUES (1, 'Gatito', 'Cliente', 'gatitocliente', '$2b$10$1AHPcwD4q.gPsxg9p1BZLOIH89M8dD/xIxGHYvdYsf81W2A78U6Fq', 2, true, 'cliente@tonita.cl');
INSERT INTO public.user_cat VALUES (4, 'Isac''s', 'Torvals', 'Isac', '$2b$10$JCOLjhRXeU12WijZT4r0DeQNz1TDWlEwoCinjBvNRc2tVHoIJJHQq', 2, false, 'comprador@pm.cl');
INSERT INTO public.user_cat VALUES (5, 'Juan', 'Pérez', 'juanito_test', '$2b$10$QG7NY.wtwfzX1IzuFB0R9ecLUTzUzwskCF/lU3ZvSNCJHSAsVZz2i', 2, false, 'juan1752363859326@test.com');


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 229
-- Name: cart_items_id_cart_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_cart_item_seq', 4, true);


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 221
-- Name: category_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_category_seq', 3, true);


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 225
-- Name: favorites_id_favorite_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_favorite_seq', 1, false);


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 227
-- Name: messages_users_id_message_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_users_id_message_seq', 2, true);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 223
-- Name: publications_id_publication_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publications_id_publication_seq', 16, true);


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 217
-- Name: role_cat_id_role_cat_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_cat_id_role_cat_seq', 2, true);


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 233
-- Name: sale_items_id_sale_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sale_items_id_sale_item_seq', 4, true);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 231
-- Name: sales_id_sale_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_sale_seq', 5, true);


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_cat_id_user_cat_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_cat_id_user_cat_seq', 5, true);


--
-- TOC entry 4719 (class 2606 OID 41376)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id_cart_item);


--
-- TOC entry 4711 (class 2606 OID 41307)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id_category);


--
-- TOC entry 4715 (class 2606 OID 41335)
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id_favorite);


--
-- TOC entry 4717 (class 2606 OID 41356)
-- Name: messages_users messages_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages_users
    ADD CONSTRAINT messages_users_pkey PRIMARY KEY (id_message);


--
-- TOC entry 4713 (class 2606 OID 41317)
-- Name: publications publications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_pkey PRIMARY KEY (id_publication);


--
-- TOC entry 4705 (class 2606 OID 41283)
-- Name: role_cat role_cat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_cat
    ADD CONSTRAINT role_cat_pkey PRIMARY KEY (id_role_cat);


--
-- TOC entry 4723 (class 2606 OID 41408)
-- Name: sale_items sale_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_pkey PRIMARY KEY (id_sale_item);


--
-- TOC entry 4721 (class 2606 OID 41395)
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id_sale);


--
-- TOC entry 4707 (class 2606 OID 41420)
-- Name: user_cat user_cat_email_cat_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cat
    ADD CONSTRAINT user_cat_email_cat_key UNIQUE (email_cat);


--
-- TOC entry 4709 (class 2606 OID 41294)
-- Name: user_cat user_cat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cat
    ADD CONSTRAINT user_cat_pkey PRIMARY KEY (id_user_cat);


--
-- TOC entry 4731 (class 2606 OID 41382)
-- Name: cart_items cart_items_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publications(id_publication) ON DELETE CASCADE;


--
-- TOC entry 4732 (class 2606 OID 41377)
-- Name: cart_items cart_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_cat(id_user_cat) ON DELETE CASCADE;


--
-- TOC entry 4727 (class 2606 OID 41341)
-- Name: favorites favorites_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publications(id_publication) ON DELETE CASCADE;


--
-- TOC entry 4728 (class 2606 OID 41336)
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_cat(id_user_cat) ON DELETE CASCADE;


--
-- TOC entry 4729 (class 2606 OID 41362)
-- Name: messages_users messages_users_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages_users
    ADD CONSTRAINT messages_users_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.user_cat(id_user_cat) ON DELETE CASCADE;


--
-- TOC entry 4730 (class 2606 OID 41357)
-- Name: messages_users messages_users_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages_users
    ADD CONSTRAINT messages_users_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.user_cat(id_user_cat) ON DELETE CASCADE;


--
-- TOC entry 4725 (class 2606 OID 41318)
-- Name: publications publications_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id_category) ON DELETE SET NULL;


--
-- TOC entry 4726 (class 2606 OID 41323)
-- Name: publications publications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_cat(id_user_cat) ON DELETE CASCADE;


--
-- TOC entry 4734 (class 2606 OID 41414)
-- Name: sale_items sale_items_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publications(id_publication) ON DELETE SET NULL;


--
-- TOC entry 4735 (class 2606 OID 41409)
-- Name: sale_items sale_items_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(id_sale) ON DELETE CASCADE;


--
-- TOC entry 4733 (class 2606 OID 41396)
-- Name: sales sales_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_cat(id_user_cat) ON DELETE CASCADE;


--
-- TOC entry 4724 (class 2606 OID 41295)
-- Name: user_cat user_cat_role_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cat
    ADD CONSTRAINT user_cat_role_cat_id_fkey FOREIGN KEY (role_cat_id) REFERENCES public.role_cat(id_role_cat) ON DELETE SET NULL;


-- Completed on 2025-07-12 20:00:23

--
-- PostgreSQL database dump complete
--

