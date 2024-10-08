/*
Template Name: Tailwick - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: Themesdesign@gmail.com
File: Layout Js File
*/

(function () {

    'use strict';

    if (localStorage.getItem('defaultAttribute')) {
        var attributesValue = document.documentElement.attributes;
        var CurrentLayoutAttributes = {};
        for (var i = 0; i < attributesValue.length; i++) {
            var attribute = attributesValue[i];
            if (attribute.nodeName && attribute.nodeName != "undefined") {
                var nodeKey = attribute.nodeName;
                CurrentLayoutAttributes[nodeKey] = attribute.nodeValue;
            }
        }
        if (JSON.stringify(CurrentLayoutAttributes) !== localStorage.getItem('defaultAttribute')) {
            // localStorage.clear();
            // location.reload();
        } else {
            var isLayoutAttributes = {
                'data-layout': localStorage.getItem('data-layout'),
                'data-skin': localStorage.getItem('data-skin'),
                'data-mode': localStorage.getItem('data-mode'),
                'dir': localStorage.getItem('dir'),
                'data-content': localStorage.getItem('data-content'),
                'data-sidebar-size': localStorage.getItem('data-sidebar-size'),
                'data-navbar': localStorage.getItem('data-navbar'),
                'data-sidebar': localStorage.getItem('data-sidebar'),
                'data-topbar': localStorage.getItem('data-topbar'),
            };

            for (var x in isLayoutAttributes) {
                if (isLayoutAttributes[x] && isLayoutAttributes[x]) {
                    document.documentElement.setAttribute(x, isLayoutAttributes[x]);
                }
            }
        }
    }
})();