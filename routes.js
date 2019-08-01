import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Home from './screens/Home';

const DrawerStack = createDrawerNavigator({
  Home: {
    screen: Home,
  },
});

export const AppContainer = createAppContainer(DrawerStack);
