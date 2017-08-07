import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { DrawerItems } from 'react-navigation';

const AppDrawer = (props) => {
	return(
		<View>
			<View style={ styles.drawerHeaderWrapper }>
				<Image
					source={ require('./modules/generic/asset/logo.png') }
					style={ styles.drawerHeaderIcon }/>
				<Text style={ styles.drawerHeaderTitle }>React Native</Text>
				<Text style={ styles.drawerHeaderSubTitle }>REDUX | SAGA</Text>
			</View>
			<ScrollView>
				<DrawerItems { ...props } />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	drawerHeaderWrapper: {
		height: 100,
		backgroundColor: "#2c3e50",
		overflow: "hidden"
	},
	drawerHeaderIcon: {
		opacity: 0.1,
		position: "absolute",
		right: "-20%",
		top: "-20%"
	},
	drawerHeaderTitle: {
		color: "#fff",
		position: "absolute",
		bottom: 17,
		fontSize: 24,
		left: 10
	},
	drawerHeaderSubTitle: {
		color: "#fff",
		position: "absolute",
		bottom: 5,
		left: 10,
		opacity: 0.6
	}
})

export default AppDrawer;