/*
 * @Author: fzf404
 * @Date: 2022-07-15 12:45:00
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-24 19:49:34
 * @Description: icp 事件发送
 */
import { ipcRenderer } from 'electron'

// 发送事件
export const sendEvent = (event: string, ...options: any) => {
  ipcRenderer.send(event, ...options)
}
// 调用事件
export const callEvent = (event: string, ...options: any): any => {
  return ipcRenderer.sendSync(event, ...options)
}

// 保存数据
export const setValue = (key: string, value: Object): void => {
  sendEvent('set-value', key, JSON.stringify(value))
}

// 读取数据
export const getValue = (key: string, define: Object): Object => {
  return callEvent('get-value', key, JSON.stringify(define))
}

// 发送通知
export const sendNotice = (message: string) => {
  sendEvent('window-notice', message)
}

// 发送弹窗
export const sendAlert = (message: string) => {
  sendEvent('window-alert', message)
}

// 打开网址
export const openURL = (url: string) => {
  sendEvent('open-url', url)
}