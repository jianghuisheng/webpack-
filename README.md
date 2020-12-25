## 一种前端构建工具，一个静态资源模块化打包器

index.js 入口文件

- jq less ...
- 最后合成一个 chunk 块 less->css es6->es5 ...
- 打包完成,输出文件 bundle

## 五个核心概念

- Entry

  - 入口指示 Webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

- Output

  - 输出指示 Webpack 打包后的资源 bundles 输出到那里去，以及如何命名。

- Loder

  - Loader 让 Webpack 能够去处理那些非 JavaScript 文件(webpack 自身职能理解 javascript)

- Plugins

  - 插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境的变量等。

- Mode
  - 模式指示 Webpack 使用相应模式的配置。
    | 选项 | 描述 | 特点 |
    | ----- | --------- | ----------- |
    | development | 会将 process.env.NODE_ENV 的值设为 developmeng <br/> 启用 NamedChunksPlugin 和 NamedModulesPlugin | 能让本地调试运行环境 |
    | production | 会将 process.env.NODE_ENV 的值设为 production <br> 启用 FlagDependencyUsagePlugin,<br>FlagIncludedChunksPlugin,<br>ModuleConcatenationPlugin,NoEmitOnErrorsPlugin,<br>OccurrentOrderPlugin,SideEffectsFlagPlugin 和<br> UgilifyJsPlugin| 能让代码优化上线的环境 |
