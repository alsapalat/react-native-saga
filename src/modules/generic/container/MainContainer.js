import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { Touchable } from '../component/Touchable';
import styles from '../asset/styles';

class MainContainer extends React.Component{

	handleNavigate = (key) => () => {
		const { navigate } = this.props.navigation;
		navigate(key);
	}

	componentDidMount(){
		const { navigate } = this.props.navigation;
		navigate("DrawerOpen");
	}

	render(){

		const textStyle = {
			height: 60,
			textAlignVertical: "center",
			padding: 10
		}

		return(
			<View>
				<Touchable
		            onPress={ this.handleNavigate('Sub') }>
					<View>
						<Text style={ textStyle }>Go sub page</Text>
					</View>
				</Touchable>
			</View>
		)
	}
}

MainContainer.propTypes = {
	navigation: PropTypes.object.isRequired,
};

MainContainer.navigationOptions = {
	//title: 'React Native',
	drawerLabel: 'Home',
	drawerIcon: ({ tintColor }) => (
		<Image
			source={ require('../asset/logo.png') }
			style={ [styles.drawerIcon, { tintColor: tintColor }] }
		/>
	)
};

export default MainContainer;