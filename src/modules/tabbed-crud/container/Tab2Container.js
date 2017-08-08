import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Button, Animated, Easing } from 'react-native';

class Tab2Container extends React.Component{

	state = {
		_toggle: false,
		_marginTop: new Animated.Value(0),
	}

	handleToggle = () => {

		const state = this.state;

		this.setState({
			_toggle: !this.state._toggle
		}, () => {
			Animated.timing(                  
				state._marginTop,        
				{
					toValue: !state._toggle ? 100 : 0,
					easing: Easing.bounce,
					duration: 500,
				}
		    ).start();
		})
	}

	handleChangePicker = (key) => (value, index) => {
		this.setState({
			[key]: value
		})
	}

	componentDidMount(){
		
	}

	render(){
		const { _toggle } = this.state;

		return(
			<View>
				<Text>Animation Sample</Text>
				<Animated.View style={{ marginTop: this.state._marginTop }}>
					<Button title={ _toggle ? "Animate Down" : "Animate Up" } onPress={ this.handleToggle }/>
				</Animated.View>
			</View>
		)
	}
}

export default Tab2Container;