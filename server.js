const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve the client files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });

  // Handle game events
  socket.on('game_event', (data) => {
    // Handle the game event data
    console.log('Game event received:', data);
    // Broadcast the game event to all other clients
    socket.broadcast.emit('game_event', data);
  });
});

// Start the server
http.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
