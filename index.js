const ezc = require('express-zero-config')
const request = require('request')
const fetch = require('node-fetch')
const cors = require('cors')
const {fetchData, getMP4, legitMP4} = require('./proxy')
const router = ezc.createRouter()
router.use(cors())

router.get('/', (req,res)=>{
  fetchData()
  .then(json=>{
    return res.json(json)})
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
    const precise = data.map((item)=>{
      return item.sort((a,b)=>{return b.width-a.width})
    })
    const HQobj = {HD:precise[0][0],thumb:precise[1][0]}
    console.log(HQobj)
    return res.json(HQobj)
  }).catch(err=>console.log(err))
})

ezc.startServer(router)
