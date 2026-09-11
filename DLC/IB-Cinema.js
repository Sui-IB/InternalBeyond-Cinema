/* Internal Beyond · 观影室（桌面端外置 DLC）2.6.3 —— 文件名 IB-Cinema.js
   2.6.3：「最近在看」银幕右上角新增小删除圆钮（垃圾桶、玻璃圆底，确认后走 delRec——记录、档案、字幕缓存与「观影室 · 片名」频道一并删除）；原左下角「删除记录」文字键随之撤下（待放映态的「取消」不动，海报墙每张卡的 × 不动）。
   2.6.2：①「离开放映」删去「本次 X 分钟 · 看到 X:XX · 胶片…」统计行——这些都会写进观影档案，弹窗里只留问题与三键；随手拆掉只为这行算的四个临时变量。②说明文字加深加重：原 0.86rem、八成透明度压在放映画面上发灰，改 0.88rem、字重 450、明暗各给实色（明 #22406e / 暗 rgba(228,238,252,0.94)），h3 副题透明度 .55 → .68，标题与说明间距 6 → 12px，三键字重 500。
   2.6.1：离开放映确认框对齐主文件 API 页归档区的对话框——遮罩用主文件 .group-dialog-overlay（同一档 12px 模糊与暗度），面板用 .group-dialog（实色、16px 圆角、无 backdrop-filter、无 transform），自有样式只留宽度与排版。
   放在 InternalBeyond.html 同级的 DLC/ 目录，由主文件 <script src="DLC/IB-Cinema.js"> 载入（导航 Memory 之后 · Signs 之前）；缺失时导航栏没有 Cinema，其余功能不受影响。单独发布于 github.com/Sui-IB/InternalBeyond-Cinema。
   2.6.0（只动本文件；主文件那一行 <script src> 要改成 DLC/IB-Cinema.js）：①视频库左栏：「Choose a Film」挪到「观影室」标题正下方成独立一整行按钮，去掉主色、改与页面其它按钮同款的浅底；②「片库」→「视频库」（四处文案）；③「最近在看」银幕不再露截图：海报只做一层重模糊（blur 44px）色块铺满，只见色彩不见画面，减少动效下改成不模糊的 0.35 透明度；④文件名与目录改 DLC / IB-Cinema.js。
   口径沿手机端观影室：视频与字幕不入库、不随备份、不续播（每次从头放，只在档案里记「看到哪」）；聊天进「观影 · 片名」安静频道；只发给能识图的 TA 画面；桌面端不做主动开口（没有手机端的「TA 主动开口」）。
   2.5.0（只动本文件，主文件一字未动；存档键兼容、提示词、发送链不变）：①离开放映确认框整个重做——不再借用主文件的 .modal-overlay / .modal / .glass-card / .ibs-* 任何一个类（那些类自带 backdrop-filter、transform 居中与入场动画，在用户机器上把弹窗压成了模糊的合成层，模块里再怎么覆盖也拼不过它们的特异度），改用模块自己的 #ci-exit-ov 遮罩 + .ci-exit-dlg 面板：flex 居中、无 transform、无 filter、无 backdrop-filter、只有遮罩淡入；面板实色（暗 rgba(18,26,46,.985) / 亮 rgba(250,253,255,.99)），关键属性加 !important；全屏时挂到 fullscreenElement 下。②画面画质补两档：1080P（宽 1920）与原画质（原分辨率、JPEG 0.95）；说明写明大帧更贵更慢。③胶片时间轴点一格＝弹出「这一刻」气泡（.ci-mem）：那一刻的截图 + 两人的对话；截图优先用格子自带的缩略图，没有的（旧 Talk 格、梗概、记一笔）用一个离屏 <video> 定位到那一刻抓一帧、抓到后写回格子（下次即开），对话优先用格子上存的 q / a（2.5.0 起 Talk 格随发送存下你的原话与 TA 的回复），老格子按 ts 去频道最近消息里找最接近的一问一答；气泡里「回到这一刻」才跳转（此前点格子直接跳）。④时间轴上的「提问」显示为 Talk（存档里的 kind 仍是「提问」，兼容旧记录与整片口径）。
   2.4.0（只动本文件，主文件一字未动；存档键、提示词、发送链不变）：①全屏输入栏并入播放控制条同一行（原来单独一行浮在控制条上方），全屏字幕回到 104px；②弹幕图标换成三条错落短线；③「← 离开放映」从左栏挪到中栏顶栏片名左侧；④空场文案「选一部本机视频，和识图的 TA 一起看」→「从本机选一个视频文件」；⑤票根品牌字改 Cormorant Garamond 斜体、字距 0.08em → 0.01em（原来是 Noto Serif SC 的伪斜体）；⑥没有字幕也没有旧梗概时，左栏「前情提要」整块不出；⑦「改了即时生效」→「修改即时生效」；⑧「导出 MD」键与 toLog 一并删除；⑨海报卡角标只留头像与昵称，去掉「· 第 N 次」（本场里仍有第几次）。
   2.3.2（只动本文件，主文件一字未动；存档键、提示词、发送链不变）：全流程在电脑端宿主里跑过一遍排 bug——①startStaged 先验 TA 在不在再清待放映态（原来先清再进 play，TA 不在时银幕停在待放映的样子却点不动）；②左栏「本场」累计不小于本次（短场此前显示「本次 1 分钟 · 累计 0 分钟」）；③文件体积不足 1 MB 显示 KB、不足 100 MB 带一位小数（原来小文件显示 0 MB）；④右栏留影键与全屏留影键同一状态（原来从右栏留影或寄出后全屏键不跟）；⑤字号底线：设置说明 / 海报卡小字 / 第几次 0.68–0.7rem → 0.72rem，Now playing / Admit one 0.58rem → 0.6rem。
   2.3.1：离开放映确认框的字发糊——上一版只按掉了透底与 backdrop-filter，但 .glass-card 自带 transform:translateZ(0)+backface-visibility:hidden，
     把弹窗提升成 GPU 合成层，文字丢掉亚像素抗锯齿就糊了。现在 .ci-exit-dlg 上把 transform / backface / will-change / filter 全部回正，并去掉继承的 text-shadow。
   2.3.0（只动本文件，主文件一字未动；存档键、提示词、发送链不变）：①文案：银幕上的「接着看 / 开始放映 / 还没有片子 / 选一部片」改英文（Resume / Start / No Film Yet / Choose a Film），两处「选一部片」去掉胶片图标；左栏「和谁一起看」→「观影者」、「怎么用」→「使用说明」（英文副标不动）；放映顶栏「整片聊聊」→「回顾」、「写成日志」→「导出 MD」；左栏「返回片库」→「离开放映」；「这次没有字幕」→「无字幕文件」；字幕流空态标题改 No Subtitles 并缩短说明。
     ②票根：品牌字随主题切换（明亮 Internal Beyond / 暗色 Infernal Beyond）并改斜体，字体不变；四格标题改英文 Films / Sessions / Hours / Archive，单位字收起。
     ③无字幕文件时「回顾」键置灰不可点（没有字幕就压不出梗概）。
     ④「写成日志」不再写进 Blog，改为导出一份 .md 文档直接下载。
     ⑤全屏下控制条上方多一条输入栏：全屏里也能发弹幕与聊天（含留影键），聚焦时控制层不自动隐，全屏字幕上提避让。
     ⑥播放器上「字幕 / 弹」两键改图标（描边系，与全屏键同一套）。
     ⑦修：离开放映确认框透底（glass-card 暗色 0.13 透明度，压在画面上看不清）——改专用 .ci-exit-dlg 不透底实色，不模糊。
   2.2.0（只动本文件，主文件一字未动；存档键、提示词、发送链不变）：①选片流程改「银幕即入口」：选好文件后「最近在看」那块银幕直接变成待放映的这部片（自动抓一帧做海报、读出时长），点银幕就开始放；换视频 / 选字幕两键从右栏待开始卡搬到片库顶栏搜索框左侧（没选片时灰着），改片名在银幕标题旁；待开始卡与顶栏第二个「选一部片」撤掉。
     ②海报改按视频原始分辨率抓（最宽 1280px、JPEG 0.82；旧记录 360px 的海报下次放映时自动换新），银幕改「模糊铺底 ＋ 原比例含入」两层，不再拉伸裁切；空场银幕去掉内框；银幕下那行小字只留「Internal Beyond · Cinema」，「上次 x/x」删掉。
     ③放映设置改控件：多选项用下拉（主文件 .ibr-sel），开关用滑钮（主文件 .ib-switch），每项一句说明；放映中顶栏加「设置」，点开悬浮设置窗，改了即时生效（画面口径同步进常量块，字幕 / 弹幕与舞台按钮互相同步）；衔接条上的画面 / 字幕 / 梗概改为只显示当前值，点它打开设置窗。
     ④放映态顶栏去掉与左栏重复的「← 片库」；片名旁 Cinema 后补「观影室」；右栏输入条改「输入框 → 留影 → 寄出」，两键等大（36px）。
     ⑤票根重画：穿孔线、两栏数字、末行 Last seat；宽字不再溢出（240px 栏也放得下）。
     ⑥修：给看不到画面的 TA 放映时改字幕 / 弹幕等设置会把「画面」默认值悄悄写成「不给」（S.see 与 cfg.see 分开存）；旧档案缺 mins 时显示 undefined；Esc 退出专注 / 关设置窗。
   2.1.0：①存档键一律 pc_ 前缀（pc_film_ / pc_sum_ / pc_log_ / pc_cfg / pc_last），与手机端观影室（film_ / sum_ / cfg，同在 apiSettings 表）彻底分开——备份来回倒也互不相见；首次载入把桌面端自己此前写的 film_ 记录（有 file / thread 字段的）搬到 pc_ 下，手机端的记录（threadId / name）一个不碰。
     ②照手机端搬来的：逐行扫 --> 的字幕解析（BOM、实体、时间 0.1s 取整）、字幕这次开着 IB 期间按记录记在内存里（再看同一条记录不用重选）、前情梗概改成「上次梗概＋新看到的字幕」增量压（不再每次从头）、「整片聊聊」分段接力压整片并把梗概写进「看完了」那条消息正文、常量块看完后换整片口径、尾巴带「证据 / 边界 / 说明」、弹幕（你和 TA 的话飞过画面，可关）、画面画质三档、留影「留在聊天里 / 只发给 TA」、画面可选「不给」。
     ③舞台与字幕流之间加横向拉杆：拖动改舞台高度（字幕流随之变），松手记进设置，双击回到自动（按中栏宽度 16:9、最高 58%）；换栏宽 / 专注 / 全屏退出都会重算。
     ④左栏不再照抄学习室：片库左栏是「谁 · 选片 · 票根（Admit one）· 怎么用」，放映左栏是「海报卡（首帧做底、TA 与第几次在角上）· 放映点 · 胶片时间轴（带齿孔）· 前情提要 · 本场」。
     ⑤修：待开始卡在切页回来后不再消失；「不记这次」连同「看完」标记一起回滚；抓帧后海报卡立刻换底。
   2.0.0（UI 大改）：学习室同款一整块背板——三栏；片库也是三栏（没有片子时中栏是一块暗下来的银幕与三个空位）；右栏自带消息列表，走 sendChatMessage 的 host 画图链（停靠路撤除）；字幕流逐句可点跳；离开放映走三键并记进观影档案；提示词对齐电脑端顺序（状态在【用户当前消息】之前）。 */
(function(){
'use strict';
if(!window.IBApps){console.warn('[cinema] 需要 IBApps 底座（主文件 v93+）');return}
var ctx=null,host=null;
var S={view:'lib',rec:null,cfgId:'',thread:null,url:null,subs:[],subOn:true,see:'turn',dm:true,subN:6,keep:null,sum:null,sum0:null,sumBusy:false,sumChk:0,rate:1,uiT:null,col:null,list:null,file:null,sumEvery:15,cfg:null,uname:'',enteredAt:0,totalMark:0,notes0:0,done0:false,sending:false,sentBuf:null,inQ:null,refT:null,prevSel:null,subHold:0,subQ:'',subCur:-1,statT:null,posterTried:false,ready:null,ro:null,lane:0,wrapBusy:false,pop:false,probeId:0,docKey:null,docClick:null,top:null};
var ICON={sliders:'<svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>',pen:'<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',cam:'<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.2"/></svg>',film:'<svg viewBox="0 0 24 24"><path d="M4 7h16v12H4z"/><path d="M8 4v3M16 4v3"/><path d="M4 12h16"/></svg>',fs:'<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>',cc:'<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.6"/><path d="M7.5 14.5h4M14 14.5h2.5"/></svg>',dm:'<svg viewBox="0 0 24 24"><path d="M3.5 7.5h9.5"/><path d="M9.5 12h11"/><path d="M5.5 16.5h8"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M7 4h4v16H7zM13 4h4v16h-4z"/></svg>',reel:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="5"/><circle cx="32" cy="15" r="5"/><circle cx="32" cy="49" r="5"/><circle cx="15" cy="32" r="5"/><circle cx="49" cy="32" r="5"/></svg>'};
var CSS=''
+'#page-cinema.active{position:fixed;top:66px;left:28px;right:28px;bottom:78px;max-width:none;min-height:0;margin:0;padding:0;display:flex;align-items:stretch;border-radius:16px;overflow:hidden;border:1px solid var(--ibs-bd);box-shadow:0 8px 40px rgba(0,0,0,0.15),inset 0 1px 0 rgba(165,188,230,0.06);animation:none;--ci-lw:300px}'
+'#page-cinema.active::before{content:"";position:absolute;inset:0;border-radius:inherit;backdrop-filter:blur(20px) saturate(1.2);-webkit-backdrop-filter:blur(20px) saturate(1.2);z-index:0;pointer-events:none}#page-cinema.active>*{position:relative;z-index:1}'
+'body:not(.theme-infernal) #page-cinema.active{box-shadow:0 4px 28px rgba(40,80,130,0.08),inset 0 1px 0 rgba(255,255,255,0.35)}'
+'body.ib-reduce #page-cinema.active::before{backdrop-filter:none;-webkit-backdrop-filter:none}body.ib-reduce #page-cinema.active{background:rgba(24,32,54,0.96)}body.ib-reduce:not(.theme-infernal) #page-cinema.active{background:rgba(240,246,255,0.96)}'
+'@media (max-width:1280px){#page-cinema.active{--ci-lw:240px}}'
/* 三栏 */
+'.ci-left{order:0;flex:none;width:var(--ci-lw);min-width:0;display:flex;flex-direction:column;padding:22px 22px 20px;overflow-y:auto;overflow-x:hidden;background:var(--ibs-side);border-right:1px solid var(--ibs-line);scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent}'
+'.ci-mid{order:1;flex:1;min-width:0;display:flex;flex-direction:column;min-height:0;background:var(--ibs-mid);position:relative}'
+'.ci-mid.lib{overflow-y:auto;overflow-x:hidden;display:block;scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent}'
+'.ci-right{order:2;flex:none;width:var(--ibr-cw);min-width:0;display:flex;flex-direction:column;padding:22px 22px 20px;overflow-y:auto;overflow-x:hidden;background:var(--ibs-side);border-left:1px solid var(--ibs-line);scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent}'
+'.ci-left::-webkit-scrollbar,.ci-right::-webkit-scrollbar,.ci-mid.lib::-webkit-scrollbar,.ci-sub-l::-webkit-scrollbar,.ci-nl::-webkit-scrollbar,.ci-arch::-webkit-scrollbar,.ci-sumc::-webkit-scrollbar{width:3px}.ci-left::-webkit-scrollbar-thumb,.ci-right::-webkit-scrollbar-thumb,.ci-mid.lib::-webkit-scrollbar-thumb,.ci-sub-l::-webkit-scrollbar-thumb,.ci-nl::-webkit-scrollbar-thumb,.ci-arch::-webkit-scrollbar-thumb,.ci-sumc::-webkit-scrollbar-thumb{background:rgba(175,195,228,0.22);border-radius:3px}'
+'#page-cinema.active.play .ci-right{display:none}'
/* 右栏（ctx 频道栏）并入背板 */
+'#page-cinema.active #ci-col{order:3;position:relative;top:auto;right:auto;bottom:auto;height:100%;width:var(--ibr-cw);flex:none;border-radius:0;border:none;border-left:1px solid var(--ibs-line);box-shadow:none;background:var(--ibs-side);backdrop-filter:none;-webkit-backdrop-filter:none}'
+'#page-cinema.active #ci-grip{position:absolute;top:0;bottom:0;right:calc(var(--ibr-cw) - 6px);width:12px;border:none;border-radius:0;background:transparent;z-index:5}'
+'#page-cinema.active #ci-grip::before{content:"";position:absolute;left:5px;top:0;bottom:0;width:1px;background:transparent;transition:background 0.3s var(--transition)}'
+'#page-cinema.active #ci-grip::after{content:"";position:absolute;left:1px;top:50%;width:9px;height:40px;margin-top:-20px;border-radius:5px;background:linear-gradient(180deg,rgba(66,84,120,0.92),rgba(40,54,84,0.92));border:1px solid rgba(114,168,216,0.4);box-shadow:inset 0 1px 0 rgba(214,230,255,0.22),0 1px 5px rgba(0,0,0,0.25);opacity:0.85;transition:opacity 0.3s,background 0.3s,transform 0.3s}'
+'body:not(.theme-infernal) #page-cinema.active #ci-grip::after{background:linear-gradient(180deg,rgba(255,255,255,0.95),rgba(226,236,250,0.9));border-color:rgba(140,172,214,0.6);box-shadow:inset 0 1px 0 rgba(255,255,255,0.95),0 1px 5px rgba(60,100,160,0.18)}'
+'#page-cinema.active #ci-grip:hover::after,#page-cinema.active #ci-grip.drag::after{opacity:1;transform:scaleX(1.15)}#page-cinema.active #ci-grip:hover::before,#page-cinema.active #ci-grip.drag::before{background:var(--ibr-acc2)}'
+'#page-cinema.active #ci-grip i{display:block;position:absolute;left:5px;top:50%;width:2px;height:14px;margin-top:-7px;border-radius:1px;background:repeating-linear-gradient(180deg,rgba(214,230,255,0.55) 0 2px,transparent 2px 4px);opacity:0.9;z-index:1;pointer-events:none}body:not(.theme-infernal) #page-cinema.active #ci-grip i{background:repeating-linear-gradient(180deg,rgba(40,64,100,0.45) 0 2px,transparent 2px 4px)}'
+'body.ibr-col-off #page-cinema.active #ci-col,body.ibr-col-off #page-cinema.active #ci-grip{display:none}'
+'#page-cinema.active.focus .ci-left,#page-cinema.active.focus #ci-col,#page-cinema.active.focus #ci-grip{display:none}'
+'#page-cinema.active #ci-col .ibr-host>.chat-messages{padding:12px 14px 10px}body:not(.theme-infernal) #page-cinema.active #ci-col .ibr-host .chat-msg.ai{background:rgba(255,255,255,0.88);border-color:rgba(196,214,238,0.55);color:#142744}'
/* 右栏输入条：输入框 → 留影 → 寄出，两键等大 */
+'#page-cinema.active #ci-col .ibr-in textarea{order:0}#page-cinema.active #ci-col .ibr-in .ibr-mini{order:1;width:36px;height:36px}#page-cinema.active #ci-col .ibr-in .ibr-mini svg{width:16px;height:16px}#page-cinema.active #ci-col .ibr-in .ibr-send{order:2;width:36px;height:36px}#page-cinema.active #ci-col .ibr-in .ibr-mini:hover{color:var(--ibr-fg);border-color:var(--ibr-acc2)}'
/* 顶栏（中栏内，液态玻璃） */
+'.ci-top{flex:none;display:flex;align-items:center;gap:10px;height:62px;padding:0 22px;background:var(--ibs-top);border-bottom:1px solid var(--ibs-line);backdrop-filter:blur(22px) saturate(1.3);-webkit-backdrop-filter:blur(22px) saturate(1.3)}.ci-mid.lib .ci-top{position:sticky;top:0;z-index:20}body.ib-reduce .ci-top{backdrop-filter:none;-webkit-backdrop-filter:none;background:rgba(24,32,54,0.97)}body.ib-reduce:not(.theme-infernal) .ci-top{background:rgba(240,246,255,0.97)}'
+'.ci-top .btn{font-size:0.8rem;padding:0 14px;height:35px;line-height:33px;border-radius:12px;white-space:nowrap}.ci-top .btn.on{color:#fff;background:rgba(114,168,216,0.28);border-color:rgba(114,168,216,0.5)}body:not(.theme-infernal) .page.active .ci-top .btn{background:linear-gradient(180deg,rgba(255,255,255,0.74),rgba(240,246,253,0.62));border-color:rgba(150,178,214,0.5);color:#2b3f62;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95),0 1px 3px rgba(60,100,160,0.08)}body:not(.theme-infernal) .page.active .ci-top .btn:hover{background:linear-gradient(180deg,rgba(255,255,255,0.92),rgba(240,246,253,0.8));border-color:rgba(110,150,205,0.6);color:#142744}body:not(.theme-infernal) .page.active .ci-top .btn.on{background:linear-gradient(180deg,rgba(232,240,250,0.92),rgba(220,231,246,0.84));border-color:rgba(140,168,205,0.55);color:#2b3f62}body.theme-infernal .page.active .ci-top .btn{background:rgba(190,208,240,0.13);border-color:rgba(190,208,240,0.28)}body.theme-infernal .page.active .ci-top .btn:hover{background:rgba(190,208,240,0.22)}body.theme-infernal .page.active .ci-top .btn.on{background:rgba(114,168,216,0.28);border-color:rgba(114,168,216,0.5)}'
+'.ci-top .ci-name{display:flex;align-items:baseline;gap:10px;min-width:0;margin-right:auto}.ci-top .ci-name b{font-family:"Noto Serif SC",serif;font-weight:500;font-size:1.02rem;letter-spacing:0.06em;color:var(--ibr-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-top .ci-name i{font-family:"Raleway",sans-serif;font-style:normal;font-weight:300;font-size:0.66rem;letter-spacing:0.24em;text-transform:uppercase;color:rgba(114,168,216,0.8);white-space:nowrap}.ci-top .ci-name em{font-style:normal;font-family:"Noto Serif SC",serif;font-weight:400;font-size:0.76rem;letter-spacing:0.14em;color:var(--ibr-mute);white-space:nowrap}'
+'.ci-top .btn.dis{opacity:0.42;cursor:default}.ci-top .btn.dis:hover{color:inherit}.ci-top .btn.ci-ico{display:inline-flex;align-items:center;gap:6px}.ci-top .btn.ci-ico svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}'
+'.ci-search{display:flex;align-items:center;gap:8px;height:35px;padding:0 12px;border-radius:12px;border:1px solid var(--ibr-bd);background:var(--ibr-inbg);min-width:200px}.ci-search svg{width:13px;height:13px;stroke:var(--ibr-mute);fill:none;stroke-width:1.5;stroke-linecap:round}.ci-search input{flex:1;min-width:0;background:transparent;border:none;outline:none;color:var(--ibr-fg);font-family:"Noto Sans SC",sans-serif;font-size:0.8rem}.ci-search input::placeholder{color:var(--ibr-mute)}'
/* 左栏通用件 */
+'.ci-lab{display:flex;align-items:baseline;gap:8px;margin:20px 0 9px}.ci-lab b{font-family:"Noto Serif SC",serif;font-weight:500;font-size:0.86rem;letter-spacing:0.06em;color:var(--ibr-fg);white-space:nowrap}.ci-lab i{font-family:"Raleway",sans-serif;font-style:normal;font-weight:300;font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--ibr-mute);opacity:0.8;white-space:nowrap}.ci-lab s{flex:1;height:1px;background:var(--ibs-line);text-decoration:none;align-self:center}.ci-lab em{font-style:normal;font-family:"Cormorant Garamond",serif;font-size:0.9rem;letter-spacing:0.06em;color:var(--ibr-mute)}'
+'.ci-card{flex:none;padding:12px 14px;border-radius:12px;border:1px solid var(--ibr-bd);background:var(--ibr-inbg)}.ci-none{font-size:0.8rem;line-height:1.75;color:var(--ibr-mute);padding:2px 0}'
+'.ci-left .btn,.ci-right .btn{font-size:0.8rem;padding:0 14px;height:35px;line-height:33px;border-radius:12px;white-space:nowrap}.ci-top .ci-exit{flex:none;margin-right:4px}'
+'.ci-hd{margin:2px 0 14px}.ci-hd b{display:block;font-family:"Noto Serif SC",serif;font-weight:500;font-size:1.3rem;letter-spacing:0.1em;color:var(--ibr-fg)}.ci-hd i{display:block;margin-top:3px;font-family:"Raleway",sans-serif;font-style:normal;font-weight:300;font-size:0.66rem;letter-spacing:0.26em;text-transform:uppercase;color:rgba(114,168,216,0.8)}'
+'.ci-sel{width:100%;margin-bottom:10px}.ci-sel .ibr-sel{width:100%;max-width:none;height:36px;border-radius:11px;font-size:0.84rem}'
+'.ci-left .btn.ci-primary{width:100%;height:40px;line-height:38px;font-family:"Noto Serif SC",serif;font-weight:500;letter-spacing:0.08em;font-size:0.9rem;display:flex;align-items:center;justify-content:center;gap:8px}.ci-primary svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}'
+'.ci-how{font-size:0.8rem;line-height:1.85;color:var(--ibr-fg2)}.ci-how p{margin:0 0 6px;padding-left:12px;position:relative}.ci-how p::before{content:"";position:absolute;left:0;top:0.75em;width:5px;height:1px;background:var(--ibr-mute)}'
/* 舞台 */
+'.ci-stage{flex:none;position:relative;width:100%;height:var(--ci-sh,56vh);background:#05070d;outline:none;overflow:hidden;border-bottom:1px solid rgba(165,188,230,0.14)}.ci-stage video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}'
+'.ci-stage:fullscreen{max-height:none;width:100vw;height:100vh!important;align-self:auto;border:none}'
+'.ci-stage *{text-shadow:0 1px 3px rgba(0,0,0,0.8)}'
+'.ci-cc{position:absolute;z-index:2;left:0;right:0;bottom:78px;text-align:center;padding:0 40px;font-family:"Noto Sans SC",sans-serif;font-weight:400;font-size:1.08rem;line-height:1.7;color:#f2f6ff;text-shadow:0 1px 3px rgba(0,0,0,0.9),0 0 18px rgba(0,0,0,0.6);pointer-events:none;white-space:pre-line}.ci-stage:fullscreen .ci-cc{font-size:1.5rem;bottom:104px}.ci-cc:empty{display:none}'
+'.ci-ui{position:absolute;inset:0;z-index:3;opacity:1;transition:opacity 0.4s}.ci-stage.hideui .ci-ui{opacity:0;pointer-events:none}.ci-stage.hideui{cursor:none}'
+'.ci-utop,.ci-ubot{position:absolute;left:0;right:0;display:flex;align-items:center;gap:10px;padding:0 20px}.ci-utop{top:0;height:58px;background:linear-gradient(180deg,rgba(0,0,0,0.55),transparent)}.ci-ubot{bottom:0;height:70px;background:linear-gradient(0deg,rgba(0,0,0,0.66),transparent)}'
+'.ci-utitle{font-family:"Noto Serif SC",serif;font-weight:500;font-size:0.92rem;letter-spacing:0.05em;color:#f2f6ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-ui .sp{flex:1}'
+'.ci-k{height:32px;padding:0 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.08);color:rgba(240,246,255,0.9);font-family:"Noto Sans SC",sans-serif;font-size:0.8rem;letter-spacing:0.04em;display:inline-flex;align-items:center;gap:6px;cursor:pointer;white-space:nowrap;user-select:none;transition:background 0.2s,border-color 0.2s}.ci-k:hover{background:rgba(255,255,255,0.16)}.ci-k.on{border-color:rgba(167,203,240,0.6);color:#fff;background:rgba(114,168,216,0.32)}.ci-k svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.ci-k.ic svg{fill:currentColor;stroke:none}.ci-k.ic{width:32px;padding:0;justify-content:center}'
+'.ci-k.ic.ln svg{fill:none;stroke:currentColor}'
/* 全屏输入栏（只在 :fullscreen 里出现；不用 backdrop-filter，低配机压在视频层上会黑屏） */
+'.ci-fsin{display:none}.ci-stage:fullscreen .ci-fsin{display:flex;flex:1.15;min-width:180px;max-width:560px;align-items:center;gap:6px;height:36px;padding:0 4px 0 13px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:rgba(10,16,30,0.5)}'
+'.ci-fsin input{flex:1;min-width:0;height:32px;border:none;background:transparent;outline:none;color:#f2f6ff;font-family:"Noto Sans SC",sans-serif;font-size:0.88rem;letter-spacing:0.02em;text-shadow:none}.ci-fsin input::placeholder{color:rgba(226,238,255,0.42)}'
/* 票根品牌字：明亮 Internal / 暗色 Infernal，斜体 */
+'.ci-tk .h b{font-style:italic}.ci-tk .h b .dk{display:none}body.theme-infernal .ci-tk .h b .lt{display:none}body.theme-infernal .ci-tk .h b .dk{display:inline}'
/* 离开放映确认框（2.5.0 重做）：模块自己的遮罩与面板，不借主文件的类；flex 居中、无 transform / filter / backdrop-filter，实色 */
+'#ci-exit-ov.group-dialog-overlay{padding:24px}#ci-exit-ov .ci-exit-dlg{width:min(560px,92vw);padding:24px 26px 20px;transform:none!important;filter:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;animation:none!important;text-shadow:none}#ci-exit-ov .ci-exit-dlg *{text-shadow:none;transform:none}'
+'#ci-exit-ov .ci-exit-dlg h3{margin:0 0 12px;display:flex;align-items:baseline;gap:10px;font-family:"Noto Sans SC",sans-serif;font-size:1.05rem;font-weight:500}#ci-exit-ov .ci-exit-dlg h3 i{font:400 0.7rem "Raleway",sans-serif;letter-spacing:0.18em;text-transform:uppercase;opacity:.68;font-style:normal}'
+'#ci-exit-ov .ci-exit-dlg .s{margin:2px 0 18px;font-size:0.88rem;line-height:1.75;font-weight:450;opacity:1}body:not(.theme-infernal) #ci-exit-ov .ci-exit-dlg .s{color:#22406e}body.theme-infernal #ci-exit-ov .ci-exit-dlg .s{color:rgba(228,238,252,0.94)}'
+'#ci-exit-ov .ci-exit-dlg .b{display:flex;justify-content:flex-end;gap:10px}#ci-exit-ov .ci-exit-dlg .b button{height:36px;padding:0 16px;border-radius:10px;border:1px solid var(--glass-border);background:rgba(175,195,228,0.06);color:inherit;font:inherit;font-size:0.86rem;font-weight:500;cursor:pointer}#ci-exit-ov .ci-exit-dlg .b button:hover{background:rgba(175,195,228,0.14)}#ci-exit-ov .ci-exit-dlg .b button.on{background:rgba(114,168,216,0.28);border-color:rgba(114,168,216,0.55)}'
+'.ci-hero .ci-x{position:absolute;top:10px;right:10px;z-index:3;width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(10,16,30,.46);border:1px solid rgba(255,255,255,.3);color:#eef4ff;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:.72;transition:opacity .2s,background .2s,border-color .2s}.ci-hero:hover .ci-x{opacity:.95}.ci-hero .ci-x:hover{opacity:1;background:rgba(158,62,72,.6);border-color:rgba(255,180,180,.55)}.ci-hero .ci-x svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}body:not(.theme-infernal) .ci-hero .ci-x{background:rgba(255,255,255,.6);border-color:rgba(120,160,210,.5);color:#22406e}body:not(.theme-infernal) .ci-hero .ci-x:hover{background:rgba(210,90,96,.85);border-color:rgba(210,90,96,.9);color:#fff}'
+'.ci-big{position:absolute;left:50%;top:50%;width:72px;height:72px;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(255,255,255,0.35);background:rgba(10,16,30,0.5);display:flex;align-items:center;justify-content:center;color:#f2f6ff;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}.ci-big svg{width:24px;height:24px;fill:currentColor;margin-left:3px}.ci-stage.playing .ci-big{display:none}'
+'.ci-time{font-family:"Cormorant Garamond",serif;font-size:0.98rem;letter-spacing:0.06em;color:rgba(240,246,255,0.9);white-space:nowrap;min-width:44px}'
+'.ci-bar{flex:1;height:4px;border-radius:4px;background:rgba(255,255,255,0.18);position:relative;cursor:pointer}.ci-bar i{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:4px;background:linear-gradient(90deg,rgba(114,168,216,0.7),#a7cbf0);box-shadow:0 0 10px rgba(114,168,216,0.6);pointer-events:none}.ci-bar i::after{content:"";position:absolute;right:-5px;top:-4px;width:12px;height:12px;border-radius:50%;background:#e8f1ff;box-shadow:0 0 8px rgba(114,168,216,0.9)}.ci-bar s{position:absolute;top:-3px;width:2px;height:10px;margin-left:-1px;border-radius:1px;background:rgba(255,255,255,0.65);pointer-events:none}'
/* 衔接条 */
+'.ci-strip{flex:none;display:flex;align-items:center;gap:14px;height:44px;padding:0 20px;border-bottom:1px solid var(--ibs-line);background:var(--ibs-top);font-size:0.76rem;color:var(--ibr-fg2)}.ci-strip .ibr-ava{width:22px;height:22px;border-radius:50%;background-size:cover;background-position:center;background-color:rgba(96,128,180,0.6);box-shadow:0 0 0 1px var(--ibr-bd)}.ci-strip b{font-weight:400;color:var(--ibr-fg)}.ci-strip em{font-style:normal;font-family:"Cormorant Garamond",serif;font-size:0.9rem;letter-spacing:0.06em;color:var(--ibr-mute)}.ci-strip .sp{flex:1}.ci-strip .ci-st{display:inline-flex;align-items:center;gap:7px;min-width:0;overflow:hidden;padding:3px 9px;border-radius:9px;border:1px solid transparent;cursor:pointer;white-space:nowrap;transition:background 0.2s,border-color 0.2s}.ci-strip .ci-st i{font-style:normal;color:var(--ibr-fg)}.ci-strip .ci-st i.off{color:var(--ibr-mute)}.ci-strip .ci-st svg{width:12px;height:12px;flex:none;stroke:var(--ibr-mute);fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.ci-strip .ci-st:hover{background:var(--ibs-hover);border-color:var(--ibr-bd)}'
/* 字幕流 */
+'.ci-sub{flex:1;min-height:120px;display:flex;flex-direction:column;min-width:0}.ci-sub-h{flex:none;display:flex;align-items:center;gap:12px;padding:10px 20px 6px}.ci-sub-h .ci-lab{margin:0;flex:1}.ci-sub-h .ci-search{min-width:160px;height:31px}'
+'.ci-sub-l{flex:1;min-height:0;overflow-y:auto;padding:4px 14px 18px 20px;scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent;position:relative}'
+'.ci-sl{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:14px;align-items:baseline;padding:6px 10px;border-radius:8px;cursor:pointer;transition:background 0.2s}.ci-sl:hover{background:var(--ibs-hover)}.ci-sl b{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:0.9rem;letter-spacing:0.06em;color:var(--ibr-mute);white-space:nowrap}.ci-sl span{font-size:0.9rem;line-height:1.7;color:var(--ibr-fg2);white-space:pre-line;font-weight:320}.ci-sl.on{background:var(--ibs-hover);box-shadow:inset 3px 0 0 var(--ibr-acc)}.ci-sl.on span{color:var(--ibr-fg)}.ci-sl.hit span{color:var(--ibr-fg)}.ci-sl mark{background:rgba(114,168,216,0.3);color:inherit;border-radius:3px;padding:0 1px}'
+'.ci-sub-e{padding:36px 40px;text-align:center;font-size:0.82rem;line-height:1.9;color:var(--ibr-mute)}.ci-sub-e b{display:block;font-family:"Noto Serif SC",serif;font-weight:500;font-size:0.95rem;letter-spacing:0.08em;color:var(--ibr-fg2);margin-bottom:6px}'
/* 片库 · 中栏 */
+'.ci-libin{padding:22px 26px 40px}.ci-sec{display:flex;align-items:baseline;gap:8px;margin:22px 0 12px}.ci-sec b{font-family:"Noto Serif SC",serif;font-weight:500;font-size:0.9rem;letter-spacing:0.08em;color:var(--ibr-fg)}.ci-sec i{font-family:"Raleway",sans-serif;font-style:normal;font-weight:300;font-size:0.6rem;letter-spacing:0.24em;text-transform:uppercase;color:var(--ibr-mute)}.ci-sec s{flex:1;height:1px;background:var(--ibs-line);text-decoration:none;align-self:center}.ci-sec em{font-style:normal;font-family:"Cormorant Garamond",serif;font-size:0.9rem;letter-spacing:0.06em;color:var(--ibr-mute)}'
/* 银幕：模糊铺底 ＋ 原比例含入的一帧（不拉伸不裁切）；待放映 Start / 接着看 Resume / 空场三态 */
+'.ci-hero{position:relative;width:100%;height:min(44vh,400px);min-height:220px;border-radius:14px;overflow:hidden;background:#05070d;border:1px solid rgba(165,188,230,0.18);box-shadow:0 18px 50px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.06);cursor:pointer;outline:none}.ci-hero:focus-visible{border-color:rgba(167,203,240,0.7)}'
+'.ci-hero .bg{position:absolute;inset:-14%;background-size:cover;background-position:center;filter:blur(44px) saturate(1.3);opacity:1}.ci-hero .im{display:none}/* 2.6.0：银幕只留一层重模糊色块，不露画面 */.ci-hero .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,13,0) 42%,rgba(5,7,13,0.6) 78%,rgba(5,7,13,0.9))}body.ib-reduce .ci-hero .bg{filter:none;opacity:0.35}'
+'.ci-hero .go{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:10px;height:46px;padding:0 22px 0 16px;border-radius:23px;border:1px solid rgba(255,255,255,0.35);background:rgba(10,16,30,0.5);color:#f2f6ff;font-family:"Noto Serif SC",serif;font-weight:500;font-size:0.95rem;letter-spacing:0.1em;white-space:nowrap;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:background 0.25s,border-color 0.25s,transform 0.25s}.ci-hero .go svg{width:18px;height:18px;fill:currentColor;stroke:none}.ci-hero:hover .go,.ci-hero:focus-visible .go{background:rgba(114,168,216,0.42);border-color:rgba(167,203,240,0.7);transform:translate(-50%,-50%) scale(1.04)}'
+'.ci-hero .tag{position:absolute;left:18px;top:14px;height:24px;padding:0 10px;border-radius:12px;display:inline-flex;align-items:center;font-size:0.7rem;letter-spacing:0.1em;color:#e8f0ff;background:rgba(10,16,30,0.5);border:1px solid rgba(214,230,255,0.28);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}'
+'.ci-hero .in{position:absolute;left:24px;right:24px;bottom:18px;color:#f2f6ff;display:flex;align-items:flex-end;gap:16px}.ci-hero .in *{text-shadow:0 1px 3px rgba(0,0,0,0.8)}.ci-hero .in .tx{flex:1;min-width:0}.ci-hero .in b{display:flex;align-items:center;gap:8px;min-width:0;font-family:"Noto Serif SC",serif;font-weight:500;font-size:1.3rem;letter-spacing:0.06em}.ci-hero .in b span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-hero .in small{display:block;margin-top:5px;font-size:0.76rem;letter-spacing:0.04em;color:rgba(214,230,255,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.ci-hero .ren{flex:none;width:24px;height:24px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;color:rgba(214,230,255,0.75);border:1px solid rgba(214,230,255,0.25);background:rgba(10,16,30,0.4);transition:background 0.2s,color 0.2s}.ci-hero .ren svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.ci-hero .ren:hover{background:rgba(114,168,216,0.4);color:#fff}'
+'.ci-hero .acts{flex:none;display:flex;gap:8px}.ci-hero .acts .ci-k{height:32px;padding:0 13px;font-size:0.78rem;background:rgba(10,16,30,0.42);border-color:rgba(255,255,255,0.2)}.ci-hero .acts .ci-k.del:hover{background:rgba(160,60,60,0.5);border-color:rgba(255,160,160,0.4)}'
+'.ci-hero.empty{cursor:default;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 42%,rgba(46,64,104,0.72),rgba(5,7,13,1) 72%)}.ci-hero.empty::after{content:"";position:absolute;left:12%;right:12%;bottom:0;height:1px;background:linear-gradient(90deg,transparent,rgba(167,203,240,0.45),transparent)}.ci-hero.empty .em{position:relative;text-align:center;color:#dfe7f6}.ci-hero.empty .em svg{width:50px;height:50px;stroke:rgba(214,230,255,0.5);fill:none;stroke-width:1.2;margin-bottom:12px}.ci-hero.empty .em b{display:block;font-family:"Noto Serif SC",serif;font-weight:500;font-size:1.12rem;letter-spacing:0.12em}.ci-hero.empty .em small{display:block;margin:6px 0 16px;font-size:0.78rem;letter-spacing:0.04em;color:rgba(214,230,255,0.72)}.ci-hero.empty .em .ci-k{height:34px;padding:0 16px;font-size:0.82rem}'
+'.ci-cap{margin-top:8px;font-family:"Raleway",sans-serif;font-weight:300;font-size:0.6rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--ibr-mute)}'
+'.ci-hero.staged{border-color:rgba(167,203,240,0.45);box-shadow:0 18px 50px rgba(0,0,0,0.28),0 0 0 1px rgba(114,168,216,0.2),inset 0 1px 0 rgba(255,255,255,0.08)}'
+'.ci-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}'
+'.ci-pc{position:relative;border-radius:12px;overflow:hidden;border:1px solid var(--ibr-bd);background:var(--ibr-inbg);cursor:pointer;transition:transform 0.3s var(--transition),border-color 0.3s}.ci-pc:hover{transform:translateY(-2px);border-color:var(--ibr-acc2)}.ci-pc .po{position:relative;aspect-ratio:16/9;background:#0a1020 linear-gradient(160deg,rgba(60,84,130,0.55),rgba(10,16,32,0.95));background-size:cover;background-position:center}.ci-pc .po b{position:absolute;left:14px;bottom:10px;font-family:"Noto Serif SC",serif;font-weight:500;font-size:1.9rem;color:rgba(214,230,255,0.22);letter-spacing:0.1em}.ci-pc .po .dn{position:absolute;right:10px;top:8px;font-family:"Raleway",sans-serif;font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:rgba(214,230,255,0.85);background:rgba(10,16,30,0.5);padding:3px 8px;border-radius:8px;border:1px solid rgba(214,230,255,0.25)}'
+'.ci-pc .po *{text-shadow:0 1px 3px rgba(0,0,0,0.8)}.ci-pc .cp{padding:10px 12px 11px}.ci-pc .cp b{display:block;font-family:"Noto Serif SC",serif;font-weight:500;font-size:0.9rem;letter-spacing:0.03em;color:var(--ibr-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:20px}.ci-pc .cp small{display:block;margin-top:4px;font-size:0.72rem;line-height:1.6;color:var(--ibr-mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.ci-pc .x{position:absolute;right:8px;top:8px;width:22px;height:22px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:rgba(214,230,255,0.85);background:rgba(10,16,30,0.5);font-size:0.8rem;opacity:0;transition:opacity 0.2s,background 0.2s}.ci-pc:hover .x{opacity:1}.ci-pc .x:hover{background:rgba(160,60,60,0.55);color:#fff}'
+'.ci-ghost{border-radius:12px;border:1px dashed var(--ibr-bd);aspect-ratio:16/12.6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:var(--ibr-mute);opacity:0.75}.ci-ghost b{font-family:"Cormorant Garamond",serif;font-weight:300;font-size:1.6rem;letter-spacing:0.1em}.ci-ghost i{font-family:"Raleway",sans-serif;font-style:normal;font-weight:300;font-size:0.6rem;letter-spacing:0.28em;text-transform:uppercase}'
/* 片库 · 右栏：放映设置（下拉走主文件 .ibr-sel，开关走主文件 .ib-switch，每项一句说明）· 观影档案 */
+'.ci-set{display:flex;flex-direction:column}.ci-set .r{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 2px;border-bottom:1px solid var(--ibs-line)}.ci-set .r:last-child{border-bottom:none}.ci-set .l{flex:1;min-width:0}.ci-set .l b{display:block;font-weight:400;font-size:0.8rem;color:var(--ibr-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-set .l small{display:block;margin-top:2px;font-size:0.72rem;line-height:1.5;color:var(--ibr-mute)}.ci-set .l small.warn{color:#d0a080}'
+'.ci-set .ibr-selwrap{flex:none}.ci-set .ibr-sel{height:30px;padding:0 24px 0 11px;border-radius:9px;font-size:0.76rem;max-width:150px}.ci-set .ibr-sel:disabled{opacity:0.5;cursor:default}.ci-set .ibr-sel:focus-visible{border-color:var(--ibr-acc2)}'
/* 放映中的悬浮设置窗（顶栏「设置」下方） */
+'.ci-pop{position:absolute;top:56px;right:22px;z-index:30;width:340px;max-width:calc(100% - 44px);max-height:calc(100% - 72px);overflow-y:auto;padding:14px 16px 12px;border-radius:14px;border:1px solid var(--ibs-bd);background:rgba(18,26,46,0.9);backdrop-filter:blur(22px) saturate(1.3);-webkit-backdrop-filter:blur(22px) saturate(1.3);box-shadow:0 14px 40px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08);scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent;transform-origin:top right;animation:ciPop 0.18s var(--transition)}.ci-pop::-webkit-scrollbar{width:3px}.ci-pop::-webkit-scrollbar-thumb{background:rgba(175,195,228,0.22);border-radius:3px}@keyframes ciPop{from{opacity:0;transform:translateY(-6px) scale(0.98)}to{opacity:1;transform:none}}body:not(.theme-infernal) .ci-pop{background:rgba(250,253,255,0.92);box-shadow:0 14px 40px rgba(40,80,130,0.16),inset 0 1px 0 rgba(255,255,255,0.9)}body.ib-reduce .ci-pop{animation:none;backdrop-filter:none;-webkit-backdrop-filter:none;background:rgba(24,32,54,0.98)}body.ib-reduce:not(.theme-infernal) .ci-pop{background:rgba(240,246,255,0.98)}'
/* 「这一刻」气泡：挂在左栏右侧、与点中的格子对齐；截图 + 两人对话 */
+'#page-cinema.active .ci-mem{position:absolute;left:calc(var(--ci-lw) + 12px);top:40px;z-index:40;order:9;width:360px;max-width:calc(100% - var(--ci-lw) - 40px);max-height:calc(100% - 24px);overflow-y:auto;border-radius:14px;border:1px solid var(--ibs-bd);background:rgba(18,26,46,0.97);box-shadow:0 14px 40px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.08);scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent;animation:ciPop 0.18s var(--transition);transform-origin:top left}.ci-mem::-webkit-scrollbar{width:3px}.ci-mem::-webkit-scrollbar-thumb{background:rgba(175,195,228,0.22);border-radius:3px}body.ib-reduce #page-cinema.active .ci-mem{animation:none;background:rgba(24,32,54,0.98)}body:not(.theme-infernal) #page-cinema.active .ci-mem{background:rgba(250,253,255,0.98);box-shadow:0 14px 40px rgba(40,80,130,0.16),inset 0 1px 0 rgba(255,255,255,0.9)}'
+'.ci-mem .h{display:flex;align-items:baseline;gap:8px;padding:12px 12px 8px 16px}.ci-mem .h b{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:1.15rem;letter-spacing:0.06em;color:var(--ibr-fg)}.ci-mem .h i{font-style:normal;font-size:0.66rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--ibr-mute)}.ci-mem .h em{flex:1;min-width:0;font-style:normal;font-size:0.72rem;color:var(--ibr-mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-mem .h .x{flex:none;width:24px;height:24px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;color:var(--ibr-mute);cursor:pointer;font-size:0.8rem;align-self:center}.ci-mem .h .x:hover{color:var(--ibr-fg);background:var(--ibr-inbg)}'
+'.ci-mem .sh{margin:0 12px;border-radius:9px;overflow:hidden;background:#0b1020;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1px rgba(165,188,230,0.22)}.ci-mem .sh img{display:block;width:100%;height:100%;object-fit:contain}.ci-mem .sh .ph{font-family:"Noto Serif SC",serif;font-size:0.78rem;letter-spacing:0.1em;color:rgba(214,230,255,0.45)}'
+'.ci-mem .cv{display:flex;flex-direction:column;gap:8px;padding:12px 12px 4px}.ci-mem .cv small{display:block;font-size:0.66rem;letter-spacing:0.1em;color:var(--ibr-mute);margin-bottom:3px}.ci-mem .cv .u,.ci-mem .cv .a{font-size:0.82rem;line-height:1.6;color:var(--ibr-fg);white-space:pre-wrap;word-break:break-word}.ci-mem .cv .u{align-self:flex-end;max-width:88%;padding:8px 12px;border-radius:12px 12px 4px 12px;background:rgba(102,150,226,0.16);border:1px solid rgba(102,150,226,0.32);text-align:left}.ci-mem .cv .a{display:grid;grid-template-columns:26px minmax(0,1fr);column-gap:8px;align-items:start;max-width:96%}.ci-mem .cv .a>div{padding:8px 12px;border-radius:12px 12px 12px 4px;background:var(--ibr-inbg);border:1px solid var(--ibr-bd)}.ci-mem .cv .a .ibr-ava{width:26px;height:26px;border-radius:50%;background-size:cover;background-position:center;background-color:rgba(114,168,216,0.25);margin-top:14px}.ci-mem .cv .n{font-size:0.8rem;line-height:1.6;color:var(--ibr-fg2)}'
+'.ci-mem .ft{display:flex;justify-content:flex-end;padding:8px 12px 12px}.ci-mem .ft .btn{height:32px;padding:0 14px;font-size:0.8rem}'
+'.ci-choose{display:block;width:100%;height:40px;margin:4px 0 20px;border-radius:12px;font-family:"Cormorant Garamond",serif;font-size:1rem;letter-spacing:0.14em;color:var(--ibr-fg);background:rgba(255,255,255,0.09);border:1px solid var(--ibs-bd)}.ci-choose:hover{background:rgba(255,255,255,0.15)}body:not(.theme-infernal) .ci-choose{background:rgba(255,255,255,0.72);color:#233150}body:not(.theme-infernal) .ci-choose:hover{background:rgba(255,255,255,0.92)}'
+'.ci-pop .ci-lab{margin:0 0 4px}.ci-pop .ci-lab .x{flex:none;width:24px;height:24px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;color:var(--ibr-mute);cursor:pointer;font-size:0.8rem;font-style:normal;align-self:center}.ci-pop .ci-lab .x:hover{color:var(--ibr-fg);background:var(--ibr-inbg)}.ci-pop .ci-set .r{padding:8px 0}.ci-pop .ci-set .r:last-child{border-bottom:none}'
+'.ci-arch{flex:1 1 0;min-height:120px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent}.ci-ar{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:10px;align-items:baseline;padding:8px 6px;border-bottom:1px solid var(--ibs-line);font-size:0.8rem;line-height:1.6;color:var(--ibr-fg2)}.ci-ar:last-child{border-bottom:none}.ci-ar b{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:0.95rem;letter-spacing:0.05em;color:var(--ibr-fg);white-space:nowrap}.ci-ar span{font-family:"Noto Serif SC",serif;color:var(--ibr-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-ar small{grid-column:2;display:block;font-size:0.74rem;color:var(--ibr-mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
/* 放映态左栏：海报卡 · 放映点 · 胶片时间轴 · 提要 · 本场 */
+'.ci-pos{position:relative;flex:none;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#05070d;border:1px solid rgba(165,188,230,0.2);box-shadow:0 12px 32px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.05)}.ci-pos .bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0.9;transition:opacity 0.6s}.ci-pos .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,13,0.05),rgba(5,7,13,0.2) 50%,rgba(5,7,13,0.88))}'
+'.ci-pos .in{position:absolute;left:12px;right:12px;bottom:10px}.ci-pos .in *{text-shadow:0 1px 3px rgba(0,0,0,0.85)}.ci-pos .in b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-family:"Noto Serif SC",serif;font-weight:500;font-size:1rem;line-height:1.4;letter-spacing:0.04em;color:#f2f6ff}.ci-pos .in small{display:block;margin-top:4px;font-size:0.72rem;letter-spacing:0.04em;color:rgba(214,230,255,0.8);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.ci-pos .who{position:absolute;left:9px;top:9px;display:flex;align-items:center;gap:6px;max-width:calc(100% - 18px);padding:3px 9px 3px 3px;border-radius:14px;background:rgba(10,16,30,0.55);border:1px solid rgba(214,230,255,0.22);color:#e8f0ff;font-size:0.72rem;letter-spacing:0.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);text-shadow:none}.ci-pos .who .ibr-ava{width:18px;height:18px;border-radius:50%;flex-shrink:0;background:radial-gradient(circle at 35% 30%,rgba(200,220,250,0.9),rgba(96,128,180,0.85) 55%,rgba(40,60,100,0.9));background-size:cover;background-position:center}'
+'.ci-line{margin-top:9px;font-size:0.72rem;line-height:1.7;color:var(--ibr-mute);word-break:break-all}.ci-line i{font-style:normal;color:var(--ibr-fg2)}'
+'.ci-pt{margin:14px 0 2px;padding-top:12px;border-top:1px solid var(--ibs-line)}.ci-pt .t{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;font-family:"Cormorant Garamond",serif;font-size:1rem;letter-spacing:0.06em;color:var(--ibr-fg)}.ci-pt .t i{font-style:normal;color:var(--ibr-mute)}.ci-pt .t em{font-style:normal;font-family:"Raleway",sans-serif;font-weight:300;font-size:0.6rem;letter-spacing:0.26em;text-transform:uppercase;color:var(--ibr-mute)}'
+'.ci-prog{position:relative;height:3px;border-radius:3px;background:rgba(165,188,230,0.16)}body:not(.theme-infernal) .ci-prog{background:rgba(90,140,200,0.16)}.ci-prog .f{position:absolute;left:0;top:0;height:100%;width:0;border-radius:3px;background:linear-gradient(90deg,var(--ibr-acc),rgba(114,168,216,0.45));transition:width 0.3s var(--transition)}.ci-prog .t{position:absolute;top:-3px;width:2px;height:9px;margin-left:-1px;border-radius:1px;background:var(--ibr-acc)}'
+'.ci-reel{flex:1 1 0;min-height:120px;position:relative;overflow-y:auto;overflow-x:hidden;padding:4px 0 4px 16px;scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent}.ci-reel::-webkit-scrollbar{width:3px}.ci-reel::-webkit-scrollbar-thumb{background:rgba(175,195,228,0.22);border-radius:3px}'
+'.ci-reel::before{content:"";position:absolute;left:3px;top:0;bottom:0;width:6px;background:repeating-linear-gradient(180deg,rgba(165,188,230,0.5) 0 5px,transparent 5px 13px);opacity:0.45;border-radius:2px}'
+'.ci-fr{position:relative;flex:none;display:grid;grid-template-columns:54px minmax(0,1fr);column-gap:10px;align-items:center;padding:6px 26px 6px 6px;margin:0 0 6px;border-radius:8px;border:1px solid var(--ibr-bd);background:var(--ibr-inbg);cursor:pointer;transition:border-color 0.2s,background 0.2s}.ci-fr:hover{border-color:var(--ibr-acc2);background:var(--ibs-hover)}'
+'.ci-fr .th{position:relative;width:54px;height:32px;border-radius:3px;background:#0b1020;background-size:cover;background-position:center;box-shadow:inset 0 0 0 1px rgba(165,188,230,0.28)}.ci-fr .th i{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:"Noto Serif SC",serif;font-size:0.8rem;color:rgba(214,230,255,0.55);text-shadow:none}'
+'.ci-fr .m{min-width:0}.ci-fr .m b{display:flex;align-items:baseline;gap:7px;font-weight:400}.ci-fr .m b span{font-family:"Cormorant Garamond",serif;font-size:0.95rem;letter-spacing:0.06em;color:var(--ibr-fg)}.ci-fr .m b i{font-style:normal;font-size:0.66rem;letter-spacing:0.1em;color:var(--ibr-mute)}.ci-fr .m small{display:block;font-size:0.76rem;line-height:1.4;color:var(--ibr-fg2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.ci-fr .d{position:absolute;right:6px;top:50%;transform:translateY(-50%);opacity:0;font-size:0.72rem;color:var(--ibr-mute);padding:2px 5px;border-radius:6px;transition:opacity 0.2s}.ci-fr:hover .d{opacity:1}.ci-fr .d:hover{color:#d98a8a}'
+'.ci-nadd{flex:none;margin-top:6px;font-size:0.78rem;letter-spacing:0.04em;color:var(--ibr-mute);cursor:pointer;padding:6px 0;transition:color 0.2s}.ci-nadd:hover{color:var(--ibr-acc)}'
+'.ci-sumc{max-height:200px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(114,168,216,0.25) transparent;border-left:2px solid var(--ibr-acc2);border-radius:0 12px 12px 0}.ci-sumc p{font-family:"Noto Serif SC",serif;font-size:0.84rem;line-height:1.85;color:var(--ibr-fg);margin:0;white-space:pre-wrap}.ci-sumc small{display:block;margin-top:6px;font-family:"Cormorant Garamond",serif;font-size:0.82rem;letter-spacing:0.06em;color:var(--ibr-mute)}'
+'.ci-sess{flex:none;font-size:0.76rem;line-height:1.85;color:var(--ibr-mute)}.ci-sess b{font-weight:400;color:var(--ibr-fg2)}.ci-sess em{font-style:normal;font-family:"Cormorant Garamond",serif;font-size:0.95rem;letter-spacing:0.05em;color:var(--ibr-fg)}'
/* 片库左栏：票根（头 · 两栏数字 · 穿孔线 · Last seat ＋ 条码）；宽字一律可省略号，240px 栏也放得下 */
+'.ci-tk{position:relative;flex:none;border:1px solid var(--ibr-bd);border-radius:12px;background:var(--ibr-inbg);overflow:hidden}.ci-tk .h{display:flex;justify-content:space-between;align-items:baseline;gap:10px;min-width:0;padding:11px 14px 6px}.ci-tk .h b{min-width:0;font-family:"Cormorant Garamond",serif;font-weight:500;font-size:1.06rem;letter-spacing:0.01em;color:var(--ibr-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-tk .h i{flex:none;font-family:"Raleway",sans-serif;font-style:normal;font-weight:300;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--ibr-mute)}'
+'.ci-tk .g{display:grid;grid-template-columns:1fr 1fr;padding:2px 14px 8px}.ci-tk .g .c{min-width:0;padding:5px 0}.ci-tk .g .c small{display:block;font-size:0.68rem;letter-spacing:0.06em;color:var(--ibr-mute);white-space:nowrap}.ci-tk .g .c b{display:block;font-family:"Cormorant Garamond",serif;font-weight:400;font-size:1.4rem;line-height:1.2;letter-spacing:0.02em;color:var(--ibr-fg);white-space:nowrap}.ci-tk .g .c b i{font-style:normal;font-family:"Noto Sans SC",sans-serif;font-size:0.66rem;letter-spacing:0.02em;color:var(--ibr-mute);margin-left:3px}'
+'.ci-tk .cut{position:relative;height:0;margin:0 10px;border-top:1px dashed var(--ibr-bd)}.ci-tk .cut::before,.ci-tk .cut::after{content:"";position:absolute;top:-8px;width:15px;height:15px;border-radius:50%;background:var(--ibs-side);border:1px solid var(--ibr-bd)}.ci-tk .cut::before{left:-19px}.ci-tk .cut::after{right:-19px}'
+'.ci-tk .f{display:flex;justify-content:space-between;align-items:center;gap:10px;min-width:0;padding:9px 14px 10px}.ci-tk .f span{min-width:0;font-family:"Cormorant Garamond",serif;font-size:0.92rem;letter-spacing:0.08em;color:var(--ibr-mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ci-tk .f em{flex:none;width:54px;height:13px;opacity:0.5;background:repeating-linear-gradient(90deg,var(--ibr-mute) 0 1px,transparent 1px 3px,var(--ibr-mute) 3px 5px,transparent 5px 6px,var(--ibr-mute) 6px 7px,transparent 7px 10px)}'
/* 舞台与字幕流之间的横向拉杆 */
+'.ci-hgrip{flex:none;position:relative;height:12px;cursor:row-resize;background:var(--ibs-top);border-bottom:1px solid var(--ibs-line);z-index:2;user-select:none;touch-action:none}.ci-hgrip::before{content:"";position:absolute;left:0;right:0;top:5px;height:1px;background:transparent;transition:background 0.3s}.ci-hgrip::after{content:"";position:absolute;left:50%;top:50%;width:40px;height:5px;margin:-3px 0 0 -20px;border-radius:5px;background:linear-gradient(180deg,rgba(66,84,120,0.92),rgba(40,54,84,0.92));border:1px solid rgba(114,168,216,0.4);box-shadow:inset 0 1px 0 rgba(214,230,255,0.22),0 1px 4px rgba(0,0,0,0.25);opacity:0.85;transition:opacity 0.3s,transform 0.3s}'
+'body:not(.theme-infernal) .ci-hgrip::after{background:linear-gradient(180deg,rgba(255,255,255,0.95),rgba(226,236,250,0.9));border-color:rgba(140,172,214,0.6);box-shadow:inset 0 1px 0 rgba(255,255,255,0.95),0 1px 4px rgba(60,100,160,0.18)}.ci-hgrip:hover::after,.ci-hgrip.drag::after{opacity:1;transform:scaleY(1.25)}.ci-hgrip:hover::before,.ci-hgrip.drag::before{background:var(--ibr-acc2)}'
/* 弹幕 */
+'.ci-dm{position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none}.ci-dmi{position:absolute;left:100%;top:4%;white-space:nowrap;font-family:"Noto Sans SC",sans-serif;font-size:1rem;letter-spacing:0.02em;color:#f2f6ff;text-shadow:0 1px 3px rgba(0,0,0,0.9),0 0 10px rgba(0,0,0,0.5);animation:ciFly linear forwards;will-change:transform}.ci-dmi.u{color:#a7cbf0}@keyframes ciFly{from{transform:translateX(0)}to{transform:translateX(calc(-100% - 100vw))}}body.ib-reduce .ci-dm{display:none}'
/* 明亮态：主文件给 .page.active 里所有 div / span 加了白色光晕（text-shadow），黑底上的字要用 id 级选择器压回深色投影 */
+'body:not(.theme-infernal) #page-cinema.active .ci-stage *,body:not(.theme-infernal) #page-cinema.active .ci-hero *,body:not(.theme-infernal) #page-cinema.active .ci-pos *,body:not(.theme-infernal) #page-cinema.active .ci-pc .po *{text-shadow:0 1px 3px rgba(0,0,0,0.85)}'
+'body:not(.theme-infernal) #page-cinema.active .ci-cc{text-shadow:0 1px 3px rgba(0,0,0,0.9),0 0 18px rgba(0,0,0,0.6)}body:not(.theme-infernal) #page-cinema.active .ci-dmi{text-shadow:0 1px 3px rgba(0,0,0,0.9),0 0 10px rgba(0,0,0,0.5)}';

function $(id){return document.getElementById(id)}
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fmt(t){t=Math.max(0,Math.floor(t||0));var h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s).padStart(2,'0')}
function dateStr(ts){var d=new Date(ts);return (d.getMonth()+1)+'/'+d.getDate()}
function timeStr(ts){var d=new Date(ts||Date.now());return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function hash(s){var h=5381;s=String(s||'');for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)}
function short(t,n){t=String(t||'');return t.length>n?t.slice(0,n)+'…':t}
function sizeStr(b){b=Number(b)||0;if(b<1048576)return Math.max(1,Math.round(b/1024))+' KB';var m=b/1048576;return (m<100?Math.round(m*10)/10:Math.round(m))+' MB'}/* 2.3.2：小文件不再显示 0 MB */
function titleOf(name){return String(name||'').replace(/\.[a-z0-9]{2,5}$/i,'').replace(/[._]+/g,' ').trim()||'未命名'}
function stripAi(t){return String(t||'').replace(/<think(?:ing)?>[\s\S]*?<\/think(?:ing)?>/gi,' ').replace(/<(ws|mem|cal|ib|bt|am)_[a-z0-9_]*\b[^>]*>[\s\S]*?<\/(?:ws|mem|cal|ib|bt|am)_[a-z0-9_]*\s*>/gi,' ').replace(/<(ws|mem|cal|ib|bt|am)_[a-z0-9_]*\b[^>]*\/?>/gi,' ').replace(/〔已解决[^〕]*〕/g,' ').replace(/\s+\n/g,'\n').trim()}
function video(){return $('ci-video')}
function stage(){return $('ci-stage')}
function page(){return host||$('page-cinema')}
function taName(id){var c=ctx.chat.cfg(id);return c?(c.nickname||c.model||'TA'):'（TA 已不在）'}
function un(){return S.uname||'用户'}
async function getUname(){try{var a=await dbGetAll('about');var o=(a&&a[0])||null;var nm=o&&(o.name||o.nickname);return nm?String(nm).trim().slice(0,40):'用户'}catch(e){return '用户'}}
function lab(zh,en,id){return '<div class="ci-lab"><b>'+zh+'</b><i>'+en+'</i><s></s>'+(id?'<em id="'+id+'"></em>':'')+'</div>'}

/* ── 存档键：一律 pc_ 前缀，与手机端观影室（film_ / sum_ / cfg，同一张 apiSettings 表）分开——备份来回倒也互不相见 ── */
var K={film:'pc_film_',sum:'pc_sum_',log:'pc_log_',cfg:'pc_cfg',last:'pc_last',mig:'pc_migrated'};
async function migrate(){try{if(await ctx.storage.get(K.mig))return;var all=await ctx.storage.list('');var n=0;
  for(var i=0;i<all.length;i++){var r=all[i];if(!r||!r.k||!r.v)continue;var k=String(r.k);if(k.indexOf('film_')!==0)continue;var v=r.v;
    if(v.file===undefined||v.threadId!==undefined)continue;/* 手机端记录有 threadId / name，桌面端记录有 file / thread：只搬桌面端自己写的 */
    var key=k.slice(5);if(!(await ctx.storage.get(K.film+key)))await ctx.storage.set(K.film+key,v);await ctx.storage.remove(k);
    var sm=await ctx.storage.get('sum_'+key);if(sm&&sm.t!==undefined){await ctx.storage.set(K.sum+key,sm);await ctx.storage.remove('sum_'+key)}
    var lg=await ctx.storage.get('log_'+key);if(lg){await ctx.storage.set(K.log+key,lg);await ctx.storage.remove('log_'+key)}n++}
  var ol=await ctx.storage.get('last');if(ol&&ol.cfgId&&!(await ctx.storage.get(K.last))){await ctx.storage.set(K.last,ol)}
  var oc=await ctx.storage.get('cfg');if(oc&&oc.vq===undefined&&typeof oc.cc==='boolean'){if(!(await ctx.storage.get(K.cfg)))await ctx.storage.set(K.cfg,oc);await ctx.storage.remove('cfg')}/* 2.0.0 写的桌面端 cfg（没有 vq、cc 是布尔）搬走；手机端的 cfg 有 vq / stage，不动 */
  await ctx.storage.set(K.mig,{at:Date.now(),moved:n})}catch(e){}}

/* ── 设置（放映默认值）：cfg.see 是默认口径；放映中 S.see 才是这一场的实际口径（TA 看不到画面时为 off，不回写 cfg） ── */
var DEF={see:'turn',vq:'m',keep:true,subN:6,sumEvery:15,cc:true,dm:true,sh:0};
var VQ={l:{e:384,q:0.6},m:{e:512,q:0.72},h:{e:768,q:0.8},f:{e:1920,q:0.86},o:{e:1e9,q:0.95}};/* 2.5.0：f＝1080P（宽 1920），o＝原画质（视频原分辨率、JPEG 0.95） */
async function loadCfg(){try{var c=await ctx.storage.get(K.cfg);S.cfg=Object.assign({},DEF,c||{})}catch(e){S.cfg=Object.assign({},DEF)}if(!VQ[S.cfg.vq])S.cfg.vq='m';if(['off','turn','snap'].indexOf(S.cfg.see)<0)S.cfg.see='turn';S.subN=S.cfg.subN;S.sumEvery=S.cfg.sumEvery;S.subOn=S.cfg.cc!==false;S.dm=S.cfg.dm!==false;S.see=S.cfg.see}
function saveCfg(){S.cfg=Object.assign({},S.cfg||DEF,{subN:S.subN,sumEvery:S.sumEvery,cc:S.subOn,dm:S.dm});try{ctx.storage.set(K.cfg,S.cfg)}catch(e){}}
function seeText(v){v=v||S.see;return v==='turn'?'每条一帧':(v==='snap'?'只在留影时':'不给')}
function subNText(){return S.subN?'前 '+S.subN+' 条':'不附'}
function sumText(){return S.sumEvery?'每 '+S.sumEvery+' 分钟':'不压'}
/* 设置行：多选项用下拉，开关用滑钮，每项一句说明；片库右栏与放映中的悬浮窗共用同一份 */
var SETS=[
  {k:'see',t:'画面',d:'每条消息附此刻一帧，只对能识图的 TA 有效',o:[['turn','每条一帧'],['snap','只在留影时'],['off','不给']]},
  {k:'vq',t:'画面画质',d:'发给 TA 的那一帧多大；越大每条消息越贵、越慢，识图服务方也会按自己的上限缩小',o:[['l','省流 384px'],['m','均衡 512px'],['h','清晰 768px'],['f','1080P'],['o','原画质（原分辨率）']]},
  {k:'keep',t:'留影',d:'留影那一帧留在聊天记录里，还是只发给 TA',o:[['keep','留在聊天里'],['eph','只发给 TA']]},
  {k:'subn',t:'随消息附字幕',d:'附上播放点之前的几条',o:[['6','前 6 条'],['12','前 12 条'],['20','前 20 条'],['0','不附']]},
  {k:'sum',t:'前情梗概',d:'每看这么久，把之前的字幕压一次梗概',o:[['15','每 15 分钟'],['10','每 10 分钟'],['30','每 30 分钟'],['0','不压']]},
  {k:'cc',t:'画面上显示字幕',d:''},
  {k:'dm',t:'弹幕',d:'你和 TA 的话飞过画面'}];
function setVal(k){return k==='see'?(S.view==='play'?S.see:S.cfg.see):k==='vq'?S.cfg.vq:k==='keep'?(S.cfg.keep?'keep':'eph'):k==='subn'?String(S.subN):k==='sum'?String(S.sumEvery):k==='cc'?S.subOn:S.dm}
function setRows(){var blind=S.view==='play'&&!ctx.chat.canSee(S.cfgId);
  return '<div class="ci-set">'+SETS.map(function(x){var v=setVal(x.k),ctl,d=x.d,warn=false;
    if(x.o)ctl='<span class="ibr-selwrap"><select class="ibr-sel" data-k="'+x.k+'"'+(x.k==='see'&&blind?' disabled':'')+'>'+x.o.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===v?' selected':'')+'>'+o[1]+'</option>'}).join('')+'</select></span>';
    else ctl='<label class="ib-switch"><input type="checkbox" data-k="'+x.k+'"'+(v?' checked':'')+'><span class="kn"></span></label>';
    if(x.k==='see'&&blind){d='这位 TA 看不到画面，这一场不发帧';warn=true}
    return '<div class="r"><div class="l"><b>'+x.t+'</b>'+(d?'<small'+(warn?' class="warn"':'')+'>'+d+'</small>':'')+'</div>'+ctl+'</div>'}).join('')+'</div>'}
function bindSets(box){if(!box)return;box.addEventListener('change',function(e){var el=e.target.closest('[data-k]');if(!el)return;applySet(el.dataset.k,el.type==='checkbox'?el.checked:el.value)})}
/* 改了即时生效：放映中同步常量块、舞台按钮、衔接条；同时存进 cfg 作为下次默认 */
function applySet(k,v){var play=S.view==='play';
  if(k==='see'){if(['turn','snap','off'].indexOf(v)<0)return;S.cfg.see=v;if(!play||ctx.chat.canSee(S.cfgId))S.see=v;if(play)ctx.sys.set(sysBlock())}
  else if(k==='vq'){if(VQ[v])S.cfg.vq=v}
  else if(k==='keep')S.cfg.keep=v==='keep';
  else if(k==='subn')S.subN=Math.max(0,parseInt(v,10)||0);
  else if(k==='sum'){S.sumEvery=Math.max(0,parseInt(v,10)||0);if(play)drawSummary()}
  else if(k==='cc'){S.subOn=!!v;if(play){var b=$('ci-ccbtn');if(b)b.classList.toggle('on',S.subOn&&!!S.subs.length);tick()}}
  else if(k==='dm'){S.dm=!!v;if(play){var b2=$('ci-dmbtn');if(b2)b2.classList.toggle('on',S.dm);if(!S.dm){var dm=$('ci-dm');if(dm)dm.innerHTML=''}}}
  saveCfg();syncSetUI();if(play)syncStrip()}
function syncSetUI(){document.querySelectorAll('#page-cinema .ci-set [data-k]').forEach(function(el){var v=setVal(el.dataset.k);if(el.type==='checkbox')el.checked=!!v;else if(el.value!==v)el.value=v})}
/* 衔接条只显示当前值，点它打开设置窗 */
function syncStrip(){var el=$('ci-st');if(!el)return;var blind=!ctx.chat.canSee(S.cfgId);
  el.innerHTML=ICON.sliders+'<span>画面 <i'+(blind||S.see==='off'?' class="off"':'')+'>'+(blind?'TA 看不到':seeText())+'</i></span><em>·</em><span>字幕 <i'+(S.subN?'':' class="off"')+'>'+subNText()+'</i></span><em>·</em><span>梗概 <i'+(S.sumEvery?'':' class="off"')+'>'+sumText()+'</i></span>'}
/* 放映中的悬浮设置窗：挂在中栏里、顶栏「设置」下方；外点 / Esc / ✕ 关 */
function openPop(){if(S.view!=='play'||$('ci-pop'))return;var mid=$('ci-mid');if(!mid)return;var p=document.createElement('div');p.className='ci-pop';p.id='ci-pop';
  p.innerHTML='<div class="ci-lab"><b>放映设置</b><i>Settings</i><s></s><span class="x" title="关闭">✕</span></div>'+setRows()+'<div class="ci-none" style="padding-top:8px">修改即时生效，也作为下次的默认值。</div>';
  mid.appendChild(p);bindSets(p);p.querySelector('.x').addEventListener('click',closePop);var b=$('ci-setbtn');if(b)b.classList.add('on');S.pop=true;
  S.docClick=function(e){var path=e.composedPath?e.composedPath():[];if(path.indexOf(p)>=0||(b&&path.indexOf(b)>=0))return;var st=$('ci-st');if(st&&path.indexOf(st)>=0)return;closePop()};
  setTimeout(function(){if(S.docClick)document.addEventListener('pointerdown',S.docClick,true)},0)}
function closePop(){var p=$('ci-pop');if(p)p.remove();var b=$('ci-setbtn');if(b)b.classList.remove('on');S.pop=false;if(S.docClick){document.removeEventListener('pointerdown',S.docClick,true);S.docClick=null}}
function togglePop(){if($('ci-pop'))closePop();else openPop()}

/* ── 字幕：SRT / VTT（逐行扫 -->，BOM 与实体一并处理）；UTF-8 读不出按 GB18030；只进内存，这次开着 IB 期间按记录 key 记着 ── */
var SUBS={};
function decodeText(buf){try{return new TextDecoder('utf-8',{fatal:true}).decode(buf)}catch(e){}try{return new TextDecoder('gb18030').decode(buf)}catch(e){}return new TextDecoder('utf-8').decode(buf)}
function tsec(t){var m=String(t).trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/);if(!m)return NaN;return (parseInt(m[1]||'0',10)*3600)+(parseInt(m[2],10)*60)+parseInt(m[3],10)+parseInt(String(m[4]).padEnd(3,'0'),10)/1000}
function parseSubs(text){var out=[],lines=String(text||'').replace(/\r\n?/g,'\n').replace(/^\uFEFF/,'').split('\n'),i=0;
  while(i<lines.length){var l=lines[i].trim();var m=l.match(/(\S+)\s+-->\s+(\S+)/);
    if(m){var s=tsec(m[1]),e=tsec(m[2]);var buf=[];i++;while(i<lines.length&&lines[i].trim()!==''){buf.push(lines[i]);i++}
      var t=buf.join('\n').replace(/<[^>]+>/g,'').replace(/\{\\[^}]*\}/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();
      if(!isNaN(s)&&!isNaN(e)&&t)out.push({s:Math.round(s*10)/10,e:Math.round(e*10)/10,t:t.slice(0,400)})}
    i++}
  out.sort(function(a,b){return a.s-b.s});return out}
function subsBefore(t,n){var out=[];for(var i=S.subs.length-1;i>=0&&out.length<n;i--){if(S.subs[i].s<=t)out.unshift(S.subs[i])}return out}
function subsRange(a,b){return S.subs.filter(function(c){return c.s>=a&&c.s<b}).map(function(c){return '['+fmt(c.s)+'] '+c.t.replace(/\n/g,' ')}).join('\n')}

/* ── 存档：pc_film_<key>（记录）· pc_sum_<key>（梗概）· pc_log_<key>（档案）· pc_cfg · pc_last ── */
async function recSave(){if(!S.rec)return;S.rec.updated=Date.now();try{await ctx.storage.set(K.film+S.rec.key,S.rec)}catch(e){}}
async function recList(){var l=[];try{l=(await ctx.storage.list(K.film)).map(function(r){return r.v}).filter(function(v){return v&&v.key})}catch(e){}return l.sort(function(a,b){return (b.updated||0)-(a.updated||0)})}
async function logList(){var out=[];try{(await ctx.storage.list(K.log)).forEach(function(r){((r.v&&r.v.list)||[]).forEach(function(e){out.push(e)})})}catch(e){}return out.sort(function(a,b){return (b.ts||0)-(a.ts||0)})}
async function writeLog(key,lg){if(!lg)return;var k=K.log+key;var v=(await ctx.storage.get(k))||{};var list=v.list||[];list.push(lg);if(list.length>60)list=list.slice(-60);await ctx.storage.set(k,{list:list,updated:Date.now()})}

/* ── 画面帧 ── */
function grab(w,q){var v=video();if(!v||!v.videoWidth)return null;try{var vq=VQ[S.cfg&&S.cfg.vq]||VQ.m;w=Math.min(w||vq.e,v.videoWidth);var h=Math.round(v.videoHeight*w/v.videoWidth);var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(v,0,0,w,h);var du=c.toDataURL('image/jpeg',q||vq.q);return {dataUrl:du,base64:du.split(',')[1]||'',mime:'image/jpeg',name:'frame_'+fmt(v.currentTime).replace(/:/g,'-')+'.jpg'}}catch(e){return null}}
function thumb(){var f=grab(160,0.6);return f?f.dataUrl:''}
/* 海报按视频原始分辨率抓（最宽 1280px、JPEG 0.82），银幕与历史卡都用它，不再从 360px 放大 */
function poster(){var v=video();if(!v||!v.videoWidth)return null;var w=Math.min(1280,v.videoWidth);var f=grab(w,0.82);return f?{p:f.dataUrl,w:w}:null}
/* 选好文件即抓一帧做海报、读出时长：离屏 video，不进舞台；只认最后一次调用（快速连换文件时旧的作废） */
function probe(file,done){var id=++S.probeId,u;try{u=URL.createObjectURL(file)}catch(e){return}var v=document.createElement('video');v.muted=true;v.playsInline=true;v.preload='auto';var fin=false;
  function end(p,w,h){if(fin)return;fin=true;var d=v.duration||0;try{v.removeAttribute('src');v.load()}catch(e){}try{URL.revokeObjectURL(u)}catch(e){}if(id!==S.probeId)return;done(p,isFinite(d)?d:0,w,h)}
  v.addEventListener('loadedmetadata',function(){var d=v.duration||0;var t=(d&&isFinite(d))?Math.min(Math.max(1.5,d*0.08),Math.max(0,d-0.5)):0;try{v.currentTime=t}catch(e){end('',v.videoWidth||0,v.videoHeight||0)}});
  v.addEventListener('seeked',function(){try{var w=Math.min(1280,v.videoWidth||0);if(!w)return end('',0,0);var h=Math.round(v.videoHeight*w/v.videoWidth);var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(v,0,0,w,h);end(c.toDataURL('image/jpeg',0.82),v.videoWidth,v.videoHeight)}catch(e){end('',v.videoWidth||0,v.videoHeight||0)}});
  v.addEventListener('loadeddata',function(){try{if(!(v.duration&&isFinite(v.duration)&&v.duration>2)){var w=Math.min(1280,v.videoWidth||0);if(!w)return;var h=Math.round(v.videoHeight*w/v.videoWidth);var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(v,0,0,w,h);end(c.toDataURL('image/jpeg',0.82),v.videoWidth,v.videoHeight)}}catch(e){}});/* 极短或时长未知的片子：定位到 0 不一定触发 seeked，首帧就绪时直接抓 */
  v.addEventListener('error',function(){end('',0,0)});setTimeout(function(){end('',v.videoWidth||0,v.videoHeight||0)},9000);v.src=u}

/* ═══ 片库（三栏都有内容：没有片子时中栏是一块暗下来的银幕与三个空位；选好文件后银幕就是待放映的那部片） ═══ */
async function renderLib(){S.view='lib';var pg=page();if(!pg)return;if(!S.cfg)await loadCfg();pg.classList.remove('play');pg.classList.remove('focus');document.body.classList.remove('ci-on');document.body.classList.remove('ibr-col-off');
  var tas=ctx.chat.list();var last=null;try{last=await ctx.storage.get(K.last)}catch(e){}if(last&&last.cfgId&&ctx.chat.cfg(last.cfgId))S.cfgId=last.cfgId;if((!S.cfgId||!ctx.chat.cfg(S.cfgId))&&tas.length)S.cfgId=tas[0].id;
  var recs=await recList();var logs=await logList();var films=recs.length,sess=0,ms=0;recs.forEach(function(r){sess+=r.sessions||0;ms+=r.totalMs||0});
  if(S.view!=='lib')return;
  pg.innerHTML='<aside class="ci-left" id="ci-left"></aside><section class="ci-mid lib" id="ci-mid"></section><aside class="ci-right" id="ci-right"></aside>';
  /* 左栏：观影者、选片、票根、使用说明 */
  $('ci-left').innerHTML='<div class="ci-hd"><b>观影室</b><i>Cinema</i></div>'
    +'<button class="btn ci-choose" id="ci-pick">Choose a Film</button>'/* 2.6.0：独立一行、浅底，紧跟标题 */
    +lab('观影者','Company')+'<div class="ci-sel"><span class="ibr-selwrap" style="width:100%"><select class="ibr-sel" id="ci-ta">'+(tas.length?tas.map(function(t){return '<option value="'+esc(t.id)+'"'+(t.id===S.cfgId?' selected':'')+'>'+esc(t.name)+(t.vision?'':' · 看不到画面')+'</option>'}).join(''):'<option value="">先到 API 页添加 TA</option>')+'</select></span></div>'
    +lab('票根','Stub')+ticket(films,sess,ms,logs.length,recs[0]||null)
    +lab('使用说明','How it works')+'<div class="ci-how"><p>选一部片后，银幕上就是它：点银幕开始放；换视频 / 选字幕在顶栏，改片名在片名旁。</p><p>视频与字幕都不入库：每次重新选文件，从头放；字幕这次开着 IB 期间记着，再看同一条记录不用重选。</p><p>能识图的 TA 每条消息收到当前一帧；「留影」那一帧留在聊天里（可在设置里改成只发给 TA）。</p><p>字幕流逐句可点，点一句跳到那一刻。看完点「回顾」（没有字幕文件时不可点）。</p></div>';
  /* 中栏：顶栏（换视频 · 选字幕 · 搜片名）· 银幕 · 观影历史 */
  var mid=$('ci-mid');S.top=recs[0]||null;
  mid.innerHTML='<div class="ci-top"><span class="ci-name"><b>视频库</b><i>Library</i></span><button class="btn ci-ico" id="ci-refile">'+ICON.film+'换视频</button><button class="btn" id="ci-resub">选字幕</button><div class="ci-search"><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.4"/><path d="m13.6 13.6-3.3-3.3"/></svg><input id="ci-q" placeholder="搜片名 / 文件名 / TA…" autocomplete="off"></div></div>'
    +'<div class="ci-libin"><div class="ci-sec" id="ci-hero-sec"></div><div id="ci-hero"></div><div class="ci-cap">Internal Beyond · Cinema</div>'
    +'<div class="ci-sec"><b>观影历史</b><i>Archive</i><s></s><em id="ci-wall-n"></em></div><div class="ci-wall" id="ci-wall"></div></div>';
  drawHero(S.ready?S.ready.rec:S.top,!!S.ready);drawWall(recs,'');syncTop();
  /* 右栏：放映设置 · 观影档案 */
  $('ci-right').innerHTML=lab('放映设置','Defaults')+'<div class="ci-card">'+setRows()+'</div>'
    +lab('观影档案','Sessions','ci-arch-n')+'<div class="ci-arch" id="ci-arch"></div>';
  drawArch(logs);bindSets($('ci-right'));
  /* 绑定 */
  $('ci-ta').addEventListener('change',function(){S.cfgId=this.value;try{ctx.storage.set(K.last,{cfgId:S.cfgId})}catch(e){}});
  $('ci-pick').addEventListener('click',pickNew);
  $('ci-refile').addEventListener('click',refile);$('ci-resub').addEventListener('click',resub);
  $('ci-q').addEventListener('input',function(){drawWall(recs,this.value)});
  $('ci-hero').addEventListener('click',function(e){var t=e.target;
    if(S.ready){if(t.closest('.cancel')){unstage();return}if(t.closest('.ren')){renameStaged();return}if(t.closest('.ci-hero'))startStaged();return}
    var top=S.top;if(!top)return;if(t.closest('.ci-x')){delRec(top);return}if(t.closest('.ci-hero'))pickFor(top)});
  $('ci-hero').addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.classList&&(e.target.classList.contains('ci-hero')||e.target.classList.contains('ci-x'))){e.preventDefault();e.target.click()}});
  $('ci-wall').addEventListener('click',function(e){var c=e.target.closest('.ci-pc');if(!c)return;var rec=recs.find(function(r){return r.key===c.dataset.key});if(!rec)return;if(e.target.closest('.x')){delRec(rec);return}pickFor(rec)})}
function ticket(films,sess,ms,logs,top){return '<div class="ci-tk"><div class="h"><b><span class="lt">Internal Beyond</span><span class="dk">Infernal Beyond</span></b><i>Admit one</i></div><div class="g"><div class="c"><small>Films</small><b>'+films+'</b></div><div class="c"><small>Sessions</small><b>'+sess+'</b></div><div class="c"><small>Hours</small><b>'+(ms?Math.round(ms/360000)/10:0)+'</b></div><div class="c"><small>Archive</small><b>'+logs+'</b></div></div><div class="cut"></div><div class="f"><span>'+(top?'Last seat · '+dateStr(top.updated||top.created):'No ticket yet')+'</span><em></em></div></div>'}
/* 银幕：staged＝待放映（点它开始）；否则是最近一条记录（点它重新选文件）；没有记录是空场 */
function drawHero(rec,staged){var h=$('ci-hero');if(!h)return;var sec=$('ci-hero-sec');if(sec)sec.innerHTML=staged?'<b>待放映</b><i>Ready</i><s></s>':'<b>最近在看</b><i>Now showing</i><s></s>';
  if(!rec){h.innerHTML='<div class="ci-hero empty"><div class="em">'+ICON.reel+'<b>No Film Yet</b><small>从本机选一个视频文件</small><span class="ci-k" id="ci-pick3">Choose a Film</span></div></div>';$('ci-pick3').addEventListener('click',function(e){e.stopPropagation();pickNew()});return}
  var c=staged?(SUBS[rec.key]||null):null;var ta=esc(taName(rec.cfgId));
  var info=staged?('和 '+ta+' 一起看 · '+(rec.dur?fmt(rec.dur):'读取时长…')+' · '+(c?'字幕 '+esc(c.name)+'（'+c.cues.length+' 条）':'没有字幕，顶栏可选')+' · '+esc(S.file?S.file.name:rec.file))
    :(ta+' · '+(rec.dur?fmt(rec.dur):'时长未知')+(rec.sub?' · 字幕 '+esc(rec.sub):' · 无字幕')+(rec.lastT?' · 看到 '+fmt(rec.lastT):'')+(rec.notes&&rec.notes.length?' · '+rec.notes.length+' 条笔记':'')+(rec.sessions?' · 一起看过 '+rec.sessions+' 次':''));
  var bg=rec.poster?'background-image:url('+rec.poster+')':'';
  h.innerHTML='<div class="ci-hero'+(staged?' staged':'')+'" tabindex="0" title="'+(staged?'Start':'重新选这个文件，接着和 '+ta+' 看')+'"><div class="bg" style="'+(bg||'background:linear-gradient(160deg,rgba(60,84,130,0.55),rgba(10,16,32,0.95))')+'"></div><div class="sh"></div>'
    +(staged?'':'<span class="ci-x" role="button" tabindex="0" title="删除这条观影记录（记录、档案与频道一并删除）"><svg viewBox="0 0 24 24"><path d="M5.5 7h13M9.5 7V5.4A1.4 1.4 0 0 1 10.9 4h2.2a1.4 1.4 0 0 1 1.4 1.4V7M7.8 7l.7 11.6a1.7 1.7 0 0 0 1.7 1.6h3.6a1.7 1.7 0 0 0 1.7-1.6L16.2 7"/><path d="M10.5 10.5v5.6M13.5 10.5v5.6"/></svg></span>')
    +(staged?'<span class="tag">待放映</span>':'')+'<span class="go">'+ICON.play+(staged?'Start':'Resume')+'</span>'
    +'<div class="in"><div class="tx"><b><span>'+esc(rec.title)+'</span>'+(staged?'<span class="ren" title="改片名">'+ICON.pen+'</span>':'')+'</b><small>'+info+'</small></div><div class="acts">'+(staged?'<span class="ci-k cancel">取消</span>':'')+'</div></div></div>'}/* 2.6.3：删除挪到右上角圆钮 */
function drawWall(recs,q){var w=$('ci-wall');if(!w)return;q=(q||'').trim().toLowerCase();var l=recs.filter(function(r){return !q||((r.title||'')+' '+(r.file||'')+' '+taName(r.cfgId)).toLowerCase().indexOf(q)!==-1});var n=$('ci-wall-n');if(n)n.textContent=recs.length?String(l.length):'';
  if(!recs.length){w.innerHTML=[1,2,3].map(function(i){return '<div class="ci-ghost"><b>0'+i+'</b><i>Slot</i></div>'}).join('');return}
  if(!l.length){w.innerHTML='<div class="ci-none" style="grid-column:1/-1;padding:18px 4px">没有匹配的片子</div>';return}
  w.innerHTML=l.map(function(r){return '<div class="ci-pc" data-key="'+esc(r.key)+'"><div class="po" style="'+(r.poster?'background-image:url('+r.poster+')':'')+'">'+(r.poster?'':'<b>'+esc(String(r.title||'?').slice(0,1))+'</b>')+(r.done?'<span class="dn">Finished</span>':'')+'</div><div class="cp"><b>'+esc(r.title)+'</b><small>'+esc(taName(r.cfgId))+' · '+(r.dur?fmt(r.dur):'时长未知')+(r.sub?' · 字幕':'')+(r.notes&&r.notes.length?' · '+r.notes.length+' 条笔记':'')+'<br>'+dateStr(r.updated||r.created)+(r.lastT?' · 看到 '+fmt(r.lastT):'')+' · '+esc(r.file)+'</small></div><span class="x" title="删除记录（连同频道）">✕</span></div>'}).join('')}
function drawArch(logs){var a=$('ci-arch');if(!a)return;var n=$('ci-arch-n');if(n)n.textContent=logs.length?String(logs.length):'';
  a.innerHTML=logs.length?logs.slice(0,40).map(function(e){return '<div class="ci-ar"><b>'+dateStr(e.ts)+' '+timeStr(e.ts)+'</b><span>'+esc(e.title||'')+'</span><small>'+esc(e.name||'')+' · '+(e.mins||0)+' 分钟 · 看到 '+fmt(e.t||0)+(e.n?' · 记了 '+e.n+' 笔':'')+(e.done?' · 看完':'')+'</small></div>'}).join(''):'<div class="ci-none">还没有档案：每次离开放映都会记下这一次——时间、TA、看了多久、看到哪、记了几笔。</div>'}

async function delRec(rec){if(!await ctx.ui.confirm('删除这条观影记录？\n记录、档案与「'+rec.title+'」的频道会一起删除，此操作不可恢复。','删除'))return;
  try{await ctx.storage.remove(K.film+rec.key)}catch(e){}try{await ctx.storage.remove(K.sum+rec.key)}catch(e){}try{await ctx.storage.remove(K.log+rec.key)}catch(e){}delete SUBS[rec.key];if(S.ready&&S.ready.rec.key===rec.key){S.ready=null;S.file=null;S.probeId++}
  if(rec.thread){try{var msgs=await dbGetByIndex('chatMessages','byFriend',rec.cfgId);for(var i=0;i<msgs.length;i++){if(msgs[i].threadId===rec.thread)await dbDelete('chatMessages',msgs[i].id)}await dbDelete('chatThreads',rec.thread);try{await dbDelete('chatSummaries','sum_'+rec.thread)}catch(e){}if(typeof activeThreadId!=='undefined'&&activeThreadId===rec.thread){activeThreadId=null;try{selectFriend(rec.cfgId)}catch(e){}}try{loadFriendsList()}catch(e){}}catch(e){}}
  ctx.ui.toast('已删除');renderLib()}

/* 选一部片：一律新开记录与频道（同一部片可以有多条记录）；历史里点的片先重选同一个文件；选好即上银幕待放映 */
function fileInput(){var inp=$('ci-file');if(!inp){inp=document.createElement('input');inp.type='file';inp.id='ci-file';inp.accept='video/*';inp.style.display='none';document.body.appendChild(inp)}return inp}
function subInput(){var inp=$('ci-subfile');if(!inp){inp=document.createElement('input');inp.type='file';inp.id='ci-subfile';inp.accept='.srt,.vtt,text/vtt,text/plain';inp.style.display='none';document.body.appendChild(inp)}return inp}
function pickNew(){var ta=$('ci-ta');var fid=(ta&&ta.value)||S.cfgId;if(!fid){ctx.ui.toast('先到 API 页添加一位 TA');return}var inp=fileInput();inp.value='';inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;var key=hash(f.name)+'_'+f.size+'_'+Date.now().toString(36);var rec={key:key,title:titleOf(f.name),file:f.name,size:f.size,dur:0,sub:'',cfgId:fid,thread:'',done:false,notes:[],poster:'',sessions:0,totalMs:0,lastT:0,lastTs:0,created:Date.now(),updated:Date.now()};S.file=f;stageRec(rec,true)};inp.click()}
function pickFor(rec){var inp=fileInput();inp.value='';inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;S.file=f;if(f.name!==rec.file||f.size!==rec.size)ctx.ui.toast('和记录里的文件名或大小不一样，仍按这个文件放');stageRec(rec,false)};inp.click()}

/* ── 待放映：选好文件后银幕上就是它——离屏抓一帧做海报、读出时长；顶栏「换视频 / 选字幕」对它生效，改片名在片名旁；点银幕开始 ── */
function stageRec(rec,isNew){S.ready={rec:rec,isNew:isNew};drawHero(rec,true);syncTop();var mid=$('ci-mid');if(mid){try{mid.scrollTo({top:0,behavior:'smooth'})}catch(e){mid.scrollTop=0}}
  var f=S.file;if(!f)return;probe(f,function(p,d,w,h){if(!S.ready||S.ready.rec!==rec)return;if(d)rec.dur=d;if(p){rec.poster=p;rec.posterW=Math.min(1280,w||0)}if(w)rec.vw=w;if(h)rec.vh=h;drawHero(rec,true)})}
function unstage(){S.ready=null;S.file=null;S.probeId++;drawHero(S.top,false);syncTop()}
function syncTop(){var a=$('ci-refile'),b=$('ci-resub');if(!a||!b)return;var on=!!S.ready;var c=on?(SUBS[S.ready.rec.key]||null):null;
  a.classList.toggle('dis',!on);b.classList.toggle('dis',!on);a.title=on?'换成另一个视频文件（记录不变）':'先选一部片';
  b.textContent=c?'换字幕':'选字幕';b.title=on?(c?c.name+'（'+c.cues.length+' 条）· 点一下换一份':'选一份 .srt / .vtt 字幕，随这次放映用'):'先选一部片'}
function refile(){if(!S.ready){ctx.ui.toast('先选一部片');return}var rec=S.ready.rec,isNew=S.ready.isNew;var inp=fileInput();inp.value='';inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;
    if(isNew){if(rec.title===titleOf(rec.file))rec.title=titleOf(f.name);rec.file=f.name;rec.size=f.size;rec.dur=0;rec.poster=''}else if(f.name!==rec.file||f.size!==rec.size)ctx.ui.toast('和记录里的文件名或大小不一样，仍按这个文件放');
    S.file=f;stageRec(rec,isNew)};inp.click()}
function resub(){if(!S.ready){ctx.ui.toast('先选一部片');return}var rec=S.ready.rec;var inp=subInput();inp.value='';inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;var fr=new FileReader();
    fr.onload=function(){var cues=parseSubs(decodeText(fr.result));if(!cues.length){ctx.ui.toast('这份字幕读不出内容（要 .srt / .vtt 的时间轴格式）');return}SUBS[rec.key]={name:f.name,cues:cues};if(S.ready&&S.ready.rec===rec){drawHero(rec,true);syncTop()}ctx.ui.toast('字幕已选好：'+f.name+'，'+cues.length+' 条')};fr.readAsArrayBuffer(f)};inp.click()}
async function renameStaged(){if(!S.ready)return;var rec=S.ready.rec;var t=await ctx.ui.prompt('片名',rec.title);if(t==null)return;t=String(t).trim();if(!t||!S.ready||S.ready.rec!==rec)return;rec.title=t;drawHero(rec,true)}
async function startStaged(){if(!S.ready)return;var rec=S.ready.rec;if(!S.file){ctx.ui.toast('先选好视频文件');return}if(!ctx.chat.cfg(rec.cfgId)){ctx.ui.toast('这位 TA 已不在');return}/* 2.3.2：先验 TA，再清待放映态（原来先清再进 play，TA 不在时银幕停在待放映的样子却点不动） */var c=SUBS[rec.key]||null;S.subs=c?c.cues:[];if(S.subs.length)rec.sub=c.name;/* 这次没带字幕也留着上次的字幕名，银幕上好提示 */S.ready=null;S.probeId++;await play(rec)}
/* ═══ 放映 ═══ */
async function play(rec){var cfg=ctx.chat.cfg(rec.cfgId);if(!cfg){ctx.ui.toast('这位 TA 已不在');return}
  S.uname=await getUname();S.rec=rec;S.cfgId=rec.cfgId;S.keep=null;S.sum=null;S.sumBusy=false;S.sumChk=0;S.rate=1;S.notes0=(rec.notes||[]).length;S.done0=!!rec.done;S.enteredAt=Date.now();S.totalMark=0;S.posterTried=!!(rec.poster&&(rec.posterW||0)>=720);/* 旧的 360px 海报这一场自动换新 */S.subHold=0;S.subQ='';S.subCur=-1;S.lane=0;
  try{var sv=await ctx.storage.get(K.sum+rec.key);if(sv&&typeof sv==='object'&&sv.text)S.sum={text:String(sv.text||''),t:Number(sv.t)||0,updated:sv.updated||0,full:!!sv.full}}catch(e){S.sum=null}S.sum0=S.sum?Object.assign({},S.sum):null;
  try{S.prevSel=ctx.chat.current()}catch(e){S.prevSel=null}
  S.thread=await ctx.chat.openThread(rec.cfgId,{kind:'cinema',name:'观影 · '+short(rec.title,24),film:{hash:rec.key,title:rec.title,file:rec.file,size:rec.size,duration:rec.dur||0},quiet:true,memory:true});
  rec.thread=S.thread.id;await recSave();try{await ctx.storage.set(K.last,{cfgId:rec.cfgId})}catch(e){}
  var pg=page();S.view='play';pg.classList.add('play');document.body.classList.add('ci-on');document.body.classList.remove('ibr-col-off');
  pg.innerHTML='<aside class="ci-left" id="ci-left"></aside><section class="ci-mid" id="ci-mid"></section>';
  var canSee=ctx.chat.canSee(rec.cfgId);S.see=canSee?S.cfg.see:'off';
  var avaStyle=cfg.avatar?' style="background-image:url('+String(cfg.avatar).replace(/["'()]/g,'')+')"':'';
  /* 左栏：海报卡 · 放映点 · 胶片时间轴 · 提要 · 本场 */
  $('ci-left').innerHTML='<div class="ci-pos" id="ci-pos"><div class="bg" style="'+(rec.poster?'background-image:url('+rec.poster+')':'background:linear-gradient(160deg,rgba(60,84,130,0.55),rgba(10,16,32,0.95))')+'"></div><div class="sh"></div><span class="who"><span class="ibr-ava"'+avaStyle+'></span>'+esc(cfg.nickname||cfg.model||'TA')+'</span><div class="in"><b>'+esc(rec.title)+'</b><small>'+(S.subs.length?'字幕 · '+esc(rec.sub)+'（'+S.subs.length+' 条）':'无字幕文件')+(canSee?'':' · TA 看不到画面')+'</small></div></div>'
    +'<div class="ci-line"><i>'+esc(rec.file)+'</i> · '+sizeStr(rec.size)+'</div>'
    +'<div class="ci-pt"><div class="t"><span id="ci-dash-t">0:00 <i>/ 0:00</i></span><em>Now playing</em></div><div class="ci-prog" id="ci-prog"><i class="f"></i></div></div>'
    +lab('胶片时间轴','Reel','ci-n-n')+'<div class="ci-reel" id="ci-nl"></div><span class="ci-nadd" id="ci-nadd">+ 在此刻记一笔</span>'
    +((S.subs.length||(S.sum&&S.sum.text))?lab('前情提要','Previously')+'<div class="ci-card ci-sumc" id="ci-sumc"></div>':'')/* 2.4.0：没有字幕也没有旧梗概时，这一块不出 */
    +lab('本场','This session')+'<div class="ci-sess" id="ci-stat"></div>';
  /* 中栏：顶栏 · 舞台（弹幕层 / 字幕 / 浮层）· 衔接条 · 拉杆 · 字幕流 */
  $('ci-mid').innerHTML='<div class="ci-top"><button class="btn ci-exit" id="ci-exit" title="离开放映">← 离开放映</button><span class="ci-name"><b>'+esc(rec.title)+'</b><i>Cinema</i><em>观影室</em></span><button class="btn'+(rec.done?' on':'')+(S.subs.length?'':' dis')+'" id="ci-wrap" title="'+(S.subs.length?'用整片字幕做一份梗概，随「看完了」一起寄给 TA，然后聊整部片':'无字幕文件：压不出整片梗概')+'">'+(rec.done?'已看完':'回顾')+'</button><button class="btn" id="ci-focus" title="只留舞台与字幕；再点恢复">专注</button><button class="btn ci-ico" id="ci-setbtn" title="放映设置：画面 / 画质 / 留影 / 字幕 / 梗概 / 弹幕，修改即时生效">'+ICON.sliders+'设置</button><button class="btn on" id="ci-pill" title="收起 / 展开右侧对话窗口">对话窗口</button></div>'
    +'<div class="ci-stage" id="ci-stage" tabindex="0"><video id="ci-video" playsinline preload="metadata"></video><div class="ci-dm" id="ci-dm"></div><div class="ci-cc" id="ci-cc"></div>'
    +'<div class="ci-ui" id="ci-ui"><div class="ci-utop"><span class="ci-utitle">'+esc(rec.title)+'</span><span class="sp"></span></div>'
    +'<span class="ci-big" id="ci-big">'+ICON.play+'</span>'
    +'<div class="ci-ubot"><span class="ci-k ic" id="ci-pp" title="播放 / 暂停（空格）">'+ICON.play+'</span><span class="ci-k" id="ci-b10">«10</span><span class="ci-time" id="ci-cur">0:00</span><div class="ci-bar" id="ci-bar"><i id="ci-bar-i"></i></div><span class="ci-time" id="ci-dur">0:00</span><span class="ci-k" id="ci-f10">10»</span>'
    +'<div class="ci-fsin" id="ci-fsin"><input id="ci-fsq" placeholder="说点什么，或问 TA 讲到哪了…" autocomplete="off" maxlength="300"><span class="ci-k ic ln" id="ci-fscam" title="留影：夹住当前一帧，随下一句发出">'+ICON.cam+'</span><span class="ci-k" id="ci-fssend">寄出</span></div>'
    +'<span class="ci-k ic ln'+(S.subs.length&&S.subOn?' on':'')+'" id="ci-ccbtn" title="'+(S.subs.length?'画面上的字幕显示开关':'No Subtitles')+'">'+ICON.cc+'</span><span class="ci-k ic ln'+(S.dm?' on':'')+'" id="ci-dmbtn" title="弹幕：你和 TA 的话飞过画面">'+ICON.dm+'</span><span class="ci-k" id="ci-ratebtn" title="倍速">1×</span><span class="ci-k" id="ci-fsbtn" title="全屏（全屏里只放映）">'+ICON.fs+'</span></div>'
    +'</div></div>'
    +'<div class="ci-strip"><span class="ibr-ava"'+avaStyle+'></span><span>与 <b>'+esc(cfg.nickname||cfg.model||'TA')+'</b> 一起看</span><em id="ci-strip-t">0:00 / 0:00</em>'
    +'<span class="ci-st" id="ci-st" title="放映设置（点开）"></span><span class="sp"></span><span id="ci-cnt"></span></div>'
    +'<div class="ci-hgrip" id="ci-hgrip" title="拖动调整舞台与字幕流的高度 · 双击恢复"></div>'
    +'<div class="ci-sub" id="ci-sub"><div class="ci-sub-h">'+lab('字幕流','Subtitles','ci-sub-n')+(S.subs.length?'<div class="ci-search"><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.4"/><path d="m13.6 13.6-3.3-3.3"/></svg><input id="ci-sq" placeholder="搜字幕…" autocomplete="off"></div>':'')+'</div><div class="ci-sub-l" id="ci-sub-l"></div></div>';
  if(S.url){try{URL.revokeObjectURL(S.url)}catch(e){}}S.url=URL.createObjectURL(S.file);var v=video();v.src=S.url;v.playbackRate=1;
  /* 右栏：自带消息列表的频道栏 */
  S.col=ctx.ui.column({id:'ci-col',cls:'ci-col',gripCls:'ci-grip',varName:'--ibr-cw',min:300,max:640,title:'观影 · '+short(rec.title,24),en:'Cinema',ta:cfg.nickname||cfg.model||'AI',avatar:cfg.avatar||'',hint:'',closeTitle:'离开放映',
    miniIcon:ICON.cam,miniTitle:'留影：夹住当前一帧，随下一句发出',placeholder:'说点什么，或问 TA 讲到哪了…',onClose:function(){askExit()},onMini:keepFrame,onSend:function(ta){send(ta,null)}});
  S.col.grip.id='ci-grip';pg.appendChild(S.col.el);pg.appendChild(S.col.grip);S.col.grip.addEventListener('dblclick',syncPill);
  S.list=document.createElement('div');S.list.className='chat-messages';S.list.id='ci-msgs';S.col.host.appendChild(S.list);
  ctx.sys.set(sysBlock());
  bindPlayer();bindPlayUI();fitStage();drawNotes();drawSubs();drawSummary();drawSess();syncPill();syncStrip();
  await loadList();S.statT=setInterval(function(){if(S.view==='play')drawSess()},30000);
  try{stage().focus()}catch(e){}}

/* ── 常量块（进 system）：这是什么、会收到什么、边界；看完后换成整片口径 ── */
function sysBlock(){var r=S.rec;if(!r)return '';
  if(r.done)return '【观影室】你和“'+un()+'”已经一起看完《'+r.title+'》。「看完了」那条消息里附着整片梗概，那是你们一起看过的全部内容，可以聊全片了；梗概里没有的细节不要编。';
  return '【观影室】你和“'+un()+'”正在 Internal Beyond 的观影室里一起看一部本机视频《'+r.title+'》：对方在放，你陪着看。对方每条消息里会带一段「系统随消息附上的观影状态」（在【用户当前消息】之前）——播放点之前的字幕（如有）、进度、前情梗概、时间轴笔记，以及消息里若附了画面才有的那一帧'+(S.see==='turn'?'（默认每条消息附此刻一帧，随消息临时附上，不留在聊天记录里）':(S.see==='snap'?'（只在对方留影时附）':(S.see==='off'?'（对方没开画面，你看不到画面）':'')))+'；那不是对方说的话，对方说的话在【用户当前消息】之后。播放点之后的剧情你不知道，不预告、不猜结局、不引用没给你的台词，没给你的画面不描述。回复像坐在旁边看片的人随口说的话，一两句即可，不总结不分析。'}
function evidence(frame){return (S.subs.length?('外挂字幕 '+S.subs.length+' 条'):'没有字幕')+(frame?' ＋ 此刻一帧画面':(ctx.chat.canSee(S.cfgId)?'':' · TA 看不到画面'))}
function bound(frame){if(frame)return '[边界] 画面只说里面确实有的，画面里没有的不要补；看不清就说看不清。';
  if(!S.subs.length)return '[边界] 你看不到画面、也没有台词文本，只知道片名、进度和对方说的话：不要描述画面、不要编台词或剧情，只就对方说的接话，不确定就问。';
  return '[边界] 你看不到画面，只有台词文本：不要描述画面，画面里发生了什么只能从台词和对方的话里知道。'}
function tailText(t,d,frame){var r=S.rec;var mins=Math.max(1,Math.round((Date.now()-S.enteredAt)/60000));var rs=subsBefore(t,S.subN);
  var s='———— 以下是系统随消息附上的观影状态，不是对方说的话；对方真正说的话在最后的【用户当前消息】里 ————\n【观影室】《'+r.title+'》· 进度 '+fmt(t)+(d?' / '+fmt(d):'')+' · 本次已看 '+mins+' 分钟 · 第 '+((r.sessions||0)+1)+' 次一起看 · 证据：'+evidence(frame)+(r.done?' · 已看完':'');
  if(S.subN&&S.subs.length)s+='\n[播放点之前最近的字幕]\n'+(rs.length?rs.map(function(c){return '['+fmt(c.s)+'] '+c.t.replace(/\n/g,' ')}).join('\n'):'（还没有台词）');
  if(S.sum&&S.sum.text)s+='\n[前情梗概（到 '+fmt(S.sum.t||0)+'）]\n'+S.sum.text;
  var ns=(r.notes||[]).filter(function(x){return x.kind!=='提问'}).slice(-6);if(ns.length)s+='\n[时间轴笔记]\n'+ns.map(function(x){return '['+fmt(x.t)+'] '+x.kind+(x.text?' · '+x.text:'')}).join('\n');
  if(frame)s+='\n[画面] 随本条消息附了此刻的一帧画面（'+fmt(t)+'）；画面里若有字幕先读字幕。';
  s+='\n'+bound(frame)+'\n[说明] 以上是这一轮你知道的全部：'+(S.subs.length?'字幕只到播放点为止，':'')+'后面的剧情你不知道，不预告、不猜。像坐在旁边一起看片的人那样接对方在【用户当前消息】里的那句话，一两句即可。';
  return s}

function bindPlayUI(){$('ci-exit').addEventListener('click',function(){askExit()});$('ci-setbtn').addEventListener('click',togglePop);$('ci-st').addEventListener('click',togglePop);
  S.docKey=function(e){if(e.key!=='Escape'||S.view!=='play')return;if($('ci-mem')){closeMem();return}if($('ci-pop')){closePop();return}var pg=page();if(pg.classList.contains('focus')&&!document.fullscreenElement){pg.classList.remove('focus');syncPill()}};document.addEventListener('keydown',S.docKey);
  $('ci-wrap').addEventListener('click',wrapUp);
  $('ci-focus').addEventListener('click',function(){page().classList.toggle('focus');syncPill()});
  $('ci-pill').addEventListener('click',function(){var pg=page();if(pg.classList.contains('focus')){pg.classList.remove('focus');document.body.classList.remove('ibr-col-off')}else document.body.classList.toggle('ibr-col-off');syncPill()});
  $('ci-nadd').addEventListener('click',async function(){var v=video();var t=v?v.currentTime:0;var txt=await ctx.ui.prompt('在 '+fmt(t)+' 记一笔','');if(txt==null)return;addNote(t,'笔记',String(txt).trim(),thumb())});
  $('ci-nl').addEventListener('click',function(e){var n=e.target.closest('.ci-fr');if(!n||!S.rec)return;var i=+n.dataset.i;if(e.target.closest('.d')){closeMem();S.rec.notes.splice(i,1);recSave();drawNotes();return}openMem(i,n)});/* 2.5.0：点一格＝弹「这一刻」气泡，跳转在气泡里 */
  var sq=$('ci-sq');if(sq)sq.addEventListener('input',function(){S.subQ=this.value;drawSubs()});
  var sl=$('ci-sub-l');sl.addEventListener('click',function(e){var a=e.target.closest('.ci-sl');if(!a)return;var v=video();if(v){v.currentTime=+a.dataset.t;uiShow(false)}});
  sl.addEventListener('mouseenter',function(){S.subHold=Number.MAX_SAFE_INTEGER});sl.addEventListener('mouseleave',function(){S.subHold=0});/* 鼠标停在字幕流上时不跟随，移开即恢复 */
  /* 舞台高度拉杆：拖动改 --ci-sh，松手存进设置；双击回到自动（按中栏宽度 16:9，最高 58%） */
  var g=$('ci-hgrip');g.addEventListener('pointerdown',function(e){var st=stage();if(!st)return;g.classList.add('drag');try{g.setPointerCapture(e.pointerId)}catch(x){}var y0=e.clientY,h0=st.getBoundingClientRect().height;
    function mv(ev){var h=clampStage(h0+(ev.clientY-y0));page().style.setProperty('--ci-sh',h+'px')}
    function up(){g.classList.remove('drag');g.removeEventListener('pointermove',mv);g.removeEventListener('pointerup',up);var h=stage()?Math.round(stage().getBoundingClientRect().height):0;if(h){S.cfg.sh=h;saveCfg()}}
    g.addEventListener('pointermove',mv);g.addEventListener('pointerup',up)});
  g.addEventListener('dblclick',function(){S.cfg.sh=0;saveCfg();fitStage();ctx.ui.toast('舞台高度回到自动')});
  try{S.ro=new ResizeObserver(function(){if(S.view==='play')fitStage()});S.ro.observe($('ci-mid'))}catch(e){S.ro=null}}
function clampStage(h){var mid=$('ci-mid');var H=mid?mid.clientHeight:600;var maxH=Math.max(160,H-62-44-12-140);return Math.max(160,Math.min(maxH,Math.round(h)))}
function fitStage(){var mid=$('ci-mid'),st=stage();if(!mid||!st||S.view!=='play'||document.fullscreenElement)return;var W=mid.clientWidth,H=mid.clientHeight;if(!W||!H)return;var want=S.cfg&&S.cfg.sh?S.cfg.sh:Math.min(Math.round(W*9/16),Math.round(H*0.58));page().style.setProperty('--ci-sh',clampStage(want)+'px')}
function syncPill(){var pg=page();var f=pg.classList.contains('focus');var b=$('ci-pill');if(b)b.classList.toggle('on',!f&&!document.body.classList.contains('ibr-col-off'));var fb=$('ci-focus');if(fb)fb.classList.toggle('on',f)}

function bindPlayer(){var v=video(),st=stage();
  v.addEventListener('loadedmetadata',function(){if(S.rec){S.rec.dur=v.duration||0;recSave()}$('ci-dur').textContent=fmt(v.duration);tick();drawNotes()});
  v.addEventListener('timeupdate',tick);v.addEventListener('play',function(){st.classList.add('playing');$('ci-pp').innerHTML=ICON.pause;uiHide()});v.addEventListener('pause',function(){st.classList.remove('playing');$('ci-pp').innerHTML=ICON.play;uiShow(true);tryPoster()});
  v.addEventListener('ended',function(){st.classList.remove('playing');$('ci-pp').innerHTML=ICON.play;uiShow(true)});
  v.addEventListener('error',function(){ctx.ui.toast('这个文件放不出来：'+(v.error&&v.error.message||'浏览器不支持它的编码')+'。换一个 mp4 / webm 试试')});
  function toggle(){if(v.paused)v.play().catch(function(){});else v.pause()}
  $('ci-big').addEventListener('click',toggle);$('ci-pp').addEventListener('click',toggle);v.addEventListener('click',toggle);
  $('ci-b10').addEventListener('click',function(){v.currentTime=Math.max(0,v.currentTime-10)});$('ci-f10').addEventListener('click',function(){v.currentTime=Math.min(v.duration||0,v.currentTime+10)});
  $('ci-bar').addEventListener('click',function(e){var r=this.getBoundingClientRect();var p=(e.clientX-r.left)/r.width;if(v.duration)v.currentTime=Math.max(0,Math.min(v.duration,p*v.duration))});
  $('ci-ccbtn').addEventListener('click',function(){if(!S.subs.length){ctx.ui.toast('无字幕文件：回视频库重选时可以加一份 .srt / .vtt');return}S.subOn=!S.subOn;this.classList.toggle('on',S.subOn);saveCfg();syncSetUI();tick()});
  $('ci-dmbtn').addEventListener('click',function(){S.dm=!S.dm;this.classList.toggle('on',S.dm);saveCfg();syncSetUI();if(!S.dm){var dm=$('ci-dm');if(dm)dm.innerHTML=''}});
  $('ci-ratebtn').addEventListener('click',function(){var r=[1,1.25,1.5,2,0.75];S.rate=r[(r.indexOf(S.rate)+1)%r.length];v.playbackRate=S.rate;this.textContent=S.rate+'×'});
  var fq=$('ci-fsq');if(fq){
    fq.addEventListener('focus',function(){uiShow(true)});
    fq.addEventListener('blur',function(){uiShow(false)});
    fq.addEventListener('keydown',function(e){e.stopPropagation();if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();fsSend()}});
    $('ci-fssend').addEventListener('click',fsSend);
    $('ci-fscam').addEventListener('click',function(){if(!S.col||!S.col.mini)return;keepFrame(S.col.mini);uiShow(true)});
  }
  $('ci-fsbtn').addEventListener('click',function(){if(document.fullscreenElement){document.exitFullscreen().catch(function(){})}else{st.requestFullscreen({navigationUI:'hide'}).catch(function(){ctx.ui.toast('这个浏览器不允许全屏')})}});
  st.addEventListener('mousemove',function(){uiShow(false)});st.addEventListener('mouseleave',function(){if(!v.paused)uiHide()});
  st.addEventListener('keydown',function(e){if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.code==='Space'){e.preventDefault();toggle()}else if(e.key==='ArrowLeft'){v.currentTime=Math.max(0,v.currentTime-5)}else if(e.key==='ArrowRight'){v.currentTime=Math.min(v.duration||0,v.currentTime+5)}});
  document.addEventListener('fullscreenchange',onFs)}
function onFs(){var st=stage();if(!st)return;st.classList.toggle('fs',document.fullscreenElement===st);if(!document.fullscreenElement)fitStage()}
/* 全屏输入栏寄出：走与右栏同一条 send（这一帧、弹幕、胶片记一笔都一样） */
function fsSend(){var q=$('ci-fsq');if(!q)return;if(!(q.value||'').trim()&&!S.keep){ctx.ui.toast('写点什么给 TA');return}send(q);syncCam();uiShow(true);try{q.focus()}catch(e){}}
function uiShow(stay){var st=stage();if(!st)return;st.classList.remove('hideui');clearTimeout(S.uiT);if(!stay)uiHide()}
function uiHide(){clearTimeout(S.uiT);S.uiT=setTimeout(function(){var v=video(),st=stage();if(v&&st&&!v.paused)st.classList.add('hideui')},3500)}
function tryPoster(){if(S.posterTried||!S.rec)return;var v=video();if(!v||!v.videoWidth||v.currentTime<1.5)return;var p=poster();if(!p)return;S.posterTried=true;S.rec.poster=p.p;S.rec.posterW=p.w;S.rec.vw=v.videoWidth;S.rec.vh=v.videoHeight;recSave();var bg=document.querySelector('#ci-pos .bg');if(bg){bg.style.background='';bg.style.backgroundImage='url('+p.p+')'}}
function tick(){var v=video();if(!v)return;var t=v.currentTime||0,d=v.duration||0;var cu=$('ci-cur');if(cu)cu.textContent=fmt(t);var bi=$('ci-bar-i');if(bi)bi.style.width=(d?Math.min(100,t/d*100):0)+'%';var st=$('ci-strip-t');if(st)st.textContent=fmt(t)+' / '+fmt(d);
  var dt=$('ci-dash-t');if(dt)dt.innerHTML=fmt(t)+' <i>/ '+fmt(d)+'</i>';var pf=document.querySelector('#ci-prog .f');if(pf)pf.style.width=(d?Math.min(100,t/d*100):0)+'%';
  if(S.col)S.col.setHint('播放点 '+fmt(t)+(S.see==='turn'?' · 每条附一帧':S.see==='snap'?' · 留影时附帧':' · 不附画面'));
  var cc=$('ci-cc');if(cc){var cur=S.subOn&&S.subs.length?S.subs.find(function(c){return t>=c.s&&t<=c.e}):null;var txt=cur?cur.t:'';if(cc.textContent!==txt)cc.textContent=txt}
  followSub(t,false);if(!S.posterTried&&t>=3)tryPoster();
  if(S.sumEvery&&S.subs.length&&!S.sumBusy&&!(S.sum&&S.sum.full)&&t-(S.sum?S.sum.t||0:0)>=S.sumEvery*60&&Date.now()-S.sumChk>60000){S.sumChk=Date.now();summarize(t)}}

/* 字幕流：逐句可点跳、当前句跟随（鼠标停在列表上时不跟随） */
function drawSubs(){var l=$('ci-sub-l');if(!l)return;var n=$('ci-sub-n');
  if(!S.subs.length){l.innerHTML='<div class="ci-sub-e"><b>No Subtitles</b>回视频库重选时可以加一份 .srt / .vtt。有字幕时这里逐句显示，点击即可自动跳到那一刻。</div>';if(n)n.textContent='';return}
  var q=(S.subQ||'').trim().toLowerCase();var hit=0;var re=q?new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'):null;
  l.innerHTML=S.subs.map(function(c,i){var h=!!(q&&c.t.toLowerCase().indexOf(q)!==-1);if(h)hit++;var tx=esc(c.t);if(h&&re)tx=tx.replace(re,function(m){return '<mark>'+m+'</mark>'});return '<a class="ci-sl'+(h?' hit':'')+'" data-i="'+i+'" data-t="'+c.s+'"><b>'+fmt(c.s)+'</b><span>'+tx+'</span></a>'}).join('');
  if(n)n.textContent=q?(hit+' / '+S.subs.length):String(S.subs.length);S.subCur=-1;followSub(video()?(video().currentTime||0):0,true)}
function followSub(t,force){if(!S.subs.length)return;var i=-1;for(var k=0;k<S.subs.length;k++){if(S.subs[k].s<=t)i=k;else break}if(i===S.subCur&&!force)return;var l=$('ci-sub-l');if(!l)return;var old=l.querySelector('.ci-sl.on');if(old)old.classList.remove('on');S.subCur=i;if(i<0)return;var el=l.querySelector('.ci-sl[data-i="'+i+'"]');if(!el)return;el.classList.add('on');
  if(!force&&Date.now()<S.subHold)return;var top=el.offsetTop-l.clientHeight*0.4;try{l.scrollTo({top:Math.max(0,top),behavior:force?'instant':'smooth'})}catch(e){l.scrollTop=Math.max(0,top)}}

/* 胶片时间轴 ＋ 进度条刻度 */
function drawNotes(){var box=$('ci-nl');if(!box||!S.rec)return;var v=video(),d=(v&&v.duration)||S.rec.dur||0;var notes=S.rec.notes||[];var n=$('ci-n-n');if(n)n.textContent=notes.length?String(notes.length):'';
  var G={'留影':'影','提问':'T','梗概':'概','笔记':'记','看完':'完'};
  box.innerHTML=notes.length?notes.map(function(x,i){return '<div class="ci-fr" data-i="'+i+'" title="'+esc(x.text||kindLabel(x.kind))+' · 点一下看这一刻"><span class="th"'+(x.th?' style="background-image:url('+x.th+')"':'')+'>'+(x.th?'':'<i>'+(G[x.kind]||'·')+'</i>')+'</span><div class="m"><b><span>'+fmt(x.t)+'</span><i>'+esc(kindLabel(x.kind))+'</i></b><small>'+(x.text?esc(x.text):'<span style="color:var(--ibr-mute)">（这一刻）</span>')+'</small></div><span class="d" title="删除">✕</span></div>'}).join(''):'<div class="ci-none" style="padding:6px 0 6px 6px">留影、Talk、梗概与「记一笔」都落在这条胶片上，带播放点，点一格看这一刻。</div>';
  var bar=$('ci-bar');if(bar){bar.querySelectorAll('s').forEach(function(s){s.remove()});if(d)notes.forEach(function(x){var s=document.createElement('s');s.style.left=(x.t/d*100)+'%';bar.appendChild(s)})}
  var pg=$('ci-prog');if(pg){pg.querySelectorAll('.t').forEach(function(s){s.remove()});if(d)notes.forEach(function(x){var s=document.createElement('i');s.className='t';s.style.left=(x.t/d*100)+'%';pg.appendChild(s)})}}
function kindLabel(k){return k==='提问'?'Talk':(k||'')}/* 2.5.0：时间轴上「提问」显示为 Talk；存档里的 kind 不改（旧记录与整片口径兼容） */
function addNote(t,kind,text,th,ex){if(!S.rec)return null;S.rec.notes=S.rec.notes||[];var x={t:t,kind:kind,text:text||'',th:th||'',ts:Date.now()};if(ex)Object.keys(ex).forEach(function(k){x[k]=ex[k]});S.rec.notes.push(x);S.rec.notes.sort(function(a,b){return a.t-b.t});recSave();drawNotes();return x}
/* ── 「这一刻」气泡：点时间轴一格 → 那一刻的截图 + 两人的对话（2.5.0） ── */
function frameAt(t,cb){var src=S.url;if(!src){cb('');return}var ov=document.createElement('video');ov.muted=true;ov.preload='auto';ov.playsInline=true;ov.style.cssText='position:fixed;left:-9999px;top:-9999px;width:2px;height:2px;opacity:0;pointer-events:none';var done=false,tm=setTimeout(function(){fin('')},5000);
  function fin(u){if(done)return;done=true;clearTimeout(tm);try{ov.removeAttribute('src');ov.load();ov.remove()}catch(e){}cb(u||'')}
  ov.addEventListener('seeked',function(){try{var w=Math.min(360,ov.videoWidth||0);if(!w)return fin('');var h=Math.round(ov.videoHeight*w/ov.videoWidth);var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(ov,0,0,w,h);fin(c.toDataURL('image/jpeg',0.7))}catch(e){fin('')}});
  ov.addEventListener('error',function(){fin('')});ov.addEventListener('loadedmetadata',function(){try{ov.currentTime=Math.max(0.05,Math.min(t||0,(ov.duration||t||0)-0.05))}catch(e){fin('')}});document.body.appendChild(ov);ov.src=src}
function memChat(x,cb){if(x.kind==='笔记'||x.kind==='梗概'||x.kind==='看完'){cb({q:'',a:''});return}if(x.q||x.a){cb({q:x.q||x.text||'',a:x.a||''});return}if(!S.thread){cb({q:x.text||'',a:''});return}
  ctx.chat.recent(S.cfgId,S.thread.id).then(function(l){var best=null,bd=1e15,ts=x.ts||0;(l||[]).forEach(function(m,i){if(!m||m.role!=='user')return;var d=Math.abs((m.timestamp||m.ts||0)-ts);if(d<bd){bd=d;best=i}});
    if(best===null||bd>240000){cb({q:x.text||'',a:''});return}var u=l[best],a='';for(var j=best+1;j<l.length;j++){if(l[j]&&l[j].role==='assistant'){a=l[j].content||'';break}}cb({q:String(u.content||'').replace(/^[\s\S]*?【用户当前消息】\s*/,''),a:stripAi(a)})}).catch(function(){cb({q:x.text||'',a:''})})}
function closeMem(){var p=$('ci-mem');if(p)p.remove();if(S.memClick){document.removeEventListener('pointerdown',S.memClick,true);S.memClick=null}}
function openMem(i,itemEl){if(!S.rec||!S.rec.notes||!S.rec.notes[i])return;closeMem();closePop();var x=S.rec.notes[i],pg=page(),cfg=ctx.chat.cfg(S.cfgId);if(!pg)return;
  var p=document.createElement('div');p.className='ci-mem';p.id='ci-mem';var when=x.ts?(dateStr(x.ts)+' '+timeStr(x.ts)):'';
  p.innerHTML='<div class="h"><b>'+fmt(x.t)+'</b><i>'+esc(kindLabel(x.kind))+'</i><em>'+esc(when)+'</em><span class="x" title="关闭">✕</span></div><div class="sh"><div class="ph">…</div></div><div class="cv" id="ci-mem-cv"></div><div class="ft"><button type="button" class="btn" id="ci-mem-go">▶ 回到这一刻</button></div>';
  pg.appendChild(p);
  try{var r=itemEl.getBoundingClientRect(),pr=pg.getBoundingClientRect();var top=Math.max(12,Math.min(r.top-pr.top-8,pr.height-p.offsetHeight-12));p.style.top=top+'px'}catch(e){}
  function clamp(){try{var pr=pg.getBoundingClientRect();var top=parseFloat(p.style.top)||0,mx=pr.height-p.offsetHeight-12;if(top>mx)p.style.top=Math.max(12,mx)+'px'}catch(e){}}
  p.querySelector('.x').addEventListener('click',closeMem);$('ci-mem-go').addEventListener('click',function(){var v=video();if(v){v.currentTime=x.t;uiShow(false)}closeMem()});
  S.memClick=function(e){var path=e.composedPath?e.composedPath():[];if(path.indexOf(p)>=0||(itemEl&&path.indexOf(itemEl)>=0))return;closeMem()};setTimeout(function(){if(S.memClick)document.addEventListener('pointerdown',S.memClick,true)},0);
  function paintShot(u){var sh=p.querySelector('.sh');if(!sh||!p.isConnected)return;sh.innerHTML=u?'<img src="'+u+'" alt="">':'<div class="ph">这一刻没有画面</div>';clamp()}
  if(x.th)paintShot(x.th);else frameAt(x.t,function(u){if(u){x.th=u;recSave();var f=document.querySelector('.ci-fr[data-i="'+i+'"] .th');if(f){f.style.backgroundImage='url('+u+')';f.innerHTML=''}}paintShot(u)});
  memChat(x,function(c){var cv=$('ci-mem-cv');if(!cv)return;var ta=cfg?(cfg.nickname||cfg.model||'TA'):'TA',ava=(cfg&&cfg.avatar)?' style="background-image:url('+cfg.avatar+')"':'';
    if(x.kind==='梗概'){cv.innerHTML='<div class="n">这里压过一次前情梗概'+(S.sum&&S.sum.text?('：'+esc(short(S.sum.text,160))):'')+'</div>';return}
    if(x.kind==='看完'){cv.innerHTML='<div class="n">看完了。整片梗概随「看完了」那条消息寄给了 '+esc(ta)+'。</div>';return}
    if(!c.q&&!c.a){cv.innerHTML='<div class="n">'+(x.kind==='笔记'?esc(x.text||''):'这一刻没有留下对话')+'</div>';return}
    cv.innerHTML=(c.q?'<div class="u"><small>'+esc(un())+'</small><div>'+esc(c.q)+'</div></div>':'')+(c.a?'<div class="a"><span class="ibr-ava"'+ava+'></span><div><small>'+esc(ta)+'</small><div>'+esc(short(c.a,900))+'</div></div></div>':'<div class="n">TA 还没回这一句</div>');clamp()})}
function drawSummary(){var c=$('ci-sumc');if(!c)return;c.innerHTML=S.sum&&S.sum.text?'<p>'+esc(S.sum.text)+'</p><small>到 '+fmt(S.sum.t||0)+' · '+timeStr(S.sum.updated)+(S.sum.full?' · 整片':'')+'</small>':'<div class="ci-none">'+(S.subs.length?(S.sumEvery?'每 '+S.sumEvery+' 分钟由 TA 把之前的字幕压一次前情提要，随之后的消息带给 TA。':'梗概已关，可在衔接条上打开。'):'没有字幕就压不出提要。')+'</div>'}
function drawSess(){var st=$('ci-stat');if(!st||!S.rec)return;var r=S.rec;var mins=Math.max(1,Math.round((Date.now()-S.enteredAt)/60000));var tot=Math.max(mins,Math.round(((r.totalMs||0)+(Date.now()-S.enteredAt))/60000));/* 2.3.2：累计不小于本次 */var n=S.list?S.list.querySelectorAll('.chat-msg.user,.chat-msg.ai').length:0;
  st.innerHTML='<div>本次 <em>'+mins+'</em> 分钟 · 累计 <em>'+tot+'</em> 分钟</div><div>'+(r.lastTs?'上次 <b>'+dateStr(r.lastTs)+'</b>'+(r.lastT?' 看到 <b>'+fmt(r.lastT)+'</b>':''):'<b>第一次一起看</b>')+' · 第 <em>'+((r.sessions||0)+1)+'</em> 次</div><div>胶片 <em>'+((r.notes||[]).length)+'</em> 格 · 纸条 <em>'+n+'</em> 条</div>'}
function countMsgs(){var c=$('ci-cnt');if(!c||!S.list)return;var n=S.list.querySelectorAll('.chat-msg.user,.chat-msg.ai').length;c.textContent=n?n+' 条':''}

/* ── 右栏消息列表：频道历史用站内同一个渲染器画；别处寄来的按列表增量追加 ── */
async function loadList(){if(!S.list||!S.thread)return;var l=[];try{l=await ctx.chat.recent(S.cfgId,S.thread.id)}catch(e){}
  if(!l.length){S.list.innerHTML='<div class="chat-msg system">和 '+esc(taName(S.cfgId))+' 一起看这部片：播到想说的地方写给 TA，按相机键把这一帧夹进下一句。'+(ctx.chat.canSee(S.cfgId)?'':' 这位 TA 看不到画面，只按字幕和进度陪看。')+'</div>';countMsgs();return}
  try{_renderAllChat(S.list,l,false)}catch(e){S.list.innerHTML=l.map(function(m){return '<div class="chat-msg '+(m.role==='user'?'user':'ai')+'">'+esc(m.content||'')+'</div>'}).join('');S.list.scrollTop=S.list.scrollHeight}countMsgs()}
function onMsg(d){if(S.view!=='play'||!S.thread||!d)return;if(d.friendId!==S.cfgId||d.threadId!==S.thread.id)return;if(S.sending){if(S.sentBuf)S.sentBuf.push(d);return}if(!S.list)return;(S.inQ=S.inQ||[]).push(d);clearTimeout(S.refT);S.refT=setTimeout(flushIn,260)}
async function flushIn(){var q=S.inQ||[];S.inQ=[];if(S.view!=='play'||!S.list||!q.length)return;var st=S.list._ibWin,need=false;
  for(var i=0;i<q.length;i++){var d=q[i];if(!d.id)continue;if(!st||!st.msgs){need=true;break}try{var j=-1;for(var k=st.msgs.length-1;k>=0;k--)if(st.msgs[k].id===d.id){j=k;break}if(j>=0){st.msgs[j]=d;continue}if(S.list.querySelector('.chat-msg[data-msg-id="'+d.id+'"]'))continue;st.msgs.push(d);S.list.appendChild(_chatWinMsgEl(st.msgs,st.msgs.length-1,false,false));if(d.role==='assistant')danmaku(stripAi(d.content),false)}catch(e){need=true;break}}
  if(need)await loadList();else S.list.scrollTop=S.list.scrollHeight;countMsgs()}

/* 弹幕：你的话与 TA 的回话飞过画面（沿手机端 1.10 口径） */
function danmaku(text,mine){var dm=$('ci-dm');if(!dm||!S.dm)return;text=short(String(text||'').replace(/\s+/g,' ').trim(),60);if(!text)return;var el=document.createElement('div');el.className='ci-dmi'+(mine?' u':'');el.textContent=(mine?'我：':'')+text;
  S.lane=((S.lane||0)+1)%6;el.style.top=(S.lane*15+2)+'%';el.style.animationDuration=(7+Math.min(4,el.textContent.length/12))+'s';dm.appendChild(el);el.addEventListener('animationend',function(){try{el.remove()}catch(e){}})}

/* 留影：夹住当前帧，随下一句发出（设置里决定留不留在聊天里） */
function syncCam(){var c=$('ci-fscam');if(c)c.classList.toggle('on',!!S.keep);if(S.col&&S.col.mini)S.col.mini.classList.toggle('on',!!S.keep)}/* 2.3.2：右栏留影键与全屏留影键同一状态 */
function keepFrame(btn){if(S.keep){S.keep=null;btn.classList.remove('on');syncCam();ctx.ui.toast('已取消留影');return}var f=grab();if(!f){ctx.ui.toast('画面还没准备好');return}S.keep=f;btn.classList.add('on');syncCam();ctx.ui.toast(ctx.chat.canSee(S.cfgId)?(S.cfg.keep?'已夹住这一帧，随下一句发出并留在聊天里':'已夹住这一帧，随下一句发给 TA（不落库）'):'这位 TA 看不到画面：这一帧只落在胶片时间轴上')}

async function send(ta,forceText,ex){if(!S.rec||S.view!=='play')return;var text=forceText!=null?forceText:(ta.value||'').trim();if(!text&&!S.keep){ctx.ui.toast('写点什么给 TA');return}if(ctx.chat.busy(S.cfgId)){ctx.ui.toast('TA 正在回复中，稍等');return}
  var v=video(),t=v?v.currentTime:0,d=(v&&v.duration)||0;var seeOk=ctx.chat.canSee(S.cfgId);var frame=null,images=[],eph=[];
  if(S.keep){if(seeOk){frame=S.keep;if(S.cfg.keep)images.push(frame);else eph.push(frame)}addNote(t,'留影','',S.keep.dataUrl);S.keep=null;syncCam()}
  else if(S.see==='turn'&&seeOk){frame=grab();if(frame)eph.push(frame)}
  if(!text)text='这一幕，你看到什么了？';
  var talk=null;if(forceText==null){ta.value='';ta.style.height='auto';talk=addNote(t,'提问',short(text,40),(function(){var g=grab(360,0.7);return g?g.dataUrl:''})(),{q:String(text).slice(0,600)})}/* 2.5.0：Talk 格带那一刻的缩略图与你的原话，气泡里直接看 */
  danmaku(text,true);
  var key=S.rec.key,tid=S.thread.id,fid=S.cfgId;S.sending=true;S.sentBuf=[];
  try{await ctx.chat.send(fid,tid,text,{tail:(ex&&ex.tail!=null)?ex.tail:tailText(t,d,!!frame),images:images,ephImages:eph,quiet:true,host:S.list})}catch(e){ctx.ui.toast('没有发出去：'+(e&&e.message||e))}
  var buf=S.sentBuf||[];S.sending=false;S.sentBuf=null;
  if(S.view!=='play'||!S.rec||S.rec.key!==key)return;
  var last=null;buf.forEach(function(m){if(m&&m.role==='assistant'&&m.content)last=m});if(last)danmaku(stripAi(last.content),false);
  if(last&&talk){talk.a=stripAi(last.content).slice(0,900);recSave()}/* 2.5.0：TA 的回复也落在 Talk 格上 */
  countMsgs();drawSess()}

/* 前情梗概：每 N 分钟把「上次梗概＋新看到的字幕」压一次，≤600 字（沿手机端口径，增量而非每次从头） */
async function summarize(t){if(!S.subs.length||!S.rec||S.sumBusy)return;var cfg=ctx.chat.cfg(S.cfgId);if(!cfg)return;var from=S.sum?S.sum.t||0:0;var chunk=subsRange(from,t);if(chunk.length<200)return;S.sumBusy=true;var key=S.rec.key;
  try{var out=await ctx.ai.call(cfg,'【观影室】你在和“'+un()+'”一起看《'+S.rec.title+'》。把下面这段影片字幕压缩成前情梗概：只写发生了什么、人物和关系走到哪一步，300 字以内，不评论不解读，直接输出梗概。'+(S.sum&&S.sum.text?('\n\n【此前的梗概】\n'+S.sum.text):'')+'\n\n【新看到的字幕】\n'+chunk.slice(-12000));out=String(out||'').trim().slice(0,600);
    if(out&&S.rec&&S.rec.key===key){S.sum={text:out,t:Math.floor(t),updated:Date.now()};await ctx.storage.set(K.sum+key,S.sum);addNote(t,'梗概','','');drawSummary()}}catch(e){}finally{S.sumBusy=false}}
/* 回顾（原整片聊聊）：整片字幕分段接力压成梗概，随「看完了」一起寄出（正文里可见），常量块换成整片口径 */
async function wrapUp(){if(!S.rec||S.wrapBusy)return;if(!S.subs.length){ctx.ui.toast('无字幕文件：没有字幕就压不出整片梗概，回视频库重选时可以加一份 .srt / .vtt');return}var cfg=ctx.chat.cfg(S.cfgId);if(!cfg)return;if(S.rec.done&&!await ctx.ui.confirm('这部片已经标过「看完了」。再发一次整片梗概？','再发一次'))return;if(ctx.chat.busy(S.cfgId)){ctx.ui.toast('TA 正在回复中，稍等');return}
  var v=video(),d=(v&&v.duration)||S.rec.dur||0;var btn=$('ci-wrap');S.wrapBusy=true;if(btn)btn.disabled=true;var key=S.rec.key;
  try{var text='';if(S.subs.length){var all=subsRange(0,1e9);var parts=[];for(var i=0;i<all.length;i+=9000)parts.push(all.slice(i,i+9000));var acc='';
      for(var k=0;k<parts.length;k++){if(btn)btn.textContent='梗概中 '+(k+1)+'/'+parts.length;acc=await ctx.ai.call(cfg,'【观影室】把下面这段影片字幕压缩成剧情梗概：只写发生了什么、人物和关系走到哪一步，'+(k===parts.length-1?'800':'500')+' 字以内，不评论不解读，直接输出梗概。'+(acc?('\n\n【此前的梗概】\n'+acc):'')+'\n\n【字幕】\n'+parts[k]);if(!S.rec||S.rec.key!==key)return}
      text=String(acc||'').trim().slice(0,1200)}
    if(v&&!v.paused)v.pause();
    S.rec.done=true;addNote(v?(v.currentTime||0):d,'看完','','');await recSave();
    if(text){S.sum={text:text,t:Math.floor(d||(v?v.currentTime:0)),updated:Date.now(),full:true};await ctx.storage.set(K.sum+key,S.sum);drawSummary()}
    ctx.sys.set(sysBlock());
    var body='看完了。'+(text?('\n\n【整片梗概】\n'+text):'');
    var t9='———— 以下是系统随消息附上的观影状态，不是对方说的话；对方真正说的话在最后的【用户当前消息】里 ————\n【观影室】《'+S.rec.title+'》看完了'+(d?('（全长 '+fmt(d)+'）'):'')+'。'+(text?'\n[说明] 【用户当前消息】正文里的整片梗概就是你们一起看过的全部内容，可以聊全片了；梗概里没有的细节不要编。':'\n[说明] 这部片没有字幕文件，梗概无从生成；你们一起看过的只有一路上的纸条，就着纸条聊，不要编剧情。');
    await send(null,body,{tail:t9});if(btn){btn.textContent='已看完';btn.classList.add('on')}}
  catch(e){ctx.ui.toast('梗概失败：'+(e&&e.message||e))}finally{S.wrapBusy=false;var b2=$('ci-wrap');if(b2){b2.disabled=false;if(!(S.rec&&S.rec.done))b2.textContent='回顾'}}}
/* ── 离开放映：三键（保存并退出 / 不记这次 / 取消） ── */
function askExit(){if(S.view!=='play'){renderLib();return}if($('ci-exit-ov'))return;/* 2.6.2：统计行连同只为它算的 v / t / mins / n 一并撤（exit() 自己重算这些数并写进档案） */
  var ov=document.createElement('div');ov.id='ci-exit-ov';ov.className='group-dialog-overlay show';ov.style.zIndex='9990';/* 2.5.0：不借主文件任何类——模块自己的遮罩与面板，flex 居中、无 transform / filter，字不会糊 */
  ov.innerHTML='<div class="group-dialog ci-exit-dlg" role="dialog"><h3>离开放映<i>Leave</i></h3><p class="s">保存＝这一次记进观影档案（时间、TA、看了多久、看到哪、记了几笔），胶片与提要留着；不记＝这一次不进档案，本次新记的胶片不留，提要回到进门时，纸条仍留在频道里。下次仍从头放。</p><div class="b"><button type="button" data-v="c">取消</button><button type="button" data-v="d">不记这次</button><button type="button" class="on" data-v="s">保存并退出</button></div></div>';
  (document.fullscreenElement||document.body).appendChild(ov);ov.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){var val=b.dataset.v;ov.remove();if(val==='s'||val==='d')exit(val==='d')})});ov.addEventListener('click',function(e){if(e.target===ov)ov.remove()})}
async function exit(discard){if(S.view!=='play'||!S.rec)return;var r=S.rec;var v=video();var t=v?(v.currentTime||0):0;var mins=Math.max(1,Math.round((Date.now()-S.enteredAt)/60000));var name=taName(r.cfgId);
  if(discard){r.notes=(r.notes||[]).filter(function(x){return !((x.ts||0)>=S.enteredAt)});r.done=S.done0;S.sum=S.sum0;try{if(S.sum)await ctx.storage.set(K.sum+r.key,S.sum);else await ctx.storage.remove(K.sum+r.key)}catch(e){}}
  else{r.sessions=(r.sessions||0)+1;r.totalMs=(r.totalMs||0)+Math.max(0,Date.now()-Math.max(S.enteredAt,S.totalMark||0));r.lastTs=Date.now();r.lastT=t;
    try{await writeLog(r.key,{ts:S.enteredAt,end:Date.now(),key:r.key,title:r.title,cfgId:r.cfgId,name:name,mins:mins,t:t,dur:r.dur||0,n:Math.max(0,(r.notes||[]).length-S.notes0),done:!!r.done,sum:S.sum&&S.sum.text?String(S.sum.text).slice(0,300):''})}catch(e){}}
  await recSave();leaveToLib();ctx.ui.toast(discard?'已离开放映（本次无记录）':'已离开放映')}
function restoreSel(){try{var pv=S.prevSel;S.prevSel=null;var cur=ctx.chat.current();var sid=S.thread&&S.thread.id;if(!(cur&&cur.threadId&&cur.threadId===sid))return;if(pv&&pv.friendId&&!(pv.friendId===S.cfgId&&pv.threadId===sid)){if(pv.threadId)ctx.chat.select(pv.friendId,pv.threadId);else if(typeof selectFriend==='function')selectFriend(pv.friendId)}else if(typeof selectFriend==='function')selectFriend(cur.friendId)}catch(e){}}
function leaveToLib(){closeMem();var v=video();if(v){try{v.pause()}catch(e){}}if(document.fullscreenElement){try{document.exitFullscreen()}catch(e){}}
  ctx.sys.clear();closePop();if(S.docKey){document.removeEventListener('keydown',S.docKey);S.docKey=null}clearInterval(S.statT);S.statT=null;clearTimeout(S.uiT);clearTimeout(S.refT);S.inQ=[];if(S.ro){try{S.ro.disconnect()}catch(e){}S.ro=null}if(S.col){S.col.remove();S.col=null}S.list=null;
  if(v){v.removeAttribute('src');try{v.load()}catch(e){}}if(S.url){try{URL.revokeObjectURL(S.url)}catch(e){}S.url=null}S.file=null;S.rec=null;S.subs=[];S.keep=null;S.sum=null;S.sum0=null;S.wrapBusy=false;S.sumBusy=false;
  document.removeEventListener('fullscreenchange',onFs);var ov=$('ci-exit-ov');if(ov)ov.remove();restoreSel();S.thread=null;renderLib()}

IBApps.register({id:'cinema',name:'观影室',version:'2.6.3',sdk:2,nav:{label:'Cinema',after:'memory',before:'signs'},page:true,
  mount:function(h,c){ctx=c;host=h;var st=document.createElement('style');st.id='ib-cinema-css';st.textContent=CSS;document.head.appendChild(st);
    migrate().then(loadCfg).then(function(){renderLib()});
    c.on('page',function(d){if(d.to==='cinema'){if(S.view==='play'){document.body.classList.add('ci-on');if(S.col){S.col.el.style.display='';S.col.grip.style.display=''}fitStage()}else renderLib()}
      else if(d.from==='cinema'&&S.view==='play'){var v=video();if(v){try{v.pause()}catch(e){}}document.body.classList.remove('ci-on');if(S.col){S.col.el.style.display='none';S.col.grip.style.display='none'}}});
    c.on('message',function(d){onMsg(d)})}});
window.IBCinema={state:function(){return S},open:function(){navTo('cinema')},lib:renderLib};
})();
