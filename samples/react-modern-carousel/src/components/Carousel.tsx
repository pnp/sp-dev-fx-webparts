import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import { Card, CardPreview } from "@fluentui/react-components"
import { useEffect, useState } from "react"
import { useListItems } from "pnp-react-hooks/hooks/sp/useListItems"
import { ListOptions } from "pnp-react-hooks/types/options/ListOptions"
import { useSite } from "pnp-react-hooks/hooks/sp/useSite"

// Import Swiper styles
import "swiper/swiper.min.css"
import "swiper/modules/navigation/navigation.min.css"
import "swiper/modules/pagination/pagination.min.css"
import "swiper/modules/effect-coverflow/effect-coverflow.min.css"

import { AwardItems } from "../types/AwardItems"
import styles from "../webparts/awardRecognition/components/AwardRecognition.module.scss"
import { Content } from "./Content"

export const Carousel = (): JSX.Element => {
  const [awardList, setAwardList] = useState<AwardItems[]>([])
  const [selectedUser, setSelectedUser] = useState<AwardItems | null>(null)

  const listItems = useListItems<AwardItems>("Award Recognition", {
    query: {
      select: ["ID", "Title", "Designation", "UserImage"],
    },
    mode: ListOptions.All,
  })

  const siteInfo = useSite()

  useEffect(() => {
    if (listItems && listItems.length > 0) {
      const parsedData = listItems.map((item) => {
        const AppImageUrl = JSON.parse(item.UserImage)
        const ImageUrl = `${siteInfo.Url}/Lists/Award%20Recognition/Attachments/${item.ID}/${AppImageUrl.fileName}`
        return { ...item, ImageUrl }
      })
      setAwardList(parsedData)
      if (selectedUser === null) {
        setSelectedUser(parsedData[0])
      }
    }
  }, [listItems, selectedUser, siteInfo])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any): void => {
    const activeIndex = swiper.activeIndex
    setSelectedUser(awardList[activeIndex])
  }

  return (
    <div className={styles.container}>
      <aside className={styles.asideWrapper}>
        <Content user={selectedUser} />
      </aside>
      <aside className={styles.carouselWrapper}>
        <Swiper
          effect='coverflow'
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          keyboard={{ enabled: true }}
          mousewheel={{
            thresholdDelta: 70,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          slidesPerView={2}
          modules={[EffectCoverflow]}
          centeredSlides
          spaceBetween={30}
          loop={false}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
        >
          {awardList?.map((user, index) => (
            <SwiperSlide key={index}>
              <Card
                style={{
                  width: "300px",
                  height: "400px",
                  borderRadius: "8px",
                }}
              >
                <CardPreview>
                  <img src={user.ImageUrl} alt={user.Title}/>
                </CardPreview>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </aside>
    </div>
  )
}
