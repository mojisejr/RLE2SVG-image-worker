import { letterToNumber } from "./letterToNumber.js";
import { numberToLetter } from "./numberToLetter.js";
import { getColor } from "./colorMapper.js";

const frame = document.getElementById("frame");

const color = `<style>
rect {
  width: 1px;
  height: 1px;
}
#mouse-svg {
  shape-rendering: crispedges;
}
.c00 {
  fill: #000000;
}
.c01 {
  fill: #21ab09;
}
.c02 {
  fill: #ffffff;
}
.c03 {
  fill: #fa6597;
}
.c04 {
  fill: #e3d307;
}
.c05 {
  fill: #b0ab06;
}
.c06 {
  fill: #218011;
}
.c07 {
  fill: #e83535;
}
.c08 {
  fill: #137de9;
}
.c09 {
  fill: #58cfff;
}
.c10 {
  fill: #5eff58;
}
.c11 {
  fill: #fff658;
}
.c12 {
  fill: #ff58e0;
}
.c13 {
  fill: #a09d9d;
}
</style>`;

const traitsTypes = [
  [
    {
      traitType: "hat",
      pixels:
        "pr05qr04qq04rq04qp04rp05qo04ro05qn04rn05pm04qm04rm05fl00gl00hl00il00jl00kl00ll00ml00nl00ol00pl04ql05rl00fk00gk04hk04ik04jk04kk04lk04mk04nk04ok04pk04qk05rk00gj00hj04ij04jj04kj04lj04mj04nj04oj05pj05qj00hi00ii04ji04ki04li04mi04ni05oi05pi00hh00ih04jh00kh04lh04mh05nh00oh05ph00hg00ig04jg00kg04lg04mg05ng00og05pg00if00kf00lf04mf00of00ke00le04me00kd00ld04md00lc00",
      pixelCount: 89,
    },
    {
      traitType: "eye",
      pixels:
        "hq00iq00jq00kq00lq00mq00nq00oq00pq00hqgp00hp07ip07jp07kp07lp07mp07np07op07pp00",
      pixelCount: 9,
    },
    {
      traitType: "mouth",
      pixels: "",
      pixelCount: 0,
    },
    {
      traitType: "character",
      pixels:
        "kx00lx01mx01nx00kw00lw01mw01nw00hv00iv00jv00kv00lv01mv01nv00ov00pv00gu00hu01iu01ju01ku01lu01mu01nu06ou06pu06qu00ft00gt01ht01it01jt01kt01lt01mt01nt01ot01pt01qt06rt00fs00gs01hs01is01js01ks01ls01ms01ns01os01ps01qs06rs00fr00gr01hr01ir01jr01kr01lr01mr01nr01or01pr01qr01rr06sr00fq00gq01hq01iq01jq01kq01lq01mq01nq01oq01pq01qq01rq01sq06tq00fp00gp01hp01ip01jp01kp01lp01mp01np01op01pp01qp01rp01sp06tp00fo00go01ho01io01jo01ko01lo01mo01no01oo01po01qo01ro01so00fn00gn01hn01in01jn01kn01ln01mn01nn01on01pn01qn06rn00fm00gm01hm01im01jm01km01lm01mm01nm01om01pm01qm06rm00fl00gl00hl00il00jl00kl00ll00ml00nl00ol00pl00ql00rl00",
      pixelCount: 150,
    },
  ],
];

function decode(rle, pixelCount) {
  let array = [];
  for (let i = 0; i < pixelCount; i++) {
    let pixels = rle.substring(i * 4, i * 4 + 4);
    let x = letterToNumber(pixels.substring(0, 1));
    let y = letterToNumber(pixels.substring(1, 2));
    let colorCode = pixels.substring(2, 4);
    let color = getColor(colorCode);
    array.push({
      hash: pixels,
      x,
      y,
      color,
      colorCode,
    });
  }

  return array;
}

//input [00,00,00]
function encodeData(input) {
  let splitted = input.split(",");
  let x = numberToLetter(parseInt(splitted[0]));
  let y = numberToLetter(parseFloat(splitted[1]));
  let color = splitted[2];
  return x + y + color;
}

function decodedToSVGString(decode, pixelCount) {
  let svgString = "";
  for (let i = 0; i < pixelCount; i++) {
    svgString = svgString.concat(
      `<rect class="c${decode[i].colorCode}" x="${decode[
        i
      ].x.toString()}" y="${decode[i].y.toString()}" />`
    );
  }

  return svgString;
}

const hat = decode(traitsTypes[0][0].pixels, traitsTypes[0][0].pixelCount);
const svgHatString = decodedToSVGString(hat, traitsTypes[0][0].pixelCount);
const eye = decode(traitsTypes[0][1].pixels, traitsTypes[0][1].pixelCount);
const svgEyeString = decodedToSVGString(eye, traitsTypes[0][1].pixelCount);
const mouth = decode(traitsTypes[0][2].pixels, traitsTypes[0][2].pixelCount);
console.log(mouth);
const svgMouthString = decodedToSVGString(mouth, traitsTypes[0][2].pixelCount);
const charactor = decode(
  traitsTypes[0][3].pixels,
  traitsTypes[0][3].pixelCount
);
const svgCharactorString = decodedToSVGString(
  charactor,
  traitsTypes[0][3].pixelCount
);

frame.innerHTML =
  svgCharactorString + svgHatString + svgEyeString + svgMouthString + color;
let dd = encodeData("6,15,00");
let d1 = encodeData("7,15,07");
let d2 = encodeData("8,15,07");
let d3 = encodeData("9,15,07");
let d4 = encodeData("10,15,07");
let d5 = encodeData("11,15,07");
let d6 = encodeData("12,15,07");
let d7 = encodeData("13,15,07");
let d8 = encodeData("14,15,07");
let d9 = encodeData("15,15,00");
let d10 = encodeData("16,13,00");
let d11 = encodeData("13,13,00");
let d12 = encodeData("14,13,00");
let d13 = encodeData("17,11,00");
let d14 = encodeData("18,11,00");
let d15 = encodeData("19,15,00");
let d16 = encodeData("");
let d17 = encodeData("");
console.log(dd + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9);

//character 4
/**
 *hv00iv00jv00kv00lv03mv03nv00ov00pv00
 */
