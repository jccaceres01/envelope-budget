--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-31 18:58:00

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

DROP DATABASE envelopes;
--
-- TOC entry 3343 (class 1262 OID 122881)
-- Name: envelopes; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE envelopes WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE envelopes OWNER TO postgres;

\connect envelopes

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 122882)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 122885)
-- Name: envelope; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.envelope (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    budget double precision NOT NULL
);


ALTER TABLE public.envelope OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 122888)
-- Name: envelope_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.envelope_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.envelope_id_seq OWNER TO postgres;

--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 216
-- Name: envelope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.envelope_id_seq OWNED BY public.envelope.id;


--
-- TOC entry 217 (class 1259 OID 122889)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    date date NOT NULL,
    payment_amount double precision NOT NULL,
    payment_recipient character varying(255),
    envelope_id integer NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 122892)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_id_seq OWNER TO postgres;

--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 218
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- TOC entry 3182 (class 2604 OID 122893)
-- Name: envelope id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envelope ALTER COLUMN id SET DEFAULT nextval('public.envelope_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 122894)
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- TOC entry 3333 (class 0 OID 122882)
-- Dependencies: 214
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SequelizeMeta" (name) VALUES ('20230324014556-create-envelope.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20230324014719-create-transaction.js');


--
-- TOC entry 3334 (class 0 OID 122885)
-- Dependencies: 215
-- Data for Name: envelope; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.envelope (id, title, budget) VALUES (119, 'Pet Cares', 850);
INSERT INTO public.envelope (id, title, budget) VALUES (120, 'Career', 1000);


--
-- TOC entry 3336 (class 0 OID 122889)
-- Dependencies: 217
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transaction (id, date, payment_amount, payment_recipient, envelope_id) VALUES (23, '2023-03-01', 2000, 'Pepe Pets ed ed', 119);
INSERT INTO public.transaction (id, date, payment_amount, payment_recipient, envelope_id) VALUES (24, '2023-03-10', 1501, 'Animal Family food ed', 119);
INSERT INTO public.transaction (id, date, payment_amount, payment_recipient, envelope_id) VALUES (25, '2023-03-30', 1100, 'trimestre payment ed', 120);
INSERT INTO public.transaction (id, date, payment_amount, payment_recipient, envelope_id) VALUES (26, '2023-03-31', 300, 'Jaja valley', 120);


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 216
-- Name: envelope_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.envelope_id_seq', 120, true);


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 218
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 26, true);


--
-- TOC entry 3185 (class 2606 OID 122896)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3187 (class 2606 OID 122898)
-- Name: envelope envelope_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envelope
    ADD CONSTRAINT envelope_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 122900)
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3190 (class 2606 OID 122901)
-- Name: transaction transaction_envelope; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_envelope FOREIGN KEY (envelope_id) REFERENCES public.envelope(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2023-03-31 18:58:00

--
-- PostgreSQL database dump complete
--

