export const UPPER_SNAKE_CASE = (str: string) => {
  // 找到 A-Z ，转为 _A，然后全部大写
  return str.replace(/([A-Z])/g, s => `_${s.toUpperCase()}`).toUpperCase();
};
console.log('驼峰转大写下划线', UPPER_SNAKE_CASE("yuTangHelloWorld")); // YU_TANG_HELLO_WORLD

export const UPPER_SNAKE_CASE_COPY = (str: string) => {
  const name =  str.replace(/([A-Z])/g, s => `_${s.toUpperCase()}`).toUpperCase();
  return `${name}_COPY`;
};
console.log('COPY', UPPER_SNAKE_CASE_COPY("yuTangHelloWorld")); // YU_TANG_HELLO_WORLD_COPY

export const UpperCammelCase = (str: string) => {
  return str.replace(/^\w/, (s) => s.toUpperCase());
};
console.log('小驼峰转大驼峰', UpperCammelCase("yuTangHelloWorld")); // YuTangHelloWorld

