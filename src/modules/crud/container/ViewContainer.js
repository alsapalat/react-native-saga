import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

class ListContainer extends React.Component{

	render(){

		const { params } = this.props.navigation.state;
		
		return(
			<View>
				<Text>//view detail for "{ params.key }" here...</Text>
			</View>
		)
	}
}

export default ListContainer;