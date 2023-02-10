# test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build

测试环境打包：npm run build:test
仙游项目打包：npm run build || npm run build:xianyou
佛山项目打包：npm run build:foshan
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 开发注意事项
```
1、所有代码在解决 eslint 语法错误之后在提交到 git 上。
2、html 的样式尽量不要使用行内样式。如果需要固定 px ，不需要转换成 rem，请在类名前加 .un- 前缀。
3、代码全部按照设计稿尺寸写成px尺寸，如：height:100px。
4、<style scoped lang='less'> css 采用 less 书写，加上scoped属性，有需要修改UI库样式，可以单写 style 或者 使用 /deep/
5、图表项目主要使用 v-charts ，使用方式参考： https://v-charts.js.org/#/。在使用图表时需在标签上加上 v-on-echart 指令，如：<ve-line :data="chartData" v-on-echart></ve-line>。
6、git提交代码需要审核，具体做法请参考： https://www.cnblogs.com/shuhaonb/p/12740304.html 或者 https://blog.csdn.net/weixin_44137575/article/details/107770966
```

