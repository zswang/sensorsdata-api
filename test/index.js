
process.env.SENSORSDATA_API_HOST = 'http://localhost:3636/api'
process.env.SENSORSDATA_API_TOKEN = '4ac32fb71dda63a728e1706a0e'

const sa = require('../')
require('./mock/')
      

describe("src/index.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("userAnalyticsReport()", function (done) {
    examplejs_printLines = [];
    const api = new sa.Sensorsdata({
  apiToken: process.env.SENSORSDATA_API_TOKEN,
  apiHost: process.env.SENSORSDATA_API_HOST,
})
api
  .userAnalyticsReport({
    measures: [
      {
        aggregator: 'count',
        field: '',
      },
    ],
    filter: {
      conditions: [],
    },
    use_cache: false,
  })
  .then(reply => {
    examplejs_print(JSON.stringify(reply))
    assert.equal(examplejs_printLines.join("\n"), "{\"series\":[],\"rows\":[],\"num_rows\":0,\"report_update_time\":\"2018-06-11 20:45:50.934\",\"data_update_time\":\"1970-01-01 08:00:00.000\",\"data_sufficient_update_time\":\"1970-01-01 08:00:00.000\",\"truncated\":false}"); examplejs_printLines = [];
    done();
  })
  .catch(err => {
    console.error(err)
  })
  });
          
  it("sqlQuery()", function (done) {
    examplejs_printLines = [];
    const api = new sa.Sensorsdata({
  apiToken: process.env.SENSORSDATA_API_TOKEN,
  apiHost: process.env.SENSORSDATA_API_HOST,
})
api
  .sqlQuery(
    `
  SELECT event, distinct_id
    FROM events
    LIMIT 4
`
  )
  .then(reply => {
    examplejs_print(JSON.stringify(reply))
    assert.equal(examplejs_printLines.join("\n"), "[{\"distinct_id\":\"999999-0000-8888-000000\",\"event\":\"index_leave\"},{\"distinct_id\":\"999999-0000-8888-000000\",\"event\":\"$pageview\"},{\"distinct_id\":\"999999-0000-8888-000001\",\"event\":\"index_leave\"},{\"distinct_id\":\"999999-0000-8888-000001\",\"event\":\"$pageview\"}]"); examplejs_printLines = [];
    done();
  })
  .catch(err => {
    console.error(err)
  })
  });
          
  it("sqlQuery():null", function (done) {
    examplejs_printLines = [];
    const api = new sa.Sensorsdata({
      apiHost: `${process.env.SENSORSDATA_API_HOST}/null`,
      apiToken: process.env.SENSORSDATA_API_TOKEN,
    })
    api
      .sqlQuery(
        `
        SELECT event, distinct_id
          FROM events
          LIMIT 4
      `
      )
      .then(reply => {
        examplejs_print(JSON.stringify(reply))
        assert.equal(examplejs_printLines.join("\n"), "null"); examplejs_printLines = [];
        done();
      })
      .catch(err => {
        console.error(err)
      })
  });
          
});
         