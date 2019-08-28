<template>
    <div>
        <div>
            <el-button type="primary" @click="getData()">查询数据</el-button>
        </div>
        <div id="charts">

        </div>
    </div>
</template>

<script>
import ajax from '@/common/utils/ajax'
import echarts from 'echarts'

export default {
    data() {
        return {
            myChart: null
        }
    },
    mounted() {
        this.myChart = echarts.init(document.getElementById('charts'));
        this.getData()
    },
    methods: {
        getParam() {
            return {
                measures:[
                    {
                        eventName: "groupItemEdit-new",
                        aggregator: "eventCount",
                        eventType: "Common"
                    }
                ],
                byFields: [],
                filter: {
                    relation: "AND",
                    conditions: [
                        {
                            field: "isYangGuang",
                            func: "IS_FALSE",
                            fieldType: "Event",
                            attributeType: "Custom"
                        }
                    ]
                },
                unit: "day",
                fromDate: "2019-06-04",
                toDate: "2019-06-10",
                sessionId: this.randomString(16),
                useCache: true,
                baseInfo: {
                    userid: "hzfangwentian@corp.netease.com",
                    entrance: "analytics",
                    caller: "user"
                }
            }
        },
        randomString(len) {
            len = len || 32;
            let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            let maxPos = $chars.length;
            let pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        getData() {
            ajax.post('https://hubble.netease.com/hwi/events/report?productId=1093', {
                data: this.getParam()
            }).then((data) => {
                if(data.errorCode == 200) {
                    let { relatedObject: { rows: [{ values }], series } } = data
                    console.log(values.flat())
                    this.draw(values.flat(), series)
                }
            })
        },
        draw(arr, date) {
            this.myChart.clear()

            var option = {
                title: {
                    text: 'Hubble数据查询'
                },
                tooltip: {},
                legend: {
                    data:['事件分析']
                },
                xAxis: {
                    data: date
                },
                yAxis: {},
                series: [{
                    name: '事件分析',
                    type: 'bar',
                    data: arr
                }]
            }
            this.myChart.setOption(option)
        }
    }
}
</script>

<style lang="less" scoped>
#charts {
    margin-top: 20px;
    padding: 15px;
    height: 500px;
    border: solid 1px #eee;
}
</style>

