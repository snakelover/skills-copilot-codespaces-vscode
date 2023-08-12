// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create event bus
const events = [];

// Post event
app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    // Send event to post service
    axios.post('http://posts-clusterip-srv:4000/events', event);
    // Send event to comments service
    axios.post('http://comments-srv:4001/events', event);
    // Send event to query service
    axios.post('http://query-srv:4002/events', event);
    // Send event to moderation service
    axios.post('http://moderation-srv:4003/events', event);

    res.send({ status: 'OK' });
});

// Get events
app.get('/events', (req, res) => {
    res.send(events);
});

// Listen to port
app.listen(4005, () => {
    console.log('Listening on port 4005');
});