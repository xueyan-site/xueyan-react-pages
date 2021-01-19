/**
 * @package xueyan-react-pages
 * @author xueyan <yang@xueyan.site>
 * @description doc entry
 */

import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Pages, { PageSources } from 'xueyan-react-pages'
import './index.scss'

const Readme = lazy(() => import('./pages/readme'))
const Example1 = lazy(() => import('./pages/example1'))
const Interface1 = lazy(() => import('./pages/interface1'))
const Interface2 = lazy(() => import('./pages/interface2'))

const sources: PageSources = {
  zh: {
    header: 'xueyan-react-pages',
    groupList: [
      {
        name: '示例',
        nodeList: [
          {
            path: '/example1',
            name: '示例1',
            component: Example1
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      }
    ]
  },
  en: {
    header: 'xueyan-react-pages',
    groupList: [
      {
        name: '示例',
        nodeList: [
          {
            path: '/example1',
            name: '示例1',
            component: Example1
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      },
      {
        name: 'API',
        nodeList: [
          {
            path: '/interface1',
            name: '接口1',
            component: Interface1
          },
          {
            path: '/interface2',
            name: '接口2',
            component: Interface2
          }
        ]
      }
    ]
  }
}

function App() {
  return (
    <BrowserRouter>
      <Pages readme={Readme} sources={sources} />
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
