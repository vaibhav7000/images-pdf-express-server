const express = require("express");
const busboy = require("busboy");

const app = express();


app.post("/upload/images", function(req, res) {

})

// when we send data from the client to the http server, the data does not reaches all at once to the server, the OS and the internet breaks the data / larger files into smaller chunks, the chunks are continously send to the backend server / nodeJS, and every time using the 'data' event listner the backend server updates the request it recieved earlier. 

// => Request send from the clinet to the server ( contains large files ) -> request will be break down into smaller chunks by the OS and the internet, everytime when the nodeJS server recieves the chunks it will update the request using the 'data' event listner

// Using the 'data' event listner -> nodeJS gradually builds up the request object / updates the request object

// when we will be sending files, the Content-Type will always be -> multipart/form-data

// The whole proces when sending request with larger files

// The browser sends the files at once. The internet and OS send these files in smaller chunks to the http server. The request / data reaches to the server in chunks, whenever nodeJS / server revieves the chunks it updates the request using he 'data' event listner. We provide the request to the busboy and busboy listens to the reqquest whenever request builds up / gets updated busboy parses the data, and whenever it recieves file it emits the 'file' event listner and when the request object is fully come to the backend server (means no data know) the busboy emits the 'finish' event listner


/// The Goal
// The user send images through browser to the http server -- http server do some processing with the images -- converts them into pdf -- http server sends the pdf to the browser 


// We upload the files in the browser / postman, browser / postman sends the request in chunks to the http server over the internet. => data is reached to the nodeJS server in chunks, whenever nodeJS server recieves the chunk it emits data event and hence the request builds up, we provide the request to the busboy, similarly just like nodeJS server busboy listens to the request and when it builds up it parses that and whenever it detects its a file data than it will call the callback function, and when all the request build up it will call the callback function for the finish event listner.
