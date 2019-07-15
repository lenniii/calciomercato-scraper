import Parser = require("rss-parser");
import express = require("express");

const p: Parser = new Parser();

const getRSSFeeed = async (team?: string) => {
  let feed = null;
  if (!team) {
    feed = await p.parseURL("https://www.calciomercato.com/feed");
  } else {
    try {
      feed = await p.parseURL(
        `https://www.calciomercato.com/feed/teams/${team}`
      );
    } catch (e) {
      feed = e;
    }
  }
  return feed;
};

const app: express.Application = express();

app.get("/all", async (req, res) => {
  res.send(await getRSSFeeed());
});

app.get("/teams/:team", async (req, res) => {
  const team = req.params.team;
  res.send(await getRSSFeeed(team));
});

app.listen(3000, () => console.log("Listening on 3000"));
