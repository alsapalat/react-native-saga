import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
	wrapper:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	content: {
		position: "relative",
		zIndex: 1,
		width: Dimensions.get('window').width * 0.8
	},
	contentFull: {
		position: "relative",
		zIndex: 1,
		width: Dimensions.get('window').width * 0.98
	},
	center: {
		alignItems: "center"
	},
	textCenter: {
		textAlign: "center"
	},
	label: {
		fontWeight: "bold"
	},
	formGroup: {
		marginBottom: 5
	},
	formControl: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 5,
		paddingRight: 10,
		paddingLeft: 10,
		marginBottom: 5,
		borderRadius: 25,
		backgroundColor: "#fff",
		overflow: "hidden"
	},
	btnRound: {
		borderRadius: 25,
		overflow: "hidden"
	}
})