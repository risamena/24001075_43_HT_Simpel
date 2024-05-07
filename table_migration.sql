-- public.dosen definition

-- Drop table

-- DROP TABLE public.dosen;

CREATE TABLE public.dosen (
	dosen_id varchar NOT NULL,
	nama_lengkap varchar NOT NULL,
	fakultas varchar NULL,
	prodi varchar NULL,
	alamat varchar NULL,
	CONSTRAINT dosen_pk PRIMARY KEY (dosen_id)
);


-- public.jurnal definition

-- Drop table

-- DROP TABLE public.jurnal;

CREATE TABLE public.jurnal (
	jurnal_id serial4 NOT NULL,
	judul_artikel varchar NULL,
	publisher varchar NULL,
	nama_jurnal varchar NULL,
	issn varchar NULL,
	tahun int4 NULL,
	CONSTRAINT jurnal_pk PRIMARY KEY (jurnal_id)
);