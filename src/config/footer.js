/*
  页脚配置说明：
    ---------------------------------------------------------------------------
    -    leftRow                    centerRow                rightRow         -
    -    # # # # #                  title                    title            -
    -    # ICON  #                  link                     link             -
    -    #       #                  link                     link             -
    -    # # # # #                  link                     link             -
    -    desc                                                                 -
    -                                                                         -
    -    ----------------------------------------------------------------     -                                                                -
    -                              author                                     -
    -                             copyright                                   -
    ---------------------------------------------------------------------------
*/
import avatar from '../assets/author.jpg'

const configs = {
  leftRow: {
    icon: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a7f6335018540cfa6256c2dcb34f49c~tplv-k3u1fbpfcp-watermark.image',
    desc: '扫码体验'
  },
  centerRow: {
    title: '文档链接',
    links: [
      {
        name: 'React',
        href: 'https://react.docschina.org/'
      },
      {
        name: 'Semantic UI',
        href: 'https://react.semantic-ui.com/'
      },
      {
        name: 'NPM',
        href: 'https://www.npmjs.com/'
      }
    ]
  },
  rightRow: {
    title: '相关链接',
    links: [
      {
        name: 'GitHub',
        href: 'https://github.com/aotianwinter'
      },
      {
        name: '掘金',
        href: 'https://juejin.im/user/5d9c26b2f265da5b616dd1c8'
      },
      {
        name: '简书',
        href: 'https://www.jianshu.com/u/393293c79416'
      }
    ]
  },
  author: {
    name: '打酱油',
    avatar: avatar
  },
  copyright: 'copyright©2021'
}

export default configs
