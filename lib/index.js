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
     *
     * @see https://www.sensorsdata.cn/manual/query_api.html
     * @param sql {cn}查询语句 {en}Data query
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
        });
    }
}
exports.Sensorsdata = Sensorsdata;
