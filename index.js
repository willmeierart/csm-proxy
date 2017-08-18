const ezc = require('express-zero-config')
const request = require('request')
const fetch = require('node-fetch')
const cors = require('cors')
const {fetchData, getMP4, legitMP4, getVideoData} = require('./proxy')
const router = ezc.createRouter()
router.use(cors())

router.get('/', (req,res)=>{
  return fetchData()
  .then(json=>{
    return json})
  .then(response=>{
    console.log(response);
    return Promise.all(response.map((set)=>{
      return Promise.all(set.set.categories.map((category)=>{
        return Promise.all(category.category.videos
          .map((video)=>{
            if(video.video.vimeoid){
              return getVideoData(video.video.vimeoid).then(response=>{
                console.log(response);
                video.videoData = response
                return video
              })
            }
          })
        )
      }))
    }))
  }).then(master=>res.json(master))
  .catch(err=>console.log(err))
})

router.get('/video/:id', (req,res)=>{
  getMP4(req.params.id)
  .then(json=>{
    return res.json(json)})
  .catch(err=>console.log(err))
})

router.get('/pro/video/:id', (req,res)=>{
  legitMP4(req.params.id)
  .then(data=>{
    console.log(data);
    const precise = data.map((item)=>{
      if (item){
        return item.sort((a,b)=>{return b.width-a.width})
      }
    })
    const HQobj = {HD:precise[0][0],thumb:precise[1][0],captions:precise[2]}
    return res.json(HQobj)
  }).catch(err=>console.log(err))
})

ezc.startServer(router)
