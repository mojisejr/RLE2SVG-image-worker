import { letterToNumber } from "./letterToNumber.js";
import { numberToLetter } from "./numberToLetter.js";
import { getColor } from "./colorMapper.js";

const frame = document.getElementById("frame");

const color = `
<style>
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
    // {
    //   traitType: "hat",
    //   pixels:
    //     "fl16gl17hl16il17jl16kl17ll16ml17nl16ol17pl16ql17rl16fk20gk18hk18ik18jk18kk16lk16mk18nk18ok18pk19qk23rk18fj20gj19hj19ij18jj18kj17lj16mj18nj19oj19pj23qj23rj18fi21gi20hi19ii19ji18ki16li16mi19ni19oi23pi23qi18ri21eh21fh21gh21hh20ih23jh19kh17lh16mh19nh23oh23ph18qh21rh21sh21eg21fg22gg22hg22ig20jg20kg16lg16mg20ng20og20pg22qg22rg22sg21df21ef22ff22kf17lf16rf22sf22tf21de22ee22se22te22ed22fd22gd22qd22rd22sd22gc22qc22",
    //   pixelCount: 102,
    // },
    {
      traitType: "hat",
      pixels:
        "fl16gl17hl16il17jl16kl17ll16ml17nl16ol17pl16ql17rl16fk20gk18hk18ik18jk18kk16lk16mk18nk18ok18pk19qk23rk18fj20gj19hj19ij18jj18kj17lj16mj18nj19oj19pj23qj23rj18fi21gi20hi19ii19ji18ki16li16mi19ni19oi23pi23qi18ri21eh21fh21gh21hh20ih23jh19kh17lh16mh19nh23oh23ph18qh21rh21sh21eg21fg22gg22hg22ig20jg20kg16lg16mg20ng20og20pg22qg22rg22sg21df21ef22ff22kf17lf16rf22sf22tf21de22ee22se22te22ed22fd22gd22qd22rd22sd22gc22qc22",
      pixelCount: 102,
    },
    {
      traitType: "eye",
      pixels: "hp00jp00mp00op00io00no00",
      pixelCount: 6,
    },
    {
      traitType: "mouth",
      pixels:
        "jx12kx09lx10mx11jw12kw09lw10mw11jv12kv09lv10mv11ju12ku09lu10mu11jt12kt09lt10mt11nt00js00ks00ls00ms00",
      pixelCount: 25,
    },
    {
      traitType: "character",
      pixels:
        "kw00lw01mw01nw00hv00iv00jv00kv00lv01mv01nv00ov00pv00gu00hu01iu01ju01ku01lu01mu01nu06ou06pu06qu00ft00gt01ht01it01jt01kt01lt01mt01nt01ot01pt01qt06rt00fs00gs01hs01is01js01ks01ls01ms01ns01os01ps01qs06rs00fr00gr01hr01ir01jr01kr01lr01mr01nr01or01pr01qr01rr06sr00fq00gq01hq01iq01jq01kq01lq01mq01nq01oq01pq01qq01rq01sq06tq00fp00gp01hp01ip01jp01kp01lp01mp01np01op01pp01qp01rp01sp06tp00fo00go01ho01io01jo01ko01lo01mo01no01oo01po01qo01ro01so00fn00gn01hn01in01jn01kn01ln01mn01nn01on01pn01qn06rn00fm00gm01hm01im01jm01km01lm01mm01nm01om01pm01qm06rm00fl00gl00hl00il00jl00kl00ll00ml00nl00ol00pl00ql00rl00",
      pixelCount: 147,
    },
    // {
    //   traitType: "character",
    //   pixels:
    //     "hu00hv00hw00gt00gs00gr00gq00gp00go00gn00gm00gl00gk00fl00el00dk00cj00bi00bh00cg00cf00de00ee00fe00gf00hg00if00jf00kf00lf00mf00nf00of00pg00qf00re00se00te00uf00vg00vh00ui00tj00sk00rk00ql00qm00qn00qo00qp00qq00qr00qs00pt00ou00nu00mu00lu00lv00lw00iu01iv01iw01ht01hs01hr01hq01hp01ho01hn01hm01hl01hk01hj01hi01hh01ih01ig01jg01kg01lg01mg01ng01og01qg01qh01qi01qj01qk01rj01sj01ti01ug01uh01tf01sf01rf01ff01ef01df01ch01ci01dj01ek01fk01dg03dh03di03ej03fj03gj03tg03th03si03ri03eg04fg04gg04gh04gi04eh04fh04fi04ei04rg04sg04sh04rh04jh02kh02lh02mh02nh02oh02ph02pi02pj02pk02pl02pm02pn02po02pp02pq02pr02ps02os02or02oq02op02oo02on02om02ol02ok02oj02oi02ni02nj02nk02nl02nm02nn02no02np02nq02nr02ns02ms02mr02mq02mp02mo02mn02mm02ml02mk02mj02mi02li02lj02lk02ll02lm02ln02lo02lp02lq02lr02ls02ks02kr02kq02kp02ko02kn02km02kl02kk02kj02ki02ji02jj02jk02jl02jm02jn02jo02jp02jq02jr02js02is02ir02iq02ip02io02in02im02il02ik02ij02ii02it02jt02kt02lt02mt02nt02ot02ju02ku02kv02kw02jw02jv02mw15mv15nv15ov15pv15pu15qu15qt15rt15rs15rr15rq15rp15ro15rn15rm15rl15sl15tl15tk15uk15uj15vj15vi15wi15wh15wg15wf15vf15ve15ue15ud15td15sd15rd15qd15qe15pf15pe15oe15ne15me15le15ke15je15ie15he15hf15ge15gd15fd15ed15dd15cd15ce15be15bf15bg15ag15ah15ai15aj15bj15bk15ck15cl15dl15dm15em15fm15fn15fo15fp15fq15fr15fs15ft15fu15gu15gv15gw15",
    //   pixelCount: 317,
    // },
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
const svgMouthString = decodedToSVGString(mouth, traitsTypes[0][2].pixelCount);
const charactor = decode(
  traitsTypes[0][3].pixels,
  traitsTypes[0][3].pixelCount
);
console.log(
  traitsTypes[0][0].pixels +
    traitsTypes[0][1].pixels +
    traitsTypes[0][2].pixels +
    traitsTypes[0][3].pixels
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
let d10 = encodeData("10,23,00");
let d11 = encodeData("11,23,00");
let d12 = encodeData("12,23,00");
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
    d10 +
    d11 +
    d12 +
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
