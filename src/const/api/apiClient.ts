import axios from "axios";
import { BACKEND_URL } from "../consts";

const host = window.location.hostname === "localhost" ? BACKEND_URL : "cdn";

export const apiClient = axios.create({
    baseURL: host,
});
