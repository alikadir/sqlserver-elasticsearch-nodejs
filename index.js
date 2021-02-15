import { Client } from "@elastic/elasticsearch";
import sql from "mssql";
import { getData } from "./operations.js";

await sql.connect("mssql://username:password@localhost/database");
const client = new Client({
  node: "http://localhost:9200",
});

console.dir(getData(sql, "select * from aaa"));
