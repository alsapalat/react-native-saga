import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';

const AppDrawer = (props) => {
	return(
		<View>
			<View style={ styles.drawerHeaderWrapper }>
				{/*<Image
					source={ require('./modules/generic/asset/logo.png') }
					style={ styles.drawerHeaderIcon }/>*/}
				<Text style={ styles.drawerHeaderTitle }>React Native</Text>
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
		backgroundColor: "#2c3e50"
	},
	drawerHeaderIcon: {

	},
	drawerHeaderTitle: {
		color: "#fff",
		position: "absolute"
	}
})

export default AppDrawer;