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

export interface ICommonReturn {
  error?: string;
}

export interface IUserAnalyticsReportReturn extends ICommonReturn {
  by_fields: string[];
  series: string[];
  rows: { values: any[]; by_values: string[] }[];
  num_rows: number;
  report_update_time: string;
  data_update_time: string;
  data_sufficient_update_time: string;
  truncated: boolean;
}

export interface IUserAnalyticsReportParams {
  measures: [
    {
      event_name?: string;
      aggregator?: string;
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
    relation: string;
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

  userAnalyticsReport(
    params: IUserAnalyticsReportParams
  ): Promise<IUserAnalyticsReportReturn> {
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
    ) as Promise<IUserAnalyticsReportReturn>;
  }
}
