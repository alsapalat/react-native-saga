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

	handleOpenDrawer = () => {
		const { navigate } = this.props.navigation;
		navigate("DrawerOpen")		
	}

	render(){
		return(
			<View>
				<Text>
					//sub container page here...
				</Text>
				<Touchable onPress={ this.handleOpenDrawer }>
					<Text>
						Click to Open Drawer
					</Text>
				</Touchable>
			</View>
		)
	}
}

MainContainer.propTypes = {
  	navigation: PropTypes.object.isRequired,
};

MainContainer.navigationOptions = {
  	//title: 'Sub Page',
	drawerLabel: 'Sub Page',
	drawerIcon: ({ tintColor }) => (
		<Image
			source={ require('../asset/logo.png') }
			style={ [styles.drawerIcon, { tintColor: tintColor }] }
		/>
	)
};

export default MainContainer;