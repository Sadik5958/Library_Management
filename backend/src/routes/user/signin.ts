import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connect, disconnect, User } from "../../db";
import { z } from "zod";
import JWT_SECRET from "../../config";
import { Client } from "pg";

const router = express.Router();

const client = new Client({
  connectionString: "",
});
