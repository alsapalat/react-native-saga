import React from 'react';
import { connect } from 'react-redux';
import { 
	View, 
	Text, 
	Image, 
	ActivityIndicator, 
	ScrollView, 
	RefreshControl, 
	Dimensions, 
	Picker,
	StyleSheet } from 'react-native';
import { MapView } from 'expo';
import styles from './styles';
import _ from 'lodash';

class RecordsContainer extends React.Component{

	state = {
		filter: 'today'
	}

	componentDidMount(){
		this.getRecords();
	}

	handleChangePicker = (key, cb) => (value, index) => {
		this.setState({
			[key]: value
		}, () => { if(cb) cb(); })
	}


	getRecords = () => {
		const { dispatch } = this.props;
		dispatch({
			type: "EDTR_GET_RECORDS",
			args: {
				filter: this.state.filter
			}
		})
	}

	handleRefresh = () => {
		this.getRecords();
	}

	render(){

		const { isLoading, data } = this.props;

		const items = data;

		return(
			<View 
				style={[
					{
						height: Dimensions.get('window').height * 0.5, 
						width: "100%",
						padding: 5
					}
				]}>
				<View>	
					<Picker
						selectedValue={ this.state.filter }
						onValueChange={ this.handleChangePicker("filter", this.getRecords) }>
						<Picker.Item label="Today" value="today" />
						<Picker.Item label="Weekly" value="week" />
						<Picker.Item label="Monthly" value="cutoff" />
					</Picker>
				</View>

				<View style={ [ s.recordContent ] }>
        			<Text style={ styles.label }>TYPE</Text>
        			<Text style={ styles.label }>DATE</Text>
        			<Text style={ styles.label }>TIME</Text>
    			</View>
				<ScrollView
					refreshControl={ <RefreshControl
			            refreshing={ isLoading }
			            onRefresh={ this.handleRefresh } /> 
			        }>
			        { items.map((item, i) => {
			        	return(
			        		<View style={ [s.recordItem, i % 2 === 0 ? s.listTick : s.listTok ] } key={`record-${i}`}>
			        			<View style={ s.recordContent }>
				        			<Text style={ styles.center }>{ item.type }</Text>
				        			<Text style={ styles.center }>{ item.date }</Text>
				        			<Text style={ styles.center }>{ item.time }</Text>
			        			</View>
							</View>
			        	)	
			        })}
					
				</ScrollView>
			</View>
		)
	}
}

const s = StyleSheet.create({
	recordItem: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		height: 50,
		borderTopColor: "rgba(0,0,0,0.1)",
		borderBottomColor: "rgba(0,0,0,0.1)",
		padding: 3
	},
	listTick: {
		backgroundColor: "transparent"
	},
	listTok: {
		backgroundColor: "rgba(0,0,0,0.05)"
	},
	recordContent: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
})

const mapStateToProps = ({ app, edtr }) => {
	const isLoading = app.preloaders.indexOf('EDTR_GET_RECORDS') > -1
	const data = edtr.records;
	return{
		isLoading,
		data
	}
}

class TimeInOutModal extends React.Component {

	state = {
		long: 0,
		lat: 0
	}

	componentDidMount(){
		this.getGeo();
	}

	getGeo = () => {
		const me = this;
		navigator.geolocation.getCurrentPosition(
			(data) => {
				const { coords } = data;
				this.setState({
					long: coords.longitude,
					lat: coords.latitude
				})
			},
			(err) => {
				console.log(err);
			})
	}

	render(){

		const { long, lat } = this.state;

		const w = Dimensions.get('window')

		const height = w.height * 0.8
		const width = w.width

		return(
			<View>
				<Text>{`long: ${long}, lat: ${lat}`}</Text>
				<View style={{ height, width, marginTop: 10 }}>
					{ (long !== 0 && lat !== 0) ?	
						<MapView
					        style={{ flex: 1 }}
					        initialRegion={{
								latitude: lat,
								longitude: long,
								latitudeDelta: 0.009,
								longitudeDelta: 0.004
					        }}>
					        <MapView.Marker
								coordinate={{
									latitude: lat,
									longitude: long,
								}}
								title="Your Location"
								description="Here..." />
				      	</MapView>
				      	:
				      	<Text>Loading Map...</Text>
			      	}
				</View>
			</View>
		)
	}
}

RecordsContainer.TimeInOutModal = TimeInOutModal

export default connect(mapStateToProps)(RecordsContainer);