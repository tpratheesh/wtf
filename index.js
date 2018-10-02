import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';
import reduxState from './src/store/createStore';
import { YellowBox } from 'react-native';
import { Root } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class Main extends React.Component {

    render() {
        return (
            <Provider store={reduxState.store}>
                <PersistGate loading={null} persistor={reduxState.persistor}>
                    <Root>
                        <App />
                    </Root>
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('wtf', () => Main);
