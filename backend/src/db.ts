import { Client } from "pg";

const client = new Client({
  connectionString: "",
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database: ", err);
    throw err;
  }
}

async function disconnect() {
  try {
    await client.end();
    console.log("Disconnected from database");
  } catch (err) {
    console.error("Error disconnecting from database: ", err);
    throw err;
  }
}

async function User() {
  const result = await client.query(`
    CREATE TABLE IF NOT EXISTS user (
      id SERIAL PRIMARY KEY,
      USERNAME VARCHAR(50) NOT NULL,
      email VARCHAR(64) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`);
}

async function Librarian() {
  const result = await client.query(`
    CREATE TABLE IF NOT EXISTS librarian (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );  
`);
}

async function LibrarianBook() {
  const result = await client.query(`
    CREATE TABLE IF NOT EXISTS librarian_books (
      book_id SERIAL PRIMARY KEY,
      book_title VARCHAR(255) UNIQUE NOT NULL,
      content VARCHAR(255) UNIQUE NOT NULL,
      author VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`);
}

async function UserBook() {
  const result = await client.query(`
    CREATE TABLE IF NOT EXISTS user_books (
      book_id SERIAL PRIMARY KEY,
      book_title VARCHAR(255) UNIQUE NOT NULL,
      content VARCHAR(255) UNIQUE NOT NULL,
      author VARCHAR(255) UNIQUE NOT NULL,
      date_issued TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      date_return DATE 
    );
`);
}

export { connect, disconnect, User, Librarian, LibrarianBook, UserBook };
