import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco local
const db = SQLite.openDatabaseSync('cadastros.db');

//async permite com que você não precise depender do banco de dados
//await não precisa esperar para abertura do BD
export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS pet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeTutor TEXT NOT NULL,
      telefone TEXT NOT NULL,
      nomePet TEXT NOT NULL
    );
  `);
};

export async function adicionarPet(nomeTutor, telefone, nomePet) {
  //runAsync passa dois parametros, os nomes e os valores que vão ser substituidos         
  await db.runAsync(
    'INSERT INTO pessoas (nomeTutor, telefone, nomePet) VALUES (?, ?, ?);',
    [nomeTutor, telefone, nomePet]
  );
};

export async function listarPet() {
  const pet = await db.getAllAsync('SELECT * FROM pet;');
  return pet;
};

export async function deletarPet(id) {
  await db.runAsync('DELETE FROM pet WHERE id = ?;', [id]);
};
