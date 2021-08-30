export function assignEpisodeCookie(display_value: string, card_image: string, premiere: string) {
  const expiration = new Date(
    new Date().getTime() + 24 * 3600000
  ).toUTCString();
  const cookie =
    escape(display_value) +
    "=" +
    escape(card_image) +
    "," +
    escape(premiere) +
    ";expires=" +
    expiration +
    ";";
  document.cookie = cookie;
}

// export function readEpisodeCookie(display_key: string) {
//   let key = escape(display_key) + "=";
//   let cookies = document.cookie.split(";");

//   for (let i = 0; i < cookies.length; i++) {
//     let cookie = cookies[i];

//     while (cookie.charAt(0) === " ") {
//       cookie = cookie.substring(1, cookie.length);
//     }
//     if (cookie.indexOf(key) === 0) {
//       var cookieProcessing = unescape(cookie).replace("=", ",").split(",");
//       const cookieFinal = {
//         display_value: cookieProcessing[0],
//         card_image: cookieProcessing[1],
//         premiere: cookieProcessing[2],
//       };
//       return cookieFinal;
//     }
//   }
//   return null;
// }

export function readEpisodeObject(obj: any[], display_value: string) {

  for (let i = 0; i < Object.keys(obj).length; i++) {
      if(obj[i].display_value === display_value) {
        return obj[i]
      }
  }
  return null;
}

export function createCookieObject() {
  let cookieOBJ = [];

  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    var cookieProcessing = unescape(cookie).replace("=", ",").split(",");
    const cookieFinal = {
      display_value: cookieProcessing[0],
      card_image: cookieProcessing[1],
      premiere: cookieProcessing[2],
    };
    cookieOBJ.push(cookieFinal);
  }

  cookieOBJ.sort((a, b) => new Date(a.premiere).getTime() - new Date(b.premiere).getTime())


  if (cookieOBJ !== null) {
    return cookieOBJ;
  } else {
    return null;
  }
}

// export function cookieLength() {
//   return document.cookie.split(";").length;
// }

// export function readIndexCookie(index: number) {
//   let cookies = document.cookie.split(";");

//   let cookie = cookies[index];

//   while (cookie.charAt(0) === " ") {
//     cookie = cookie.substring(1, cookie.length);
//   }

//   var cookieProcessing = unescape(cookie).replace("=", ",").split(",");
//   const cookieFinal = {
//     display_value: cookieProcessing[0],
//     card_image: cookieProcessing[1],
//     premiere: cookieProcessing[2],
//   };
//   return cookieFinal;
// }

export const cookiesExist = () => {
  return document.cookie !== "";
};