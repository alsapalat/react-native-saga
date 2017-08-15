import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

class Loader extends React.Component{

	static defaultProps = {
		label: "Loading..."
	}

	render(){

		return(
			<View style={ styles.wrapper }>
				<ActivityIndicator 
					size="large"
					color="#fff" />
				<Text style={ styles.loadingMsg }>
					{ this.props.label }
				</Text>
			</View>
		)
	}
}

export default Loader;

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