import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, FlatList } from 'react-native';
import { ActionButton } from '../../generic/component/Button';
import { Touchable } from '../../generic/component/Touchable';
import styles from '../../generic/asset/styles';

const ListItem = ({ data, onPress }) => {
	return (
		<Touchable onPress={ onPress }>
			<View>
				<Text style={ styles.listItem }>{ data.key }</Text>
			</View>
		</Touchable>
	)
} 

class ListContainer extends React.Component{

	handleAdd = () => {
		const { navigate } = this.props.navigation;
		navigate("Add");
	}

	handleView = (data) => () => {
		const { navigate } = this.props.navigation;
		navigate("View", data);
	}

	render(){
		return(
			<View style={ styles.containerWrapper }>
				<FlatList
					data={[
						{ key: 'Devin' },
						{ key: 'Jackson' },
						{ key: 'James' },
						{ key: 'Joel' },
						{ key: 'John' },
						{ key: 'Jillian' },
						{ key: 'Jimmy' },
						{ key: 'Julie' },
					]}
					renderItem={({ item }) => <ListItem data={ item } onPress={ this.handleView(item) }/>} />
				<ActionButton onPress={ this.handleAdd } />
			</View>
		)
	}
}

ListContainer.navigationOptions = {
	title: 'LISTING',
};

export default ListContainer;