import axios from "axios";
import { AsyncStorage } from 'react-native';
import { endPoint } from "../config/app";
import _ from "lodash";

const getToken = async () => {
    const token = await AsyncStorage.getItem("@EDTR:token");
    return !_.isNil(token) ? token : false;
};

export const transform = object => {
    let arr = [];
    for (let p in object) {
        if (object.hasOwnProperty(p) && !Array.isArray(object[p])) {
            arr.push(
                encodeURIComponent(p) + "=" + encodeURIComponent(object[p])
            );
        }

        if (Array.isArray(object[p])) {
            object[p].forEach((item, key) => {
                arr.push(
                    encodeURIComponent(`${p}[${key}]`) +
                        "=" +
                        encodeURIComponent(item)
                );
            });
        }
    }
    return arr.join("&");
};

const instance = axios.create({
    timeout: 300000,
    baseURL: endPoint,
    transformRequest: transform,
    transformResponse: (response) => {
        return JSON.parse(response);
    },
    validateStatus: (status) => {
        return status >= 200;
    }
});
export const post = uri => async args => {
    // const token = await getToken();
    // if(token) {
    //     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }

    // return instance
    //     .post(uri, args)
    //     .then(response => {
    //         return response;
    //     })
    //     .catch(error => {
    //         return error;
    //     });
    const token = await getToken();
    return fetch(`${endPoint}${uri}`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(args || {})
    })
        .then(response => {
            return _.assign({}, {
                data: JSON.parse(response._bodyInit),
                status: response.status
            });
        })
        .catch(err => {
            return err;
        })
};

export const put = uri => async args => {
    const token = await getToken();
    if(token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return instance
        .put(uri, args)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const get = uri => async params => {
    const token = await getToken();
    return fetch(`${endPoint}${uri}`,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return _.assign({}, {
                data: JSON.parse(response._bodyInit),
                status: response.status
            });
        })
        .catch(err => {
            return err;
        })
    // const token = await getToken();
    // if(token) {
    //     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }

    // return instance
    //     .get(uri, {
    //         params
    //     })
    //     .then(response => {
    //         return response;
    //     })
    //     .catch(error => {
    //         return error;
    //     });
};

export const getFullUrl = uri => {
    return `${endPoint}/${uri}?token=${getToken()}`
}

export const postFormData = url => (formdata, onProgress) => {
    return new Promise((resolve, reject) => {
        try{
            var xhr = new XMLHttpRequest();
            xhr.timeout = 300000;
            xhr.addEventListener("timeout", function(e) {
                return resolve({
                    status: 400,
                    message: "Request Timeout, Please try again."
                })
            });
            xhr.open('POST', `${endPoint}${url}?token=${getToken()}`);
            xhr.onload = () => {
                const jsonResponse = JSON.parse(xhr.response);
                const response = {
                    status: jsonResponse.status,
                    data: jsonResponse
                }
                return resolve(response);
            };
            xhr.onerror = () => {
                const errRes = {
                    data: false,
                    message: "Oops..Something went wrong."
                }
                return resolve(errRes)
            }

            if (xhr.upload) {
                xhr.upload.onprogress = (evt) => {
                    if (evt.lengthComputable) {
                        var progress = Math.ceil(((evt.loaded) / evt.total) * 100);
                        if(onProgress)
                            onProgress(progress)
                    }
                    
                }
            }

            xhr.send(formdata);

        }catch(err){
            return reject(err);
        }
    })
}