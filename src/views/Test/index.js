import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import VerticalSidebar from '../../components/Sidebar'
import ImgListView from '../../components/ImgListView'
import ImgPreview from '../../basicUI/ImgPreview'
import ThreeRowLayout from '../../layouts/ThreeRowLayout'
import { Placeholder, Transition, Button } from 'semantic-ui-react'

import { getCategories, getPictureList } from '../../api/getData'

function Test (props) {
  const [queryInfo, setQueryInfo] = useState({type: 5, start: 0, count: 30}) // query info
  const [isLoading, setIsLoading] = useState(true) // is loading
  const [isPreview, setIsPreview] = useState(false) // is preview

  const [imgList, setImgList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [previewImg, setPreviewImg] = useState({}) // preview img info
  const [sidebarShow, setSidebarShow] = useState(false) // is sidebar visible

  //  TODO 节流实现图片请求获取
  useEffect(() => {
    getTypes()
    getData()
  }, [])

  useEffect(() => {
    if (imgList.length) {
      mergeData()
    } else {
      getData()
    }
  }, [queryInfo])

  const getTypes = async () => {
    const res = await getCategories()
    let array = []
    Object.keys(res.data.data).map((i) => {
      if (res.data.data[i].id !== '1') {
        let temp = {}
        temp.key = res.data.data[i].id
        temp.title = res.data.data[i].name
        array.push(temp)
      }
    })
    setTypeList(array)
  }

  const getData = async () => {
    const res = await getPictureList({...queryInfo})
    if (res) {
      setImgList(res.data.data)
      setIsLoading(false)
    }
  }

  const mergeData = async () => {
    const res = await getPictureList({...queryInfo})
    if (res) {
      setImgList(imgList.concat(res.data.data))
      setIsLoading(false)
    }
  }

  const handlePreviewImg = (img) => {
    if (isPreview) {
      setPreviewImg({})
      setIsPreview(false)
    } else {
      setPreviewImg(img)
      setIsPreview(true)
    }
  }

  const changeImgType = (item) => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    setImgList([])
    setQueryInfo({...queryInfo, type: item.key, start: 0, count: 30})
  }

  const loadMoreImgs = () => {
    setIsLoading(true)
    setQueryInfo({...queryInfo, start: queryInfo.start + queryInfo.count})
  }

  const ImgPlaceholder = () => {
    return (
      <Placeholder>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    )
  }

  return (
    <div>
      <ThreeRowLayout>
        <ThreeRowLayout.LeftStickyRow>
          <Button onClick={() => { setSidebarShow(sidebarShow => !sidebarShow) }} circular color='teal'>
            分类
          </Button>
          <Transition visible={ !sidebarShow } animation='fade right' duration={500} >
            <VerticalSidebar handleClick={item => changeImgType(item)} data={typeList} />
          </Transition>
        </ThreeRowLayout.LeftStickyRow>
        <ThreeRowLayout.CenterRow>
          <InfiniteScroll
            initialLoad={true}
            pageStart={0}
            loadMore={ () => loadMoreImgs() }
            hasMore={!isLoading && imgList.length !== 0}
            threshold={50}
          >
            <ImgListView handleImgViewClick={ item => handlePreviewImg(item) } data={ imgList }/>
          </InfiniteScroll>
          { isLoading ? <ImgPlaceholder/> : null }
        </ThreeRowLayout.CenterRow>
        <ThreeRowLayout.RightRow>
          { sidebarShow ? 123 : 321 }
        </ThreeRowLayout.RightRow>
      </ThreeRowLayout>
      {/* 预览图 */}
      <ImgPreview handleClick={ () => handlePreviewImg() }
        url={ previewImg.url } visible={ isPreview }
      />
    </div>
  )
}

export default React.memo(Test)
