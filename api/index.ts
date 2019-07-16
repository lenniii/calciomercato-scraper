import Parser = require("rss-parser");
import express = require("express");
const axios = require("axios");
import cheerio = require("cheerio");

const getRSSFeed = async (team?: string) => {
  const p: Parser = new Parser();
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

const getArticleImage = async (link: string) => {
  let HTML = await axios.get(link);
  HTML = HTML.data;
  const $ = cheerio.load(HTML);
  const IMG_LINK = $("#article-header__picture").attr("src");
  return IMG_LINK;
};

const getArticleContent = async (link: string) => {
  let HTML = await axios.get(link);
  HTML = HTML.data;
  const $ = cheerio.load(HTML);
  const articleContent = $("#article-body").text();
  return articleContent;
};

const addImageToList = async ({ items }: any) => {
  const newArray = await Promise.all(
    items.map(async (item: any) => {
      const IMG_URL = await getArticleImage(item.link);
      return { ...item, img_url: IMG_URL };
    })
  );
  return await newArray;
};

const app: express.Application = express();

app.get("/all", async (req, res) => {
  let articleList = await getRSSFeed();
  let articleListIMG = await addImageToList(articleList);
  res.send(await articleListIMG);
});

app.get("/teams/:team", async (req, res) => {
  const team = req.params.team;
  let articleList = await getRSSFeed(team);
  let articleListIMG = await addImageToList(articleList);
  res.send(await articleListIMG);
});

app.get("/articles", async (req, res) => {
  const link = req.query.link;
  if (!link) res.sendStatus(404);
  let article = {
    content: await getArticleContent(link),
    img_url: await getArticleImage(link)
  };
  res.send(article);
});

app.listen(3001, () => console.log("Listening on 3001"));
