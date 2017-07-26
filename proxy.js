require('dotenv').config()
const fetch = require('node-fetch')
const API_URL = process.env.API_URL

function fetchData(){
  return fetch(API_URL)
    .then((res)=>{
      return res.json().then((json)=> json)
    })
}

module.exports = {fetchData}
