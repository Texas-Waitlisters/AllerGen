import React, { Component } from 'react';
import {StyleSheet, FlatList, Text, View, Button, TouchableOpacity} from 'react-native';
const fetchModule = require("fetch")

export default class CompareScreen extends React.Component {
  constructor(props) {
    super(props);
	this.state = {food: {list: [] } }
  }
  render() {
    return (
	<View style={styles.container}>
		<Text style={styles.h2text}>Common Ingredients</Text>
        <FlatList
          data={this.state.food.list}
          renderItem={({item}) => 
		  	<TouchableOpacity onpress={() => {}} style={styles.flatview}>
				<Text style={styles.h3text}>{item}</Text>
			</TouchableOpacity>}
        />
		<Button
			title="Add to List"
			onPress={() => {}}
		/>
	</View>
    );
  }
  componentDidMount() {
    this.load()
	this.props.navigation.addListener('willFocus', this.load)
  }
  load = () => {
	url = "http://35.153.127.41:8080/common/"
	var i
	console.log(url)
	ids = this.props.navigation.state.params.json_string.data
	for (i = 0; i < ids.length; i++) {
		url += ids[i].id + "&"
	}
	console.log(url)
    //this.setState(this.props.navigation.state.params.json_string)
    fetchModule.fetch(url, {method: "GET"})
	.then((response) => response.json())
	.then((responseJson) => {
		console.log(responseJson)
		this.setState(responseJson)
	});
	console.log(this.state)
	console.log(this.props.navigation.state.params)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
	marginBottom: 20,
	paddingHorizontal: 10,
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
  },
  h4text: {
    marginTop: 5,
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
	backgroundColor: 'whitesmoke',
    padding: 10,
	margin: 3,
	justifyContent: 'center',
    borderRadius: 2,
	width: '100%'
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  email: {
    color: 'red'
  }
  
});
