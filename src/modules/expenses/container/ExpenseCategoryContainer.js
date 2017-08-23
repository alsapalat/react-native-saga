import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ExpenseCategoryContainer extends React.Component{

	state = {
		categories: [
			{
				id: 0,
				icon: 'md-subway',
				name: 'Transportation',
				color: ''
			},{
				id: 1,
				icon: 'md-game-controller-b',
				name: 'Tech',
				color: ''
			},{
				id: 2,
				icon: 'md-restaurant',
				name: 'Food',
				color: ''
			},{
				id: 3,
				icon: 'md-phone-portrait',
				name: 'Mobile Data',
				color: ''
			},{
				id: 4,
				icon: 'md-cube',
				name: 'Other',
				color: ''
			}
		]
	}

	handleSelectCategory = (category) => {
		const { dispatch } = this.props;
		dispatch({
			type: "EXPENSES/include",
			data: {
				category,
				step: 1
			}
		})
	}

	render(){

		const { categories } = this.state;
		const { category } = this.props;

		return(
			<View>
				<View style={ myStyles.gridWrapper }>
					{ categories.map((cat, i) => {
						return(
							<View style={ myStyles.gridItem } key={`category-${i}`}>
								<CategoryItem 
									data={ cat }
									isActive={ (category.id === cat.id) }
									onPress={ this.handleSelectCategory } />
							</View>
						)
					})}
				</View>
			</View>
		)
	}
}

class CategoryItem extends React.Component{

	handleOnPress = (data) => () => {
		this.props.onPress(data);
	}

	render(){

		const { data, isActive } = this.props;

		return(
			<TouchableOpacity  
				onPress={ this.handleOnPress(data) }>
				<View 
					style={ isActive ? [ myStyles.categoryWrapper, myStyles.categoryActive ] : myStyles.categoryWrapper }>
					<View>
						<Ionicons  
							name={ data.icon }
							size={ 64 } 
							color="#fff" />
					</View>
					<View>
						<Text style={ myStyles.categoryText }>
							{ data.name }
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}


const myStyles = StyleSheet.create({
	gridWrapper:{
		flexDirection: 'row',
        flexWrap: 'wrap',
	},
	gridItem: {
		padding: 4,
        width: "50%"
	},

	categoryWrapper: {
		backgroundColor: '#34495e',
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.2)",
		overflow: "hidden"
	},
	categoryText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 12
	},
	categoryActive:{
		backgroundColor: '#16a085',
	}
})

const mapStateToProps = ({ expenses }) => {
	const { category } = expenses.selected || {}
	return {
		category: category || {}
	}
}

export default connect(mapStateToProps)(ExpenseCategoryContainer);