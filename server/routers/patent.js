// const express = require('express');
// const axios = require('axios');
// const qs = require('qs');  

// const Router=express.Router();

// const consumerKey = 'KgewpGZ7aqPqjul55SDdNp21JE899LNPGLcyGASLRgSKat1G';
// const consumerSecret = 'cKcS1McNFMxJhDPGHQvomLIGmGOXDQTd2DGrpz9TuGGtGRJCHRwxoTmlaTXyJ9DY';

// let accessToken = null;
// let tokenExpirationTime = null;

// async function getAccessToken() {
//   const authUrl = 'https://ops.epo.org/3.2/auth/accesstoken';

//   const data = qs.stringify({
//     grant_type: 'client_credentials'
//   });

//   const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

//   try {
//     const response = await axios.post(authUrl, data, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': `Basic ${authString}`
//       }
//     });

//     accessToken = response.data.access_token;
//     tokenExpirationTime = Date.now() + response.data.expires_in * 1000; 
//     console.log("accesstoken"+accessToken)
//     return accessToken;

//   } catch (error) {
//     console.error('Error getting access token:', error.message);
//     throw new Error('Failed to get access token');
//   }
// }

// async function getValidAccessToken() {
//   if (!accessToken || Date.now() >= tokenExpirationTime) {
//     console.log('Fetching a new access token...');
//     return await getAccessToken();
//   }

//   return accessToken;
// }

// Router.get('/:id', async (req, res) => {
//   const patentId = req.params.id;

//   try {
//     const validToken = await getValidAccessToken();
    
//     const headers = {
//       'Accept': 'application/json',  
//       'Authorization': `Bearer ${validToken}`  
//     };

//     const baseURL = 'https://ops.epo.org/3.2/rest-services/published-data/publication/epodoc/';

//     const response = await axios.get(`${baseURL}/${patentId}/biblio`, { headers });

//     res.json(response.data);

//   } catch (error) {
//     console.error('Error fetching patent data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch patent data' });
//   }
// });

// module.exports=Router;

// ////////////////////////////////////////////////////////////////////////////////////////


// // const express = require("express");
// // const axios = require("axios");
// // const qs = require("qs");
// // require("dotenv").config();

// // const Router = express.Router();

// // const consumerKey = process.env.EPO_CONSUMER_KEY;
// // const consumerSecret = process.env.EPO_CONSUMER_SECRET;
// // const SERP_API_KEY = process.env.SERP_API_KEY;  // Load SerpAPI key

// // let accessToken = null;
// // let tokenExpirationTime = null;

// // // Function to get a new EPO access token
// // async function getAccessToken() {
// //   const authUrl = "https://ops.epo.org/3.2/auth/accesstoken";

// //   const data = qs.stringify({ grant_type: "client_credentials" });
// //   const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

// //   try {
// //     const response = await axios.post(authUrl, data, {
// //       headers: {
// //         "Content-Type": "application/x-www-form-urlencoded",
// //         Authorization: `Basic ${authString}`,
// //       },
// //     });

// //     accessToken = response.data.access_token;
// //     tokenExpirationTime = Date.now() + response.data.expires_in * 1000;
// //     console.log("🔑 EPO Access Token:", accessToken);
// //     return accessToken;
// //   } catch (error) {
// //     console.error("❌ Error getting EPO access token:", error.message);
// //     throw new Error("Failed to get access token");
// //   }
// // }

// // // Function to get a valid EPO access token
// // async function getValidAccessToken() {
// //   if (!accessToken || Date.now() >= tokenExpirationTime) {
// //     console.log("🔄 Fetching a new EPO access token...");
// //     return await getAccessToken();
// //   }
// //   return accessToken;
// // }

// // // Route to fetch patent data from EPO
// // Router.get("/epo/:id", async (req, res) => {
// //   const patentId = req.params.id;

// //   try {
// //     const validToken = await getValidAccessToken();

// //     const headers = {
// //       Accept: "application/json",
// //       Authorization: `Bearer ${validToken}`,
// //     };

// //     const baseURL = "https://ops.epo.org/3.2/rest-services/published-data/publication/epodoc/";

// //     console.log(`🔍 Fetching EPO Patent Data for: ${patentId}`);
// //     const response = await axios.get(`${baseURL}/${patentId}/biblio`, { headers });

// //     res.json(response.data);
// //   } catch (error) {
// //     console.error("❌ Error fetching patent data from EPO:", error.message);
// //     res.status(500).json({ error: "Failed to fetch EPO patent data" });
// //   }
// // });

// // // Route to fetch patent data from SerpAPI (Google Patents)
// // Router.get("/serp/:id", async (req, res) => {
// //   const patentId = req.params.id;
// //   const apiUrl = `https://serpapi.com/search.json?engine=google_patents_details&patent_id=${patentId}&api_key=${SERP_API_KEY}`;

// //   try {
// //     console.log(`🔍 Fetching Google Patent Data for: ${patentId}`);
// //     const response = await axios.get(apiUrl);
// //     res.json(response.data);
// //   } catch (error) {
// //     console.error("❌ Error fetching patent data from SerpAPI:", error.message);
// //     res.status(500).json({ error: "Failed to fetch Google patent data" });
// //   }
// // });

// // module.exports = Router;
///////////////////////////////////////////////////////////////

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/:patentId", async (req, res) => {
    const { patentId } = req.params;
    // const apiKey = process.env.SERPAPI_KEY;
    //  // Store API key in .env
    const apiKey="057370ebbddbf798e96051f0552c4d7aee61f04005e002aa41f083a5d263a8f3";
    // console.log(apiKey);
    const url = `https://serpapi.com/search.json?engine=google_patents&q=${patentId}&api_key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        // console.log("hi");
        res.json(response.data); // Send response to frontend
    } catch (error) {
        // console.error(patentId);
        console.error("Error fetching patent data:", error.message);
        res.status(500).json({ error: "Failed to fetch patent data" });
    }
});

module.exports = router;
// ////////////////////////////////////////////////////////////////////////////////////////