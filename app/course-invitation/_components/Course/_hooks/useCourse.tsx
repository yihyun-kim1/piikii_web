import { IconInfo } from "@/model";
import { cloneDeep } from "lodash-es";
import { useMemo, useState } from "react";
import { StepType } from "../../_hooks/useCourseInvitation";

export type BadgeType = Partial<IconInfo> & { id?: number };

export const BADGE_INIT_DATA: BadgeType = { id: 0, label: "?" };

export type BadgeMapKeyType = "food" | "desert" | "alchol" | "play";

export type BadgeMapType = Map<BadgeMapKeyType, BadgeType[]>;

export interface UseCourseProps {
  handleStep: (step: StepType) => void;
}

const BADGE_LIST_INITIAL_VALUE: BadgeMapType = new Map([
  ["food", []],
  ["desert", []],
  ["alchol", []],
  ["play", []],
]);

const useCourse = ({ handleStep }: UseCourseProps) => {
  const [badgeList, setBadgeList] = useState<BadgeMapType>(
    BADGE_LIST_INITIAL_VALUE
  );

  const [nextId, setNextId] = useState(1);

  const isAllCategoriesEmpty = () => {
    return Array.from(badgeList.values()).every((value) => value.length === 0);
  };

  const list = useMemo(() => {
    return Array.from(badgeList.values()).flatMap((item) => item);
  }, [badgeList]);

  const getBadgeData = (id: number, item: BadgeType, count: number) => {
    const { icon, label, type } = item;
    const data = {
      id,
      icon,
      type,
      label: `${label}${count !== 0 ? `${count + 1}차` : ``}`,
    };
    return data;
  };

  const getMapValue = (type?: string) => {
    const mapType = type as BadgeMapKeyType;
    const cloneList = cloneDeep(badgeList);
    const mapValue = cloneList.get(mapType);
    return {
      cloneList,
      mapValue,
      mapType,
    };
  };

  const addBadge = (item: BadgeType) => {
    if (list.length === 5) {
      return;
    }
    const { type } = item || {};
    const { mapValue, cloneList, mapType } = getMapValue(type);

    if (mapValue) {
      if (mapValue.length === 0) {
        const data = getBadgeData(nextId, item, mapValue?.length);
        cloneList.set(mapType, [...mapValue, data]);
      } else {
        const updatedList = mapValue.map((item, index) => {
          const itemLabel = item.label as string;
          const name = itemLabel.split(/차|[0-9]/)[0];
          return {
            ...item,
            label: `${name}${mapValue.length !== 0 ? `${index + 1}차` : ""}`,
          };
        });

        const data = getBadgeData(nextId, item, updatedList?.length);
        cloneList.set(mapType, [...updatedList, data]);
      }
    }
    setBadgeList(cloneList);
    setNextId(nextId + 1);
  };

  const removeBadge = (item: BadgeType) => {
    const { type, id } = item || {};
    const { mapValue, cloneList, mapType } = getMapValue(type);

    if (mapValue) {
      const filteredList = mapValue.filter((v) => v.id !== id);

      const updatedList = filteredList.map((item, index) => {
        const itemLabel = item.label as string;
        const name = itemLabel.split(/차|[0-9]/)[0];
        return {
          ...item,
          label: `${name}${filteredList.length === 1 ? "" : `${index + 1}차`}`,
        };
      });
      cloneList.set(mapType, [...updatedList]);
      setBadgeList(cloneList);
    }
  };

  const handleNext = () => {
    handleStep("invitation");
  };

  return {
    badgeList,
    BADGE_INIT_DATA,
    list,
    addBadge,
    removeBadge,
    handleNext,
    isAllCategoriesEmpty,
  };
};

export default useCourse;
