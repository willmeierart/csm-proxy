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
  // const request = lib.request({
  //   method:"GET",
  //   path:`/videos/${id}`
  // },(error,body,status,headers)=>{
  //   if(error){
  //     console.log('error', error)
  //   } else {
  //     const selects = {files:body.files, pictures:body.pictures.sizes}
  //     console.log('body', selects)
  //     console.log(status, headers)
  //     return selects
  //   }
  // })
  // return request

  return fetch(`${VIMEO_API}${id}`, {method:'GET', headers:{Authorization:`Bearer ${ACCESS_TOKEN}`}})
  .then((res)=>{ return res.json()
    .then((body)=>{
      const data = [body.files, body.pictures.sizes]
      const precise = data.forEach(item=>{
        return item.sort((a,b)=>b.width-a.width)
      })
      return {HD:precise[0][0],thumb:precise[1][0]}
    })
  })

}


module.exports = {fetchData, getMP4, legitMP4}
