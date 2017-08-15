import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Button, Text, TextInput, Image, Modal } from 'react-native';
import styles from './styles';

import RecordsContainer from './RecordsContainer';
import Time from '../component/Time';

class MainContainer extends React.Component{

	state = {
		_showModal: false
	}

	componentWillMount(){
		const { dispatch } = this.props;
		dispatch({
			type: "EDTR_CHECK_AUTH",
			args: this.state
		})
	}

	handleLogout = () => {
		const { dispatch } = this.props;
		dispatch({
			type: "EDTR_LOGOUT"
		})
	}

	handleToggleModal = (_showModal) => () => {
		this.setState({ _showModal });
	}

	render(){

		const { profile } = this.props;

		return(
			<View style={ styles.wrapper }>
				<View style={ [styles.contentFull, styles.center] }>
					<View>
						<Text onPress={ this.handleLogout }>Logout</Text>
					</View>
					<View>
						<Image
							source={{ uri: profile.photo }} 
							style={{
								width: 100,
								height: 100
							}}/>
					</View>
					<View>
						<Text>{ profile.name || "" }</Text>
					</View>
					
					<Time initialTime="12:00:00 am"/>
					
					<RecordsContainer />

					<View style={{ width: "100%"}}>
						<Button title="Time-In" onPress={ this.handleToggleModal(true) }/>
					</View>
				</View>

				<Modal
					animationType="slide"
					transparent={ false }
					visible={ this.state._showModal }
					onRequestClose={ this.handleToggleModal(false) }>
					<View>
						<RecordsContainer.TimeInOutModal />
						<Button title="Close Modal" onPress={ this.handleToggleModal(false) }/>
					</View>
				</Modal>
			</View>
		)
	}
}

const mapStateToProps = ({ edtr }) => {

	const { profile } = edtr;

	return {
		profile
	}
}

export default connect(mapStateToProps)(MainContainer);