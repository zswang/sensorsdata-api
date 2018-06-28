import * as RequestBase from 'irequest';
export interface ISensorsdataOptions {
    /**
     * {cn}是否开启调试信息
     * {en}Debugging information switch
     */
    debug: boolean;
    /**
     * {cn}访问令牌
     * {en}API access token
     */
    apiToken: string;
    /**
     * {cn}API 服务地址
     * {en}API service address
     */
    apiHost: string;
    /**
     * {cn}项目，默认值 "default"
     * {en}Analysis sample project, The default is "default"
     */
    project?: string;
}
export interface ICommonReturn {
    error?: string;
}
export interface IUserAnalyticsReportReturn extends ICommonReturn {
    by_fields: string[];
    series: string[];
    rows: {
        values: any[];
        by_values: string[];
    }[];
    num_rows: number;
    report_update_time: string;
    data_update_time: string;
    data_sufficient_update_time: string;
    truncated: boolean;
}
export interface IUserAnalyticsReportParams {
    measures: [{
        event_name?: string;
        aggregator?: string;
        field: string;
    }];
    filter?: {
        conditions: [{
            field: string;
            function: string;
            params: string[];
        }];
        relation: string;
    };
    by_fields?: string[];
    use_cache?: boolean;
}
export declare class Sensorsdata extends RequestBase.RequestBase {
    options: ISensorsdataOptions;
    constructor(options: ISensorsdataOptions);
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
    userAnalyticsReport(params: IUserAnalyticsReportParams): Promise<IUserAnalyticsReportReturn>;
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
     * @example sqlQuery():null
      ```js
      const api = new sa.Sensorsdata({
        apiHost: 'http://localhost:3636/null/api',
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
          // > null
          // * done
        }).catch(err => {
          console.error(err)
        })
      ```
     */
    sqlQuery(sql: string): Promise<any>;
}
