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

	componentWillReceiveProps(props){
		if(!_.isEqual(props.step, this.props.step)){
			const { last_step } = this.state;
			this.setState({
				last_step: (props.step > last_step) ? props.step : last_step
			})
		}
	}

	handleGoToStep = (nextStep) => {
		const { onChangeStep } = this.props;
		onChangeStep({ nextStep });
	}

	handlePrevStep = () => {
		const { step, onChangeStep } = this.props;
		if(step < 1) return;
		const nextStep = step - 1;
		onChangeStep({ nextStep });
	}

	handleNextStep = () => {
		const { steps, step, onChangeStep } = this.props;
		if(step > steps.length - 2) return;
		const nextStep = step + 1
		onChangeStep({ nextStep });
	}

	render(){

		const { steps, step, cancelComponent, submitComponent, onCancel, onSubmit } = this.props;
		
		const components = steps.map(s => s.component);

		const visibleStyle = (isHidden) => !isHidden ? styles.hidden : {}

		const { last_step } = this.state;

		return(
			<View style={ styles.wrapper }>
				<WizardHeader 
					steps={ steps }
					step={ step }
					lastStep={ last_step }
					onGoToStep={ this.handleGoToStep }/>
				<View style={ styles.body }>
					<WizardBody
						step={ step }
						components={ components } />
				</View>

				<View style={ styles.footer }>
					<TouchableOpacity
						onPress={ step === 0 ? onCancel : this.handlePrevStep }>
						<View style={ [ styles.footerButton ] }>
							<Ionicons  
								name={ step === 0 ? "md-close-circle" : "md-arrow-dropleft-circle" }
								size={48} 
								color="grey" />
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={ step === (steps.length - 1) ? onSubmit : this.handleNextStep }>
						<View style={ [ styles.footerButton, (step >= last_step) ? styles.hidden : {} ] }>
							<Ionicons  
								name={ step === (steps.length - 1) ? "md-checkmark-circle": "md-arrow-dropright-circle" }
								size={48} 
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
					showsHorizontalScrollIndicator={ false }>	
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

	componentWillReceiveProps(props){
		if(!_.isEqual(props.step, this.props.step)){
			this.wizBody.scrollTo({ x: this.getScrollPos(props.step) }, 2);
		}
	}

	getScrollPos = (step) => {
		let scrollTo = 0;

		for(let i = 0;i<step;i++){
			scrollTo += Dimensions.get('window').width
		}

		return scrollTo;
	}

	render(){

		const { components } = this.props;

		return(
			<ScrollView 
				style={{ flex: 1 }}
				ref={ ref => this.wizBody = ref }
				horizontal={ true } 
				scrollEnabled={ false }
				pagingEnabled={ true }
				showsHorizontalScrollIndicator={ false }>
				{ components.map((c,i) => {
					return <View 
						key={`c-${i}`} 
						style={ styles.bodyItem }>
						{ c }
					</View>
				})}
			</ScrollView>
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
		alignItems: "center",
		justifyContent: "center"
	},
	bodyItem: {
		flex: 1,
		width: Dimensions.get('window').width,
		alignItems: "center",
		justifyContent: "center"
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
	hidden: {
		opacity: 0
	}
})

export default Wizard;