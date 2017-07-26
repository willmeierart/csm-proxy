require('dotenv').config()
const fetch = require('node-fetch')
const API_URL = 'http://video.clyffordstillmuseum.org/static/feed/reactdata/'

function fetchData(){
  return fetch(API_URL)
    .then((res)=>{
      return res.json().then((json)=> json)
    })
}

module.exports = {fetchData}
