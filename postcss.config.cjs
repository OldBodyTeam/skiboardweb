module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 设计稿的宽度
      unitPrecision: 5, // 转换后的位数，即小数点位数
      viewportUnit: 'vw', // 转换成的视窗单位
      propList: ['*'], // 要进行转换的属性，如果某个属性不进行转换，只需在其前加个“!”即可
      selectorBlackList: [/^\.ignore*/, /^\.adm*/], // 不进行转换的选择器
      minPixelValue: 1, // 小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
    },
  },
};
