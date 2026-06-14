CREATE DATABASE portal_estagios;

CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    email VARCHAR(150),
    senha VARCHAR(255),
    curso VARCHAR(100),
    telefone VARCHAR(20),
    curriculo VARCHAR(255)
);

CREATE TABLE vagas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150),
    empresa VARCHAR(150),
    cidade VARCHAR(100),
    modalidade VARCHAR(50),
    descricao TEXT
);

CREATE TABLE candidaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT,
    vaga_id INT,
    status VARCHAR(50),
    data_envio DATETIME
);