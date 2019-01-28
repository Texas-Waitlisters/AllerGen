import React, { Component } from 'react';
import {StyleSheet, FlatList, Text, View, Button, TouchableOpacity} from 'react-native';

export default class ItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []}
  }
  render() {
    return (
	<View style={styles.container}>
		<Text style={styles.h2text}>Items</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => 
		  	<View>
			<TouchableOpacity onPress={() => { this.props.navigation.navigate('Item_2', "http://35.153.127.41:8080/search/barcode/" + item.id) }} style={styles.flatview}>
				<Text style={styles.h3text}>{item.name}</Text>
				<Text style={styles.h4text}>{item.allergic == 'y' ? "Allergens" : "No Allergens"}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.remove} onPress={() => 
				{
  				var array = [...this.state.data];
  				var index = array.indexOf(item)
 				 if (index !== -1) {
    			array.splice(index, 1);
    			this.setState({data: array});
}
				}}>
				<Text style={styles.h4text, {textAlign:'center', color:'white'}}>Remove</Text>
			</TouchableOpacity>
			</View>
		  }
        />
		<Button
			title="Compare"
			onPress={() => {this.props.navigation.navigate('Compare', {json_string: JSON.parse(JSON.stringify(this.state))})}}
		/>
	</View>
    );
  }
  componentDidMount(){
    this.load()
    this.props.navigation.addListener('willFocus', this.load)
  }
  load = () => {
    if(this.props.navigation.state.params == undefined) {
      return
	}
    if(this.props.navigation.state.params.added == "false") {
      this.props.navigation.state.params.added = "true"
      this.setState({ data: [...this.state.data, this.props.navigation.state.params]})
	  console.log(this.state.data)
	}
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
    borderRadius: 5,
	width: '100%'
  },
  remove: {
    justifyContent: 'center',
	backgroundColor: 'lightsalmon',
    padding: 2,
	margin: 3,
	justifyContent: 'center',
    borderRadius: 5,
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
