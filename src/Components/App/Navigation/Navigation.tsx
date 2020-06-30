/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * @description Navigation bar menu items
 */

import React, { Component } from 'react'
import _ from 'lodash'
import { Menu } from 'antd'
import MailOutlined from '@ant-design/icons'

import { getMenuConfig } from './MenuConfig'

/**
 * SubMenu
 * @constant
 */
const { SubMenu } = Menu

/**
 * Class component to render menu items
 * @class
 */
class Navigation extends Component<any> {

  /** Render */
  render() {
    return (
      <Menu
        mode="inline"
        style={{ width: 256 }}
      >
        {_.map(getMenuConfig(), (eachMenu: any) => <SubMenu
          key="sub1"
          title={
            <span>
              <MailOutlined />
              <span>{eachMenu.label}</span>
            </span>
          }
        />)}
      </Menu>
    )
  }
}


export default Navigation