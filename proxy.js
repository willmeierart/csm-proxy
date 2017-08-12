require('dotenv').config()
const fetch = require('node-fetch')

const API_URL = process.env.API_URL

const VIMEO = 'https://player.vimeo.com/video/'
const VIMEO_API = 'https://api.vimeo.com/videos/'
const {Vimeo} = require('vimeo')
const {CLIENT_ID} = process.env
const {CLIENT_SECRET} = process.env
const {ACCESS_TOKEN} = process.env
const lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN)

function fetchData(){
  return fetch(API_URL)
    .then((res)=>{
      return res.json().then((json)=> json)
    })
}

function getMP4(id){
  return fetch(`${VIMEO}${id}/config`)
  .then((res)=>{
    return res.json().then((json)=>[json.request.files.progressive,json.video.thumbs.base])
  })
}

function legitMP4(id){
  return lib.request({
    path:`/videos/${id}`
  },(error,body,status,headers)=>{
    const selects = {files:body.files, pictures:body.pictures.sizes}
    if(error){
      console.log('error', error)
    } else {
      // console.log('body', selects)
      console.log(status, headers)
      return selects
    }
  })
}


module.exports = {fetchData, getMP4, legitMP4}
