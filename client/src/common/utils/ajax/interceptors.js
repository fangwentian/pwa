import Element from 'element-ui';

export const requestInterceptors = [
    {
        name: 'addHttpRequestHeader',
        success(config) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            return config;
        },
        fail(err) {
            console.error('request error: ', err);
            return Promise.reject(err);
        }
    }
];

export const responseInterceptors = [
    {   
        name: 'formatResponse',
        success(response) {
            const data = Object.assign({}, unifromResponseMessage(response.data), {
                __response: response
            });
            return data;
        }
    },
    {
        name: 'handleError',
        success(response) {
            if (response.code === 403 || response.retCode === 403) {
                // 兼容优惠券的接口格式
                return Promise.reject({
                    code: 403,
                    message: response.message || '没有权限'
                });
            }
            if (response.code == 200 || response.retCode === 200 || response.errorCode == 200) {
                // 兼容优惠券的接口格式
                return response;
            }
            // 其他code全部返回reject
            return Promise.reject(response);
        },
        fail(err) {
            console.error('response error: ', err);
            // 请求出错的情况，规整为code: 1000
            return Promise.reject({
                code: 1000,
                message: err.response && err.response.statusText || err
            })
        }
    }
];

// 有的后端错误message字段用的desc
const unifromResponseMessage = (response) => {
    return Object.assign({}, response, {
        message: response.message || response.desc || response.retDesc
    })
}

const interceptors = {
    response: responseInterceptors,
    request: requestInterceptors
};

function doInstall(instance, options = {}) {
    const { type, ignoreIntercepors = [] } = options;
    interceptors[type]
        .filter((interceptor) => !~ignoreIntercepors.indexOf(interceptor.name))
        .forEach((interceptor) => {
            const { success, fail } = interceptor;
            instance.interceptors[type].use(success, fail);
        });
}

export function install(instance, option = {}) {
    const {
        ignoreIntercepors = []
    } = option;

    doInstall(instance, {
        type: 'request',
        ignoreIntercepors
    });

    doInstall(instance, {
        type: 'response',
        ignoreIntercepors
    });
}