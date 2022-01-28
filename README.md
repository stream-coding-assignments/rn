# Stream Chat React Native Interview Assignment
The project is a simple chat simulation that lets you send messages and files to yourself. It does not talk to the network. Your task is to extend the code with three new features. 

The starting state code is intentionally simple. We expect you to introduce the necessary changes to your understanding of a good design and project structure. 
We will also look for test-driven development demonstration (you can even go for e2e tests), good understanding of TypeScript, attention to UX, visual detail, well written styles, and well structured commits. 

## Requirements

### Support allowed image extensions
As of recently, our platform allows the developers to configure allowed file types in channels. 
Your task is to integrate the `getAppSettings` Client method into the UI so that users can't upload images that the developers do not allow. 

### Scroll to bottom when a new message is received
Our users' users complain that they have to manually scroll down the message list when a new message comes in. 
Your task is to ensure that the message list scrolls to the bottom automatically after a new message comes in.

### Optimistic message rendering
Right now, the message is displayed after a roundtrip (simulated with setTimeout). This frustrates the users. You should display the message immediately, 
but visually confirm its delivered state when the "server" response comes in. 
