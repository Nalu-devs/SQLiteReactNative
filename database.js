import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco local
const db = SQLite.openDatabaseSync('cadastros.db');

//async permite com que você não precise depender do banco de dados
//await não precisa esperar para abertura do BD
export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS pessoas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `);
};

export async function adicionarPessoa(nome, email) {
  //runAsync passa dois parametros, os nomes e os valores que vão ser substituidos         
  await db.runAsync(
    'INSERT INTO pessoas (nome, email) VALUES (?, ?);',
    [nome, email]
  );
};

export async function listarPessoas() {
  const pessoas = await db.getAllAsync('SELECT * FROM pessoas;');
  return pessoas;
};

export async function deletarPessoa(id) {
  await db.runAsync('DELETE FROM pessoas WHERE id = ?;', [id]);
};
