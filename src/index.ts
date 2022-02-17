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

app.get("/", (req, response) => {
  const pageNumber = 1;
  const pageNumberQuery = req.query.page;
  console.log("==ligne 19", typeof pageNumberQuery);

  if (pageNumberQuery) {
    console.log("===ligne 22===", pageNumberQuery);
    const newPageNumber = typeof pageNumberQuery === "string" ? parseInt(pageNumberQuery) : 1;
    console.log("==ligne 24", typeof newPageNumber);
    const deffensivePageNumber = typeof newPageNumber === "number" || newPageNumber < 1 ? newPageNumber : 1;

    request(`http://videogame-api.fly.dev/platforms?page=${deffensivePageNumber}`, (error, body) => {
      if (error) {
        throw error;
      }
      const platform = JSON.parse(body).platforms;
      response.render("home", { platform, pageNumber, deffensivePageNumber });
    });
  } else {
    request("http://videogame-api.fly.dev/platforms", (error, body) => {
      if (error) {
        throw error;
      }
      const platform = JSON.parse(body).platforms;
      response.render("home", { platform, pageNumber });
    });
  }
});

// app.get("/platform?page=page_number", (httpRequest, response) => {
//   const pageNumber = httpRequest.query.page;
//   console.log(pageNumber);
//   request(`http://videogame-api.fly.dev/platforms?page=${pageNumber}`, (error, body) => {
//     if (error) {
//       throw error;
//     }
//     const platform = JSON.parse(body).platforms;
//     // console.log(platform[1].logo);
//     response.render("home", { platform });
//   });
// });

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

app.get("/platform/:id", (req, response) => {
  const id = req.params.id;
  console.log(id);

  // const pageNumber = 1;
  const pageNumberQuery = req.query.page;
  console.log("==ligne 100", typeof pageNumberQuery);

  if (pageNumberQuery) {
    console.log("===ligne 103===", pageNumberQuery);
    const newPageNumber = typeof pageNumberQuery === "string" ? parseInt(pageNumberQuery) : 1;
    console.log("==ligne 105", typeof newPageNumber);
    const deffensivePageNumber = typeof newPageNumber === "number" || newPageNumber < 1 ? newPageNumber : 1;

    request(`http://videogame-api.fly.dev/platforms?page=${deffensivePageNumber}`, (error, body) => {
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
      });
    });
  } else {
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
      });
      // console.log("===test platform", platformArr);
    });
  }
});

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
