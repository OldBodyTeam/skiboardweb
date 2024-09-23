import { cloneDeep } from 'lodash';

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
const covertDataToServer = (
  webData: {
    selectStatus: boolean;
  }[][],
) => {
  return webData.map((item) => {
    return item
      .map((v, index) => {
        return v.selectStatus ? index : null;
      })
      .filter((v): v is number => typeof v === 'number');
  });
};
const covertMap = (scrollText: number[][]) => {
  // const coverLiterMap = new Map<string, DrawBlockType>();
  // Object.keys(scrollText).forEach((v) => {
  const optData = cloneDeep(drawData);
  scrollText.forEach((item, index) => {
    const row = optData.get(index);
    item.forEach((b) => {
      row?.set(`${index}-${b}`, { selectStatus: true });
    });
    // });
    // coverLiterMap.set(String(v), optData);
  });
  return optData;
};
const poi = new Map();
poi.set(`0-0`, '10');
poi.set(`1-0`, '40');
poi.set(`1-1`, '30');
poi.set(`1-2`, '20');
poi.set(`2-0`, '90');
poi.set(`2-1`, '80');
poi.set(`2-2`, '70');
poi.set(`2-3`, '60');
poi.set(`2-4`, '50');
poi.set(`3-0`, '21');
poi.set(`3-1`, '01');
poi.set(`3-2`, 'c0');
poi.set(`3-3`, 'b0');
poi.set(`3-4`, 'a0');
poi.set(`4-0`, '91');
poi.set(`4-1`, '81');
poi.set(`4-2`, '71');
poi.set(`4-3`, '61');
poi.set(`4-4`, '51');
poi.set(`4-5`, '41');
poi.set(`4-6`, '31');
poi.set(`5-0`, '42');
poi.set(`5-1`, '32');
poi.set(`5-2`, '12');
poi.set(`5-3`, '02');
poi.set(`5-4`, 'c1');
poi.set(`5-5`, 'b1');
poi.set(`5-6`, 'a1');
poi.set(`6-0`, '03');
poi.set(`6-1`, 'c2');
poi.set(`6-2`, 'b2');
poi.set(`6-3`, 'a2');
poi.set(`6-4`, '92');
poi.set(`6-5`, '82');
poi.set(`6-6`, '72');
poi.set(`6-7`, '62');
poi.set(`6-8`, '52');
poi.set(`7-0`, 'a3');
poi.set(`7-1`, '93');
poi.set(`7-2`, '83');
poi.set(`7-3`, '73');
poi.set(`7-4`, '63');
poi.set(`7-5`, '53');
poi.set(`7-6`, '43');
poi.set(`7-7`, '23');
poi.set(`7-8`, '13');
poi.set(`8-0`, '94');
poi.set(`8-1`, '84');
poi.set(`8-2`, '74');
poi.set(`8-3`, '64');
poi.set(`8-4`, '54');
poi.set(`8-5`, '34');
poi.set(`8-6`, '24');
poi.set(`8-7`, '14');
poi.set(`8-8`, '04');
poi.set(`8-9`, 'c3');
poi.set(`8-10`, 'b3');
poi.set(`9-0`, '85');
poi.set(`9-1`, '75');
poi.set(`9-2`, '65');
poi.set(`9-3`, '45');
poi.set(`9-4`, '35');
poi.set(`9-5`, '25');
poi.set(`9-6`, '15');
poi.set(`9-7`, '05');
poi.set(`9-8`, 'c4');
poi.set(`9-9`, 'b4');
poi.set(`9-10`, 'a4');
poi.set(`10-0`, '96');
poi.set(`10-1`, '86');
poi.set(`10-2`, '76');
poi.set(`10-3`, '56');
poi.set(`10-4`, '46');
poi.set(`10-5`, '36');
poi.set(`10-6`, '26');
poi.set(`10-7`, '16');
poi.set(`10-8`, '06');
poi.set(`10-9`, 'c5');
poi.set(`10-10`, 'b5');
poi.set(`10-11`, 'a5');
poi.set(`10-12`, '95');
poi.set(`11-0`, 'a7');
poi.set(`11-1`, '97');
poi.set(`11-2`, '87');
poi.set(`11-3`, '67');
poi.set(`11-4`, '57');
poi.set(`11-5`, '47');
poi.set(`11-6`, '37');
poi.set(`11-7`, '27');
poi.set(`11-8`, '17');
poi.set(`11-9`, '07');
poi.set(`11-10`, 'c6');
poi.set(`11-11`, 'b6');
poi.set(`11-12`, 'a6');
poi.set(`12-0`, '09');
poi.set(`12-1`, 'c8');
poi.set(`12-2`, 'b8');
poi.set(`12-3`, 'a8');
poi.set(`12-4`, '98');
poi.set(`12-5`, '78');
poi.set(`12-6`, '68');
poi.set(`12-7`, '58');
poi.set(`12-8`, '48');
poi.set(`12-9`, '38');
poi.set(`12-10`, '28');
poi.set(`12-11`, '18');
poi.set(`12-12`, '08');
poi.set(`12-13`, 'c7');
poi.set(`12-14`, 'b7');
poi.set(`13-0`, '5a');
poi.set(`13-1`, '4a');
poi.set(`13-2`, '3a');
poi.set(`13-3`, '2a');
poi.set(`13-4`, '1a');
poi.set(`13-5`, '0a');
poi.set(`13-6`, 'c9');
poi.set(`13-7`, 'b9');
poi.set(`13-8`, 'a9');
poi.set(`13-9`, '89');
poi.set(`13-10`, '79');
poi.set(`13-11`, '69');
poi.set(`13-12`, '59');
poi.set(`13-13`, '49');
poi.set(`13-14`, '39');
poi.set(`13-15`, '29');
poi.set(`13-16`, '19');
poi.set(`14-0`, '8b');
poi.set(`14-1`, '7b');
poi.set(`14-2`, '6b');
poi.set(`14-3`, '5b');
poi.set(`14-4`, '4b');
poi.set(`14-5`, '3b');
poi.set(`14-6`, '2b');
poi.set(`14-7`, '1b');
poi.set(`14-8`, '0b');
poi.set(`14-9`, 'ca');
poi.set(`14-10`, 'ba');
poi.set(`14-11`, '9a');
poi.set(`14-12`, '8a');
poi.set(`14-13`, '7a');
poi.set(`14-14`, '6a');
export { covertCanUseCanvasData, getInitOptData, drawData, covertDataToServer, covertMap, poi };
