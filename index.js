const ezc = require('express-zero-config')
const request = require('request')
const fetch = require('node-fetch')
const cors = require('cors')
const {fetchData} = require('./proxy')
const router = ezc.createRouter()
router.use(cors())

router.get('/', (req,res)=>{
  fetchData()
  .then(json=>{
    return res.json(json)})
  .catch(err=>console.log(err))
})
router.get('/channels',(req,res)=>{
  fetchData()
  .then(json=>{return res.json(json)
  }).then(res=>{
    console.log(res)
    const data = res
    return data.map((set)=>{
      return {
        title:set.title,
        backgroundimage:set.backgroundimage,
        backgroundvideo:set.backgroundvideo
      }
    })


  }).catch(err=>console.log(err))
})
router.get('/channels/:id', (req,res)=>{
  fetchData()
  .then(json=>{res.json(json)})
  .then((res)=>{res[req.params.id]})
})

ezc.startServer(router)
