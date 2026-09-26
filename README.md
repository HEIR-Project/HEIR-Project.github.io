# HEIR anonymous project page

A dependency-free static page for anonymous ICLR 2027 supplementary materials. Layout inspired by [Robometer](https://github.com/robometer/robometer.github.io); implemented independently without copying its research content, media, or code.

## 填写内容

编辑 `assets/project.js`：

- `title` / `subtitle`：项目简称 / 论文完整标题。
- `abstract`：论文摘要。
- `dataset` / `code`：说明及匿名访问链接。URL 为空时显示未提供状态，不生成无效下载按钮。
- `heroVideo`：可选的首屏背景视频路径。
- `videos`：演示视频列表，示例如下。

```js
videos: [
  {
    title: 'Overview',
    src: 'assets/videos/overview.mp4',
    poster: '',
    captions: '' // 可选英文 WebVTT 字幕路径
  }
]
```

小型视频放入 `assets/videos/`，小型下载文件放入 `assets/downloads/`。大型数据集和视频请托管在支持匿名访问的存储中，填入 HTTPS 链接。不要将大文件直接提交到页面仓库。

页面为英文。未填充的内容明确标为占位，不包含虚构结果或资源。基础页面无需 JavaScript 也能阅读；配置内容需要 JavaScript。

## 本地预览

在仓库根目录运行 `python3 -m http.server 8000`，浏览器打开 http://localhost:8000。

## GitHub Pages

仓库 Settings → Pages → Build and deployment，选择 **Deploy from a branch**，分支 **main**、目录 **/(root)**。发布后地址为 https://heir-project.github.io/ 。`.nojekyll` 使静态资源直接发布，无需构建或依赖安装。

## 匿名维护

页面不包含作者、单位、邮箱、个人主页、追踪代码或第三方字体。添加资源时请同时检查下载链接、文件元数据、视频画面/音轨和代码压缩包中的身份信息。`noindex` 仅请求搜索引擎不收录，不是访问控制。公开 GitHub 仓库的历史和组织成员信息不受页面匿名化控制；不要向评审提供可能暴露身份的链接。此模板不代表会议匿名政策合规认证。
