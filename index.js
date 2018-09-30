import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';
import store from './src/store/createStore';
import { YellowBox } from 'react-native';
import { Root } from 'native-base';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class Main extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Root>
                    <App />
                </Root>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('wtf', () => Main);
