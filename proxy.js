require('dotenv').config()
const fetch = require('node-fetch')

const API_URL = process.env.API_URL

const VIMEO = 'https://player.vimeo.com/video/'
const VIMEO_API = 'https://api.vimeo.com'
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
    return res.json().then((json)=>[json.request.files.progressive,json.video.thumbs.base,json.request.text_tracks])
  })
}

function legitMP4(id){
  return fetch(`${VIMEO_API}/videos/${id}`, {method:'GET', headers:{Authorization:`Bearer ${ACCESS_TOKEN}`}})
  .then((res)=>{ return res.json()
    .then((body)=>{
      let validData = [body.files, body.pictures.sizes]
      if(body.metadata.connections.texttracks){
        const captionsPath = body.metadata.connections.texttracks.uri
        return fetch(`${VIMEO_API}${captionsPath}`, {method:'GET', headers:{Authorization:`Bearer ${ACCESS_TOKEN}`}})
        .then((result)=>{return result.json()
          .then((captions)=>{
            // console.log(captions);
            const CAPS = captions.data.map((cap)=>{
              return [{file:cap.link,url:`https://player.vimeo.com${cap.uri}`}]
            })
            validData = validData.concat(CAPS)
            console.log(captions.data);
            return validData
          }
          )})
      } else {return validData}
    })
  })

}


module.exports = {fetchData, getMP4, legitMP4}
