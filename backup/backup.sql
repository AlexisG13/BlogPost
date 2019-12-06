--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

-- Started on 2019-12-05 17:27:08 CST

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
-- TOC entry 2957 (class 1262 OID 16386)
-- Name: blogpost; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE blogpost WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE blogpost OWNER TO postgres;

\connect blogpost

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

SET default_with_oids = false;

--
-- TOC entry 202 (class 1259 OID 16483)
-- Name: Pruebas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pruebas" (
    asd integer
);


ALTER TABLE public."Pruebas" OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16429)
-- Name: author; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.author (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    username character varying(20) NOT NULL,
    profile_image character varying(60),
    last_login timestamp(4) with time zone NOT NULL,
    created_at timestamp(4) with time zone NOT NULL,
    lastname character varying(40) NOT NULL
);


ALTER TABLE public.author OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16427)
-- Name: author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.author_id_seq OWNER TO postgres;

--
-- TOC entry 2959 (class 0 OID 0)
-- Dependencies: 198
-- Name: author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.author_id_seq OWNED BY public.author.id;


--
-- TOC entry 201 (class 1259 OID 16442)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    content character varying(1420) NOT NULL,
    id_author integer NOT NULL,
    id_post integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16440)
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO postgres;

--
-- TOC entry 2961 (class 0 OID 0)
-- Dependencies: 200
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- TOC entry 197 (class 1259 OID 16403)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    content character varying(1420) NOT NULL,
    id_author integer NOT NULL,
    created_at timestamp(4) with time zone NOT NULL,
    update_at timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16401)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO postgres;

--
-- TOC entry 2964 (class 0 OID 0)
-- Dependencies: 196
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- TOC entry 2813 (class 2604 OID 16432)
-- Name: author id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author ALTER COLUMN id SET DEFAULT nextval('public.author_id_seq'::regclass);


--
-- TOC entry 2814 (class 2604 OID 16445)
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- TOC entry 2812 (class 2604 OID 16406)
-- Name: post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- TOC entry 2951 (class 0 OID 16483)
-- Dependencies: 202
-- Data for Name: Pruebas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pruebas" (asd) FROM stdin;
1
\.


--
-- TOC entry 2948 (class 0 OID 16429)
-- Dependencies: 199
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.author (id, name, username, profile_image, last_login, created_at, lastname) FROM stdin;
1	Alexis	alexisg13	www.image.com	2019-12-02 00:00:00-06	2019-12-02 00:00:00-06	Gomez
2	Bob	bob123	dotcom.com	2019-12-05 15:33:45.5666-06	2019-12-05 15:33:45.5666-06	Smith
\.


--
-- TOC entry 2950 (class 0 OID 16442)
-- Dependencies: 201
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, content, id_author, id_post, created_at, updated_at) FROM stdin;
9	Hey VSAUCE	1	16	2019-12-05 15:53:21.418718	2019-12-05 15:53:21.418718
10	The cake is a lie 	2	16	2019-12-05 15:53:33.554127	2019-12-05 15:53:33.554127
11	This is a comment	2	17	2019-12-05 15:53:46.055973	2019-12-05 15:53:46.055973
12	This is also comment	1	17	2019-12-05 15:53:52.150632	2019-12-05 15:53:52.150632
17	Holi	2	16	2019-12-05 16:22:51.213183	2019-12-05 16:32:02.01909
\.


--
-- TOC entry 2946 (class 0 OID 16403)
-- Dependencies: 197
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (id, title, content, id_author, created_at, update_at) FROM stdin;
14	OMG	Ayy Lmao	1	2019-12-05 11:49:14.7997-06	2019-12-05 11:49:14.799665-06
8	Skyrim	Hey you, youre finally awake	1	2019-12-03 00:00:00-06	2019-12-05 12:08:29.811783-06
16	El percebe feo	Habia una vez un percebe feo, tan feo que todos se murieron.Fin	2	2019-12-05 15:35:00.9524-06	2019-12-05 15:35:00.952368-06
17	La ciencia de lo falso	Dori me Interimo, adapare Dori me Ameno Ameno Latire Latiremo Dori me	2	2019-12-05 15:35:41.4515-06	2019-12-05 17:08:48.488463-06
\.


--
-- TOC entry 2966 (class 0 OID 0)
-- Dependencies: 198
-- Name: author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.author_id_seq', 2, true);


--
-- TOC entry 2967 (class 0 OID 0)
-- Dependencies: 200
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 19, true);


--
-- TOC entry 2968 (class 0 OID 0)
-- Dependencies: 196
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_id_seq', 18, true);


--
-- TOC entry 2818 (class 2606 OID 16434)
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);


--
-- TOC entry 2820 (class 2606 OID 16450)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- TOC entry 2816 (class 2606 OID 16411)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- TOC entry 2821 (class 2606 OID 16435)
-- Name: post author; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT author FOREIGN KEY (id_author) REFERENCES public.author(id) NOT VALID;


--
-- TOC entry 2822 (class 2606 OID 16451)
-- Name: comment author; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT author FOREIGN KEY (id_author) REFERENCES public.author(id);


--
-- TOC entry 2823 (class 2606 OID 16456)
-- Name: comment post; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT post FOREIGN KEY (id_post) REFERENCES public.post(id);


--
-- TOC entry 2958 (class 0 OID 0)
-- Dependencies: 199
-- Name: TABLE author; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.author TO root;


--
-- TOC entry 2960 (class 0 OID 0)
-- Dependencies: 201
-- Name: TABLE comment; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.comment TO root;


--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 200
-- Name: SEQUENCE comment_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.comment_id_seq TO root;


--
-- TOC entry 2963 (class 0 OID 0)
-- Dependencies: 197
-- Name: TABLE post; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.post TO root;


--
-- TOC entry 2965 (class 0 OID 0)
-- Dependencies: 196
-- Name: SEQUENCE post_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.post_id_seq TO root;


-- Completed on 2019-12-05 17:27:10 CST

--
-- PostgreSQL database dump complete
--

