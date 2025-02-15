const express = require('express');
const axios = require('axios');
const qs = require('qs');  

const Router=express.Router();

const consumerKey = 'KgewpGZ7aqPqjul55SDdNp21JE899LNPGLcyGASLRgSKat1G';
const consumerSecret = 'cKcS1McNFMxJhDPGHQvomLIGmGOXDQTd2DGrpz9TuGGtGRJCHRwxoTmlaTXyJ9DY';

let accessToken = null;
let tokenExpirationTime = null;

async function getAccessToken() {
  const authUrl = 'https://ops.epo.org/3.2/auth/accesstoken';

  const data = qs.stringify({
    grant_type: 'client_credentials'
  });

  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  try {
    const response = await axios.post(authUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`
      }
    });

    accessToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000; 
    console.log("accesstoken"+accessToken)
    return accessToken;

  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw new Error('Failed to get access token');
  }
}

async function getValidAccessToken() {
  if (!accessToken || Date.now() >= tokenExpirationTime) {
    console.log('Fetching a new access token...');
    return await getAccessToken();
  }

  return accessToken;
}

Router.get('/:id', async (req, res) => {
  const patentId = req.params.id;

  try {
    const validToken = await getValidAccessToken();
    
    const headers = {
      'Accept': 'application/json',  
      'Authorization': `Bearer ${validToken}`  
    };

    const baseURL = 'https://ops.epo.org/3.2/rest-services/published-data/publication/epodoc/';

    const response = await axios.get(`${baseURL}/${patentId}/biblio`, { headers });

    res.json(response.data);

  } catch (error) {
    console.error('Error fetching patent data:', error.message);
    res.status(500).json({ error: 'Failed to fetch patent data' });
  }
});

module.exports=Router;
