import React from "react";
import Countdown from "../Countdown/Countdown";
import CurrentMovieImage from "../CurrentMovieImage/CurrentMovieImage";
import EpisodeTitle from "../EpisodeTitle";
import {
  cookiesExist,
  assignEpisodeCookie,
  createCookieObject,
  readEpisodeObject
} from "../../Helpers/cookieHelper";

let cookies = [
  {
    display_value: "Loading...",
    card_image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    premiere: "",
  },
];

function request() {
  var myHeaders = new Headers();
  myHeaders.append(
    "x-api-key",
    process.env.REACT_APP_API_KEY !== undefined
      ? process.env.REACT_APP_API_KEY
      : ""
  );

  fetch(
    "https://2w2g9f4pvk.execute-api.us-east-2.amazonaws.com/dev/scan/byDate/" +
      new Date().getTime(),
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        assignEpisodeCookie(
          response.data[i].display_value,
          response.data[i].card_image,
          response.data[i].premiere
        );
      }
      return true;
    })
    .catch((error) => console.log("error", error));
  return false;
}

var retryTime = 500;
const retryMultiplier = 2;
const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function tryAPI(callback: { (): void }) {
  // for (var i = 0; i < 25; i++) {
  //   if (cookiesExist()) {
  //     callback();
  //     return true;
  //   } else {
  //     request();
  //     await timer((retryTime *= retryMultiplier));
  //   }
  // }
  // console.log("API could not be reached");
  // return false;
}

function AppContents() {
  const [state, setState] = React.useState({
    episode: cookies[0].display_value,
  });

  if (!cookiesExist()) {
    tryAPI(function () {
      const cookieobj = createCookieObject()
      cookies = (cookieobj !== null) ? cookieobj : cookies;
    });
  } else {
    const cookieobj = createCookieObject()
    cookies = (cookieobj !== null) ? cookieobj : cookies;
  }
  
  const handleChange = (event: { target: { name: string; value: string; }; }) => {
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };
  function callbackSec() {
    if(cookiesExist() && state.episode === "Loading...") {
      setState({ ...state, "episode": cookies[0].display_value })
    } else if(!cookiesExist()) {
      tryAPI(function () {
        const cookieobj = createCookieObject()
        cookies = (cookieobj !== null) ? cookieobj : cookies;
      });
    }
  }

  return (
    <div className="App">
      <Countdown
        premiere={(readEpisodeObject(cookies, state.episode) !== null) ? readEpisodeObject(cookies, state.episode).premiere : ""}
        callbackSec={callbackSec}
      />
      <EpisodeTitle
        text={state.episode}
        callBackEpisode={handleChange}
        data={cookies}
      />
      <CurrentMovieImage
        image={(readEpisodeObject(cookies, state.episode) !== null) ? readEpisodeObject(cookies, state.episode).card_image : ""}
      />
    </div>
  );
}

export default AppContents;
