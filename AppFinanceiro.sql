--DTABASE: AppFinanceiro

CREATE TABLE USUARIOS
(
    CODIGO SERIAL PRIMARY KEY,
    NOME VARCHAR(30),
    EMAIL VARCHAR(60),
    SENHA VARCHAR(20),
    CPF VARCHAR(15),
    PERMISSAO VARCHAR(5),
    ATIVO BOOLEAN
);

INSERT INTO USUARIOS (NOME, EMAIL, SENHA, CPF, PERMISSAO, ATIVO) VALUES
('Vitor Fraporti', 'vitorfraporti@hotmail.com', '12345', '034.626.290-93', 'USER', true);

INSERT INTO USUARIOS (NOME, EMAIL, SENHA, CPF, PERMISSAO, ATIVO) VALUES
('ADMIN', 'ADMIN', '654321', '123.456.789-09', 'ADMIN', true);

UPDATE USUARIOS SET CODIGO = 0 WHERE CODIGO = 2;

CREATE TABLE GRUPOS
(
    CODIGO SERIAL PRIMARY KEY,
    NOME VARCHAR(40),
    DESCRICAO VARCHAR(100),
    CODIGO_USUARIO INTEGER,
    ATIVO BOOLEAN,
    FOREIGN KEY (CODIGO_USUARIO) REFERENCES USUARIOS (CODIGO)
);

INSERT INTO GRUPOS (NOME, DESCRICAO, CODIGO_USUARIO, ATIVO) 
	VALUES ('Grupo teste', 'Teste para ver se as relações estão corretas', 1, true);

CREATE TABLE CATEGORIAS
(
    CODIGO SERIAL PRIMARY KEY,
    NOME VARCHAR(20),
    DESCRICAO VARCHAR(100),
    ATIVO BOOLEAN,
    CODIGO_USUARIO INTEGER,
    FOREIGN KEY (CODIGO_USUARIO) REFERENCES USUARIOS (CODIGO)
);
	
INSERT INTO CATEGORIAS(NOME, DESCRICAO, ATIVO, CODIGO_USUARIO)
	VALUES ('MERCADO', 'Despesas com mercado', true, 0);
INSERT INTO CATEGORIAS(NOME, DESCRICAO, ATIVO, CODIGO_USUARIO)
	VALUES ('SAUDE', 'Despesas com saude/farmacia/remedio', true, 0);
INSERT INTO CATEGORIAS(NOME, DESCRICAO, ATIVO, CODIGO_USUARIO)
	VALUES ('CONTAS', 'Despesas com contas da casa', true, 0);


--pensar na possibilidade de criar USUARIO_DESPESA e GRUPO_DESPESA inves de refrenciar na tabela DESPESAS
--ver o que fica melhor

CREATE TABLE DESPESAS
(
    CODIGO SERIAL PRIMARY KEY,
    NOME VARCHAR(20),
    DESCRICAO VARCHAR(100),
    VALOR NUMERIC(5,2),
    FREQUENCIA INTEGER,
	CODIGO_CATEGORIA INTEGER,
    CODIGO_USUARIO INTEGER,
    CODIGO_GRUPO INTEGER,
    ATIVO BOOLEAN,
    FOREIGN KEY (CODIGO_GRUPO) REFERENCES GRUPOS (CODIGO),
    FOREIGN KEY (CODIGO_USUARIO) REFERENCES USUARIOS (CODIGO),
    FOREIGN KEY (CODIGO_CATEGORIA) REFERENCES CATEGORIAS (CODIGO)
);

INSERT INTO DESPESAS (NOME, DESCRICAO, VALOR, CODIGO_CATEGORIA, CODIGO_USUARIO)
    VALUES ('Agua', 'Conta de agua do mes', 44.34, 3, 1);
INSERT INTO DESPESAS (NOME, DESCRICAO, VALOR, CODIGO_CATEGORIA, CODIGO_USUARIO)
    VALUES ('Luz', 'Conta de luz do mes', 84.59, 3, 1);
INSERT INTO DESPESAS (NOME, DESCRICAO, VALOR, CODIGO_CATEGORIA, CODIGO_USUARIO)
    VALUES ('Salgadinho', 'Doritos no peruzzo', 12.90, 1, 1);

/*CREATE TABLE USUARIO_DESPESA
(
    CODIGO SERIAL PRIMARY KEY,
    CODIGO_USUARIO INTEGER,
    CODIGO_DESPESA INTEGER,
    FOREIGN KEY (CODIGO_USUARIO) REFERENCES USUARIOS (CODIGO),
    FOREIGN KEY (CODIGO_DESPESA) REFERENCES DESPESAS (CODIGO)
);

CREATE TABLE GRUPO_DESPESA
(
    CODIGO SERIAL PRIMARY KEY,
    CODIGO_GRUPO INTEGER,
    CODIGO_DESPESA INTEGER,
    FOREIGN KEY (CODIGO_GRUPO) REFERENCES GRUPOS (CODIGO),
    FOREIGN KEY (CODIGO_DESPESA) REFERENCES DESPESAS (CODIGO)
);*/

CREATE TABLE USUARIOS_GRUPOS
(
    CODIGO SERIAL PRIMARY KEY,
    CODIGO_GRUPO INTEGER,
    CODIGO_USUARIO INTEGER,
    FOREIGN KEY (CODIGO_GRUPO) REFERENCES GRUPOS (CODIGO),
    FOREIGN KEY (CODIGO_USUARIO) REFERENCES USUARIOS (CODIGO)
);
	
INSERT INTO PUBLIC.USUARIOS_GRUPOS(CODIGO_GRUPO, CODIGO_USUARIO)
	VALUES (1, 1);