import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

// 初始化 Gemini 客户端
// 注意：API KEY 必须从环境变量获取，不可硬编码
const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("未检测到 API Key，无法使用 AI 功能");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

/**
 * 根据给定的时间，生成一段关于该时间的描述
 * @param hours 小时
 * @param minutes 分钟
 * @param language 语言 'en' | 'zh'
 * @returns 描述文本
 */
export const getTimeDescription = async (hours: number, minutes: number, language: Language = 'en'): Promise<string> => {
    const ai = getClient();
    if (!ai) return language === 'en' ? "Please configure API Key to use smart description." : "请先配置 API Key 以使用智能描述功能。";

    console.log(`[Gemini Service] 正在请求描述时间: ${hours}:${minutes}, 语言: ${language}`);

    try {
        let prompt = "";
        if (language === 'en') {
            prompt = `The time is now ${hours}:${minutes}. Please describe the feeling or suitable activities for this time of day in a short, beautiful, and lively sentence (e.g., morning glimmer, afternoon laziness, late night silence). Keep it under 50 words.`;
        } else {
            prompt = `现在的时间是 ${hours}:${minutes}。请用一句简短、优美、富有生活气息的中文，描述这个时间点通常给人的感觉或者适合做的事情（例如：清晨的微光、午后的慵懒、深夜的静谧等）。字数控制在50字以内。`;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview', // 使用快速模型
            contents: prompt,
        });

        const text = response.text;
        console.log(`[Gemini Service] 生成成功: ${text}`);
        return text || (language === 'en' ? "AI seems to be daydreaming." : "AI 似乎在发呆，没有返回内容。");
    } catch (error) {
        console.error("[Gemini Service] 请求失败:", error);
        return language === 'en' ? "Failed to get time description." : "获取时间描述失败，请检查网络或 API Key。";
    }
};
