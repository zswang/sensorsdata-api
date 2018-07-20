const http = require('http')
const url = require('url')
let count = 0
const server = http.createServer((req, res) => {
  let urlInfo = url.parse(req.url, true)
  switch (urlInfo.pathname) {
    case '/api/user/analytics/report':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(
        JSON.stringify({
          series: [],
          rows: [],
          num_rows: 0,
          report_update_time: '2018-06-11 20:45:50.934',
          data_update_time: '1970-01-01 08:00:00.000',
          data_sufficient_update_time: '1970-01-01 08:00:00.000',
          truncated: false,
        })
      )
      count++
      break
    case '/api/null/sql/query':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('')
      count++
      break
    case '/api/sql/query':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(
        [
          {
            distinct_id: '999999-0000-8888-000000',
            event: 'index_leave',
          },
          {
            distinct_id: '999999-0000-8888-000000',
            event: '$pageview',
          },
          {
            distinct_id: '999999-0000-8888-000001',
            event: 'index_leave',
          },
          {
            distinct_id: '999999-0000-8888-000001',
            event: '$pageview',
          },
        ]
          .map(item => JSON.stringify(item))
          .join('\n')
      )
      count++
      break
  }
  if (count >= 3) {
    server.close()
  }
  res.writeHead(404)
  res.end('Not Found')
})
server.listen(3636)
