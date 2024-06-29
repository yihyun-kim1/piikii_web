"use client";
import { Button } from "@/components/common/Button/Button";
import BasisSection from "@/components/common/Layout/BasisSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import Image from "next/image";
import React, { Children } from "react";

const TEMP_ITEM = {
  comp: (
    <div className="h-[100px]">
      <Image
        src="/png/ic_picture_24.png"
        width={100}
        height={100}
        alt="ic_picture_24.png"
      />
    </div>
  ),
};

const TEMP_SLIDE_ITEMS = Array.from({ length: 3 }).fill(
  TEMP_ITEM.comp
) as React.ReactNode[];

const Home = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <BasisSection className="bg-primary-100">
      <div className="flex justify-between items-center h-[56px]  py-[8px] px-[12px]">
        <div className="w-[100px] h-[40px] bg-neutral-200 flex justify-center items-center">
          <Image
            src="/png/ic_picture_24.png"
            width={24}
            height={24}
            alt="ic_picture_24.png"
          />
        </div>
        <p className="text-bold-15 text-primary-700 cursor-pointer">건너뛰기</p>
      </div>

      <div>
        <div className="pt-[16px] pb-[27px] flex flex-col text-center bg-primary-100">
          <p className="text-primary-700 text-black-22">모임에 가기 전</p>
          <p className="text-black-22">가고 싶은 후보지를 모아봐요</p>
        </div>

        <Carousel setApi={setApi}>
          <CarouselContent>
            {Children.toArray(
              TEMP_SLIDE_ITEMS.map((item, index) => {
                return (
                  <CarouselItem>
                    <div className="bg-neutral-200 h-[312px] flex justify-center items-center">
                      {item}
                      {index}
                    </div>
                  </CarouselItem>
                );
              })
            )}
          </CarouselContent>
        </Carousel>
      </div>

      <ul className="flex justify-center gap-[8px] py-[16px] mt-[6px]">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className={`w-[8px] h-[8px] rounded-full cursor-pointer ${
              current - 1 === index
                ? "bg-primary-700 opacity-100"
                : "bg-primary-700 opacity-30"
            }`}
            onClick={() => {
              api?.scrollTo(index);
            }}
          />
        ))}
      </ul>

      <div className="absolute w-full bottom-0 bg-white py-[10px] px-[20px]">
        <Button className="h-[56px]">
          {current - 1 === 2 ? `모임 만들기` : "다음"}
        </Button>
      </div>
    </BasisSection>
  );
};

export default Home;
