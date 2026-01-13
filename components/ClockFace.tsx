import React, { useMemo } from 'react';
import { ClockFaceProps } from '../types';

/**
 * 模拟表盘组件
 * 使用 SVG 绘制，保证在任何分辨率下都清晰
 */
const ClockFace: React.FC<ClockFaceProps> = ({ time, showNumbers }) => {
    const { hours, minutes } = time;

    // 1. 计算时针角度
    // 时针一圈是 360度，12小时。每小时走 360/12 = 30度。
    // 分钟也会影响时针的位置（例如 10:30，时针应该在 10 和 11 中间）
    // 每分钟时针走 30度 / 60分钟 = 0.5 度
    const hourDegrees = (hours % 12) * 30 + minutes * 0.5;

    // 2. 计算分针角度
    // 分针一圈 360度，60分钟。每分钟走 6 度。
    const minuteDegrees = minutes * 6;

    console.log(`[ClockFace] 渲染时间: ${hours}:${minutes}, 时针角度: ${hourDegrees.toFixed(1)}°, 分针角度: ${minuteDegrees}°`);

    // 生成表盘刻度 (1-12)
    const ticks = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => {
            const rotation = (i + 1) * 30; // 每个刻度间隔 30 度
            const isMajor = (i + 1) % 3 === 0; // 3, 6, 9, 12 点为主要刻度

            return (
                <g key={`tick-${i}`} transform={`rotate(${rotation}, 100, 100)`}>
                    {/* 主要刻度更粗更长 (12, 3, 6, 9) */}
                    <rect
                        x={isMajor ? "97" : "98"}
                        y="10" 
                        width={isMajor ? "6" : "4"}
                        height={isMajor ? "15" : "8"}
                        rx={isMajor ? "3" : "2"}
                        className={isMajor ? "fill-slate-800" : "fill-slate-400"}
                    />
                </g>
            );
        });
    }, []);

    // 生成表盘数字 (1-12)
    const numbers = useMemo(() => {
        if (!showNumbers) return null;
        
        // 调整数字半径：
        // 外圈半径 ~95
        // 刻度起始 10 (R=90)
        // 长刻度长度 15 -> 结束于 y=25 (R=75)
        // 将数字半径设为 60，保证数字中心与刻度有足够间距
        const radius = 60; 
        const cx = 100;
        const cy = 100;

        return Array.from({ length: 12 }).map((_, i) => {
            const num = i + 1;
            // 计算角度 (弧度)
            const angleInDegrees = num * 30;
            const angleInRadians = (angleInDegrees * Math.PI) / 180;
            
            const x = cx + radius * Math.sin(angleInRadians);
            const y = cy - radius * Math.cos(angleInRadians);

            // 3, 6, 9, 12 数字稍微大一点，颜色深一点
            const isMajor = num % 3 === 0;

            return (
                <text
                    key={`num-${num}`}
                    x={x}
                    y={y}
                    dominantBaseline="central"
                    textAnchor="middle"
                    className={`font-mono font-bold ${isMajor ? 'fill-slate-800 text-[16px]' : 'fill-slate-500 text-[14px]'}`}
                    style={{ userSelect: 'none' }}
                >
                    {num}
                </text>
            );
        });
    }, [showNumbers]);

    return (
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 filter drop-shadow-xl">
            {/* SVG 容器，viewBox 设置为 0 0 200 200，中心点是 100, 100 */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* 表盘背景 */}
                <circle cx="100" cy="100" r="95" className="fill-white stroke-slate-200 stroke-[4]" />
                
                {/* 刻度 */}
                {ticks}

                {/* 数字 (可选) */}
                {numbers}

                {/* 时针 (Hour Hand) */}
                {/* x=97 居中(宽6), y=50 起始点, height=50 长度 */}
                {/* transform-origin 设置为中心点 "100 100" */}
                <rect
                    x="97"
                    y="50"
                    width="6"
                    height="50"
                    rx="3"
                    className="fill-slate-800 hand-transition"
                    transform={`rotate(${hourDegrees}, 100, 100)`}
                />

                {/* 分针 (Minute Hand) */}
                {/* 更细更长 */}
                <rect
                    x="98"
                    y="30"
                    width="4"
                    height="70"
                    rx="2"
                    className="fill-blue-500 hand-transition"
                    transform={`rotate(${minuteDegrees}, 100, 100)`}
                />

                {/* 中心圆点 (盖住指针根部) */}
                <circle cx="100" cy="100" r="6" className="fill-blue-600 ring-2 ring-white" />
            </svg>
        </div>
    );
};

export default ClockFace;