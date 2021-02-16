import React, { lazy } from 'react'
import Pages, { PageSources } from 'xueyan-react-pages'
import styles from '../index.module.scss'

const sources: PageSources = {
  zh: {
    header: 'xueyan-react-pages',
    groupList: [
      {
        name: 'API',
        nodeList: [
          {
            path: '/api-one',
            name: 'api one',
            component: lazy(() => import('../zh/api-one'))
          }
        ]
      }
    ]
  },
  en: {
    header: 'xueyan-react-pages',
    groupList: [
      {
        name: 'API',
        nodeList: [
          {
            path: '/api-two',
            name: 'api one',
            component: lazy(() => import('../en/api-one'))
          }
        ]
      }
    ]
  }
}

export default function Example1() {
  return (
    <div className={styles.example1}>
      <Pages sources={sources} />
    </div>
  )
}
