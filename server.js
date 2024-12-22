const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ["https://tasty-trip.netlify.app", "http://localhost:3000"],
  methods: ["GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function fetchSwiggyAPI(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    try {
      const errorData = JSON.parse(text);
      throw new Error(errorData.message || `API returned ${response.status}`);
    } catch (e) {
      throw new Error(
        `API returned ${response.status}: ${response.statusText}`
      );
    }
  }

  return response.json();
}

app.get("/api/restaurants", async (req, res) => {
  try {
    const { lat, lng, page_type } = req.query;

    if (!lat || !lng || !page_type) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["lat", "lng", "page_type"],
        received: req.query,
      });
    }

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;
    const data = await fetchSwiggyAPI(url);
    res.json(data);
  } catch (error) {
    console.error("Restaurant API Error:", error);
    res.status(500).json({
      error: "Failed to fetch restaurant data",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.get("/api/menu", async (req, res) => {
  try {
    const { page_type, complete_menu, lat, lng, restaurantId } = req.query;

    if (!page_type || !complete_menu || !lat || !lng || !restaurantId) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["page_type", "complete_menu", "lat", "lng", "restaurantId"],
        received: req.query,
      });
    }

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;
    const data = await fetchSwiggyAPI(url);
    res.json(data);
  } catch (error) {
    console.error("Menu API Error:", error);
    res.status(500).json({
      error: "Failed to fetch menu data",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Tasty-Trip Server!",
    docs: "Visit: https://tasty-trip.netlify.app/",
    endpoints: {
      restaurants: "/api/restaurants",
      menu: "/api/menu",
      health: "/health",
    },
  });
});

app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
