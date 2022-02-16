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
    // console.log(platform[1].logo);
    response.render("home", { platform });
  });
});

// app.get("/platform/:slug", (httpRequest, response) => {
//   request
//   const slug = httpRequest.params.slug;
//   const platform =
// });

type GameInfo = {
  id: string;
  name: string;
  slug: string;
  category: string;
  platforms: [];
  cover: [];
};

type PlatformGames = GameInfo[];

type platformProfile = {
  id: string;
  name: string;
};
type Myplatform = platformProfile[];

app.get("/platform/:id", (httpRequest, response) => {
  // request();

  const id = httpRequest.params.id;
  console.log(id);
  request(`https://videogame-api.fly.dev/games/platforms/${id}`, (error, body) => {
    if (error) {
      throw error;
    }
    const games = JSON.parse(body);
    console.log(games);
    const platformArr: Myplatform = games.games.find((element: GameInfo) => {
      element.platforms;
    });
    console.log("===test platform", platformArr);
    console.log("===test", games.games[0].platforms);
    response.render("games", { games });
  });
});

// app.get("/plateform/:platform_id/games/games_id");

app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});
