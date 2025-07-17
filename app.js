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
            "friendlyName": "My other phone",
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

// Define a GET endpoint
app.get('/api/digital-key/:vehicleId/key-status', (req, res) => {
  res.json(fakeData);
});

// Define a POST endpoint with a vehicleId parameter
app.post('/api/digital-key/:vehicleId/sendPairingEmail', (req, res) => {
  const vehicleId = req.params.vehicleId;
  const { token } = req.body; // Assuming the token is sent in the request body

  // Example logic to check for authorization
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          status: "Unauthorized",
          code: "401000",
          title: "Unauthorized",
          detail: "Invalid or missing token"
        }
      ]
    });
  }

  // If the token is valid, respond with success
  // Here you can implement your logic to send the pairing email
  res.status(200).json({
    message: "Pairing email sent successfully",
    vehicleId: vehicleId
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//https.createServer(options, app).listen(port, () => {
//  console.log('Server listening on port ' + port);
//});
