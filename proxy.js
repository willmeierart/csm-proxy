require('dotenv').config()
const fetch = require('node-fetch')
const API_URL = 'http://video.clyffordstillmuseum.org/static/feed/reactdata/'
const VIMEO = 'https://player.vimeo.com/video/'

function fetchData(){
  return fetch(API_URL)
    .then((res)=>{
      return res.json().then((json)=> json)
    })
}

function getMP4(id){
  return fetch(`${VIMEO}${id}/config`)
  .then((res)=>{
    return res.json().then((json)=>json)
  })
}


module.exports = {fetchData}
