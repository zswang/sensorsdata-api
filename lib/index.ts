import * as RequestBase from "irequest";
import { stringify } from "querystring";
export interface ISensorsdataOptions {
  /**
   * 是否开启调试信息
   */
  debug: boolean;
  /**
   * 访问令牌
   */
  apiToken: string;
  /**
   * API 服务地址
   */
  apiHost: string;
  /**
   * 项目
   */
  project: string;
}
export interface IUserAnalyticsReportParams {
  measures: [
    {
      aggregator: string;
      field: string;
    }
  ];
  filter?: {
    conditions: [
      {
        field: string;
        function: string;
        params: string[];
      }
    ];
  };
  by_fields?: string[];
  use_cache?: boolean;
}
export class Sensorsdata extends RequestBase.RequestBase {
  options: ISensorsdataOptions;
  constructor(options: ISensorsdataOptions) {
    super(options.debug);
    this.options = {
      ...{
        project: "production"
      },
      ...options
    };
  }
  userAnalyticsReport(params: IUserAnalyticsReportParams) {
    return this.request(
      `${this.options.apiHost}/user/analytics/report?${stringify({
        token: this.options.apiToken,
        project: this.options.project
      })}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(params)
      }
    );
  }
}
