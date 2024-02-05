const drawData = new Map<number, Map<string, { selectStatus: boolean }>>();
const data = [1, 3, 5, 5, 7, 7, 9, 9, 11, 11, 13, 13, 15, 17, 15];
for (let i = 0; i < data.length; i++) {
  const col = new Map();

  for (let j = 0; j < data[i]; j++) {
    col.set(`${i}-${j}`, { selectStatus: false });
  }

  drawData.set(i, col);
}
export type DrawBlockType = Map<number, Map<string, { selectStatus: boolean }>>;
export type DrawRestoreStackType = {
  prev: Array<{ x: number; y: number }>;
  next: Array<{ x: number; y: number }>;
};
const getInitOptData = () => {
  return {
    drawBlock: new Map(drawData),
    drawRestoreStack: { prev: [] as { x: number; y: number }[], next: [] as { x: number; y: number }[] },
  };
};
const covertCanUseCanvasData = (drawCanvas: DrawBlockType) => {
  const drawBlockObj = Object.fromEntries(drawCanvas);
  return Object.keys(drawBlockObj).map((v) => {
    const drawBlockItemObj = Object.fromEntries(drawBlockObj[v]);
    return Object.keys(drawBlockItemObj).map((k) => drawBlockItemObj[k]);
  });
};
export { covertCanUseCanvasData, getInitOptData, drawData };
