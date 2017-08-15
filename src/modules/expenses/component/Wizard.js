import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

class Wizard extends React.Component{

	static defaultProps = {
		steps: []
	}

	state = {
		last_step: 0
	}

	handleGoToStep = (nextStep) => {
		const { last_step } = this.state;
		const { step, onChangeStep } = this.props;

		onChangeStep({ nextStep });
		this.setState({
			last_step: (nextStep > last_step) ? nextStep : last_step
		})
	}

	handlePrevStep = () => {
		const { last_step } = this.state;
		const { step, onChangeStep } = this.props;

		if(step < 1) return;
		
		const nextStep = step - 1

		onChangeStep({ nextStep });

		this.setState({
			last_step: (nextStep > last_step) ? nextStep : last_step
		})
	}

	handleNextStep = () => {
		const { last_step } = this.state;
		const { steps, step, onChangeStep } = this.props;
		if(step > steps.length - 2) return;
		
		const nextStep = step + 1

		onChangeStep({ nextStep });

		this.setState({
			last_step: (nextStep > last_step) ? nextStep : last_step
		})
	}

	render(){

		const { steps, step } = this.props;

		const components = steps.map(s => s.component);

		return(
			<View style={ styles.wrapper }>
				<WizardHeader 
					steps={ steps }
					step={ step }
					lastStep={ this.state.last_step }
					onGoToStep={ this.handleGoToStep }/>
				<View style={ styles.body }>
					<ScrollView>	
						<Text>BODY HERE</Text>
						<WizardBody
							step={ step }
							components={ components } />
					</ScrollView>
				</View>
				<View style={ styles.footer }>
					<TouchableOpacity
						onPress={ this.handlePrevStep }>
						<View style={ styles.footerButton }>
							<Ionicons  
								name="md-arrow-round-back" 
								size={32} 
								color="grey" />
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={ this.handleNextStep }>
						<View style={ styles.footerButton }>
							<Ionicons  
								name="md-arrow-round-forward" 
								size={32} 
								color="grey" />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

class WizardHeader extends React.Component{

	static defaultProps = {
		lastStep: 0,
		steps: []
	}

	state = {
		headers: {}
	}

	componentWillReceiveProps(props){
		if(!_.isEqual(props.step, this.props.step)){
			this.wizHeader.scrollTo({ x: this.getScrollPos(props.step) }, 1);
		}
	}

	handleGoToStep = (step) => () => {
		const { lastStep, onGoToStep } = this.props;
		if(step > lastStep) return;
		onGoToStep(step);
	}

	getScrollPos = (id) => {
		const { headers } = this.state;
		const header = headers[id];
		if(!header) return 0;

		let scrollTo = 0;

		for(let i = 0;i<Object.keys(headers).length;i++){
			if (i < id)
				scrollTo += headers[i].width
		}

		return scrollTo;
	}

	getStepStyle = (current, last, step) => {
		if(current === step)
			return [ styles.headerItem, styles.headerActive ]
		if(step <= last)
			return [ styles.headerItem, styles.headerEnabled ]
		return [ styles.headerItem, styles.headerDisabled ]
	}

	handleSetLayout = (id) => (e) => {
		this.setState({
			headers: _.assign({}, this.state.headers, {
				[id]: e.nativeEvent.layout
			})
		})
	}

	render(){

		const { step, steps, lastStep } = this.props;

		return(
			<View style={ styles.header }>
				<ScrollView 
					ref={ ref => this.wizHeader = ref }
					horizontal={ true } 
					showsHorizontalScrollIndicator={ false}>	
					{ steps.map((item, i) => {
						const stepStyle = this.getStepStyle(step, lastStep, i)
						return(
							<View key={i} onLayout={ this.handleSetLayout(i) }>
								<Text 
									style={ stepStyle }
									onPress={ this.handleGoToStep(item.index) }>
									{ item.label }
								</Text>
							</View>
						)
					})}
				</ScrollView>
			</View>
		)
	}
}

class WizardBody extends React.Component{

	render(){

		const { components } = this.props;

		return(
			<View style={ styles.flexRow }>
				{ components.map((c,i) => {
					return <View 
						key={`c-${i}`} 
						style={ styles.wizardPageWrapper }>
						{ c }
					</View>
				})}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: "space-between",
		width: "100%"
	},
	header: {
		height: 50
	},
	headerItem: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10
	},
	headerActive: {
		color: "#16a085",
		fontWeight: "bold"
	},
	headerEnabled: {

	},
	headerDisabled: {
		opacity: 0.3
	},
	body: {
		flex: 1,
		backgroundColor: "#0f0"
	},
	footer:{
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	footerButton: {
		padding: 10
	},


	wizardWrapper: {
		flex: 1,
		backgroundColor: "#f00"
	},
	wizardPageWrapper: {
		width: "30%"
	},
	stepsWrapper: {

	},
	stepsContent: {

	},
	
	flexRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	flexCenter: {
		justifyContent: "center",
		alignItems: "center"
	},
	spaceBetween: {
		width: "40%",
		justifyContent: "space-between"
	}
})

export default Wizard;