import * as React from 'react';
import { Icon, List, Card, Button } from 'antd';
import history from '../../common/history';
import { routerConfig } from '../../common/config/router';

import { AppType, InitState } from '../../store/init/types';

interface AppListProps {
    appList: AppType[];
    updateInitParams(params: InitState): any;
    getAppList(): any;
}
class AppList extends React.Component<AppListProps> {
    constructor(props: any) {
        super(props);
        const { getAppList } = this.props;
        getAppList();
    }
    goAppManage = (item: AppType) => {
        const { updateInitParams } = this.props;
        updateInitParams({
            currentAppId: item.appId
        });
        history.push(routerConfig.appHome, { appId: item.appId})
    }
    render() {
        const { appList } = this.props;
        return (
            <div className="app-list-page-wrap">
                <div className="title">
                    <Icon type="appstore" />
                    应用管理
                </div>
                <div className="app-list-content">
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={appList}
                    renderItem={item => (
                        <List.Item
                            className="app-list-item item-active"
                            onClick={() => this.goAppManage(item)}
                            key={item.appId}
                        >
                            <Card title={item.appName}>
                                <div>
                                    <div className="content">{item.appName}</div>
                                    <div className="item-footer">
                                        <div>永久有效</div>
                                        <Button size="small" shape="round">进入应用</Button>
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
                </div>
            </div>
        )
    }
}

export default AppList;