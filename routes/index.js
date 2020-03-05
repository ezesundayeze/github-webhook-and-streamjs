const express = require("express")
const app =  express.Router()
const { getToken, githubHook } = require("../controllers")


app.post("/get-token/", getToken)

app.post("/github", githubHook)

app.get("/", (req, res, next)=>{
    res.render("index")
})

app.get("/login", (req, res, next)=>{
    res.render("login")
})

module.exports = app