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

// type GameInfo = {
//   id: string;
//   name: string;
//   slug: string;
//   category: string;
//   platforms: [];
//   cover: [];
// };

type Logo = {
  url: string;
  width: number;
  height: number;
};

type PlatformInfo = {
  id: string;
  name: string;
  slug: string;
  category: string;
  summary: string;
  logo: Logo;
};

// type platformProfile = {
//   id: string;
//   name: string;
// };
// type Myplatform = platformProfile[];

app.get("/platform/:id", (httpRequest, response) => {
  const id = httpRequest.params.id;
  console.log(id);

  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const platforms = JSON.parse(body).platforms;
    const myPlatform = platforms.find((element: PlatformInfo) => {
      return element.id === id;
    });

    request(`https://videogame-api.fly.dev/games/platforms/${id}`, (error, body) => {
      if (error) {
        throw error;
      }
      const games = JSON.parse(body);
      response.render("games", { games, myPlatform });

      // console.log(games);
      // const platformArr: Myplatform = games.games.find((element: GameInfo) => {
      //   element.platforms;
    });
    // console.log("===test platform", platformArr);
  });
});
// });

app.get("/plateform/:platform_id/games/:game_id", (httprequest, response) => {
  const platform_id = httprequest.params.platform_id;
  const game_id = httprequest.params.game_id;
  console.log(platform_id);
  console.log(game_id);

  request(`http://videogame-api.fly.dev/games/${game_id}`, (error, body) => {
    if (error) {
      throw error;
    }
    const gameInfo = JSON.parse(body);
    console.log(gameInfo);
    response.render("gameInfo", { gameInfo });
  });
});

app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});
