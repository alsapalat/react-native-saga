import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Button, Animated, Easing } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

class Tab2Container extends React.Component{

	state = {
		_toggle: false,
		_marginTop: new Animated.Value(0),
		hasCameraPermission: false,
		_barcode: '--'
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

	async componentDidMount(){
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
    	this.setState({
    		hasCameraPermission: status === 'granted'
    	});
	}

	render(){
		const { _toggle, hasCameraPermission } = this.state;

		return(
			<View>
				<Text>Animation Sample</Text>
				<Animated.View style={{ marginTop: this.state._marginTop }}>
					<Button title={ _toggle ? "Animate Down" : "Animate Up" } onPress={ this.handleToggle }/>
				</Animated.View>

				{ !hasCameraPermission ?
					<View>
						<Text>{ hasCameraPermission === false ? "No Access" : "Loading Camera..." }</Text>
					</View>
					:
					<View>
						<BarCodeScanner
							onBarCodeRead={({ data, type }) => {
								this.setState({
									_barcode: `${type} : ${data}`
								})
							}}
							style={{
								height: 400
							}}/>
						<Text onPress={ () => this.setState({ _barcode: '' }) }>{ this.state._barcode }</Text>
					</View>
				}
			</View>
		)
	}
}

export default Tab2Container;