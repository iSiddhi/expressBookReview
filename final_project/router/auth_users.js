const express = require('express');
let users = [];
const books = require("./booksdb.js");
const regd_users = express.Router();

// register
regd_users.post("/register", (req,res) => {
 const username = req.body.username;
 const password = req.body.password;

 if(username && password){
   users.push({username:username,password:password});
   return res.status(200).json({message:"User successfully registered. Now you can login"});
 }

 return res.status(404).json({message:"Unable to register user"});
});

// login
regd_users.post("/login", (req,res) => {
 const username = req.body.username;
 const password = req.body.password;

 const validUser = users.find(u => u.username===username && u.password===password);

 if(validUser){
   return res.status(200).json({message:"Login successful"});
 }

 return res.status(401).json({message:"Invalid Login. Check username and password"});
});

// add review
regd_users.put("/auth/review/:isbn",(req,res)=>{
 const isbn=req.params.isbn;
 const review=req.body.review;

 books[isbn].reviews["user"] = review;

return res.status(200).json({
  message: "Review added successfully",
  reviews: books[isbn].reviews
});

 
});

// delete review
regd_users.delete("/auth/review/:isbn",(req,res)=>{
 const isbn=req.params.isbn;

 delete books[isbn].reviews["user"];

 return res.status(200).json({
   message: `Review for ISBN ${isbn} deleted`
 });
});

module.exports.authenticated = regd_users;