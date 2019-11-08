import * as React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { routerConfig } from '../../common/config/router';
import logoSrc from './imgs/logo.png';

import './index.less';

const ButtonGroup = Button.Group;

class Header extends React.Component {

  render() {

    return (
      <div className="header">
        <div className="common-structure-width header-content">
          <div className="header-content-left">
              <div className="header-logo">
                <div className="logo-wrapper">
                  <img src={logoSrc} />
                </div>
                趣呱呱
              </div>
              <div className="left-border">|</div>
              <div>
                <Link to={routerConfig.appList}>
                  <Icon type="sync" />
                  切换应用
                </Link>
              </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;