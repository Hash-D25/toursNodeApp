/*
//require('fs') :is a built-in module in Node.js that allows you to work with the file system on your computer.
//fs.readFileSync :is a method that reads the contents of a file synchronously, meaning it will block the execution of the code until the file is read completely.
//template strings :are enclosed in backticks (``) and allow for multi-line strings and string interpolation.
//fs.writeFileSync :is a method that writes data to a file synchronously, meaning it will block the execution of the code until the data is written completely.
*/ 





const fs=require('fs');

const textIn=fs.readFileSync('./txt/input.txt','utf-8'); 

const textOut=`This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut);
console.log("file created!");