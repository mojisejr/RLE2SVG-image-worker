import { letterToNumber } from "./letterToNumber.js";
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
  fill: #b1adac;
}
.c02 {
  fill: #d7d7d7;
}
.c03 {
  fill: #ffa6a6;
}
.c04 {
  fill: #ffd4d5;
}
.c05 {
  fill: #b9ad95;
}
.c06 {
  fill: #e2d6be;
}
.c07 {
  fill: #7f625a;
}
.c08 {
  fill: #a58f82;
}
.c09 {
  fill: #4b1e0b;
}
.c10 {
  fill: #6d2c10;
}
.c11 {
  fill: #d8d8d8;
}
.c12 {
  fill: #f5f5f5;
}
.c13 {
  fill: #433d4b;
}
.c14 {
  fill: #8d949c;
}
.c15 {
  fill: #05ff00;
}
.c16 {
  fill: #01c700;
}
.c17 {
  fill: #0b8f08;
}
.c18 {
  fill: #421c13;
}
.c19 {
  fill: #6b392a;
}
.c20 {
  fill: #a35e40;
}
.c21 {
  fill: #dcbd91;
}
.c22 {
  fill: #777777;
}
.c23 {
  fill: #848484;
}
.c24 {
  fill: #ababab;
}
.c25 {
  fill: #bababa;
}
.c26 {
  fill: #c7c7c7;
}
.c27 {
  fill: #eaeaea;
}
.c28 {
  fill: #0c76aa;
}
.c29 {
  fill: #0e97db;
}
.c30 {
  fill: #10a4ec;
}
.c31 {
  fill: #13b0ff;
}
.c32 {
  fill: #2eb9fe;
}
.c33 {
  fill: #54ccff;
}
.c34 {
  fill: #50c0f2;
}
.c35 {
  fill: #54ccff;
}
.c36 {
  fill: #72daff;
}
.c37 {
  fill: #b6eaff;
}
.c38 {
  fill: #ffffff;
}
.c39 {
  fill: #954546;
}
.c40 {
  fill: #0b87f7;
}
.c41 {
  fill: #ff2626;
}
.c42 {
  fill: #180f02;
}
.c43 {
  fill: #2b2319;
}
.c44 {
  fill: #fbdd4b;
}
.c45 {
  fill: #f5b923;
}
.c46 {
  fill: #cc8a18;
}
.c47 {
  fill: #3c2203;
}
.c48 {
  fill: #53320b;
}
.c49 {
  fill: #7b501d;
}
.c50 {
  fill: #ffe646;
}
.c51 {
  fill: #ffd627;
}
.c52 {
  fill: #f5b700;
}
.c53 {
  fill: #242424;
}
.c54 {
  fill: #4a4a4a;
}
.c55 {
  fill: #676767;
}
.c56 {
  fill: #f08306;
}
.c57 {
  fill: #fca30e;
}
.c58 {
  fill: #febc0e;
}
.c59 {
  fill: #fbec1c;
}
.c60 {
  fill: #14242f;
}
.c61 {
  fill: #b06837;
}
.c62 {
  fill: #8f4b0e;
}
.c63 {
  fill: #d88227;
}
.c64 {
  fill: #b06837;
}
</style>`;

const traitsTypes = [
  [
    {
      traitType: "hat",
      pixels:
        "it00jt00ju00ku00lu00sh00si00sj00sk00sl00sm00sn00so00sp00sq00sr00rs00rt00qu00pu00ou00nu00mu00is00hs00gs00fs00fr00eq00ep00eo00en00em00el00ek00ej00fj00fk00fl00rp00qq00pr00or00nr00mr00lr00kr00jq00jp00ip00ho00hn00gm00fm00fg00fh00fi00gf00gg00he00ie00je00ke00le00me00ne00oe00pe00pf00qf00kt22lt22mt22nt23ot23pt23qt23fo24fp24fq24gp24gq24gr24hq24fn25gn25go25hp25iq25hr25ir26jr26js26ks26ls26ms26rq26ns27os27ps27qs27qr27rr38qg38qh38rh38pg37ph37qi37ri37gh28gi28gj28gk28gl28hm28in28io28hf29hg29hh29hi29hj29hk29hl29pq29oq29nq29mq29lq29kq29op29np29mp29lp29kp29ko29kn29jn29jo29jm29jl29jk29ik29il29im29ij30ii30ih30ig30if30jf30kk30kl30km30ln30lo30kf31lf31mf31jg31jh31ji31jj31kj31lk31ll31lm31mn31nn31no31mo31oo31po31pp31qp31ro32qo32qn32pn32on32om32nm32mm32ml32mk32mj32lj32li32ki32kh32kg32mg32mh32mi32lg32lh32of33nf33pi36pj36qj36qk36ql36rk37rl37rj37rm36rn35og33nh33ni33nj33nk33nl33ng33oh33oi33oj33ok33ol33pk33pl33pm33qm33ss00ht00rg00",
      pixelCount: 228,
    },
    {
      traitType: "whiskers",
      pixels:
        "jq00ir00hr00hs00gs00fs00ft00et00dt00cs00cr00dq00pq00qr00rr00rs00ss00st00tt00ut00vs00vr00uq00iq00qq00",
      pixelCount: 25,
    },

    {
      traitType: "character",
      pixels:
        "lw18lv18mu18nu18ou18pt18ql18qm18qn18qo18qp18qq18qr18qs18rk18sj18ti18uh18ug18uf18ue18sd18re18qf18pg18of18if18jf18kf18lf18mf18nf18hg18gf18fe18ed18ce18cf18cg18ch18di18ej18fk18gl18gm18gn18go18gp18gq18gr18gs18gt18gg19gh19gi19gj19gk19ee19ff19qg19qh19qi19qj19qk19rf19se19ht20hs20hr20hq20hp20ho20hn20hm20hl20hk20hj20hi20hh20ih20ig20jg20kg20lg20mg20ng20og20te20tf20tg20th20si20rj20de20df20dg20dh20ei20fj20ef04fg04sf04rg04eg03eh03fh03fi03rh03ri03sg03sh03it21is21ir21iq21ip21io21in21im21il21ik21ij21ii21ji21jh21kh21lh21mh21nh21oh21ph21pi21pj21pk21pl21pm21pn21po21pp21pq21pr21ps21os21ot21nt21mt21lt21kt21jt21ju21jv21jw21kw21kv21ku21ks21kr21kq21kp21ko21kn21km21kl21kk21kj21ki21jj21jk21jl21jm21jn21jo21jp21jq21jr21js21ls21lr21lq21lp21lo21ln21lm21ll21lk21lj21li21mi21mj21mk21ml21mm21mn21mo21mp21mq21mr21ms21ns21nr21nq21np21no21nn21nm21nl21nk21nj21ni21oi21oj21ok21ol21om21on21oo21op21oq21or21lu21iu20iv20iw20hu18hv18hw18dd18td18",
      pixelCount: 228,
    },
    {
      traitType: "eye",
      pixels: "kl00pl00jl38ol38jm01km01om01pm01",
      pixelCount: 8,
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
const whisker = decode(traitsTypes[0][1].pixels, traitsTypes[0][1].pixelCount);
const svgWhiskerString = decodedToSVGString(
  whisker,
  traitsTypes[0][1].pixelCount
);
const charactor = decode(
  traitsTypes[0][2].pixels,
  traitsTypes[0][2].pixelCount
);
const svgCharactorString = decodedToSVGString(
  charactor,
  traitsTypes[0][2].pixelCount
);
const eye = decode(traitsTypes[0][3].pixels, traitsTypes[0][3].pixelCount);
const svgEyeString = decodedToSVGString(eye, traitsTypes[0][3].pixelCount);
frame.innerHTML = svgCharactorString + svgEyeString + svgHatString + color;
