import axios from "axios";
const baseURL = "http://localhost:9080/namePronounciation";

export const get = path => axios.get(baseURL.concat(path));
export const post = (path, payload) => axios.post(baseURL.concat(path), payload);