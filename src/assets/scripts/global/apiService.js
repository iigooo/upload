/**
 *
 * axios请求方法封装
 * create by Mozi Zhang 2019-08-12
 *
 * */

import $ from 'axios';

export default class ApiServer {
    constructor() {
    }

    //基础接口地址
    baseUrl;

    /**
     * axios 实列
     * 配置基础参数
     */
    async instance(sourceToken) {
        let _config = {
            baseURL: this.baseUrl,
            timeout: 3000,
            headers: {"Authorization": '', "AccountId": ''},
        };
        if (sourceToken) {
            _config['cancelToken'] = sourceToken.token;
        }
        let _instance = $.create(_config);
        _instance.interceptors.request.use(config => {
            return config;
        }, err => {
            return Promise.reject(err);
        })

        _instance.interceptors.response.use(response => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
            return response;
        }, err => {
            if (err.response.status === 401) {
                //无权访问
            }
            if (err.response.status === 403) {
                //权限不足
            }
            return Promise.reject(err);
        })
        return _instance;
    }


    /**
     * 生成关闭源工厂
     * @returns {CancelTokenSource}
     */
    createCancelToken() {
        let CancelToken = $.CancelToken;
        return CancelToken.source();
    }

    /**
     *
     * @param {*} uri 请求路由
     * @param {*} data 请求参数
     * @param {*} done 最终执行函数 比如在加载一个table数据 出现加载中的效果 可以在这里停止该效果
     * @param {*} type 请求方式
     * @returns {Promise<unknown>}
     */
    async request(uri, data, done, type) {
        let _this = this;
        const instance = await _this.instance();
        return await _this.sendRequest(instance, uri, data, done, type);
    }

    /**
     * 继上一步得get函数自定义配置
     * @param uri
     * @param data
     * @param source 取消请求工厂
     * @param done
     * @returns {Promise<unknown>}
     */
    async requestAllowCancel(uri, data, source, done, type) {
        let _this = this;
        const instance = await _this.instance(source);
        return await _this.sendRequest(instance, uri, data, done, type);
    }

    /**
     * 请求发起动作
     * @param instance
     * @param uri
     * @param data
     * @param done
     * @param type
     * @returns {Promise<unknown>}
     */
    async sendRequest(instance, uri, data, done, type) {
        return new Promise((resolve, reject) => {
            instance.request({url: uri, params: data, method: type ? type : 'POST'}).then(data => {
                resolve(data);
            }).catch(err => {
                if (err.response) {
                    resolve(err);
                } else {
                    reject(err);
                }
            }).then(() => {
                done && done();
            })
        })
    }

    /**
     *
     * @param {*} requests 请求的参数数组 所有请求都需要加上请求方式 路径和请求参数
     * @param {*} call
     * @param {*} error
     * @param {*} done
     *
     * 参数字段
     * method 请求方式
     * url 请求路由
     * data 请求地址
     * 注意：如果多个请求方式 要根据不通情况给出参数属性：axios中 如果是get请求 参数属性用 params 如果是post用data
     *
     */
    async multiple(requests, call, error, done) {
        let _this = this;
        const instance = await _this.instance();
        let requests_promise = requests.map(molt => instance.request(molt));
        $.all(requests_promise).then($.spread(call)).catch(err => {
            error(err);
        }).then(() => {
            done && done();
        });
    }
}
