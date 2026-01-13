// 定义语言类型
export type Language = 'en' | 'zh';

// 定义时间状态接口
export interface TimeState {
  hours: number;   // 0-23
  minutes: number; // 0-59
  seconds: number; // 0-59
}

// 定义时钟组件的属性接口
export interface ClockFaceProps {
  time: TimeState;
  showNumbers: boolean; // 是否显示表盘数字
}

// 定义控制面板组件的属性接口
export interface ControlPanelProps {
  time: TimeState;
  isLive: boolean;
  onTimeChange: (field: 'hours' | 'minutes', value: number) => void;
  onToggleLive: () => void;
  
  // 语言设置
  language: Language;
  onToggleLanguage: () => void;

  // 新增设置属性
  showNumbers: boolean;
  onToggleShowNumbers: () => void;
  is24Hour: boolean;
  onToggleIs24Hour: () => void;
}

// 定义设置模态框组件的属性接口
export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  showNumbers: boolean;
  onToggleShowNumbers: () => void;
  is24Hour: boolean;
  onToggleIs24Hour: () => void;
}
