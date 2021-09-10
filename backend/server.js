const { Pool } = require("pg");
const express = require("express");

const PORT = 5000;
const app = express();
const connectionString = "postgres://postgres:1605@localhost:5432/fstival";

const pool = new Pool({
  connectionString,
});

app.use(express.json());

app.listen(PORT, () => {
  console.log("Server up and running @ localhost:", PORT);
});

app.get("/events/eventid/:eventid", async (req, res, next) => {
  const id = req.params.eventid;
  const query = `SELECT * FROM EVENTS WHERE eventid = ${id};`;
  const result = (await pool.query(query)).rows[0];
  res.send(result).status(200);
});

app.get("/events/tagname/:tagname", async (req, res) => {
  //FIX SOON SO UGLY
  const tags = req.params.tagname.split("-");
  let eventids = [];
  for (let tag of tags) {
    const query = `SELECT eventid FROM EVENT_TAGS WHERE TAGID = (SELECT TAGID FROM TAGS WHERE NAME = '${tag}')`;
    const result = await pool.query(query);
    let events = [];
    for (let row of result.rows) events.push(row.eventid);
    if (eventids.length) eventids = eventids.filter((x) => events.includes(x));
    //Intersection of events that fit all tags given
    else eventids = events;
  }
  const query = `SELECT * FROM EVENTS WHERE eventid in ('${eventids.join(
    `','`
  )}');`; //Remember to format at end
  const result = await pool.query(query);
  const events = [...result.rows];
  res.send(events).status(200);
});

app.get("/events", async (req, res) => {
  const result = await pool.query("SELECT * FROM EVENTS");
  events = [...result.rows];
  res.send(events).status(200);
});

app.post("/events", async (req, res) => {
  const { name, description, eventdate, link, tags, newtags } = req.body;
  let query = `INSERT INTO EVENTS(name, description, eventdate, link) values ('${name}','${description}','${eventdate}','${link}') returning *;`;
  let result = (await pool.query(query)).rows[0];
  const eventid = result.eventid;
  if (newtags) {
    for (let tag of newtags) {
      query = `INSERT INTO TAGS(name) VALUES('${tag}') returning *;`;
      result = (await pool.query(query)).rows[0];
      const tagid = result.tagid;
      query = `INSERT INTO EVENT_TAGS VALUES('${eventid}','${tagid}');`;
      await pool.query(query);
    }
  }
  if (tags) {
    for (let tag of tags) {
      query = `SELECT tagid FROM TAGS WHERE NAME ='${tag}';`;
      result = (await pool.query(query)).rows[0];
      const tagid = result.tagid;
      query = `INSERT INTO EVENT_TAGS VALUES('${eventid}','${tagid}');`;
      await pool.query(query);
    }
  }
  res.status(201).send();
});
