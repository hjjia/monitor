import * as React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from './common/history';
import './common/config/message';

import { routerConfig } from './common/config/router';
import Header from './components/Header/Header';
import SilderBar from './components/SilderBar/SliderBar';
import MonitorList from './views/MonitorList';
interface AppProps {

}
interface AppState {
    pathname: string;
}
class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props);
        const { location } = history;
        this.state = {
            pathname: location.pathname,
        }
        history.listen((location, action) => {
            // location is an object like window.location
            this.setState({
                pathname: location.pathname
            })
        });
    }
    public render() {
        const { pathname } = this.state;
        return (
            <div className="app">
                <Router history={history}>
                    <Header />
                    <div className="common-content">
                        <div className="common-structure-width common-content-main">
                            <div className="content-main">
                            <Switch>
                                <Route path={routerConfig.home} component={MonitorList} />
                                <Route path={routerConfig.list} component={MonitorList} />
                            </Switch>
                            </div>

                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;