# xueyan-react-pages

xueyan-react-pages is a react document reader component.

The project created by xueyan <yang@xueyan.site>.

Please [**View Document**](https://xueyan.site/xueyan-react-pages) to get more detail.

## Install

- NPM: `npm i xueyan-react-pages`  
- YARN: `yarn add xueyan-react-pages`  

## Example

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
