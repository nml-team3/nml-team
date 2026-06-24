const express = require('express')
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

const fakeData = {
  "data": [
    {
      "type": "testType",
      "id": "test",
      "attributes": {
        "digitalKeys": [
          {
            "slotId": "1",
            "friendlyName": "My phone",
            "keyType": "OWNER",
            "deviceType": "PHONE",
            "status": 1
          },
          {
            "slotId": "2",
            "friendlyName": "Alice's device I'm borrowing and logged in to",
            "keyType": "SHARED",
            "deviceType": "PHONE",
            "status": 1
          },
          {
            "slotId": "3",
            "friendlyName": "Alice's device I'm borrowing and logged in to",
            "keyType": "SHARED",
            "deviceType": "WATCH",
            "status": 14
          },
          {
            "slotId": "4",
            "friendlyName": "Sinziana",
            "keyType": "SHARED",
            "deviceType": "PHONE",
            "status": 15
          }
        ]
      }
    },
    {
      "type": "Test",
      "id": "test123",
      "attributes": {
        "digitalKeys": [
          {
            "slotId": "1",
            "friendlyName": "Steve",
            "keyType": "SHARED",
            "deviceType": "PHONE",
            "status": 1
          },
          {
            "slotId": "2",
            "friendlyName": "Steve",
            "keyType": "SHARED",
            "deviceType": "WATCH",
            "status": 1
          },
          {
            "slotId": "3",
            "friendlyName": "Steve's other device",
            "keyType": "SHARED",
            "deviceType": "WATCH",
            "status": 1
          },
          {
            "slotId": "4",
            "friendlyName": "Steve's other phone",
            "keyType": "SHARED",
            "deviceType": "PHONE",
            "status": 1
          }
        ]
      }
    },
    {
      "type": "testType",
      "id": "testType",
      "attributes": {
        "digitalKeys": [
          {
            "slotId": "1",
            "friendlyName": "Alice",
            "keyType": "SHARED",
            "deviceType": "PHONE",
            "status": 15
          },
          {
            "slotId": "2",
            "friendlyName": "Alicee",
            "keyType": "SHARED",
            "deviceType": "PHONE",
            "status": 15
          }
        ]
      }
    }
  ]
};

app.get('/idm-qrlogin/:env/:region/:action', (req, res) => {
  const { env, region, action } = req.params;

  const targetUrl = urlMap[env]?.[region];

  if (!targetUrl) {
    return res.status(404).json({ error: `No URL configured for env=${env} region=${region}` });
  }

  return res.redirect(`${targetUrl}/${action}`);
});

// Define a GET endpoint
app.get('/api/digital-key/:vehicleId/key-status', (req, res) => {
  res.json(fakeData);
});

// Define a POST endpoint with a vehicleId parameter
app.post('/api/digital-key/:vehicleId/sendPairingEmail', (req, res) => {
  const vehicleId = req.params.vehicleId;
  const { token } = req.body; // Assuming the token is sent in the request body

  // If the token is valid, respond with success
  // Here you can implement your logic to send the pairing email
  res.status(200).json({
    message: "Pairing email sent successfully",
    vehicleId: vehicleId
  });
});

const urlMap = {
  stg: {
    us: 'https://www.google.com',
    asia: 'https://www.google.ro',
    emea: 'https://www.google.ro',
  },
  prd: {
    us: 'https://www.google.com',
    asia: 'https://www.google.ro',
    emea: 'https://www.google.ro',
  },
};

app.get('/idm-qrlogin/:env/:region', (req, res) => {
  const { env, region } = req.params;

  const targetUrl = urlMap[env]?.[region];

  if (!targetUrl) {
    return res.status(404).json({ error: `No config for env=${env} region=${region}` });
  }

  return res.json({ google_qrcode: targetUrl });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//https.createServer(options, app).listen(port, () => {
//  console.log('Server listening on port ' + port);
//});
