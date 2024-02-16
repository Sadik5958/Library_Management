import { Client } from "pg";

const client = new Client({
  connectionString: "",
});

async function User() {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE user (
      id SERIAL PRIMARY KEY,
      USERNAME VARCHAR(50) NOT NULL,
      email VARCHAR(64) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`);
}

async function Librarian() {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE librarian (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );  
`);
}

async function LibrarianBook() {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE librarian_books (
      book_id SERIAL PRIMARY KEY,
      book_title VARCHAR(255) UNIQUE NOT NULL,
      content VARCHAR(255) UNIQUE NOT NULL,
      author VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`);
}

async function UserBook() {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE user_books (
      book_id SERIAL PRIMARY KEY,
      book_title VARCHAR(255) UNIQUE NOT NULL,
      content VARCHAR(255) UNIQUE NOT NULL,
      author VARCHAR(255) UNIQUE NOT NULL,
      date_issued TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      date_return DATE 
    );
`);
}
