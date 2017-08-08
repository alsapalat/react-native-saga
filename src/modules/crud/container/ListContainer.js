import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, FlatList } from 'react-native';
import { ActionButton } from '../../generic/component/Button';
import { Touchable } from '../../generic/component/Touchable';
import styles from '../../generic/asset/styles';

import { MODULE_KEY } from '../constant';

const ListItem = ({ data, onPress }) => {
	return (
		<View style={ styles.listItemWrapper }>
			<Touchable onPress={ onPress }>
				<View>
					<Text style={ styles.listItem }>{ data.key }</Text>	
				</View>
			</Touchable>
		</View>
	)
} 

class ListContainer extends React.Component{

	handleAdd = () => {
		const { navigate } = this.props.navigation;
		navigate(`${MODULE_KEY}_Add`);
	}

	handleView = (data) => () => {
		const { navigate } = this.props.navigation;
		navigate(`${MODULE_KEY}_View`, data);
	}

	render(){
		return(
			<View style={ styles.containerWrapper }>
				<FlatList
					data={[
						{ key: 'Item 1' },
						{ key: 'Item 2' },
						{ key: 'Item 3' },
						{ key: 'Item 4' },
						{ key: 'Item 5' },
						{ key: 'Item 6' },
						{ key: 'Item 7' },
						{ key: 'Item 8' },
						{ key: 'Item 9' },
						{ key: 'Item 10' },
						{ key: 'Item 12' },
						{ key: 'Item 13' },
						{ key: 'Item 14' },
						{ key: 'Item 15' },
						{ key: 'Item 16' },
						{ key: 'Item 17' },
						{ key: 'Item 18' },
						{ key: 'Item 19' },
						{ key: 'Item 20' },
					]}
					renderItem={({ item }) => {
						return(
							<ListItem data={ item } onPress={ this.handleView(item) }/>
						)
					}} />
				<ActionButton onPress={ this.handleAdd } />
			</View>
		)
	}
}

export default ListContainer;