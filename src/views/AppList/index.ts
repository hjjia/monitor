import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import AppList from './AppList';
import { updateInitParams, getAppList } from '../../store/init/actions';
import './index.less';

const mapStateToProps = (state: any) => {
    // console.log(state, 'state')
    return {
        appList: state.init.appList,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateInitParams: bindActionCreators(updateInitParams, dispatch),
        getAppList: bindActionCreators(getAppList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);