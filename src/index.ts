import express from "express";
import nunjucks from "nunjucks";
import request from "@fewlines-education/request";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (httpRequest, response) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const platform = JSON.parse(body).platforms;
    console.log(platform[0].logo);
    response.render("home", { platform });
  });
});

app.get("/platform/:id", (httpRequest, response) => {
  const id = httpRequest.params.id;
  console.log(id);

  request(`https://videogame-api.fly.dev/games/platforms/${id}`, (error, body) => {
    if (error) {
      throw error;
    }
    const games = JSON.parse(body).games;
    response.render("games", { games });
  });
});

app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});
