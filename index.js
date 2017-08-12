const ezc = require('express-zero-config')
const request = require('request')
const fetch = require('node-fetch')
const cors = require('cors')
const {fetchData, getMP4, legitMP4} = require('./proxy')
const router = ezc.createRouter()
router.use(cors({
  credentials: true,
  origin: '*'
}))

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
  console.log(req.params.id);
  legitMP4(req.params.id)
  .then(json=>{
    console.log(json);
    return res.json(json)})
  .catch(err=>console.log(err))
})

ezc.startServer(router)
