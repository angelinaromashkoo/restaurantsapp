import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationFlowNavigator} from './src/navigators/stackFlowNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ApplicationFlowNavigator />
    </NavigationContainer>
  );
};

export default App;
