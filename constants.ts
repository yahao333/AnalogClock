import { Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    title: "Analog Clock",
    subtitle: "The purpose of this app is to learn and understand the analog clock face",
    controlPanel: "Control Panel",
    live: "LIVE",
    manual: "MANUAL",
    timeAdjustment: "TIME ADJUSTMENT",
    hours: "Hours",
    minutes: "Minutes",
    displaySettings: "DISPLAY SETTINGS",
    showNumbers: "Show Numbers",
    is24Hour: "24-Hour",
    footerCalcHour: "Hour Hand Angle = (Hours % 12) * 30 + Minutes * 0.5",
    footerCalcMinute: "Minute Hand Angle = Minutes * 6",
    language: "Language",
    toggleLang: "中"
  },
  zh: {
    title: "模拟时钟",
    subtitle: "当前应用的目的是认识和学习模拟时钟表盘",
    controlPanel: "控制面板",
    live: "实时",
    manual: "手动",
    timeAdjustment: "时间调整",
    hours: "小时",
    minutes: "分钟",
    displaySettings: "显示设置",
    showNumbers: "显示数字",
    is24Hour: "24小时制",
    footerCalcHour: "时针角度 = (小时 % 12) * 30 + 分钟 * 0.5",
    footerCalcMinute: "分针角度 = 分钟 * 6",
    language: "语言",
    toggleLang: "EN"
  }
};
