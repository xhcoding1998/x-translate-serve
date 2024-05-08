import axios from 'axios'

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = async(request, response) => {
  if(request.method === 'POST') {
    const data = request.body
    try {
      const result = await axios({
        url: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDGaUVMTrtCf9I2ehJ3Jym8o_nICCz0qm0',
        method: 'POST',
        data,
        proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 7890
        },
      })
      return response.send(result.data)
    } catch (error) {
      return response.send({
        code: 500,
        message: error.message
      })
    }
  }else {
    const { name = 'World' } = request.query;
    return response.send(`Hello ${name}!`);
  }
}
export default allowCors(handler)