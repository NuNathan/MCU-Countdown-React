import React from "react";
import Countdown from "../Countdown/Countdown";
import CurrentMovieImage from "../CurrentMovieImage/CurrentMovieImage";
import EpisodeTitle from "../EpisodeTitle";
import {
  readEpisodeObject,
  setLocalStorage,
  getLocalStorage,
  localStorageExist,
  createStorageObject
} from "../../Helpers/cookieHelper";

let requestedTime: number;

let data = [
  {
    display_value: "Loading...",
    card_image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
    premiere: "",
  },
];

function request() {
  requestedTime = new Date().getTime() - 24*60*60*1000
  var myHeaders = new Headers();
  myHeaders.append(
    "x-api-key",
    process.env.REACT_APP_API_KEY !== undefined
      ? process.env.REACT_APP_API_KEY
      : ""
  );
  fetch(
    "https://2w2g9f4pvk.execute-api.us-east-2.amazonaws.com/dev/scan/byDate/" +
      requestedTime,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        setLocalStorage(
          response.data[i].display_value,
          response.data[i].card_image,
          response.data[i].premiere,
          requestedTime
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
  for (var i = 0; i < 25; i++) {
    if (localStorageExist()) {
      callback();
      return true;
    } else {
      request();
      await timer((retryTime *= retryMultiplier));
    }
  }
  console.log("API could not be reached");
  return false;
}

function AppContents() {
  const [state, setState] = React.useState({
    episode: data[0].display_value,
  });

  if (!localStorageExist()) {
    tryAPI(function () {
      const localObj = createStorageObject()
      data = (localObj !== null) ? localObj : data;
    });
  } else {
    const localObj = createStorageObject()
    data = (localObj !== null) ? localObj : data;
  }
  
  const handleChange = (event: { target: { name: string; value: string; }; }) => {
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };

  function callbackSec() {
    if(localStorageExist() && state.episode === "Loading...") {
      setState({ ...state, "episode": data[0].display_value })
    } else if(!localStorageExist()) {
      tryAPI(function () {
        const localObj = createStorageObject()
        data = (localObj !== null) ? localObj : data;
      });
    }

    if(new Date().getTime() > parseInt(getLocalStorage(0).expireTime) + 48*60*60*1000) {
      window.localStorage.clear();
    }
  }

  return (
    <div className="App">
      <Countdown
        premiere={(readEpisodeObject(data, state.episode) !== null) ? readEpisodeObject(data, state.episode).premiere : ""}
        callbackSec={callbackSec}
      />
      <EpisodeTitle
        text={state.episode}
        callBackEpisode={handleChange}
        data={data}
      />
      <CurrentMovieImage
        image={(readEpisodeObject(data, state.episode) !== null) ? readEpisodeObject(data, state.episode).card_image : ""}
      />
    </div>
  );
}

export default AppContents;
