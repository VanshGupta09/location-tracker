// Initialize the socket connection with the server
const socket = io();

// Check if the browser supports geolocation
if (navigator.geolocation) {
    // Watch the user's position and get continuous updates
    navigator.geolocation.watchPosition((position) => {
        // Destructure the latitude and longitude from the position object
        const { latitude, longitude } = position.coords;
        
        // Emit the location data to the server through the socket
        socket.emit("send-location", { latitude, longitude });
    }, (err) => {
        // Handle any errors that occur while trying to get the geolocation
        console.log(err);
    }, {
        // Options to configure geolocation
        enableHighAccuracy: true,  // Request high accuracy for the location (more battery intensive)
        maximumAge: false,         // Do not use cached locations, always request fresh data
        timeout: 5000,             // Timeout after 5 seconds if location data is not obtained
    });
}

// Listen for the 'connect' event, which indicates a successful connection to the server
socket.on('connect', () => {
    console.log('Connected to server, socket id:', socket.id);
});

// Listen for the 'disconnect' event, which indicates the connection to the server has been lost
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

L.map("map");