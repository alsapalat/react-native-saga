import React from 'react';
import { View, Text, Image, StyleSheet, Picker, ScrollView, Modal, Button, ViewPagerAndroid, Platform, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { ActionButton } from '../../generic/component/Button';
import styles from '../../generic/asset/styles';
import Wizard from '../component/Wizard';

class SummaryContainer extends React.Component{

	state = {
		_showModal: false,
		step: 0
	}

	handleChangePicker = (key) => (value, index) => {
		this.setState({
			[key]: value
		})
	}

	handleToggleModal = (_showModal) => () => {
		this.setState({
			_showModal
		})
	}

	handleChangeStep = ({ nextStep }) => {
		this.setState({
			step: nextStep
		})
	}

	render(){

		return(
			<View style={ [styles.containerWrapper, myStyles.wrapper ] }>
				<View style={ [myStyles.headerWrapper, myStyles.flexCenter] }>
					<View style={ myStyles.flexRow }>
						<Text style={ [myStyles.textWhite, myStyles.textXl] }>99,999</Text>
						<Text style={ [myStyles.textWhite, myStyles.textFaded, myStyles.textMd] }>php</Text>
					</View>
					<Text style={ [myStyles.textWhite, myStyles.textFaded] }>Total Expense</Text>
				</View>
				<View style={ myStyles.bodyWrapper }>
					<ScrollView>

					</ScrollView>
				</View>
				<ActionButton onPress={ this.handleToggleModal(true) } />

				<Modal
					animationType="slide"
					transparent={ false }
					visible={ this.state._showModal }
					onRequestClose={ this.handleToggleModal(false) }>
					<View style={ myStyles.flexCenter }>
						<Wizard 
							steps={[
								{
									label: "Step 1 - Instructions",
									index: 0,
									component: <ExpenseCategoryContainer /> 
								},{
									label: "Step 2 - Instructions",
									index: 1,
									component: <ExpenseDescriptionContainer />
								},{
									label: "Step 3 - Instructions",
									index: 2,
									component: <ExpenseSummaryContainer />
								},{
									label: "Step 4 - Instructions",
									index: 3,
									component: <ExpenseCategoryContainer /> 
								},{
									label: "Step 5 - Instructions",
									index: 4,
									component: <ExpenseDescriptionContainer />
								},{
									label: "Step 6 - Instructions",
									index: 5,
									component: <ExpenseSummaryContainer />
								}
							]}
							step={ this.state.step }
							onChangeStep={ this.handleChangeStep }/>
						<Button title="Close Modal" onPress={ this.handleToggleModal(false) }/>
					</View>
				</Modal>
			</View>
		)
	}
}

class ExpenseCategoryContainer extends React.Component{
	render(){
		return(
			<View><Text>Category</Text></View>
		)
	}
}

class ExpenseDescriptionContainer extends React.Component{
	render(){
		return(
			<View><Text>Description</Text></View>
		)
	}
}

class ExpenseSummaryContainer extends React.Component{
	render(){
		return(
			<View><Text>Summary</Text></View>
		)
	}
}


const myStyles = StyleSheet.create({
	headerWrapper: {
		backgroundColor: "#2c3e50",
		height: "40%"
	},
	bodyWrapper: {
		backgroundColor: "#ecf0f1",
		flex: 1
	},
	textWhite: {
		color: "#fff"
	},
	textFaded: {
		opacity: 0.4
	},
	textXl: {
		fontSize: 72
	},
	textLg: {
		fontSize: 48
	},
	textMd: {
		fontSize: 24
	},
	flexRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	flexCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	spaceBetween: {
		width: "40%",
		justifyContent: "space-between"
	}
})

export default SummaryContainer;

/*

<Text style={ myStyles.textWhite }>Filter By</Text>
<Picker
	style={ myStyles.textWhite }
	selectedValue={ this.state.filter_by }
	onValueChange={ this.handleChangePicker("filter_by") }>
	<Picker.Item label="Today" value="today" />
	<Picker.Item label="Weekly" value="week" />
	<Picker.Item label="Monthly" value="month" />
	<Picker.Item label="Annual" value="year" />
	<Picker.Item label="Custom Range" value="range" />
</Picker>
{ this.renderFilter(this.state.filter_by) }
renderPickerMonth = () => {
	return(
		<Picker
			style={ myStyles.textWhite }
			selectedValue={ this.state.filter_month }
			onValueChange={ this.handleChangePicker("filter_month") }>
			<Picker.Item label="January" value="1" />
			<Picker.Item label="February" value="2" />
			<Picker.Item label="March" value="3" />
			<Picker.Item label="April" value="4" />
			<Picker.Item label="May" value="1" />
			<Picker.Item label="June" value="2" />
			<Picker.Item label="July" value="3" />
			<Picker.Item label="August" value="4" />
			<Picker.Item label="September" value="1" />
			<Picker.Item label="October" value="2" />
			<Picker.Item label="November" value="3" />
			<Picker.Item label="December" value="4" />
		</Picker>
	)
}

renderPickerWeek = () => {
	return(
		<Picker
			style={ myStyles.textWhite }
			selectedValue={ this.state.filter_week }
			onValueChange={ this.handleChangePicker("filter_week") }>
			<Picker.Item label="Week 1" value="1" />
			<Picker.Item label="Week 2" value="2" />
			<Picker.Item label="Week 3" value="3" />
			<Picker.Item label="Week 4" value="4" />
		</Picker>
	)
}

renderFilter = (filter) => {
	switch(filter){
		case "week":
			return (
				<View>
					{ this.renderPickerMonth() }
					{ this.renderPickerWeek() }
				</View>
			)
		case "month":
			return (
				<View>
					{ this.renderPickerMonth() }
				</View>
			)
		default:
			return null;
	}
}
*/
