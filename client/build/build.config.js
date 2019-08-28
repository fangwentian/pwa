const _ = require('./utils');

// 获取实际ip地址，fix其他人通过IP访问机器时找不到资源
const getIPv4 = () => {
    try {
        const list = Object.values(require('os').networkInterfaces()).reduce((res, current) => {
            res = res.concat(current)
            return res
        }, [])
    
        return list.filter(item => (
            item.family == 'IPv4' && 
            !item.internal && 
            item.address != '127.0.0.1' && 
            /^10./.test(item.address)
        ))[0].address
        
    } catch(error) {
        return '127.0.0.1'
    }
}

module.exports = {
    realIPv4: getIPv4(),
    output: _.resolve('./dist/'),
    pages: _.resolve('./src/pages'),
    devServerPort: 5001,
    devAssertPublicPath: `http://${getIPv4()}:5001/`
}