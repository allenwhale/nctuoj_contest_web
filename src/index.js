import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './js/stores/configureStore';
import RootRouter from './js/routes';

const store = configureStore();

if (typeof(document) !== 'undefined' && window) {
    Object.defineProperty(Object.prototype, 'mapArr', {
        value: function(f, reverse=false) {
            var self = this, list = Object.keys(this), res = [], cnt = 0;
            if(reverse)
                list = list.reverse();
            for(var i in list) {
                var key = list[i];
                if(key !== "null" && key !== "undefined" ) {
                    res.push(f.call(self, self[key], cnt++, key, self));
                }
            }
            return res;
        }
    });
    window.isNull = (x) => (x == null ? null : x);
    window.ord = (c) => c.charCodeAt(0);
    window.chr = (i) => String.fromCharCode(i);
    window.problemTitle = (problem) => problem.id ? `${chr(ord('A') + problem.id - 1)}. ${problem.title}` : "";
    window.onload = () => {
        return render(
            <Provider store={store}>
                <RootRouter/>
            </Provider>,
            document.getElementById('app')
        );
    };
}
