import React from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

export class Touchable extends React.Component{
	render(){
		const { children, ...rest } = this.props;

		if(Platform.OS === "android"){
			return(
				<TouchableNativeFeedback
			        background={ TouchableNativeFeedback.SelectableBackground() }
			        { ...rest }>
			        { children }
		        </TouchableNativeFeedback>
			)
		}
		return(
			<TouchableOpacity
				{ ...rest }>
				{ children }
			</TouchableOpacity>
		)
	}
}