import React, { useState } from 'react'
import { PhoneNavBt, PhoneNavWrapper } from './style'
import { Icon, Menu, Accordion, Transition } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

function PhoneNav (props) {
  const [activeIndex, setActiveItem] = useState('')
  const [visible, setVisible] = useState(false)
  const emList = document.getElementsByClassName('phone-nav-em')

  const showPhoneNavWrapper = () => {
    setVisible(!visible)
    if (visible) {
      emList[0].style.transform = ''
      emList[1].style.transition = 'all 0.5s ease 0.2s'
      emList[1].style.opacity = '1'
      emList[2].style.transform = ''
    } else {
      emList[0].style.transform = 'translate(0px,6px) rotate(45deg)'
      emList[1].style.opacity = '0'
      emList[1].style.transition = ''
      emList[2].style.transform = 'translate(0px,-6px) rotate(-45deg)'
    }
  }

  const handleMenuClick = (menu) => {
    props.history.push(menu.href)
    setVisible(false)
    emList[0].style.transform = ''
    emList[1].style.transition = 'all 0.5s ease 0.2s'
    emList[1].style.opacity = '1'
    emList[2].style.transform = ''

  }

  const menuView = (menus) => {
    return menus.map((item) => {
      return item.subitems && item.subitems.length ?
        (
          <Accordion key={item.key} styled inverted style={{ background: 'black', width: '100%'}}>
            <Accordion.Title
              as={Menu.Header}
              active={activeIndex === item.key}
              index={0}
              onClick={() => setActiveItem(activeIndex === item.key ? '-1' : item.key)}
            >
              <Icon name='dropdown' />
              { item.title }
            </Accordion.Title>
            {
              item.subitems.map((i) => {
                return (
                  <Accordion.Content style={{padding: '0px'}} key={i.key} active={activeIndex === item.key}>
                    <Menu.Item style={{ paddingLeft: '3rem', color: props.data.textColor, background: '#1B1C1D' }}
                      onClick={() => handleMenuClick(i) }>
                      { i.title }
                    </Menu.Item>
                  </Accordion.Content>
                )
              })
            }
          </Accordion>
        )
      :
      (
        <Menu.Item style={{ color: props.data.textColor }} onClick={() => handleMenuClick(item) } key={item.key}>
          { item.title }
        </Menu.Item>
      )
    })
  }

  return (
    <>
      <PhoneNavBt onClick={ showPhoneNavWrapper }>
        <em className='phone-nav-em'></em>
        <em className='phone-nav-em'></em>
        <em className='phone-nav-em'></em>
      </PhoneNavBt>
      <Transition visible={visible} animation='fade' duration={500}>
        <PhoneNavWrapper>
          <Menu style={{ width: '100%' }} inverted size='huge' vertical>
            { menuView(props.data.leftMenu) }
            { menuView(props.data.rightMenu) }
          </Menu>
        </PhoneNavWrapper>
      </Transition>
    </>
  )
}

export default withRouter(React.memo(PhoneNav))