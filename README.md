# svg-sprites-cli

## 介绍

SVG 批量转为 SVG Sprite 的小工具。

## 安装

全局安装：

```
npm install -g svg-sprites-cli
```

项目安装：

```
npm install -D svg-sprites-cli
```

## 执行指令

```
svgjs -d ./icons -o ./dist/svg.js
```

其中：

- `-d` 或 `--dir`: 要打包的 SVG 文件夹目录
- `-o` 或 `--output`: 输出的 js 文件存放地址

注：如果是项目安装只能通过写好 `script` 的方式运行：

`package.json`:

```
{
  "scripts": {
    "build:svg": "svgjs -d ./icons -o ./dist/svg.js"
  },
}
```

然后执行：

```
npm run build:svg
```

## 指定配置文件执行

```
svgjs -c ./config.js
```

其中：

- `-c` 或 `--config`: 配置的 js 文件地址

### 配置文件格式

`config.js`:

```JavaScript
module.exports = {
  dir: './icons',
  output: './dist/svg.js',
  symbolId(id, path) {
    return id.replace('.svg', '')
  },
  eslintDisable: true
}
```

| key           | 类型                                 | 必填 | 默认值          | 描述                     |
| ------------- | ------------------------------------ | ---- | --------------- | ------------------------ |
| dir           | string                               | 是   |                 | 要打包的 SVG 文件夹目录  |
| output        | string                               | 是   |                 | 输出的 js 文件存放地址   |
| symbolId      | (id: string, path: string) => string | 否   | a.svg -> icon-a | 转化图标 id 函数         |
| eslintDisable | string                               | 否   | false           | 输出文件不做 eslint 校验 |
