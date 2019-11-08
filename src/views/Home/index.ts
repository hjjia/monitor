import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Home from './Home';
import { updateInitParams } from '../../store/init/actions';
import './index.less';

const mapStateToProps = (state: any) => {
    console.log(state, 'state')
    return {
        currentAppId: state.init.currentAppId,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateInitParams: bindActionCreators(updateInitParams, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);