/*
require('fs') :is a built-in module in Node.js that allows you to work with the file system on your computer.

*/ 
const fs=require('fs');
const path = require('path');
/*
19/5/25 - Monday
Blocking Sncyhronous code

fs.readFileSync :is a method that reads the contents of a file synchronously, meaning it will block the execution of the code until the file is read completely.
template strings :are enclosed in backticks (``) and allow for multi-line strings and string interpolation.
fs.writeFileSync :is a method that writes data to a file synchronously, meaning it will block the execution of the code until the data is written completely.
*/





// const fs=require('fs');

// const textIn=fs.readFileSync('./txt/input.txt','utf-8'); 

// const textOut=`This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log("file created!");


/*
19/5/25 - Monday

Asynchronous code
Reading and wirting files asynchronously
 *fs.readFile :is a method that reads the
 * fs.writeFile :is a method that writes data to a file asynchronously, meaning it will not block the execution of the code while the file is being written.
 * callback function :is a function that is passed as an argument to another function and is executed after the first function has completed its task.
 * error-first callback :is a common pattern in Node.js where the first argument of the callback function is an error object, and the second argument is the result of the operation. If there is no error, the first argument will be null.
 */

//  fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if(err) return console.log('Error! 💥');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('Your file has been written! 📝');
//             })
//         })
//     })
// })
 


/*23/5/25 - Friday
creating a server
* http :is a built-in module in Node.js that allows you to create an HTTP server and make HTTP requests.
* createServer :is a method that creates an HTTP server that listens to server ports and gives a response back to the client.
* listen :is a method that makes the server start listening for incoming requests on a specified port.
* request :is an object that represents the incoming request to the server, containing information about the request such as the URL, method, and headers.
* response :is an object that represents the outgoing response from the server, allowing you to send data back to the client.
*/

const http=require('http');
// const server=http.createServer((req,res)=>{
//     res.end('Hello from the server!');
// });

// server.listen(8000,'127.0.0.1',()=>{
//     console.log('Waiting for requests...');
// });

//go to the browser and type in the url 127.0.0.1:8000




/*23/5/25 - Friday
Routing
* url :is a built-in module in Node.js that provides utilities for URL resolution and parsing.
writeHead :is a method that sends a response header to the request. The first argument is the status code, and the second argument is an object containing the headers.
*/

const url=require('url');

// const server=http.createServer((req,res)=>{
//     const pathName=req.url;
//     if(pathName==='/'){
//         res.end('Welcome to the home page!');
//     }else if(pathName==='/about'){
//         res.end('Welcome to the about page!'); }
//     else if(pathName==='/contact'){
//         res.end('Welcome to the contact page!'); }
//     else{
//         res.writeHead(404,{
//             'Content-type':'text/html',
//             'my-own-header':'hello-world'
//         });
//         res.end('<h1>Page not found!</h1>');
//     }
// });

// server.listen(8000,'127.0.0.1',()=>{
//     console.log('Waiting for requests...');
// });


/*23/05/25 Friday
Creating a very simple API
* JSON :is a built-in module in Node.js that provides methods for parsing and stringifying JSON data.
* JSON.parse :is a method that converts a JSON string into a JavaScript object.
* JSON.stringify :is a method that converts a JavaScript object into a JSON string.
* fs.readFileSync :is a method that reads the contents of a file synchronously, meaning it will block the execution of the code until the file is read completely.
*/

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);

const server=http.createServer((req,res)=>{
    const pathName=req.url;
    if(pathName==='/'){
        res.end('Welcome to the home page!');}
    else if(pathName==='/about'){
        res.end('Welcome to the about page!');}     
    else if(pathName==='/contact'){
        res.end('Welcome to the contact page!');}
    else if(pathName==='/api'){
        res.writeHead(200,{
            'Content-type':'application/json'
        });
        res.end(data);
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});
server.listen(8000,'127.0.0.1',()=>{
    console.log('Waiting for requests...');
});