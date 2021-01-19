/**
 * @package xueyan-react-pages
 * @author xueyan <yang@xueyan.site>
 * @description package entry
 */

import React, { Suspense, ReactNode, ComponentType, useMemo, useState, useEffect } from "react"
import { Link, useRouteMatch, useHistory, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { MarkdownAirticle } from 'xueyan-react-markdown'
import styles from './index.module.scss'

/**
 * 单个页面节点
 */
export interface PageNode extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string
  name: ReactNode
  noTitle?: boolean
  component: ComponentType<any>
}

interface PageNode2 extends PageNode {
  __path__?: string
  __pathWithLang__?: string
}

/**
 * 文档页面组
 */
export interface PageGroup {
  name?: ReactNode
  nodeList: PageNode[]
}

interface PageGroup2 extends PageGroup {
  nodeList: PageNode2[]
}

/**
 * 文档页面配置
 */
export interface PageSource {
  header: ReactNode
  groupList: PageGroup[]
}

/**
 * 文档支持的语言及其页面配置
 */
export interface PageSources {
  zh?: PageSource // 中文
  en?: PageSource // English
  es?: PageSource // Español
  ja?: PageSource // 日本語
  fr?: PageSource // Français
  de?: PageSource // Deutsch
  ko?: PageSource // 한국어
  pt?: PageSource // Português
}

/**
 * 文档语言简写的名称映射
 */
const LANG_NAME_MAP = {
  zh: '中文',
  en: 'English',
  es: 'Español',
  ja: '日本語',
  fr: 'Français',
  de: 'Deutsch',
  ko: '한국어',
  pt: 'Português'
}

export interface PagesProps extends Pick<React.CSSProperties, 'width' | 'height'> {
  /**
   * README
   */
  readme?: ComponentType<any>
  /**
   * 页面列表
   */
  source?: PageSource
  /**
   * 多份页面列表
   */
  sources?: PageSources
}

/**
 * 暗黑主题键
 */
const DARK_KEY = 'xueyan-react-pages-dark-theme'

/**
 * 计算GroupList相关量
 * @param param0 
 */
function computeGroupList({
  readme,
  source,
  sources,
  pathSuf
}: {
  readme?: ComponentType<any>
  source?: PageSource,
  sources?: PageSources,
  pathSuf: string
}) {
  let groupList: PageGroup[] = []
  let header: ReactNode = ''
  let lang: string = ''
  let langList: string[] = []
  if (source) {
    header = source.header
    groupList = [...source.groupList]
  } else if (sources) {
    const keys = Object.keys(sources)
    const segments = pathSuf.split('/').filter(i => i)
    let langSeg: string = ''
    if (LANG_NAME_MAP[segments[0]]) {
      langSeg = segments[0]
    }
    keys.forEach(key => {
      if (LANG_NAME_MAP[key]) {
        langList.push(key)
        const curr: PageSource = sources[key]
        if (!lang && langSeg && langSeg === key) {
          lang = key
          header = curr.header
          groupList = [...curr.groupList]
        }
      }
    })
    if (!lang && keys.length > 0) {
      const fristSrc = sources[keys[0]]
      lang = keys[0]
      header = fristSrc.header
      groupList = fristSrc.groupList
    }
  }
  if (readme) {
    let hasReadme: boolean = false
    for (let i = 0; i < groupList.length; i++) {
      const nodeList = groupList[i].nodeList
      for (let j = 0; j < nodeList.length; j++) {
        if (nodeList[j].path === '/readme') {
          nodeList[j].component = readme
          hasReadme = true
          break
        }
      }
    }
    if (!hasReadme) {
      groupList.unshift({
        nodeList: [
          {
            path: '/readme',
            name: 'README',
            noTitle: true,
            component: readme
          }
        ]
      })
    }
  }
  return { groupList, header, langList, lang }
}

/**
 * 计算PageList相关量
 */
function computePageList({
  groupList,
  lang,
  pathPre
}: {
  groupList: PageGroup[],
  lang: string,
  pathPre: string
}) {
  let first: PageNode | undefined
  const pagesList: PageGroup2[] = []
  const langPre = lang ? '/' + lang : ''
  groupList.forEach(group => {
    if (group.nodeList.length > 0) {
      const nodeList: PageNode2[] = []
      group.nodeList.forEach(node => {
        nodeList.push({
          ...node,
          path: pathPre + langPre + node.path,
          __path__: node.path,
          __pathWithLang__: langPre + node.path,
        })
      })
      pagesList.push({
        ...group,
        nodeList
      })
      if (!first) {
        first = nodeList[0]
      }
    }
  })
  return { first, pagesList }
}

/**
 * 计算当前节点
 * @param param0 
 */
function computeNode({
  pagesList,
  pathSuf
}: {
  pagesList: PageGroup2[],
  pathSuf: string
}) {
  let currNode: PageNode2 |  undefined
  for (let i = 0; i < pagesList.length; i++) {
    const pageGroup = pagesList[i]
    const nodeList = pageGroup.nodeList
    for (let j = 0; j < nodeList.length; j++) {
      const node = nodeList[j]
      if (node.__pathWithLang__ && pathSuf.indexOf(node.__pathWithLang__) === 0) {
        currNode = node
        break
      }
    }
  }
  return currNode
}

export default function Pages({
  readme,
  source,
  sources,
  ...style
}: PagesProps) {
  const history = useHistory()
  const { pathname } = useLocation()
  const { path } = useRouteMatch()
  const [ dark, setDark ] = useState<boolean>(false)
  const [ visible, setVisible ] = useState<boolean>(false)

  const pathPre = path === '/' ? '' : path
  const pathSuf = pathname.replace(pathPre, '')

  useEffect(() => {
    if (localStorage) {
      if (localStorage.getItem(DARK_KEY)) {
        setDark(true)
      }
    }
  }, [])

  const { groupList, header, langList, lang } = useMemo(() => {
    return computeGroupList({ readme, source, sources, pathSuf })
  }, [readme, source, sources, pathSuf])

  const { first, pagesList } = useMemo(() => {
    return computePageList({ groupList, lang, pathPre })
  }, [groupList, lang, pathPre])

  const current = useMemo(() => {
    return computeNode({ pagesList, pathSuf })
  }, [pagesList, pathSuf])

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const toggleDark = () => {
    setDark(!dark)
    if (localStorage) {
      if (dark) {
        localStorage.removeItem(DARK_KEY)
      } else {
        localStorage.setItem(DARK_KEY, 'true')
      }
    }
  }

  return (
    <div 
      style={style}
      className={classNames(styles.wrapper, visible && styles.visible, dark && styles.dark)} 
    >
      <div className={styles.side}>
        <div className={styles.sideHeader}>
          {header}
        </div>
        {lang && langList.length > 0 && (
          <div className={styles.sideLangs}>
            <select
              className={styles.langSelector}
              value={lang}
              onChange={event => {
                history.push(pathPre + '/' + event.target.value + current?.__path__ || '')
              }}
            >
              {langList.map(item => (
                <option 
                  key={item} 
                  value={item}
                >
                  {LANG_NAME_MAP[item]}({item})
                </option>
              ))}
            </select>
          </div>
        )}
        {pagesList.map((pages, index) => (
          <div className={styles.menuGroup} key={index}>
            {pages.name && (
              <div className={styles.menuName}>{pages.name}</div>
            )}
            {pages.nodeList.map(item => {
              const { component, name, noTitle, path, __path__, __pathWithLang__, ...other } = item
              return (
                <Link 
                  {...other}
                  key={path}
                  className={classNames(styles.menuNode, current === item && styles.active)} 
                  to={path}
                  onClick={closeMenu}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        ))}
        <div className={styles.settings}>
          <div className={styles.switcher} onClick={toggleDark}/>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.menu} onClick={openMenu}>menu</div>
          <MarkdownAirticle dark={dark} className={styles.mainBody}>
            {current?.noTitle || (
              <h1 className={styles.mainTitle}>
                {current?.name}
              </h1>
            )}
            <Suspense fallback={null}>
              <Switch>
                {pagesList.map(pages => (
                  pages.nodeList.map(item => (
                    <Route
                      exact={false}
                      key={item.path}
                      path={item.path}
                      component={item.component}
                    />
                  ))
                ))}
                {first && (
                  <Redirect key="root" path="*" to={first.path} />
                )}
              </Switch>
            </Suspense>
          </MarkdownAirticle>
        </div>
      </div>
      <div className={styles.mask} onClick={closeMenu}></div>
    </div>
  )
}
