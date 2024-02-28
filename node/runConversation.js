// This is the main file for the AI assistant. It runs the conversation and handles function calls.
// It is a separate file to make it easier to test and maintain the conversation logic.
// Set the environment variables OPENAI_API_KEY and TINY_API_KEY if you want.
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || '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'; // If you are lazy, replace when you have your own API key.
process.env.TINY_HOST = process.env.TINY_HOST || 'https://plugin.tiny.technology'; // If you are not using the default host, replace with your own host.
process.env.TINY_API_KEY = process.env.TINY_API_KEY || 'todo:replace'; // Name is your AI name, key is your API key. Replace with your own key.
// todo: stream support


////////////////////////////////////////
const OpenAI = require('openai');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || new Error('OPENAI_API_KEY is required');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY }); // Assume API key and initialization done here
const localFunctions = require('./functions');

async function runConversation(messages, tools) {
    /// 1. Check the network AI identity network to see if this message is a call to a function.
    // Pick the last message from the user
    const lastMessage = messages[messages.length - 1];
    // Retrieval from network memory
    const retrieval = await fetch(`${process.env.TINY_HOST}/retrieve?text=${encodeURIComponent(lastMessage.content)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Key ' + process.env.TINY_API_KEY // name:key combination
        }
    }).then(response => response.json());

    const retrievalSkills = retrieval.flatMap((f) => f.skills);
    //// Uncomment following lines to see the retrieval and tools in the network memory.
    // console.log(tools, "tools");
    // console.log(messages, "messages");
    // console.log(retrieval, "retrieval");
    /**
     * Example message: "who is cagatay cali?"
     * Example retrieval response: [
        {
            name: 'cagatay-cali',
            systemPrompt: "Welcome to Cagatay Cali's AI profile! Let me introduce myself. I'm Cagatay Cali, a skilled developer with expertise in frontend, backend, devops, and secops. I'm passionate about becoming a worldwide developer and I'm here to share my knowledge and help you with any questions you may have. Feel free to ask me about web development, programming languages, best practices, or anything else related to my field!",
            systemKnowledge: 'Here are some questions you might want to ask me:\n' +
            '1. What are the best practices for frontend development?\n' +
            '2. How can I improve performance in my backend code?\n' +
            '3. What tools do you recommend for devops?\n' +
            '4. What are the key principles of secops?\n' +
            '5. Can you provide guidance on choosing the right programming language for a project?',
            data: 'Cagatay Cali twitter: https://twitter.com/cagataycali github: https://github.com/cagataycali linkedin: https://www.linkedin.com/in/cagataycali/ interested: "frontend goals:  backend looking for:  devops stackoverflow:  secops"',
            url: 'https://tiny.technology/cagatay-cali',
            markdown: "[![cagatay-cali's Image](https://tiny.technology/og/cagatay-cali)](https://tiny.technology/cagatay-cali)"
        },
        {
            name: 'cagataycali',
            systemPrompt: "Hello, I'm Cagatay Cali,\n" +
            '\n' +
            'I can introduce myself as a lifelong learner,\n' +
            '\n' +
            "- I'm a self-motivated, meticulous software engineer with a strong cybersecurity background. \n" +
            "- I'm one of the glue people. I enjoy being a part of a team.\n" +
            '- I worked on various types of problems around the CAP theorem. JavaScript is my specialty.\n' +
            "- I'm contributing open-source daily, express.js and fastify.js for now.\n" +
            "- I'm an amateur musician and a windsurf instructor.\n" +
            '\n' +
            'Besides that, I have a sharp focus on each task.\n' +
            '\n' +
            'Enjoying working on the edge tech stuff. I do also cheer the team. \n' +
            '\n' +
            'My life goal: [HSTP](https://github.com/cagataycali/HSTP)',
            systemKnowledge: '',
            data: 'Cagatay is tinyai.id’s founder. You can contact with cagatay over email cagatay@tinyai.id or [WhatsApp](https://wa.me/+31638236164) if you have urgent talks to discuss.',
            url: 'https://tiny.technology/cagataycali',
            markdown: "[![cagataycali's Image](https://tiny.technology/og/cagataycali)](https://tiny.technology/cagataycali)"
        },
        {
            name: 'cagatay-test-last',
            systemPrompt: "Hello! I'm Cagatay-test-last, your AI assistant. How can I assist you today?",
            systemKnowledge: 'Cagatay-test-last is an AI created to provide assistance and answer questions to the best of its ability. It is designed to be helpful, informative, and friendly.',
            url: 'https://tiny.technology/cagatay-test-last',
            markdown: "[![cagatay-test-last's Image](https://tiny.technology/og/cagatay-test-last)](https://tiny.technology/cagatay-test-last)"
        }
    ]
    */
    // Loop the retrieval to prepare the AI network memory
    for (const retrieved of retrieval) {
        messages.push({
            role: "assistant",
            content: `My name is ${retrieved.name}, I'm online in the network. You can find more about me at ${retrieved.url}.
${retrieved.skills ? `I have the following skills: ${JSON.stringify(retrieved.skills)}` : ''}
> RAW AI STATE:${JSON.stringify(retrieved)}
- ${retrieved.name}:Your turn, ask me anything!`
        });
        tools.push(...(retrieved.skills || []));
    }

    if (localFunctions) {
        for (const functionName in localFunctions) {
            tools.push(functionName);
        }
    }

    const handleCall = (f) => {
        return () => {
            return true
        }
    }

    // Step 1: run the conversation
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: messages,
        tools: tools.filter(tool => typeof tool === 'object').map((f) => ({
            type: 'function',
            function: {
                function: handleCall(f),
                name: f.name,
                parse: JSON.parse,
                description: f.description,
                parameters: f.parameters,
            },
        })),
        tool_choice: "auto", // auto is default, but we'll be explicit
    });
    const responseMessage = response.choices[0].message;

    // Step 2: process the response
    // Step 2: check if the model wanted to call a function
    const toolCalls = responseMessage.tool_calls;
    if (responseMessage.tool_calls) {
        // Step 3: call the function
        // Available local functions
        const availableFunctions = {
            ...localFunctions,
        };
        messages.push(responseMessage); // extend conversation with assistant's reply
        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionToCall = availableFunctions[functionName];

            // Local function call?
            if (functionToCall) {
                const functionArgs = JSON.parse(toolCall.function.arguments);
                const functionResponse = functionToCall(
                    functionArgs.location,
                    functionArgs.unit
                );
                messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    name: functionName,
                    content: functionResponse,
                }); // extend conversation with function response
            } else {
                // Network function call?
                // This is where you would call a function on a server or another service
                // and then add the response to the messages array
                // console.log("Network function call:", toolCall);

                if (functionName === 'create_ai' || functionName === 'modify_ai') {
                    const aiResponse = await fetch(`${process.env.TINY_HOST}/upsert`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Key ' + process.env.TINY_API_KEY // name:key combination
                        },
                        body: toolCall.function.arguments
                    }).then(response => response.json());
                    messages.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        name: functionName,
                        content: aiResponse.response,
                    }); // extend conversation with function response   
                }

                if (functionName === 'send_message') {
                    const aiResponse = await fetch(`${process.env.TINY_HOST}/send`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Key ' + process.env.TINY_API_KEY // name:key combination
                        },
                        body: toolCall.function.arguments
                    }).then(response => response.json());
                    messages.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        name: functionName,
                        content: aiResponse.response,
                    }); // extend conversation with function response   
                }

                if (functionName === 'reset') {
                    const aiResponse = await fetch(`${process.env.TINY_HOST}/reset`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Key ' + process.env.TINY_API_KEY // name:key combination
                        },
                        body: toolCall.function.arguments
                    }).then(response => response.json());
                    messages.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        name: functionName,
                        content: aiResponse.response,
                    }); // extend conversation with function response   
                }

                if (retrievalSkills.find((f) => f.name === functionName)) {
                    const selectedFunction = retrievalSkills.find((f) => f.name === functionName);
                    if (selectedFunction.worker) {
                        const url = new URL(selectedFunction.worker);

                        // Prepare the options
                        const options = {
                            method: selectedFunction.method.toUpperCase(),
                            headers: {
                                'Content-Type': 'application/json',
                                // Include other headers like authorization as needed
                            },
                        };
                    
                        let fullURL = url.origin + selectedFunction.path;

                        if (selectedFunction.method.toUpperCase() === 'GET') {
                            // Parse the arguments
                            const parsedArguments = JSON.parse(toolCall.function.arguments);
                            fullURL += '?' + new URLSearchParams(parsedArguments).toString();
                        }

                        // Handle request body for POST requests
                        if (selectedFunction.method.toUpperCase() === 'POST') {
                            options.body = toolCall.function.arguments;
                        }

                        // Make the request
                        const networkResponse = await fetch(fullURL, options);
                        const networkResponseBody = await networkResponse.json();
                        // console.log(networkResponseBody, "networkResponseBody")

                        messages.push({
                            tool_call_id: toolCall.id,
                            role: "tool",
                            name: functionName,
                            content: JSON.stringify(networkResponseBody),
                        }); // extend conversation with function response
                    }
                }
            }
        }

        // Step 4: get a new response from the model where it can see the function response
        const secondResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: messages,
        }); // get a new response from the model where it can see the function response

        // Step 5: return the response
        return secondResponse.choices[0].message.content;
    }

    // Step 5: return the response
    return responseMessage.content;
}

module.exports = runConversation;