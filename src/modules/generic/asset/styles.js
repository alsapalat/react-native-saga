import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50'
	},
	splashText: {
		fontSize: 24,
		textAlign: 'center',
		color: '#fff',
		opacity: 0.8
	},
	splashSubText: {
		fontSize: 14,
		textAlign: 'center',
		color: '#fff',
		opacity: 0.4
	},
	spashImage: {
		height: 64,
		width: 64,
		marginBottom: 15
	},
	splashLoader: {
		marginTop: 10
	},
	splashMessage: {
		color: "#fff",
		fontSize: 12,
		opacity: 0.2,
		marginTop: 20
	},
	splashButton: {
		marginTop: 50,
		color: "#fff",
		opacity: 0.8,
		fontWeight: "bold",
		fontSize: 14
	},
	drawerIcon: {
	    width: 24,
	    height: 24,
	},
	drawerButton: {
		marginLeft: 10,
		paddingLeft: 10,
		width: 100
	},
	containerWrapper: {
		height: "100%",
		width: "100%",
	},
	listItemWrapper: {
		height: 60,
		borderBottomWidth: 1,	
		borderBottomColor: "#aaa"
	},
	listItem: {
		height: "100%",
		width: "100%",
		textAlignVertical: "center",
		padding: 10,
	}
})