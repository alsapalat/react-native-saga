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

export class DrawerButton extends React.Component{

	handleOpenDrawer = () => {
		const { navigation } = this.props;
		navigation.navigate("DrawerOpen") 
	}

	render(){
		return(
			<View style={ styles.drawerWrapper } >
				<TouchableOpacity onPress={ this.handleOpenDrawer }>
					<View>
						<Text style={ styles.drawerIcon }>☰</Text>
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
		right: 15,
		overflow: "hidden"
	},
	actionButtonText: {
		height: "100%",
		textAlign: "center",
		textAlignVertical: "center",
		color: "#fff",
		fontSize: 24
	},
	drawerWrapper: {
		width: 50,
	},
	drawerIcon: {
		height: "100%",
		textAlign: "center",
		textAlignVertical: "center",
		color: "#2c3e50",
		fontSize: 30,
	}
})
