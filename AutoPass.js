// ==UserScript==
// @name         自动跳过按钮点击
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  定期检查并自动点击btn action-skip按钮
// @match        *://*.ewt360.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // 检查并点击按钮的函数
    const clickSkipButton = () => {
        // 使用更精确的选择器，这里假设btn action-skip是两个类名
        const skipButton = document.querySelector('.btn.action-skip');
        // 如果上面的选择器不行，也可以尝试以下选择器之一：
        // const skipButton = document.querySelector('.btn.action-skip');
        // const skipButton = document.querySelector('[class*="btn action-skip"]');
        
        if (skipButton) {
            skipButton.click();
            console.log('跳过按钮已点击 - ', new Date().toLocaleTimeString());
        } else {
            console.log('未找到跳过按钮 - ', new Date().toLocaleTimeString());
        }
    };

    // 页面加载完成后开始定期执行
    const init = () => {
        // 立即执行一次
        clickSkipButton();
        // 然后每1秒检查一次
        setInterval(clickSkipButton, 1000);
    };

    // 根据页面状态初始化
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();