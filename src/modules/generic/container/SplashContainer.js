import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from '../asset/styles';

class SplashContainer extends React.Component{

	componentDidMount(){
		const { dispatch } = this.props;	
		dispatch({
			type: "SPLASH"
		})
	}

	render(){

		const { isLoading } = this.props;

		return(
			<View style={ styles.container }>
				<Image 
					style={ styles.spashImage }
					resizeMode="contain"
					source={ require('../asset/logo.png') }/>
				<Text style={ styles.splashSubText }>
					Welcome to
				</Text>
				<Text style={ styles.splashText }>
					React Native
				</Text>
				<Text style={ styles.splashSubText }>
					React Native | Redux Saga
				</Text>

				{ isLoading &&
					<View style={ styles.splashLoader }>
						<ActivityIndicator 
							color="#fff"/>
					</View>
				}
			</View>
		)
	}
}

SplashContainer.navigationOptions = {
	title: 'Splash Screen'
};

const mapStateToProps = ({ app }) => {
	const isLoading = app.preloaders.indexOf('SPLASH') > -1
	return{
		isLoading
	}
}

export default connect(mapStateToProps)(SplashContainer);