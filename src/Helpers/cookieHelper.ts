import { ICookieFormat } from "./interfaces";

export function setLocalStorage(display_value: string, card_image: string, premiere: string, expireTime: number) {
  window.localStorage.setItem(display_value, card_image + "," + premiere + "," + expireTime.toString());
}

export function getLocalStorage(key: number) {
  const display_value = window.localStorage.key(key)
  if(display_value !== null) {
    const stored = window.localStorage.getItem(display_value)?.split(",");

    if(stored !== undefined) {
      return {display_value: "error", card_image: stored[0], premiere: stored[1], expireTime: stored[2]}
    } else {
      return {display_value: "error", card_image: "error", premiere: "error", expireTime: "error"}
    }
  }
  return {display_value: "error", card_image: "error", premiere: "error", expireTime: "error"}
}

export function localStorageExist() {
  if(window.localStorage.key(0) === null) {
    return false
  } else {
    return true
  }
}

export function createStorageObject() {
  let storageObj: any = []
  for(let i = 0; i < window.localStorage.length; i++) {

    const key0 = window.localStorage.key(i)
    const localIndexed = window.localStorage.getItem(key0 !== null ? key0 : "")?.split(",")
    if(localIndexed !== undefined) {
      storageObj[i] = {display_value: window.localStorage.key(i),card_image: localIndexed[0],premiere: localIndexed[1]};
    }
  }

  storageObj.sort((a: ICookieFormat, b: ICookieFormat) => new Date(a.premiere).getTime() - new Date(b.premiere).getTime())

  return storageObj;
}

export function readEpisodeObject(obj: any[], display_value: string) {

  for (let i = 0; i < Object.keys(obj).length; i++) {
      if(obj[i].display_value === display_value) {
        return obj[i]
      }
  }
  return null;
}

var storage = window['localStorage'],
  x = '__storage_test__';
export function storageAvailable() {
  try {
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage && storage.length !== 0;
  }
}