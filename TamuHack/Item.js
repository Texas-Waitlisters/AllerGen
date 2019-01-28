import React, { Component } from 'react';
import {StyleSheet, FlatList, Text, View, Button} from 'react-native';
const fetchModule = require("fetch")

export default class ItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {name: 'Loading..', id: 'Loading..', ingredients: [], allergic: 'y'}}
	console.log(this.state)
  }
  render() {
    return (
	<View style={styles.container}>
		<Text style={styles.h2text}>{this.state.data.name}</Text>
		<Text style={styles.h3text}>Allergic: {this.state.data.allergic=='y' ? 'Yes' : 'No'}</Text>
        <FlatList
          data={this.state.data.ingredients}
          renderItem={({item}) => 
		  	<View style={styles.flatview}>
				<Text style={styles.h4text}>{item}</Text>
			</View>}
        />
		<Button
			title="Add to List"
			onPress={() => { this.props.navigation.navigate("Items_Page", {name: this.state.data.name, id: this.state.data.id, ingredients: this.state.data.ingredients, allergic: this.state.data.allergic, added: "false"}) }}
		/>
	</View>
    );
  }
  componentDidMount() {
	console.log(this.props.navigation.state.params)
    fetchModule.fetch(this.props.navigation.state.params, {method: "GET"})
	.then((response) => response.json())
	.then((responseJson) => {
		responseJson = JSON.parse(responseJson)
		console.log(responseJson)
		console.log(JSON.stringify(responseJson))
		console.log(responseJson.data)
		this.setState(responseJson)
  });
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
	marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 5,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
	color: 'black',
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
