const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();
const port = process.env.PORT || 3000;

// Apply CORS middleware
const corsOptions = {
  origin: ["https://tasty-trip.netlify.app/"],
  methods: ["GET"],
};
app.use(cors(corsOptions));

// For Restaurant API
app.get("/api/restaurants", async (req, res) => {
  const { lat, lng, page_type } = req.query;
  if (!lat || !lng || !page_type) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    res.status(500).send("An error occurred while fetching restaurant data.");
  }
});

// For Menu API
app.get("/api/menu", async (req, res) => {
  const {
    "page-type": page_type,
    "complete-menu": complete_menu,
    lat,
    lng,
    submitAction,
    restaurantId,
  } = req.query;

  if (!page_type || !complete_menu || !lat || !lng || !restaurantId) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&submitAction=${submitAction}&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching menu:", error.message);
    res.status(500).send("An error occurred while fetching menu data.");
  }
});

// Root Endpoint
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Tasty-Trip Server! Visit: https://tasty-trip.netlify.app/",
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
