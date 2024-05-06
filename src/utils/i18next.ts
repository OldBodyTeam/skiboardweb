import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLang from '../locales/en-US.json';
import cnLang from '../locales/zh-CN.json';
import LanguageDetector from 'i18next-browser-languagedetector';
export const lngKey = '@lng';

// 初始化i18next配置
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh', // 切换语言失败时的使用的语言
    debug: true, // 开发环境开启调试
    // 资源文件
    resources: {
      en: {
        translation: enLang,
      },
      zh: {
        translation: cnLang,
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
