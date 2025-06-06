const express = require("express");
const busboy = require("busboy"); // parses the request chunks whenever it the request is updated and if the chunks conatains the file => using 'file' event listner we extract the file / image
const app = express();
const port = 3000;

// route-handler for uploading the images
app.post("/uploadimages", function(req, res) {
    // the request will be build up by the nodeJS when it recives new chunks
    // busboy listner to request => when it builds up it parses and when it recieves file it will call the callback function

    const bb = busboy({
        headers: req.headers,
    }) // providing the request

    req.pipe(bb);

    // file event listner
    bb.on('file', function(name, file, info) {
        const {filename, encoding, mimeType} = info;
        console.log(name); // represent the key with which we have attached the images
        console.log(file); // represent the data of the file that is still coming in chunks
        console.log(info); // other info like name of the file, its type like image/jpeg, encoding

        file.on('data', (data) => {
            console.log(`File [${name}] got ${data.length} bytes`);
        }).on('close', () => {
            console.log(`File [${name}] done`);
        });
    })


    res.send("How are you")

})


// nodeJS server recieves the data send the by the client in chunks, whenever it recieves the chunks it updates the request object that represent the data, we provide the request objec to the busboy, when request is updated, busboy parses it and if the latest chunk contains the file => using the 'file'event listner it extract the file from the chunk

app.listen(port, function() {
    console.log("server started");
});

// when sending larger files / form data (these two will be done through the input tag in the frontend) the Content-Type should be set to "multipart/formdata"