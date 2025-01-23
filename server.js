// proxy-server/index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

// Enable CORS for your frontend domain
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   })
// );

app.use(
  cors({
    origin: "*", // Allow all origins
  })
);


// Proxy endpoint for restaurant list
app.get("/api/restaurants", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5",
      {
        params: {
          lat: req.query.lat || "18.990088",
          lng: req.query.lng || "75.7531324",
          "is-seo-homepage-enabled": true,
          page_type: "DESKTOP_WEB_LISTING",
        },
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for restaurant menu
app.get("/api/menu/:restaurantId", async (req, res) => {
  try {
    const response = await axios.get(`https://www.swiggy.com/dapi/menu/pl`, {
      params: {
        "page-type": "REGULAR_MENU",
        "complete-menu": true,
        lat: "18.990088",
        lng: "75.7531324",
        restaurantId: req.params.restaurantId,
      },
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
