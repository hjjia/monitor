import * as React from 'react';
import { Icon } from 'antd';

export default function PageLoading() {
    return (
        <div className="page-loading">
            <div className="page-loading-mask"></div>
            <div className="page-loading-wrap ">
                <Icon type="loading" className="page-loading" />
            </div>
        </div>
    )
}