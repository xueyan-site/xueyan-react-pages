import React, { Fragment, ReactNode, ComponentType, useMemo } from "react"
import classNames from 'classnames'
import { Link, Switch, Route, Redirect, useLocation, matchPath } from 'react-router-dom'
import styles from './index.module.scss'

export interface TMenuNode extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  key: string
  path: string
  name: ReactNode
  component: ComponentType<any>
}

export interface TMenu {
  key: string
  name: string
  nodeList: TMenuNode[]
}

export default function Sidebar({
  header,
  menuList,
  ...style
}: {
  header: ReactNode
  menuList: TMenu[]
} & Pick<React.CSSProperties, 'width' | 'height'>) {
  const { pathname } = useLocation()
  const firstMenu = useMemo(() => {
    const menu = menuList.find(i => i.nodeList.length > 0)
    return menu && menu.nodeList[0]
  }, [menuList])
  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          {header}
        </div>
        {menuList.map(menu => (
          <Fragment key={menu.key}>
            <div className={styles.menuName}>{menu.name}</div>
            {menu.nodeList.map(({ component, name, path, ...node }) => {
              const active = matchPath(pathname, { path, exact: true })
              const cn = classNames(styles.menuNode, active && styles.active)
              return (
                <Link {...node} className={cn} to={path}>
                  {name}
                </Link>
              )
            })}
          </Fragment>
        ))}
      </div>
      <div className={styles.content}>
        <Switch>
          {menuList.map(menu => (
            menu.nodeList.map(item => (
              <Route
                key={item.key}
                exact={true}
                path={item.path}
                component={item.component}
              />
            ))
          ))}
          {firstMenu && (
            <Redirect key="root" path="*" to={firstMenu.path} />
          )}
        </Switch>
      </div>
    </div>
  )
}
