import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

class Time extends React.Component{

	static defaultProps = {
		initialTime: ''
	}

	state = {
		elapsed: 0
	}

	componentWillMount(){
		this.timer = setInterval(() => {
			this.updateTime();
		}, 1000)
	}

	updateTime = () => {
		this.setState({
			elapsed: this.state.elapsed + 1
		})
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}

	render(){

		const now = new Date().getTime() + this.state.elapsed

		return(
			<View>
				<Text>{ new Date(now).toString() }</Text>
			</View>
		)
	}
}

export default Time;

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,0.7)",
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		zIndex: 2,
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingMsg: {
		color: "#fff",
		marginTop: 10
	}
})