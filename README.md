# Internal Beyond · Cinema（观影室）

> 桌面端外置 DLC — 和 AI 一起看视频

Cinema 是 [Internal Beyond](https://github.com/Sui-IB/InternalBeyond) 的观影室模块，以独立脚本发布，由主文件一行 `<script>` 载入。选一部本机视频、选一位能识图的 TA，一起看——TA 能看到画面（按你选的画质定时截帧）、读字幕，在弹幕和聊天里和你聊这部片。

## 功能

- **银幕即入口**：选好视频后银幕变成待放映，点一下就开始。自动抓首帧做海报。
- **字幕与前情提要**：拖入同名 `.srt` / `.vtt` / `.ass` 字幕，TA 能读到台词；每次续播自动增量压缩前情梗概。
- **弹幕**：你和 TA 的话飞过画面，可关。
- **留影**：截一帧留在聊天里或只发给 TA。全屏下也有留影键。
- **胶片时间轴**：放映中左栏齿孔胶片条，每一格是一次对话、一次截帧或一段梗概；点一格弹出「这一刻」气泡——那一刻的截图和两人的对话，「回到这一刻」即跳转。
- **观影档案与票根**：每部片记第几次看、累计时长、看到哪；票根常驻左栏。
- **全屏输入与舞台拉杆**：全屏里也能打字、留影；舞台与字幕流之间的横向拉杆可拖。
- **画面画质五档**：360P / 512P / 720P / 1080P / 原画质。
- **看完后整片聊聊**：分段接力压整片字幕，写进聊天记录。
- **海报墙**：看过的片都在片库里，带海报、TA 的头像与片名。

## 安装

1. 把 `DLC/` 文件夹放到 `InternalBeyond.html` 同级目录。
2. 主文件里已有 `<script src="DLC/IB-Cinema.js"></script>`（导航 Memory 之后 · Signs 之前），无需手动添加。
3. 刷新页面，导航栏出现 **Cinema**。

缺失 `DLC/IB-Cinema.js` 时导航栏没有 Cinema，其余功能不受影响。

## 口径

- 视频与字幕不入 IndexedDB、不随备份、不续播（每次从头放，只在档案里记「看到哪」）。
- 聊天进「观影 · 片名」安静频道。
- 只发给能识图的 TA 画面。
- 桌面端不做主动开口（没有手机端的「TA 主动开口」）。
- 存档键一律 `pc_` 前缀，与手机端观影室彻底分开，备份来回倒互不相见。

## 版本

当前 **2.6.3**。完整更新日志见文件头部注释。

## 依赖

- [Internal Beyond](https://github.com/Sui-IB/InternalBeyond)（电脑端主文件 v117 及以上）
- 浏览器支持 `<video>` 与 Canvas

## 许可

© 2025–2026 Sui.

- **代码**：[PolyForm Noncommercial License 1.0.0](LICENSES/PolyForm-Noncommercial-1.0.0.md)
- **视觉素材与文档**：[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)（就 Sui 持有权利的部分）

非商业使用、修改与分享在保留署名和许可文件的前提下允许。售卖、付费分发、商业托管或打包进付费产品需要 Sui 的书面许可。

任何复制、部署、镜像、Fork 或修改版本，均须保留版权行、本 LICENSE 文件与 `LICENSES/` 文件夹、界面内的作者署名（Sui / 水、联系邮箱与原仓库链接）以及指向本仓库的可见链接。修改版须明确标注为非官方修改版。署名权属于作者本人，不随任何许可转让。

**本项目官方版本免费提供。如果你是通过付费方式获得的，那么你遇到了倒卖。**

## 联系

- 邮箱：1282901880@qq.com
- 主仓库：[github.com/Sui-IB/InternalBeyond](https://github.com/Sui-IB/InternalBeyond)
- 手机端：[github.com/Sui-IB/InternalBeyond-Mobile](https://github.com/Sui-IB/InternalBeyond-Mobile)

---

Designed by Sui · Built with Claude
