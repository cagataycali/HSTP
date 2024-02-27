#!/usr/bin/env node

const DEFAULT_TOOLS = require('./tools.json');
const path = require('path');
const fs = require('fs');
const net = require('net');
require('dotenv').config();

// TCP port is 9000
// todo: Make this configurable
const port = process.env.PORT || 9000;
const WS_PORT = process.env.WS_PORT || 8080;
// Session id generate
const uuid = require('uuid');
// RunConversation
const runConversation = require('./runConversation');

const memory = {
    HSTP: `
Welcome to the HSTP network. You are now part of the HSTP network. Your system instructions are in .hstp, if you have a .hstp file in your repository you're included the HSTP network immediately and your service is available to all HSTP clients.

I'm tiny, Collective Artificial Network (CAN) is a network of AI systems that are connected through HSTP.`,
    tools: [],
    sessions: {},
}
const cwd = process.cwd();

if (fs.existsSync(path.join(cwd, '.hstp'))) {
    console.log('HSTP file found. Starting server...');
    memory.HSTP = fs.readFileSync('.hstp', 'utf8');

    fs.watch(path.join(cwd, '.hstp'), (event, filename) => {
        if (event === 'change') {
            console.log('.hstp file changed. Updating HSTP...')
            memory.HSTP = fs.readFileSync(path.join(cwd, '.hstp'), 'utf8');
        }
    });
} else {
    console.log('No .hstp file found. Using default HSTP...');
}

if (fs.existsSync(path.join(cwd, 'tools.json'))) {
    try {
        memory.tools = JSON.parse(fs.readFileSync(path.join(cwd, 'tools.json'), 'utf8'));

        // If tools.json changes, update the tools variable
        fs.watch(path.join(cwd, 'tools.json'), (event, filename) => {
            if (event === 'change') {
                console.log('tools.json file changed. Updating tools...')
                memory.tools = JSON.parse(fs.readFileSync('tools.json', 'utf8'));
            }
        });

    } catch (e) {
        console.error('Error reading tools.json:', e);
    }
} else {
    console.log('No tools.json file found. Using default tools...');
    memory.tools = DEFAULT_TOOLS;
}

// TCP server
const server = net.createServer((socket) => {
    console.log('Client connected.');
    const sessionId = uuid.v4();
    console.log('Session id: ' + sessionId);
    // console.log('Client IP: ' + socket.remoteAddress);
    // console.log('Client Port: ' + socket.remotePort);
    // console.log('Client Family: ' + socket.remoteFamily);
    // console.log('Client Local Address: ' + socket.localAddress);
    memory.sessions[sessionId] = {
        messages: [memory.sessions[sessionId] ? memory.sessions[sessionId].messages : { role: "system", content: memory.HSTP }],
    };
    socket.write('Welcome to the server!\nYour session id is: ' + sessionId + '\n');

    socket.on('data', async (data) => {
        // console.log('Received data:');
        const requestData = data.toString().trim().replace(/(\r\n|\n|\r)/gm, "");

        memory.sessions[sessionId].messages = [
            { role: "system", content: memory.HSTP },
            // Last 10 messages from the user
            ...memory.sessions[sessionId].messages.filter(message => message.role !== 'system').slice(-10),
            { role: "user", content: requestData },
        ];

        const response = await runConversation(memory.sessions[sessionId].messages, memory.tools);

        memory.sessions[sessionId].messages.push({ role: "assistant", content: response });

        // reply to the client
        socket.write('\n\n' + response + '\n\n');
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
        memory.sessions[sessionId] = null;
    });

    socket.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log('Connect to the server using the following command:');
    console.log('nc localhost ' + port);
    console.log('\n\n\n\n');
});

//// WS server
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function connection(ws) {
    console.log('Client connected.');
    const sessionId = uuid.v4();
    console.log('Session id: ' + sessionId);
    memory.sessions[sessionId] = {
        messages: [memory.sessions[sessionId] ? memory.sessions[sessionId].messages : { role: "system", content: memory.HSTP }],
    };
    ws.send('Welcome to the server! Your session id is: ' + sessionId);

    ws.on('error', console.error);

    ws.on('message', async function message(data) {

        const requestData = data.toString().trim().replace(/(\r\n|\n|\r)/gm, "");

        memory.sessions[sessionId].messages = [
            { role: "system", content: memory.HSTP },
            // Last 10 messages from the user
            ...memory.sessions[sessionId].messages.filter(message => message.role !== 'system').slice(-10),
            { role: "user", content: requestData },
        ];

        const response = await runConversation(memory.sessions[sessionId].messages, memory.tools);

        memory.sessions[sessionId].messages.push({ role: "assistant", content: response });

        // reply to the client
        ws.send(response);
    });
});