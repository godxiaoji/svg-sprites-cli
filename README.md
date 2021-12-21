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

- `-d` 或 `--dir`: 要打包的文件夹目录
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
