import React, { Component } from 'react';
import {StyleSheet, FlatList, Text, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {name: 'Nathan Huckleberry', id: '7491571', allergens: ['Soy', 'Wheat', 'Blueberry', 'Egg']}}
  }
  render() {
    return (
	<View style={styles.container}>
		<View style={styles.header}>
			<View style={styles.circle}>
				<Icon name='md-person' size={100} color='white' style={{alignSelf: 'center'}}/>
            </View>
			<Text style={styles.h2text}>{this.state.data.name}</Text>
		</View>
		<Text style={styles.h3text}>Allergens</Text>
        <FlatList
          data={this.state.data.allergens}
          renderItem={({item}) => 
		  	<View style={styles.flatview}>
				<Text style={styles.h4text}>{item}</Text>
			</View>}
        />
	</View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
	paddingVertical: 20,
	backgroundColor: 'lightblue',
	justifyContent: 'center'
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    alignSelf: 'center',
	justifyContent: 'center',
	backgroundColor: 'steelblue',
	paddingBottom: 15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 5,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
	textAlign: 'center'
  },
  h3text: {
    marginTop: 5,
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
	textAlign: 'center'
  },
  h4text: {
    marginTop: 5,
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
	textAlign: 'center'
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  email: {
    color: 'red'
  }
  
});
