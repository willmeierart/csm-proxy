const ezc = require('express-zero-config')
const request = require('request')
const fetch = require('node-fetch')
const cors = require('cors')
const {fetchData} = require('./proxy')
const router = ezc.createRouter()
router.use(cors())

router.get('/', (req,res)=>{
  fetchData().then(json=>{res.json(json)})
})

ezc.startServer(router)
