import * as services from './Services';
import { Alert } from 'react-native';

const preloader = (key, set = true) => {
	if(!key)
		return { type: "CLEAR_PRE_LOADER" }
	if(set)
		return { type: "SET_LOADING", key }
	return { type: "DONE_LOADING", key }
}

const navigateTo = (key) => {
	return { type: "NAVIGATE_TO", key }
}

export const apiError = response => {
    if (!response) {
        alert("Whoops, looks like something went wrong.");
        return false;
    }

    if (!response.status) {
        alert("Response status not found, Please check your connection.");
        return true;
    }

    if (response.status === 422) {
        const errors = (response.data) ? response.data.errors : response.errors;
        //alert(errors);
        let errs = Object.keys(errors).map((e) => errors[e][0])
        alert(errs.join('\n'))
        return true;
    }

    if (response.status === 400) {
        alert(response.data ? response.data.message : response.message);
        return true;
    }

    if (response.status === 404) {
        alert(response.message);
        return true;
    }

    if (response.status === 403) {
        let msg = response.message;
        alert(msg);

        switch (msg) {
            default:
                return true;
        }
    }

    if (response.status !== 200) {
        alert(
            `Unregistered status "${response.status}", ${response.message}`
        );
    }

    return false;
};

const alert = (message) => {
    Alert.alert(message);
}

module.exports = {
	services,
	preloader,
	navigateTo,
	apiError
}