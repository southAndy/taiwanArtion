import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Modal from '@components/Modal'
import styled from '@emotion/styled'
import { hotBg, vectorIcon, sampleResult, locateIcon, calendarIcon } from '@assets/images/index'
import BaseImageBox from '@styles/base/BaseImageBox'
import { breakpoint } from '@styles/utils/breakpoint'
import cityList from '@assets/data/city.json'
import { useSelector } from 'react-redux'

// 地圖相關組件
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '70vh',
}

const libraries = ['places']

export default function ResultPage() {
  const [total, setTotal] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' | 'map'
  const [userLocation, setUserLocation] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [mapRef, setMapRef] = useState(null)
  const [hoveredExhibition, setHoveredExhibition] = useState(null)
  const [searchParams] = useSearchParams()
  const { openData } = useSelector(state => state.common)
  const cityQuery = searchParams.get('keyword')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const exhibitionName = searchParams.get('exhibition')
  const cityName = transformCityName(cityQuery)

  const filterCityExhibition = useMemo(() => {
    let filteredData = openData

    // 縣市篩選
    if (cityName) {
      filteredData = filteredData.filter(data => data.showInfo[0].location.startsWith(cityName))
    }

    // 展覽名稱篩選
    if (exhibitionName) {
      filteredData = filteredData.filter(data =>
        data.title.toLowerCase().includes(exhibitionName.toLowerCase())
      )
    }

    // 日期篩選
    if (startDate && endDate) {
      filteredData = filteredData.filter(data => {
        const exhibitionStart = new Date(data.startDate)
        const exhibitionEnd = new Date(data.endDate)
        const searchStart = new Date(startDate)
        const searchEnd = new Date(endDate)

        // 檢查展覽日期是否與搜尋範圍重疊
        return exhibitionStart <= searchEnd && exhibitionEnd >= searchStart
      })
    }

    return filteredData
  }, [openData, cityQuery, startDate, endDate, exhibitionName])

  useEffect(() => {
    setTotal(filterCityExhibition.length)
  }, [filterCityExhibition])

  // 獲取用戶位置（地圖模式時）
  useEffect(() => {
    if (navigator.geolocation && viewMode === 'map') {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [viewMode])

  function transformCityName(cityQuery) {
    // 遍歷 cityList 的所有區域
    for (const region in cityList) {
      // 遍歷每個區域中的城市
      for (const cityData of cityList[region]) {
        // 如果找到匹配的城市
        if (cityData.en === cityQuery) {
          return cityData.chinese
        }
      }
    }
    // 如果沒有找到匹配的城市，返回 null 或其他適當的值
    return null
  }
  return (
    <>
      <StyledLoginBanner>
        <StyledTitle>
          <StyledPageLink to="/">
            <img src={vectorIcon} alt="回到上一頁箭頭" />
          </StyledPageLink>
          <StyledSearchConditions>
            <span>搜尋條件：</span>
            <StyledTagContainer>
              {cityName && <SearchTag type="city">{cityName}</SearchTag>}
              {exhibitionName && <SearchTag type="exhibition">"{exhibitionName}"</SearchTag>}
              {startDate && endDate && (
                <SearchTag type="date">
                  {startDate} ~ {endDate}
                </SearchTag>
              )}
            </StyledTagContainer>
          </StyledSearchConditions>
          <StyledResultCount>找到共{total}筆展覽資訊</StyledResultCount>
        </StyledTitle>
        <div className="menu">
          <ViewModeButton active={viewMode === 'list'} onClick={() => setViewMode('list')}>
            📋 列表檢視
          </ViewModeButton>
          <ViewModeButton active={viewMode === 'map'} onClick={() => setViewMode('map')}>
            🗺️ 地圖檢視
          </ViewModeButton>
        </div>
      </StyledLoginBanner>
      {viewMode === 'list' ? (
        <StyledResultListBox>
          {filterCityExhibition.map((item, index) => {
            return (
              <StyledExhibitionLink key={index} to={`/detail/${item.UID}`}>
                <BaseImageBox height="180px" tabletWidth="331px" tabletHeight="200px" scale="cover">
                  <img src={item.imageUrl ? item.imageUrl : sampleResult} alt="" />
                </BaseImageBox>
                <p className="title mb-2 font-medium">{item.title}</p>
                <div className="info flex gap-4">
                  <div className="date">
                    <BaseImageBox width="20px" height="20px" tabletWidth="24px" tabletHeight="24px">
                      <img src={calendarIcon} alt="" />
                    </BaseImageBox>
                    <p>{item.startDate}</p>
                  </div>
                  <div className="locate flex items-center gap-2">
                    <BaseImageBox
                      width="16px"
                      height="16px"
                      tabletWidth="16px"
                      tabletHeight="16px"
                      className="w-[20px] h-[20px]"
                    >
                      <img src={locateIcon} alt="展覽地點圖示，點即可查看位置" />
                    </BaseImageBox>
                    <p>{cityName}</p>
                  </div>
                </div>
              </StyledExhibitionLink>
            )
          })}
        </StyledResultListBox>
      ) : (
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
          libraries={libraries}
        >
          <StyledMapViewContainer>
            <StyledSidebarContainer>
              <SidebarHeader>
                <h3>展覽清單 ({filterCityExhibition.length})</h3>
              </SidebarHeader>
              <StyledSidebarList>
                {filterCityExhibition.map((item, index) => {
                  const hasLocation = item.showInfo?.[0]?.latitude && item.showInfo?.[0]?.longitude
                  return (
                    <SidebarExhibitionItem
                      key={index}
                      isSelected={selectedPlace?.UID === item.UID}
                      isHovered={hoveredExhibition?.UID === item.UID}
                      hasLocation={hasLocation}
                      onClick={() => {
                        if (hasLocation && mapRef) {
                          const lat = Number(item.showInfo[0].latitude)
                          const lng = Number(item.showInfo[0].longitude)
                          mapRef.panTo({ lat, lng })
                          mapRef.setZoom(15)
                          setSelectedPlace(item)
                        }
                      }}
                      onMouseEnter={() => setHoveredExhibition(item)}
                      onMouseLeave={() => setHoveredExhibition(null)}
                    >
                      <BaseImageBox height="60px" width="60px" scale="cover">
                        <img src={item.imageUrl ? item.imageUrl : sampleResult} alt="" />
                      </BaseImageBox>
                      <SidebarExhibitionInfo>
                        <SidebarExhibitionTitle hasLocation={hasLocation}>
                          {item.title}
                          {!hasLocation && <span className="no-location">📍 無位置資訊</span>}
                        </SidebarExhibitionTitle>
                        <SidebarExhibitionDate>
                          {item.startDate} ~ {item.endDate}
                        </SidebarExhibitionDate>
                        <SidebarExhibitionLocation>
                          {item.showInfo?.[0]?.location || '地點未提供'}
                        </SidebarExhibitionLocation>
                      </SidebarExhibitionInfo>
                      <SidebarViewButton
                        onClick={e => {
                          e.stopPropagation()
                          window.open(`/detail/${item.UID}`, '_blank')
                        }}
                      >
                        查看
                      </SidebarViewButton>
                    </SidebarExhibitionItem>
                  )
                })}
              </StyledSidebarList>
            </StyledSidebarContainer>
            <StyledMapContainer>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userLocation || { lat: 25.033, lng: 121.5654 }} // 默認台北
                zoom={12}
                onLoad={map => setMapRef(map)}
                options={{
                  mapTypeControl: false,
                  zoomControl: false,
                  fullscreenControl: false,
                  streetViewControl: false,
                }}
              >
                {/* 用戶位置標記 */}
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    }}
                  />
                )}

                {/* 展覽位置標記 */}
                {filterCityExhibition.map(exhibition => {
                  if (exhibition.showInfo?.[0]?.latitude && exhibition.showInfo?.[0]?.longitude) {
                    const isSelected = selectedPlace?.UID === exhibition.UID
                    const isHovered = hoveredExhibition?.UID === exhibition.UID
                    return (
                      <Marker
                        key={exhibition.UID}
                        position={{
                          lat: Number(exhibition.showInfo[0].latitude),
                          lng: Number(exhibition.showInfo[0].longitude),
                        }}
                        onClick={() => setSelectedPlace(exhibition)}
                        icon={{
                          url:
                            isSelected || isHovered
                              ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                              : 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                          scaledSize: window.google?.maps
                            ? isSelected || isHovered
                              ? new window.google.maps.Size(40, 40)
                              : new window.google.maps.Size(30, 30)
                            : undefined,
                        }}
                      />
                    )
                  }
                  return null
                })}

                {/* 資訊視窗 */}
                {selectedPlace && selectedPlace.showInfo?.[0] && (
                  <InfoWindow
                    position={{
                      lat: Number(selectedPlace.showInfo[0].latitude),
                      lng: Number(selectedPlace.showInfo[0].longitude),
                    }}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <StyledInfoWindow>
                      <img
                        src={selectedPlace.imageUrl || sampleResult}
                        alt={selectedPlace.title}
                        className="exhibition-image"
                      />
                      <div className="content">
                        <h3>{selectedPlace.title}</h3>
                        <p className="location">{selectedPlace.showInfo[0].location}</p>
                        <p className="date">
                          {selectedPlace.startDate} ~ {selectedPlace.endDate}
                        </p>
                        <Link to={`/detail/${selectedPlace.UID}`} className="detail-link">
                          查看詳情
                        </Link>
                      </div>
                    </StyledInfoWindow>
                  </InfoWindow>
                )}
              </GoogleMap>
            </StyledMapContainer>
          </StyledMapViewContainer>
        </LoadScript>
      )}
      <Modal
        isShow={isShow}
        setShow={setIsShow}
        position={{ t: '25%' }}
        size={{ w: '100%', h: '125px' }}
        shape="10px"
      >
        <div className="flex flex-col items-center gap-3 cursor-pointer">
          <StyledFilterText>熱門搜尋</StyledFilterText>
          <StyledFilterText>最多人收藏</StyledFilterText>
        </div>
      </Modal>
    </>
  )
}

const StyledPageLink = styled(Link)`
  width: 8px;
  height: 16px;

  @media (min-width: ${breakpoint.tablet}px) {
    width: 8px;
    height: 16px;
  }
`

const StyledLoginBanner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
  padding: 20px;
  background-image: url(${hotBg});

  .menu {
    display: flex;
    align-items: center;
    gap: 40px;
    color: #929292;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 24px;
    padding: 24px 32px;
  }
`

const StyledTitle = styled.h3`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 18px;
  font-weight: 500;
  color: #535353;

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 24px;
  }
`

const StyledSearchConditions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;

  span {
    font-size: 16px;
    color: #666;
    white-space: nowrap;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    span {
      font-size: 18px;
    }
  }
`

const StyledTagContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`

const SearchTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  ${props => {
    switch (props.type) {
      case 'city':
        return `
          background-color: #e3f2fd;
          color: #1976d2;
          border: 1px solid #bbdefb;
        `
      case 'exhibition':
        return `
          background-color: #f3e5f5;
          color: #7b1fa2;
          border: 1px solid #ce93d8;
        `
      case 'date':
        return `
          background-color: #e8f5e8;
          color: #388e3c;
          border: 1px solid #a5d6a7;
        `
      default:
        return `
          background-color: #f5f5f5;
          color: #666;
          border: 1px solid #ddd;
        `
    }
  }}

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 16px;
    padding: 6px 16px;
  }
`

const StyledResultCount = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 20px;
  }
`
const StyledExhibitionLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;

  .title {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info {
    display: flex;
    gap: 12px;
    .date {
      display: flex;
      align-items: center;
    }

    .locate {
      display: flex;
      align-items: center;
    }
  }
  @media (min-width: ${breakpoint.tablet}px) {
    width: 331px;
    margin-bottom: 0;
  }
`

const StyledFilterText = styled.p`
  font-size: 16px;
  &:hover {
    color: #ffb800;
  }
`
const ViewModeButton = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => (props.active ? '#be875c' : 'transparent')};
  color: ${props => (props.active ? 'white' : '#929292')};
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${props => (props.active ? '#a67249' : '#f0f0f0')};
    color: ${props => (props.active ? 'white' : '#333')};
  }
`

const StyledMapViewContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
  height: 70vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: ${breakpoint.tablet}px) {
    margin: 40px;
  }

  @media (max-width: ${breakpoint.tablet - 1}px) {
    flex-direction: column;
    height: auto;
  }
`

const StyledSidebarContainer = styled.div`
  width: 320px;
  background: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoint.tablet - 1}px) {
    width: 100%;
    height: 200px;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
`

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
`

const StyledSidebarList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`

const SidebarExhibitionItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  cursor: ${props => (props.hasLocation ? 'pointer' : 'default')};
  border-bottom: 1px solid #f5f5f5;
  background: ${props => {
    if (props.isSelected) return '#fff3e0'
    if (props.isHovered && props.hasLocation) return '#f8f8f8'
    return 'white'
  }};
  opacity: ${props => (props.hasLocation ? 1 : 0.6)};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => {
      if (!props.hasLocation) return 'white'
      if (props.isSelected) return '#fff3e0'
      return '#f8f8f8'
    }};
  }

  &:last-child {
    border-bottom: none;
  }
`

const SidebarExhibitionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`

const SidebarExhibitionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => (props.hasLocation ? '#333' : '#999')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;

  .no-location {
    font-size: 12px;
    color: #ff6b6b;
    font-weight: normal;
  }
`

const SidebarExhibitionDate = styled.div`
  font-size: 12px;
  color: #be875c;
  font-weight: 500;
`

const SidebarExhibitionLocation = styled.div`
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SidebarViewButton = styled.button`
  padding: 6px 12px;
  background: #be875c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  height: fit-content;
  align-self: center;

  &:hover {
    background: #a67249;
  }
`

const StyledMapContainer = styled.div`
  flex: 1;
  min-height: 0;

  @media (max-width: ${breakpoint.tablet - 1}px) {
    height: 400px;
  }
`

const StyledInfoWindow = styled.div`
  display: flex;
  gap: 12px;
  max-width: 280px;

  .exhibition-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .content {
    flex: 1;

    h3 {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 6px 0;
      color: #333;
      line-height: 1.3;
    }

    .location {
      font-size: 12px;
      color: #666;
      margin: 2px 0;
    }

    .date {
      font-size: 12px;
      color: #be875c;
      font-weight: 500;
      margin: 2px 0;
    }

    .detail-link {
      display: inline-block;
      margin-top: 6px;
      padding: 4px 12px;
      background: #be875c;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      transition: background 0.2s ease;

      &:hover {
        background: #a67249;
      }
    }
  }
`

const StyledResultListBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 40px;
  padding: 24px;
  overflow: hidden;

  @media (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    gap: 25px;
    padding: 40px;
  }
`
