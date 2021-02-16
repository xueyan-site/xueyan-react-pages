# xueyan-react-demo

xueyan-react-demo 是一个 react 文档渲染组件。  
xueyan-react-demo is a react document reader component.  

本项目创建自 xueyan <yang@xueyan.site>。  
The project created by xueyan <yang@xueyan.site>.  

更多详情请查看[**文档**](https://xueyan.site/xueyan-react-pages)。  
Please [**View Document**](https://xueyan.site/xueyan-react-pages) to get more detail.  

## 下载 Install

```bash
# 如果你使用的是NPM：
# if you use NPM: 
npm i xueyan-react-demo

# 如果你使用的是Yarn：
# if you use Yarn: 
yarn add xueyan-react-demo
```

## 示例 Example

```ts
import React, { lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Pages, { PageSources } from 'xueyan-react-pages'

const Readme = lazy(() => import('./readme'))
const Example1 = lazy(() => import('./pages/example1'))

const sources: PageSources = {
  zh: {
    header: 'xueyan-react-pages',
    groupList: [
      {
        name: '示例',
        nodeList: [
          {
            path: '/example1',
            name: '示例',
            component: Example1
          }
        ]
      }
    ]
  }
}

function App() {
  return (
    <BrowserRouter>
      <Pages readme={readme} sources={sources} />
    </BrowserRouter>
  )
}
```
