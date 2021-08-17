"use strict";

import Vue from 'vue';
import axios from "axios";
import toastr from 'toastr';

let config = {
    baseURL: "http://localhost:4200/api/",
    // timeout: 60 * 1000, // Timeout,
    // withCredentials: true, // Check cross-site Access-Control
};

const token = localStorage.getItem("token");
//
if (token) {
    config['headers'] = {
        "Authorization":token,
    }
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        if (error.response.status === 400) {
            if (error.response.data === "Invalid Token") {
               toastr.info("Session expired", "Please Login");
                localStorage.removeItem("token");
                setTimeout(() => {
                    window.location.href = "/login"
                }, 3000)
            }
        }
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;
