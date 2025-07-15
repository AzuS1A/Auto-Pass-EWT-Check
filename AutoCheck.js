// ==UserScript==
// @name         自动点击3LStS按钮
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  定期检查并自动点击特定类名的按钮
// @match        *://*.ewt360.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // 检查并点击按钮的函数
    const clickButton = () => {
        const button = document.querySelector('.btn-3LStS');
        if (button) {
            button.click();
            console.log('按钮已点击 - ', new Date().toLocaleTimeString());
        } else {
            console.log('未找到按钮 - ', new Date().toLocaleTimeString());
        }
    };

    // 页面加载完成后开始定期执行
    const init = () => {
        // 立即执行一次
        clickButton();
        // 然后每1秒检查一次
        setInterval(clickButton, 1000);
    };

    // 根据页面状态初始化
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();