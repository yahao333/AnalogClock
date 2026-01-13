import React from 'react';
import { SettingsModalProps } from '../types';

/**
 * 设置页面 (模态框)
 * 包含应用的所有偏好设置
 */
const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    showNumbers,
    onToggleShowNumbers,
    is24Hour,
    onToggleIs24Hour
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 遮罩层 */}
            <div 
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* 弹窗内容 */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in-up">
                
                {/* 标题栏 */}
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">⚙️ 应用设置</h2>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* 设置列表 */}
                <div className="p-6 space-y-6">
                    
                    {/* 设置项 1: 表盘数字 */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-slate-800 font-medium">显示表盘数字</div>
                            <div className="text-slate-500 text-xs mt-1">在模拟时钟上显示 1-12 整点刻度</div>
                        </div>
                        <button 
                            onClick={onToggleShowNumbers}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showNumbers ? 'bg-blue-600' : 'bg-slate-200'}`}
                        >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${showNumbers ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {/* 设置项 2: 时间格式 */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-slate-800 font-medium">24小时制</div>
                            <div className="text-slate-500 text-xs mt-1">关闭则使用 12小时制 (AM/PM)</div>
                        </div>
                        <button 
                            onClick={onToggleIs24Hour}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${is24Hour ? 'bg-blue-600' : 'bg-slate-200'}`}
                        >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${is24Hour ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                </div>

                {/* 底部 */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <button 
                        onClick={onClose}
                        className="w-full py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium text-sm"
                    >
                        完成
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;