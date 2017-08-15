import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Button, Text, TextInput, StyleSheet, Dimensions, Keyboard } from 'react-native';
import Loader from '../component/Loader';
import styles from './styles';

class LoginContainer extends React.Component{

	state = {
		email: 'al.s.apalat@gmail.com',
		password: '123123123'
	}

	componentWillMount(){
		const { dispatch } = this.props;
		dispatch({
			type: "EDTR_CHECK_AUTH",
			args: this.state
		})
	}

	componentWillUnmount(){
		Keyboard.dismiss()
	}

	handleChangeInput = (key) => (value) => {
		this.setState({
			[key]: value
		})
	}

	handleSubmit = () => {
		const { dispatch } = this.props;
		dispatch({
			type: "EDTR_LOGIN",
			args: this.state
		})
	}

	render(){

		const { isLoading, isAuthLoading } = this.props;

		return(
			<View style={ styles.wrapper }>
				{ (isLoading || isAuthLoading) && <Loader label={ isLoading ? "Logging in..." : "Checking Authentication..."}/> }
				<View style={ styles.content }>
					<View style={ styles.formGroup }>
						<Text style={ [styles.label, styles.textCenter] }>
							Login
						</Text>
					</View>
					<View style={ styles.formGroup }>
						<TextInput 
							editable={ !isLoading }
							style={ styles.formControl }
							placeholder="Enter Email"
							autoFocus
							onChangeText={ this.handleChangeInput("email")} 
							value={ this.state.email }
							underlineColorAndroid="rgba(0,0,0,0)"
							keyboardType="email-address"
							returnKeyType="next" 
							onSubmitEditing={() => { 
							    this.refs.PassInput.focus(); 
						  	}} />
					</View>
					<View style={ styles.formGroup }>
						<TextInput 
							editable={ !isLoading }
							style={ styles.formControl }
							placeholder="Enter Password"
							ref="PassInput"
							onChangeText={ this.handleChangeInput("password")} 
							value={ this.state.password }
							underlineColorAndroid="rgba(0,0,0,0)"
							returnKeyType="done" 
							secureTextEntry={ true }
							onSubmitEditing={ this.handleSubmit } />
					</View>
					<View style={ styles.formGroup }>
						<Button 
							disabled={ isLoading }
							style={ [ styles.btnRound ] }
							title="LOGIN"
							onPress={ this.handleSubmit }/>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = ({ app }) => {
	const isLoading = app.preloaders.indexOf('EDTR_LOGIN') > -1
	const isAuthLoading = app.preloaders.indexOf('EDTR_CHECK_AUTH') > -1
	return{
		isLoading,
		isAuthLoading
	}
}

export default connect(mapStateToProps)(LoginContainer);