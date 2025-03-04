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
    if(data.sign !== '49e68de31139acb59f2f1d5ace1f9975') {
      return response.send({
        code: 500,
        message: '密钥错误！'
      })
    }
    try {
      const result = await axios({
        url: 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyAXMQOPhxnio84hZXRKU23JbEh9CPBPAaE',
        method: 'POST',
        data,
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