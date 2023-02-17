/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-02-08 14:10:46
 * @Description: event 处理
 */

import { app, BrowserWindow, dialog, ipcMain, Notification, shell, systemPreferences } from 'electron'

import { createWindow } from 'core/window'
import { cget, cset, store } from '~/storage'

// 退出应用
const quitApp = () => {
  app.quit()
}

// 重启应用
const restartApp = () => {
  app.relaunch()
  quitApp()
}

// 重置应用
const resetApp = () => {
  store.clear()
  resetApp()
}

// 获取窗口
const getWindow = (event: Electron.IpcMainEvent): BrowserWindow => {
  return BrowserWindow.fromWebContents(event.sender) as any as BrowserWindow
}

// 获取窗口标题
const getWindowTitle = (event: Electron.IpcMainEvent): string => {
  return getWindow(event).getTitle()
}

// 应用事件
export const initIPC = () => {
  // 退出应用
  ipcMain.on('app-quit', () => {
    quitApp()
  })

  // 重启应用
  ipcMain.on('app-restart', () => {
    restartApp()
  })

  // 重置应用
  ipcMain.on('app-reset', () => {
    resetApp()
  })

  // 开机自启
  ipcMain.on('app-auto', (event, state: boolean) => {
    app.setLoginItemSettings({
      openAtLogin: state,
    })
  })

  // 开启窗口
  ipcMain.on('win-open', (event, name: string) => {
    createWindow(name)
  })

  // 关闭窗口
  ipcMain.on('win-close', (event) => {
    const win = getWindow(event)
    win.close()
  })

  // 重启窗口
  ipcMain.on('win-reload', (event) => {
    const win = getWindow(event)
    win.close()
    createWindow(win.title)
  })

  // 最小化窗口
  ipcMain.on('win-mini', (event) => {
    const win = getWindow(event)
    win.minimize()
  })

  // 置顶窗口
  ipcMain.on('win-top', (event, state: boolean) => {
    const win = getWindow(event)
    win.setAlwaysOnTop(state)
  })

  // 发送通知
  ipcMain.on('win-notice', (event, message: string) => {
    // 发送通知
    new Notification({ title: `Monit - ${getWindowTitle(event)}`, body: message }).show()
  })

  // 发送弹窗
  ipcMain.on('win-alert', (event, message: string) => {
    dialog.showMessageBox({
      type: 'warning',
      title: `Monit - ${getWindowTitle(event)}`,
      message: message,
    })
  })

  // 打开本地图像
  ipcMain.on('open-image', (event) => {
    event.returnValue = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: '图像', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'] }],
    })
  })

  // 打开网址
  ipcMain.on('open-url', (event, url: string) => {
    shell.openExternal(url)
  })

  // 保存值
  ipcMain.on('set-value', (event, key: string, value: string) => {
    cset(getWindowTitle(event), key, JSON.parse(value))
  })

  // 读取值
  ipcMain.on('get-value', function (event, key: string, define: string) {
    event.returnValue = cget(getWindowTitle(event), key, JSON.parse(define))
  })

  // 获取设备权限
  ipcMain.handle('get-media-permission', async (event, mediaType: 'microphone' | 'camera') => {
    const res = systemPreferences.getMediaAccessStatus(mediaType)
    return res === 'granted'
  })

  // 请求设备权限
  ipcMain.handle('request-media-permission', async (event, mediaType: 'microphone' | 'camera') => {
    const isAllowed = await systemPreferences.askForMediaAccess(mediaType)
    return isAllowed
  })
}
