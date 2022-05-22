# Monit

> 用于实时监控自己的 Github 信息
> 
> 使用 vue + electron 开发
> 
> [下载](https://github.com/fzf404/Monit/releases)

<img src="./show.jpeg" alt="首页展示图" style="zoom: 50%;" />

## 介绍

> 每 60s 发送一次请求

1. 左上角第三个按钮的作用是`置顶/取消置顶`
2. 左侧依次为用户获得的`follower、star、fork`总数
3. 当数字变动时点击可查看变动详情
4. 右侧为全部仓库及`star`数，点击可跳转到仓库详情，仓库列表可以滚动
5. 网络异常时右上角会有一个断网指示

### 其他玩法

> 也可以用来看别人的信息捏



## 安装

> 由于咱没有 Apple 开发者账号, Mac 安装完成后需要运行如下命令, 不然会出现 `Monit.app 已损坏` 的错误
> 
> [参考链接](https://macwk.com/article/macos-file-damage)


```bash
sudo xattr -rd com.apple.quarantine [应用位置](将应用程序中的 Monit 拖进来)
```

## 插件开发

> 接入其他平台`知乎、CSDN、BiliBili`
> 
> 待完善...


## Todo

- [x] 页面结构
- [x] 基本功能
- [x] 菜单设置
- [x] 无网络提示
- [x] 仓库可滚动
- [x] 自动检查更新
- [x] 开机自启
- [x] 消息通知
- [ ] 接入更多平台