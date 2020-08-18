const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = process.env.REDIRECT_URI

const querystring = require('querystring')
const request = require('request')
const express = require('express')

const app = express()

app.use(require('cors')())

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

app.get('/api/login', (req, res) => {
  const state = generateRandomString(16)

  // your application requests authorization
  const scope = 'user-read-private user-read-email'
  const url = `${process.env.SPOTIFY_ACOUNT_URL}/authorize?${querystring.stringify({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state
  })}`
  res.status(200).json(url)
})

app.get('/api/callback', (req, res) => {
  const code = req.query.code || null
  const state = req.query.state || null

  if (state === null) {
    res.redirect('/' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    const authOptions = {
      url: `${process.env.SPOTIFY_ACOUNT_URL}/api/token`,
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const { access_token, refresh_token, expires_in } = body

        res.redirect(`${process.env.APP_URL}/login/?${querystring.stringify({
          access_token,
          refresh_token,
          expires_in
        })}`)
      } else {
        res.redirect('/' +
          querystring.stringify({
            error: 'invalid_token'
          }))
      }
    })
  }
})

app.get('api/refreshToken', (req, res) => {
  const refresh_token = req.query.refresh_token

  const authOptions = {
    url: `${process.env.SPOTIFY_ACOUNT_URL}/api/token`,
    headers: {
      // eslint-disable-next-line camelcase
      Authorization: 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token
    },
    json: true
  }

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({
        access_token
      })
    }
  })
})

app.listen(4200, () => console.info('Server running: ', app.host))
export default app
