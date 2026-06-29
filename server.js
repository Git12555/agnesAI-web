const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = global.fetch;

const app = express();
const PORT = process.env.PORT || 3000;

const AGNES_BASE_URL = 'https://apihub.agnes-ai.com/v1';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, '.')));

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.timeout = 0;
server.keepAliveTimeout = 0;

function logRequest(endpoint, payload, upstreamUrl) {
  console.log('\n=======================================');
  console.log(`[${new Date().toLocaleString()}] ${endpoint}`);
  console.log('Upstream URL:', upstreamUrl);
  console.log('Request Payload:', JSON.stringify(payload, null, 2));
}

function logResponse(endpoint, status, data) {
  console.log(`[${new Date().toLocaleString()}] ${endpoint} Response`);
  console.log('Status:', status);
  console.log('Response Data:', JSON.stringify(data, null, 2));
  console.log('=======================================\n');
}

app.post('/api/images/generations', async (req, res) => {
  req.setTimeout(300000);
  try {
    const { apiKey, ...payload } = req.body;
    const upstreamUrl = `${AGNES_BASE_URL}/images/generations`;
    
    logRequest('POST /api/images/generations', payload, upstreamUrl);
    
    const response = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    logResponse('POST /api/images/generations', response.status, data);
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('[ERROR] /api/images/generations:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/videos', async (req, res) => {
  req.setTimeout(300000);
  try {
    const { apiKey, ...payload } = req.body;
    const upstreamUrl = `${AGNES_BASE_URL}/videos`;
    
    logRequest('POST /api/videos', payload, upstreamUrl);
    
    const response = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    logResponse('POST /api/videos', response.status, data);
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('[ERROR] /api/videos:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/video/generations', async (req, res) => {
  req.setTimeout(300000);
  try {
    const { apiKey, ...payload } = req.body;
    const upstreamUrl = `${AGNES_BASE_URL}/video/generations`;
    
    logRequest('POST /api/video/generations', payload, upstreamUrl);
    
    const response = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    logResponse('POST /api/video/generations', response.status, data);
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('[ERROR] /api/video/generations:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/videos/:taskId', async (req, res) => {
  req.setTimeout(300000);
  try {
    const { apiKey } = req.query;
    const { taskId } = req.params;
    const upstreamUrl = `${AGNES_BASE_URL}/videos/${taskId}`;
    
    logRequest(`GET /api/videos/${taskId}`, { apiKey: '***' }, upstreamUrl);
    
    const response = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();
    
    logResponse(`GET /api/videos/${taskId}`, response.status, data);
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('[ERROR] /api/videos/:taskId:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/video/generations/:taskId', async (req, res) => {
  req.setTimeout(300000);
  try {
    const { apiKey } = req.query;
    const { taskId } = req.params;
    const upstreamUrl = `${AGNES_BASE_URL}/video/generations/${taskId}`;
    
    logRequest(`GET /api/video/generations/${taskId}`, { apiKey: '***' }, upstreamUrl);
    
    const response = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();
    
    logResponse(`GET /api/video/generations/${taskId}`, response.status, data);
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('[ERROR] /api/video/generations/:taskId:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
