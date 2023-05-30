import app from "./app";

const SERVER_PORT = 4000;

app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT}`);
});
