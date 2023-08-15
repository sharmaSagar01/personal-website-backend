const express = require("express");
const cors = require("cors");
const { createClient } = require("@sanity/client");
const createImageUrlBuilder = require("@sanity/image-url");
require("dotenv").config();

// console.log(process.env.REACT_PUBLIC_SANITY_DATASET);

const port = process.env.REACT_PUBLIC_PORT;

const client = createClient({
  dataset: process.env.REACT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.REACT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2023-04-06",
  useCdn: process.env.NODE_ENV === "production",
});



const app = express();
app.use(cors());

app.get("/pageInfo", async (req, res) => {
  try {
    const data = await client.fetch('*[_type == "pageInfo"][0]');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/experience", async (req, res) => {
  try {
    const data = await client.fetch(
      '*[_type == "experience"]{..., technologies[]->}'
    );

    res.json(data);
  } catch (error) {
    res.status(res.statusCode).json({ error: error });
  }
});

app.get("/education", async (req, res) => {
  try {
    const data = await client.fetch('*[_type == "education"]');
    res.json(data);
  } catch (error) {
    res.status(res.statusCode).json({ error: error });
  }
});

app.get("/skills", async (req, res) => {
  try {
    const data = await client.fetch('*[_type == "skill"]');
    res.json(data);
  } catch (error) {
    res.status(res.statusCode).json({ error: error });
  }
});

app.get("/projects", async (req, res) => {
  try {
    const data = await client.fetch(
      '*[_type == "project"] {...,technologies[]->}'
    );
    res.json(data);
  } catch (error) {
    res.status(res.statusCode).json({ error: error });
  }
});

app.get("/socials", async (req, res) => {
  try {
    const data = await client.fetch('*[_type == "social"] ');
    res.json(data);
  } catch (error) {
    res.status(res.statusCode).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
