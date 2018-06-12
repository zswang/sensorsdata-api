"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestBase = require("irequest");
const querystring_1 = require("querystring");
class Sensorsdata extends RequestBase.RequestBase {
    constructor(options) {
        super(options.debug);
        this.options = Object.assign({
            project: 'default',
        }, options);
    }
    /**
     * 获取用户分析报表数据
     * @param params 查询参数
     * @example userAnalyticsReport()
      ```js
      const api = new sa.Sensorsdata({
        apiHost: 'http://localhost:3636/api',
        apiToken: '4ac32fb71dda63a728e1706a0e',
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
          console.log(JSON.stringify(reply))
          // > {"series":[],"rows":[],"num_rows":0,"report_update_time":"2018-06-11 20:45:50.934","data_update_time":"1970-01-01 08:00:00.000","data_sufficient_update_time":"1970-01-01 08:00:00.000","truncated":false}
          // * done
        }).catch(err => {
          console.error(err)
        })
      ```
     */
    userAnalyticsReport(params) {
        return this.request(`${this.options.apiHost}/user/analytics/report?${querystring_1.stringify({
            token: this.options.apiToken,
            project: this.options.project,
        })}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(params),
        });
    }
    /**
     * 查询数据
     * @see https://www.sensorsdata.cn/manual/query_api.html
     * @param sql {cn}查询语句 {en}Data query
     * @example sqlQuery()
      ```js
      const api = new sa.Sensorsdata({
        apiHost: 'http://localhost:3636/api',
        apiToken: '4ac32fb71dda63a728e1706a0e',
      })
      api
        .sqlQuery(`
          SELECT event, distinct_id
            FROM events
            LIMIT 4
        `)
        .then(reply => {
          console.log(JSON.stringify(reply))
          // > [{"distinct_id":"999999-0000-8888-000000","event":"index_leave"},{"distinct_id":"999999-0000-8888-000000","event":"$pageview"},{"distinct_id":"999999-0000-8888-000001","event":"index_leave"},{"distinct_id":"999999-0000-8888-000001","event":"$pageview"}]
          // * done
        }).catch(err => {
          console.error(err)
        })
      ```
     */
    sqlQuery(sql) {
        return this.request(`${this.options.apiHost}/sql/query`, {
            method: 'POST',
            form: {
                token: this.options.apiToken,
                project: this.options.project,
                format: 'json',
                q: sql,
            },
        }, text => {
            return text
                .trim()
                .split(/\s*\n\s*/)
                .map(line => {
                return JSON.parse(line);
            });
        });
    }
}
exports.Sensorsdata = Sensorsdata;
