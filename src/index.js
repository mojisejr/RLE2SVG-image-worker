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
.c14 {
  fill: #0204f8;
}
.c15 {
  fill: #ef6d2c;
}
.c16 {
  fill: #bacedc;
}
.c17 {
  fill: #e0e0e0;
}
.c18 {
  fill: #642600;
}
.c19 {
  fill: #6a3617;
}
.c20 {
  fill: #a04d1b;
}
.c21 {
  fill: #cdba47;
}
.c22 {
  fill: #f7d60d;
}
.c23 {
  fill: #845538;
}
</style>`;

const traitsTypes = [
  [
    {
      traitType: "hat",
      pixels:
        "fl16gl17hl16il17jl16kl17ll16ml17nl16ol17pl16ql17rl16fk20gk18hk18ik18jk18kk16lk16mk18nk18ok18pk19qk23rk18fj20gj19hj19ij18jj18kj17lj16mj18nj19oj19pj23qj23rj18fi21gi20hi19ii19ji18ki16li16mi19ni19oi23pi23qi18ri21eh21fh21gh21hh20ih23jh19kh17lh16mh19nh23oh23ph18qh21rh21sh21eg21fg22gg22hg22ig20jg20kg16lg16mg20ng20og20pg22qg22rg22sg21df21ef22ff22kf17lf16rf22sf22tf21de22ee22se22te22ed22fd22gd22qd22rd22sd22gc22qc22",
      pixelCount: 102,
    },
    {
      traitType: "eye",
      pixels: "",
      pixelCount: 0,
    },
    {
      traitType: "mouth",
      pixels: "",
      pixelCount: 0,
    },
    {
      traitType: "character",
      pixels:
        "rl00kx00lx01mx01nx00kw00lw01mw01nw00hv00iv00jv00kv00lv01mv01nv00ov00pv00gu00hu01iu01ju01ku01lu01mu01nu06ou06pu06qu00ft00gt01ht01it01jt01kt01lt01mt01nt01ot01pt01qt06rt00fs00gs01hs01is01js01ks01ls01ms01ns01os01ps01qs06rs00fr00gr01hr01ir01jr01kr01lr01mr01nr01or01pr01qr01rr06sr00fq00gq01hq01iq01jq01kq01lq01mq01nq01oq01pq01qq01rq01sq06tq00fp00gp01hp01ip01jp01kp01lp01mp01np01op01pp01qp01rp01sp06tp00fo00go01ho01io01jo01ko01lo01mo01no01oo01po01qo01ro01so00fn00gn01hn01in01jn01kn01ln01mn01nn01on01pn01qn06rn00fm00gm01hm01im01jm01km01lm01mm01nm01om01pm01qm06rm00fl00gl00hl00il00jl00kl00ll00ml00nl00ol00pl00ql00rl00",
      pixelCount: 151,
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
console.log(eye);
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
  svgCharactorString + svgEyeString + svgMouthString + svgHatString + color;
//ชมพู 12
//ฟ้า 09
//เขียว 10
// เหลือง 11

let d1 = encodeData("1,9,00");
let d2 = encodeData("2,10,00");
let d3 = encodeData("3,4,22");
let d4 = encodeData("4,3,22");
let d5 = encodeData("5,3,22");
let d6 = encodeData("6,2,22");
let d7 = encodeData("7,6,22");
let d8 = encodeData("8,6,20");
let d9 = encodeData("9,6,20");
let d10 = encodeData("10,5,17");
let d11 = encodeData("11,5,16");
let d12 = encodeData("12,6,20");
let d13 = encodeData("13,6,20");
let d14 = encodeData("14,6,20");
let d15 = encodeData("15,6,22");
let d16 = encodeData("16,2,22");
let d17 = encodeData("17,3,22");
let d18 = encodeData("18,3,22");
let d19 = encodeData("19,4,22");
let d20 = encodeData("20,4,01");
let d21 = encodeData("21,4,01");
console.log(
  // d2 +
  // d3 +
  // d4 +
  //   d5 +
  d6 +
    // d7 +
    // d8 +
    // d9 +
    // d10 +
    // d11 +
    // d12 +
    // d13 +
    // d14 +
    // d15 +
    d16
  // +
  // d17 +
  // d18
  // +
  // d19
  // +
  // d20 +
  // d21
);

//character 4
/**
 *hv00iv00jv00kv00lv03mv03nv00ov00pv00
 */
