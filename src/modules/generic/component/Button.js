import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export class ActionButton extends React.Component{

	render(){

		const { onPress } = this.props;

		return(
			<View style={ styles.actionButtonWrapper } >
				<TouchableOpacity onPress={ onPress }>
					<View>
						<Text style={ styles.actionButtonText }>+</Text>
					</View>				
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	actionButtonWrapper: {
		backgroundColor: "#2c3e50",
		width: 64,
		height: 64,
		borderRadius: 32,
		elevation: 1,
		position: "absolute",
		bottom: 15,
		right: 15
	},
	actionButtonText: {
		height: "100%",
		textAlign: "center",
		textAlignVertical: "center",
		color: "#fff",
		fontSize: 24
	}
})
