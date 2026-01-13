import React, { useState, useEffect, useCallback } from 'react';
import ClockFace from './components/ClockFace';
import ControlPanel from './components/ControlPanel';
import { TimeState, Language } from './types';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
    // 状态：当前语言，默认为英文 'en'
    const [language, setLanguage] = useState<Language>('en');

    // 状态：当前时间
    const [time, setTime] = useState<TimeState>({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
    });

    // 状态：是否为实时模式（默认开启）
    const [isLive, setIsLive] = useState<boolean>(true);

    // 状态：是否显示表盘数字（默认开启）
    const [showNumbers, setShowNumbers] = useState<boolean>(true);

    // 状态：是否使用24小时制（默认开启）
    const [is24Hour, setIs24Hour] = useState<boolean>(true);

    // 获取当前语言的翻译
    const t = TRANSLATIONS[language];

    // Effect: 处理实时时间更新
    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        if (isLive) {
            console.log("[App] 实时模式已激活，开始计时...");
            // 设置定时器，每秒更新一次
            intervalId = setInterval(() => {
                const now = new Date();
                setTime({
                    hours: now.getHours(),
                    minutes: now.getMinutes(),
                    seconds: now.getSeconds()
                });
            }, 1000);
        } else {
            console.log("[App] 切换至手动编辑模式，停止自动计时。");
        }

        // 清理函数：组件卸载或模式切换时清除定时器
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isLive]);

    // 处理手动时间变更
    const handleTimeChange = useCallback((field: 'hours' | 'minutes', value: number) => {
        // 如果正在修改时间，必须先关闭实时模式，否则下一秒又会被重置
        if (isLive) setIsLive(false);

        setTime(prev => {
            const newTime = { ...prev, [field]: value };
            console.log(`[App] 手动更新时间 -> ${newTime.hours}:${newTime.minutes}`);
            return newTime;
        });
    }, [isLive]);

    // 处理实时模式切换
    const toggleLive = () => {
        setIsLive(prev => !prev);
    };

    // 处理显示数字切换
    const toggleShowNumbers = () => {
        console.log(`[App] 切换显示数字: ${!showNumbers}`);
        setShowNumbers(prev => !prev);
    };

    // 处理 24/12 小时制切换
    const toggleIs24Hour = () => {
        console.log(`[App] 切换时间格式: ${!is24Hour ? '24h' : '12h'}`);
        setIs24Hour(prev => !prev);
    };

    // 处理语言切换
    const toggleLanguage = () => {
        setLanguage(prev => {
            const newLang = prev === 'en' ? 'zh' : 'en';
            console.log(`[App] 切换语言: ${newLang}`);
            return newLang;
        });
    };

    // 辅助函数：格式化数字 (补零)
    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    // 计算显示的数字时间
    const getDisplayTime = () => {
        let h = time.hours;
        let suffix = '';

        if (!is24Hour) {
            suffix = h >= 12 ? ' PM' : ' AM';
            h = h % 12;
            if (h === 0) h = 12; // 0点和12点显示为12
        }

        return {
            hoursStr: formatNumber(h),
            minutesStr: formatNumber(time.minutes),
            secondsStr: formatNumber(time.seconds),
            suffix
        };
    };

    const displayTime = getDisplayTime();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{t.title}</h1>
                <p className="text-slate-500">{t.subtitle}</p>
            </header>

            <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-5xl justify-center">
                
                {/* 左侧：时钟显示区域 */}
                <div className="flex flex-col items-center gap-6">
                    <ClockFace time={time} showNumbers={showNumbers} />
                    
                    {/* 数字时钟显示 */}
                    <div className="flex items-baseline gap-2 text-slate-700 bg-white px-8 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <span className="text-5xl font-mono font-bold tracking-wider">
                            {displayTime.hoursStr}:{displayTime.minutesStr}
                        </span>
                        <div className="flex flex-col text-sm font-bold text-slate-400">
                             {isLive && <span>:{displayTime.secondsStr}</span>}
                             {!is24Hour && <span>{displayTime.suffix}</span>}
                        </div>
                    </div>
                </div>

                {/* 右侧：控制面板 */}
                <ControlPanel 
                    time={time}
                    isLive={isLive}
                    onTimeChange={handleTimeChange}
                    onToggleLive={toggleLive}
                    showNumbers={showNumbers}
                    onToggleShowNumbers={toggleShowNumbers}
                    is24Hour={is24Hour}
                    onToggleIs24Hour={toggleIs24Hour}
                    language={language}
                    onToggleLanguage={toggleLanguage}
                />
            </div>

            <footer className="mt-12 text-center text-slate-400 text-xs">
                <p>{t.footerCalcHour}</p>
                <p>{t.footerCalcMinute}</p>
            </footer>
        </div>
    );
};

export default App;
