import axios from "axios";

const api = axios.create({
  baseURL: "https://api-lista-tarefas-play.onrender.com/",
});

export default api;