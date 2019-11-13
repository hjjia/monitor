import * as React from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { http } from '../../common/http/http';

const columns = [
    {
        title: '页面地址',
        dataIndex: 'url',
        width: 500,
        textWrap: 'word-break',
        render: (text: string | number, record: any) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {text}
            </div>
        ),
    },
    {
        title: '请求时间',
        dataIndex: 'date',
        render: (item: number) => {
            return (
                <span>{moment(item).format('YYYY-MM-DD HH:MM:SS')}</span>
            )
        }
    },
    {
        title: '重定向',
        dataIndex: 'rrt',
    },
    {
        title: '域名解析',
        dataIndex: 'dnst',
    },
    {
        title: '建立连接',
        dataIndex: 'tcpt',
    },
    {
        title: '服务器响应',
        dataIndex: 'srt',
    },
    {
        title: '页面HTML下载',
        dataIndex: 'pdt',
    },
    {
        title: 'DOM 就绪',
        dataIndex: 'dit',
    },
    {
        title: 'DOM/CSSDOM/JS完成',
        dataIndex: 'dclt',
    },
    {
        title: '网页加载完成',
        dataIndex: 'plt',
    },
];

const columnsRes = [
    {
        title: 'name',
        dataIndex: 'name',
        width: 100,
        textWrap: 'word-break',
        render: (text: string | number, record: any) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {text}
            </div>
        ),
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
    },
    {
        title: '域名解析',
        dataIndex: 'dnst',
    },
    {
        title: '建立连接',
        dataIndex: 'tcpt',
    },
    {
        title: '服务器响应',
        dataIndex: 'srt',
    },
    {
        title: 'duration',
        dataIndex: 'duration',
    },
    {
        title: 'encodedBodySize / KB',
        dataIndex: 'encodedBodySize',
        render: (text: number) => {
            return (<span>{(text / 1024).toFixed(2)}</span>)
        },
    },
    {
        title: 'decodedBodySize / KB',
        dataIndex: 'decodedBodySize',
        render: (text: number) => {
            return (<span>{(text / 1024).toFixed(2)}</span>)
        },
    },
    {
        title: 'transferSize / KB',
        dataIndex: 'transferSize',
        render: (text: number) => {
            return (<span>{(text / 1024).toFixed(2)}</span>)
        },
    },
    {
        title: 'initiatorType',
        dataIndex: 'initiatorType',
    },
]

var str = {"rrt":2,"dnst":0,"tcpt":1,"srt":2,"pdt":1,"dit":418,"dclt":418,"plt":531,"date":1569321896019,"url":"http://192.168.50.86:8002/selfShop/recordWebLoadTime"};
const data = [];
const monitorUrl = '/selfShop/getWebLoadTime';

interface MonitorListProps {

}
interface MonitorListState {
    data: any[],
}
class MonitorList extends React.Component<MonitorListProps, MonitorListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
        };
        this.getMonitorList();
    }

    getMonitorList = () => {
        http.post(monitorUrl, {}).then((res: any) => {
            const { errorCode, data, errorMessage } = res;
            if (!errorCode && data) {
                const newData = data.reverse();
                for (let i = 0, len = data.length; i < len; i++) {
                    data[i] = JSON.parse(newData[i])
                }
                this.setState({
                    data,
                })
            }
        })
    }

    expandedRowRender = (record: any) => {
        const data = [{"tcpt":0,"srt":2.7150000678375363,"pdt":1.8449999624863267,"dnst":0,"duration":7.314999937079847,"name":"http://localhost:3000/static/js/bundle.js","initiatorType":"script","encodedBodySize":6404,"decodedBodySize":31951,"transferSize":6719,"startTime":52.795000025071204},{"tcpt":0,"srt":11.564999935217202,"pdt":68.46500001847744,"dnst":0,"duration":87.30500005185604,"name":"http://localhost:3000/static/js/1.chunk.js","initiatorType":"script","encodedBodySize":943482,"decodedBodySize":4579921,"transferSize":181,"startTime":53.00999991595745},{"tcpt":0,"srt":2.3999999975785613,"pdt":1.385000068694353,"dnst":0,"duration":22.96500001102686,"name":"http://localhost:3000/static/js/main.chunk.js","initiatorType":"script","encodedBodySize":10553,"decodedBodySize":59131,"transferSize":10868,"startTime":53.27999999281019},{"tcpt":0,"srt":1.069999998435378,"pdt":0.5900000687688589,"dnst":0,"duration":40.35000002477318,"name":"http://localhost:3000/main.32f48b048070f623d288.hot-update.js","initiatorType":"script","encodedBodySize":0,"decodedBodySize":0,"transferSize":179,"startTime":53.50999999791384},{"tcpt":0,"srt":1.3649999164044857,"pdt":0.5499999970197678,"dnst":0,"duration":42.394999996759,"name":"http://localhost:3000/analytics.js","initiatorType":"script","encodedBodySize":0,"decodedBodySize":0,"transferSize":243,"startTime":53.74499992467463}];
        // return record.entries ? (
        //     <Table 
        //     rowKey={(record: any): string => record.name}
        //         columns={columnsRes}
        //         dataSource={record.entries} 
        //         pagination={false}
        //     /> 
        // ): undefined;
        return <Table 
        rowKey={(record: any): string => record.name}
        columns={columnsRes}
        dataSource={data} 
        pagination={false}
    /> ;
      }
    

    render() {
        const { data } = this.state;
        console.log(data, 'data')
        return (
            <div className="monitor-wrapper">
                <div className="title">页面耗时列表(ms)</div>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record: any): string => record.date}
                    expandedRowRender={(record:any) => this.expandedRowRender(record)}
                />
            </div>
        )
    }
}

export default MonitorList;

