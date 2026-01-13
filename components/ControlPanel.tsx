import React from 'react';
import { ControlPanelProps } from '../types';
import { TRANSLATIONS } from '../constants';

/**
 * 控制面板组件
 * 包含：数字输入、滑动条、实时模式切换、显示设置、语言切换
 */
const ControlPanel: React.FC<ControlPanelProps> = ({ 
    time, 
    onTimeChange, 
    isLive, 
    onToggleLive,
    showNumbers,
    onToggleShowNumbers,
    is24Hour,
    onToggleIs24Hour,
    language,
    onToggleLanguage
}) => {
    const t = TRANSLATIONS[language];
    
    // 处理滑动条变化
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'hours' | 'minutes') => {
        const val = parseInt(e.target.value, 10);
        console.log(`[ControlPanel] 滑动条改变 ${field}: ${val}`);
        onTimeChange(field, val);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            
            {/* 顶部标题栏 & 按钮组 */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold text-slate-700">{t.controlPanel}</h2>
                <div className="flex items-center gap-2">
                     <button
                        onClick={onToggleLanguage}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors uppercase tracking-wide mr-2 border border-slate-200"
                    >
                        {t.toggleLang}
                    </button>

                    <button
                        onClick={onToggleLive}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors uppercase tracking-wide ${
                            isLive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        }`}
                    >
                        {isLive ? t.live : t.manual}
                    </button>
                </div>
            </div>

            {/* 时间设置区域 */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.timeAdjustment}</h3>
                
                {/* 小时控制 */}
                <div className={`space-y-2 transition-opacity ${isLive ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-500">{t.hours}</label>
                        <span className="text-sm font-bold text-slate-800">{time.hours}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="23"
                        value={time.hours}
                        onChange={(e) => handleSliderChange(e, 'hours')}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* 分钟控制 */}
                <div className={`space-y-2 transition-opacity ${isLive ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-500">{t.minutes}</label>
                        <span className="text-sm font-bold text-slate-800">{time.minutes}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="59"
                        value={time.minutes}
                        onChange={(e) => handleSliderChange(e, 'minutes')}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>
            </div>

            {/* 显示设置区域 */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.displaySettings}</h3>
                 
                 {/* 设置项 1: 表盘数字 */}
                 <div className="flex items-center justify-between">
                    <div>
                        <div className="text-slate-700 font-medium text-sm">{t.showNumbers}</div>
                    </div>
                    <button 
                        onClick={onToggleShowNumbers}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showNumbers ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                        <span className="sr-only">切换数字显示</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${showNumbers ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                 </div>

                 {/* 设置项 2: 24小时制 */}
                 <div className="flex items-center justify-between">
                    <div>
                        <div className="text-slate-700 font-medium text-sm">{t.is24Hour}</div>
                    </div>
                    <button 
                        onClick={onToggleIs24Hour}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${is24Hour ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                        <span className="sr-only">切换24小时制</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${is24Hour ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default ControlPanel;
