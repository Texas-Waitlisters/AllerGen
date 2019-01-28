import React from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import BarcodeScanner from './Camera'
import ItemScreen from './Item'
import ItemsScreen from './Items'
import ProfileScreen from './Profile'
import CompareScreen from './Compare'

console.disableYellowBox = true;

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home_Page: { screen: BarcodeScanner, 
		  navigationOptions: {header:null},
  },
  Item: { screen: ItemScreen },
});

const CompareStack = createStackNavigator({
  Items_Page: { screen: ItemsScreen},
  Compare: { screen: CompareScreen},
  Item_2: { screen: ItemScreen },
});

const Nav = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Items: { screen: CompareStack },
	Profile: { screen: ProfileScreen},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-barcode';
        } else if (routeName === 'Items') {
          iconName = 'md-list'
		} else if (routeName === 'Profile') {
          iconName = 'md-person'
		}


        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(Nav);
