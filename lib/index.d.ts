import * as RequestBase from "irequest";
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
    measures: [{
        aggregator: string;
        field: string;
    }];
    filter?: {
        conditions: [{
            field: string;
            function: string;
            params: string[];
        }];
    };
    by_fields?: string[];
    use_cache?: boolean;
}
export declare class Sensorsdata extends RequestBase.RequestBase {
    options: ISensorsdataOptions;
    constructor(options: ISensorsdataOptions);
    userAnalyticsReport(params: IUserAnalyticsReportParams): Promise<object>;
}
