// ==UserScript==
// @name         EWT360自动点击脚本
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  检测lesson-finished-container元素并自动点击下一个课程项目，点击后等待5秒再判定
// @author       YourName
// @match        *://*.ewt360.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 配置参数
    const PARENT_CLASS_PREFIX = 'listCon';
    const CHILD_CLASS_PREFIX = 'item-IPNWw';
    const FINISHED_CLASS_PREFIX = 'lesson-finished-container';
    const CHECK_INTERVAL = 2000;    // 检查间隔时间(毫秒)
    const POST_CLICK_DELAY = 5000;  // 点击后等待时间(毫秒)
    
    let childElements = [];
    let currentClickIndex = 0;
    let checkTimer;

    // 主函数
    function main() {
        // 获取所有符合条件的父元素
        const parentElements = Array.from(document.querySelectorAll(`[class^="${PARENT_CLASS_PREFIX}"]`));

        if (parentElements.length === 0) {
            console.log('未找到课程列表容器，稍后重试');
            setTimeout(main, CHECK_INTERVAL);
            return;
        }

        // 获取所有子元素
        childElements = [];
        parentElements.forEach(parent => {
            const children = Array.from(parent.querySelectorAll(`[class^="${CHILD_CLASS_PREFIX}"]`));
            childElements.push(...children);
        });

        if (childElements.length === 0) {
            console.log('未找到课程项目，稍后重试');
            setTimeout(main, CHECK_INTERVAL);
            return;
        }

        // 检查完成状态
        checkFinishedStatus();
    }

    // 检查完成状态
    function checkFinishedStatus() {
        clearTimeout(checkTimer);
        
        const finishedElement = document.querySelector(`[class^="${FINISHED_CLASS_PREFIX}"]`);
        
        if (finishedElement) {
            console.log('检测到课程完成状态，准备点击下一个项目');
            clickNextItem();
        } else {
            console.log('未检测到课程完成状态，稍后重试');
            checkTimer = setTimeout(checkFinishedStatus, CHECK_INTERVAL);
        }
    }

    // 点击下一个项目
    function clickNextItem() {
        // 如果索引超出范围，重置为0
        if (currentClickIndex >= childElements.length) {
            currentClickIndex = 0;
            console.log('已点击完所有项目，从头开始');
        }

        const element = childElements[currentClickIndex];
        console.log(`点击第${currentClickIndex + 1}个项目`, element);

        // 模拟点击
        element.click();
        currentClickIndex++;

        // 等待5秒后再检查状态
        console.log(`点击完成，等待${POST_CLICK_DELAY/1000}秒后进行下一次检测`);
        checkTimer = setTimeout(() => {
            checkFinishedStatus();
        }, POST_CLICK_DELAY);
    }

    // 初始化
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(main, 1000);
    } else {
        document.addEventListener('DOMContentLoaded', main);
    }
})();