import * as React from 'react';
import { Menu, Icon } from 'antd';
import { integralSider, itemType } from '../../common/config/siderConfig';
import history from '../../common/history';
import './index.less';

const { SubMenu } = Menu;
interface SliderBarProps {
}

interface SliderBarState {
    defaultSelectedKey: string[];
    defaultOpenKey: string[];
}
function getTargetKey(arr: any[], targetKey: string, keyName = 'key', res:any = {}): {target: string, parentKey: string} {
    for (let i = 0, len = arr.length; i < len;  i++) {
        if (arr[i].children) {
            res = getTargetKey(arr[i].children, targetKey, keyName);
            if (res.target && res.target.trim() !== '') {
                res.parentKey = arr[i].key;
                break;
            }
        } else if (arr[i].router === targetKey) {
            res.target = arr[i][keyName];
            break;
        }
    }
    return res;
}
class SliderBar extends React.Component<SliderBarProps, SliderBarState> {
    constructor(props: any) {
        super(props);
        const { pathname } = history.location;
        let defaultSelectedKey = getTargetKey(integralSider, pathname, 'key');
        this.state = {
            defaultSelectedKey: [defaultSelectedKey.target],
            defaultOpenKey: [defaultSelectedKey.parentKey],
        }
    }

    handleClick = () => {
    }

    goPage = (item: itemType) => {
        const { router } = item;
        router && history.push(router);
    }
    render() {
        const { defaultSelectedKey, defaultOpenKey } = this.state;

        const menuHtml = integralSider.map((item) => {
            return item.children ? (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            {item.icon ? (<Icon type={item.icon} />) : ''}
                            <span>{item.label}</span>
                        </span>
                    }
                >
                    {
                        item.children.map(subItem => {
                            return (
                                <Menu.Item key={subItem.key} onClick={() => this.goPage(subItem)}>
                                    {subItem.icon ? (<Icon type={subItem.icon} />) : ''}
                                    <span>{subItem.label}</span>
                                </Menu.Item>
                            )
                        })
                    }
                </SubMenu>
            ) : (
                <Menu.Item key={item.key} onClick={() => this.goPage(item)}>
                    {item.icon ? (<Icon type={item.icon} />) : ''}
                    <span>{item.label}</span>
                </Menu.Item>
            )
        })
        return (
            <div className="silder-bar-container">
                <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={defaultSelectedKey}
                    defaultOpenKeys={defaultOpenKey}
                    mode="inline"
                >
                    {menuHtml}
                </Menu>
            </div>
        )
    }
}

export default SliderBar;