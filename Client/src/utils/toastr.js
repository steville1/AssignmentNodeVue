"use strict";

import Vue from 'vue';
import toastr from 'toastr';


Plugin.install = function (Vue) {
    Vue.toastr = toastr;
    window.toastr = toastr;
    Object.defineProperties(Vue.prototype, {
        toastr: {
            get() {
                return toastr;
            }
        },
        $toastr: {
            get() {
                return toastr;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;