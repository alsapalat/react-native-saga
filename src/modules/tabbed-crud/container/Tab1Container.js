import React from 'react';
import { View, Text, Image, TextInput, Picker, Switch, Slider, Modal, Button, Alert } from 'react-native';
import { Touchable } from '../../generic/component/Touchable';
import { Fingerprint } from 'expo';

class Tab1Container extends React.Component{

	state = {
		input: '',
		email: '',
		numeric: '',
		phonepad: '',
		picker: '',
		switch: false,
		slider: 50,
		_showModal: false
	}

	handleChangeInput = (key) => (value) => {
		this.setState({
			[key]: value
		})
	}

	handleChangePicker = (key) => (value, index) => {
		this.setState({
			[key]: value
		})
	}

	handleChangeSwitch = (key) => (value) => {
		this.setState({
			[key]: value
		})
	}

	handleChangeSlider = (key) => (value) => {
		this.setState({
			[key]: value
		})
	}

	handleOpenModal = () => {
		this.setState({
			_showModal: true
		})
	}

	handleCloseModal = () => {
		this.setState({
			_showModal: false
		})	
	}

	handleSendAlert = () => {
		Alert.alert(
			'Alert!',
			'You just triggered an alert...',
			[
				{ text: 'Maybe', onPress: () => console.log('Maybe pressed') },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			],
			{ cancelable: false }
		)
	}

	render(){

		return(
			<View>
				<View>
					<Text>Sample Text Input</Text>
					<TextInput onChangeText={ this.handleChangeInput("input") } value={ this.state.input } returnKeyType="next"/>
				</View>
				<View>
					<Text>Sample Input(Email)</Text>
					<TextInput onChangeText={ this.handleChangeInput("email") } value={ this.state.email } keyboardType="email-address" returnKeyType="go"/>
				</View>
				<View>
					<Text>Sample Input(Numeric)</Text>
					<TextInput onChangeText={ this.handleChangeInput("numeric") } value={ this.state.numeric } keyboardType="numeric" returnKeyType="search"/>
				</View>
				<View>
					<Text>Sample Input(Phone-Pad)</Text>
					<TextInput onChangeText={ this.handleChangeInput("phonepad") } value={ this.state.phonepad } keyboardType="phone-pad" returnKeyType="send"/>
				</View>
				<View>
					<Text>Sample Input(Secured)</Text>
					<TextInput onChangeText={ this.handleChangeInput("password") } value={ this.state.password } returnKeyType="done" secureTextEntry={ true }/>
				</View>
				<View>
					<Text>Sample Picker</Text>
					<Picker
						selectedValue={ this.state.picker }
						onValueChange={ this.handleChangePicker("picker") }>
						<Picker.Item label="Option 1" value="opt-1" />
						<Picker.Item label="Option 2" value="opt-2" />
						<Picker.Item label="Option 3" value="opt-3" />
						<Picker.Item label="Option 4" value="opt-4" />
						<Picker.Item label="Option 5" value="opt-5" />
					</Picker>
				</View>
				<View>
					<Text>Sample Switch</Text>
					<Switch onValueChange={ this.handleChangeSwitch("switch") } value={ this.state.switch } />
				</View>
				<View>
					<Text>Sample Slider({ this.state.slider })</Text>
					<Slider 
						maximumValue={ 0 }
						maximumValue={ 100 }
						step={1}
						onValueChange={ this.handleChangeSlider("slider") } 
						value={ this.state.slider } />
				</View>
				<Touchable>
					<Button title="Open Modal" onPress={ this.handleOpenModal }/>
				</Touchable>

				<Modal
					animationType="slide"
					transparent={ false }
					visible={ this.state._showModal }
					onRequestClose={ this.handleCloseModal }>
					<View>
						<Text>You just opened a modal...WOW!</Text>
						<Touchable>
							<Button title="Send Alert!" onPress={ this.handleSendAlert }/>
						</Touchable>
						<Text>...</Text>
						
						<FingerAuth />

						<Touchable>
							<Button title="Close Modal" onPress={ this.handleCloseModal }/>
						</Touchable>
					</View>
				</Modal>
			</View>
		)
	}
}

class FingerAuth extends React.Component{

	state = {
		status: '',
		hasHardware: false,
		hasFingers: false,
		isScanning: false
	}

	async componentDidMount(){
		const hasHardware = await Fingerprint.hasHardwareAsync();
		const hasFingers = await Fingerprint.isEnrolledAsync();

		this.setState({
			status: `hardware: ${hasHardware ? "YES" : "NO"} fingers: ${hasFingers ? "YES" : "NO"}`
		})
	}

	handleStartScan = async () => {
		this.setState({
			isScanning: true
		})

		const data = await Fingerprint.authenticateAsync();

		console.log(data);

		this.setState({
			isScanning: false
		})
	}

	render(){

		const { hasHardware, hasFingers } = this.state;

		return(
			<View>
				<Text>{ this.state.status }</Text>
				{ (hasHardware && hasFingers) &&
					<Button 
						title={ this.state.isScanning ? "finger please" : "Start Scan" }
						onPress={ this.handleStartScan }/>
				}
			</View>
		)
	}
}

export default Tab1Container;