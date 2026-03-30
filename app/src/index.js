const express = require("express");
const client = require("prom-client");

const app = express();
const port = process.env.PORT || 3000;

// collect default metrics
client.collectDefaultMetrics();

const counter = new client.Counter({
  name: "app_requests_total",
  help: "Total number of requests"
});

app.get("/", (req, res) => {
  counter.inc();
  res.json({
    message: "CI CD deployment is working",
    environment: process.env.APP_ENV || "dev",
    timestamp: new Date()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/ready", (req, res) => {
  res.status(200).json({ status: "ready" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});