const axios = require('axios');
const cors = require('cors')

var appRouter = function (app) {
  app.use(cors());

  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.post("/search", function (req, res) {
    axios.get("https://itunes.apple.com/search?term="+req.body.term)
      .then(response => {
        var featureMovies = response.data.results.filter(function (el) {
          return el.kind === "feature-movie";
        });

        var songs = response.data.results.filter(function (el) {
          return el.kind === "song";
        });

        fiiteredObject = function(object) {
          return object.map(obj => {
             var rObj = {};
             rObj['trackId'] = obj.trackId;
             rObj['name'] = obj.artistName;
             rObj['artwork'] = obj.artworkUrl100;
             rObj['genre'] = obj.primaryGenreName;
             rObj['url'] = obj.trackViewUrl;
             return rObj;
          });
        }

        featureMovies = fiiteredObject(featureMovies);
        songs = fiiteredObject(songs);

        var responseObj = {
          'song': songs,
          'feature-movie': featureMovies
        }

        res.status(200).json(responseObj);
      })
      .catch(error => {
        console.log(error);
      });
    });
}

module.exports = appRouter;
