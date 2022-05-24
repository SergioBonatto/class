module.exports = (function (){
  function word_to_u16(w) {
    var u = 0;
    for (var i = 0; i < 16; ++i) {
      u = u | (w._ === 'Word.i' ? 1 << i : 0);
      w = w.pred;
    };
    return u;
  };
  function u16_to_word(u) {
    var w = {_: 'Word.e'};
    for (var i = 0; i < 16; ++i) {
      w = {_: (u >>> (16-i-1)) & 1 ? 'Word.i' : 'Word.o', pred: w};
    };
    return w;
  };
  function u16_to_bits(x) {
    var s = '';
    for (var i = 0; i < 16; ++i) {
      s = (x & 1 ? '1' : '0') + s;
      x = x >>> 1;
    }
    return s;
  };
  const inst_bool = x=>x(true)(false);
  const elim_bool = (x=>{var $2 = (()=>c0=>c1=>{var self = x;if (self) {var $0 = c0;return $0;} else {var $1 = c1;return $1;};})();return $2;});
  const inst_nat = x=>x(0n)(x0=>1n+x0);
  const elim_nat = (x=>{var $6 = (()=>c0=>c1=>{var self = x;if (self===0n) {var $3 = c0;return $3;} else {var $4=(self-1n);var $5 = c1($4);return $5;};})();return $6;});
  const inst_bits = x=>x('')(x0=>x0+'0')(x0=>x0+'1');
  const elim_bits = (x=>{var $12 = (()=>c0=>c1=>c2=>{var self = x;switch(self.length===0?'e':self[self.length-1]==='0'?'o':'i'){case 'o':var $7=self.slice(0,-1);var $8 = c1($7);return $8;case 'i':var $9=self.slice(0,-1);var $10 = c2($9);return $10;case 'e':var $11 = c0;return $11;};})();return $12;});
  const inst_u16 = x=>x(x0=>word_to_u16(x0));
  const elim_u16 = (x=>{var $15 = (()=>c0=>{var self = x;switch('u16'){case 'u16':var $13=u16_to_word(self);var $14 = c0($13);return $14;};})();return $15;});
  const inst_string = x=>x('')(x0=>x1=>(String.fromCharCode(x0)+x1));
  const elim_string = (x=>{var $20 = (()=>c0=>c1=>{var self = x;if (self.length===0) {var $16 = c0;return $16;} else {var $17=self.charCodeAt(0);var $18=self.slice(1);var $19 = c1($17)($18);return $19;};})();return $20;});
  function Inte$pos$(_num$1){var $21 = ({_:'Inte.pos','num':_num$1});return $21;};
  const Inte$pos = x0=>Inte$pos$(x0);
  const Pos$zero = ({_:'Pos.zero'});
  function Pos$succ$(_pred$1){var $22 = ({_:'Pos.succ','pred':_pred$1});return $22;};
  const Pos$succ = x0=>Pos$succ$(x0);
  function nat_to_pos$(_n$1){var self = _n$1;if (self===0n) {var $24 = Pos$zero;var $23 = $24;} else {var $25=(self-1n);var $26 = Pos$succ$(nat_to_pos$($25));var $23 = $26;};return $23;};
  const nat_to_pos = x0=>nat_to_pos$(x0);
  function Inte$neg$(_num$1){var $27 = ({_:'Inte.neg','num':_num$1});return $27;};
  const Inte$neg = x0=>Inte$neg$(x0);
  const Neg$one = ({_:'Neg.one'});
  function neg_succ$(_n$1){var self = _n$1;switch(self._){case 'Neg.pred':var $29=self.succ;var $30 = $29;var $28 = $30;break;case 'Neg.one':var $31 = Neg$one;var $28 = $31;break;};return $28;};
  const neg_succ = x0=>neg_succ$(x0);
  function Neg$pred$(_succ$1){var $32 = ({_:'Neg.pred','succ':_succ$1});return $32;};
  const Neg$pred = x0=>Neg$pred$(x0);
  function nat_to_neg_aux$(_n$1){var self = _n$1;if (self===0n) {var $34 = Neg$one;var $33 = $34;} else {var $35=(self-1n);var $36 = Neg$pred$(nat_to_neg_aux$($35));var $33 = $36;};return $33;};
  const nat_to_neg_aux = x0=>nat_to_neg_aux$(x0);
  function nat_to_neg$(_n$1){var $37 = neg_succ$(nat_to_neg_aux$(_n$1));return $37;};
  const nat_to_neg = x0=>nat_to_neg$(x0);
  function int$(_sign$1,_num$2){var self = _sign$1;if (self) {var $39 = Inte$pos$(nat_to_pos$(_num$2));var $38 = $39;} else {var self = _num$2;if (self===0n) {var $41 = Inte$pos$(Pos$zero);var $40 = $41;} else {var $42=(self-1n);var $43 = Inte$neg$(nat_to_neg$(_num$2));var $40 = $43;};var $38 = $40;};return $38;};
  const int = x0=>x1=>int$(x0,x1);
  const Bool$false = false;
  const Bool$true = true;
  function String$cons$(_head$1,_tail$2){var $44 = (String.fromCharCode(_head$1)+_tail$2);return $44;};
  const String$cons = x0=>x1=>String$cons$(x0,x1);
  const String$concat = a0=>a1=>(a0+a1);
  function List$fold$(_list$2,_nil$4,_cons$5){var self = _list$2;switch(self._){case 'List.cons':var $46=self.head;var $47=self.tail;var $48 = _cons$5($46)(List$fold$($47,_nil$4,_cons$5));var $45 = $48;break;case 'List.nil':var $49 = _nil$4;var $45 = $49;break;};return $45;};
  const List$fold = x0=>x1=>x2=>List$fold$(x0,x1,x2);
  const Nat$lte = a0=>a1=>(a0<=a1);
  function Pair$(_A$1,_B$2){var $50 = null;return $50;};
  const Pair = x0=>x1=>Pair$(x0,x1);
  function Nat$succ$(_pred$1){var $51 = 1n+_pred$1;return $51;};
  const Nat$succ = x0=>Nat$succ$(x0);
  const Nat$sub = a0=>a1=>(a0-a1<=0n?0n:a0-a1);
  function Pair$new$(_fst$3,_snd$4){var $52 = ({_:'Pair.new','fst':_fst$3,'snd':_snd$4});return $52;};
  const Pair$new = x0=>x1=>Pair$new$(x0,x1);
  function Nat$div_mod$go$(_n$1,_d$2,_r$3){var Nat$div_mod$go$=(_n$1,_d$2,_r$3)=>({ctr:'TCO',arg:[_n$1,_d$2,_r$3]});var Nat$div_mod$go=_n$1=>_d$2=>_r$3=>Nat$div_mod$go$(_n$1,_d$2,_r$3);var arg=[_n$1,_d$2,_r$3];while(true){let [_n$1,_d$2,_r$3]=arg;var R=(()=>{var self = (_n$1<=_r$3);if (self) {var $53 = Nat$div_mod$go$(_n$1,Nat$succ$(_d$2),(_r$3-_n$1<=0n?0n:_r$3-_n$1));return $53;} else {var $54 = Pair$new$(_d$2,_r$3);return $54;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const Nat$div_mod$go = x0=>x1=>x2=>Nat$div_mod$go$(x0,x1,x2);
  const Nat$div_mod = a0=>a1=>(({_:'Pair.new','fst':a0/a1,'snd':a0%a1}));
  function List$(_A$1){var $55 = null;return $55;};
  const List = x0=>List$(x0);
  function List$cons$(_head$2,_tail$3){var $56 = ({_:'List.cons','head':_head$2,'tail':_tail$3});return $56;};
  const List$cons = x0=>x1=>List$cons$(x0,x1);
  function Nat$to_base$go$(_base$1,_nat$2,_res$3){var Nat$to_base$go$=(_base$1,_nat$2,_res$3)=>({ctr:'TCO',arg:[_base$1,_nat$2,_res$3]});var Nat$to_base$go=_base$1=>_nat$2=>_res$3=>Nat$to_base$go$(_base$1,_nat$2,_res$3);var arg=[_base$1,_nat$2,_res$3];while(true){let [_base$1,_nat$2,_res$3]=arg;var R=(()=>{var self = (({_:'Pair.new','fst':_nat$2/_base$1,'snd':_nat$2%_base$1}));switch(self._){case 'Pair.new':var $57=self.fst;var $58=self.snd;var self = $57;if (self===0n) {var $60 = List$cons$($58,_res$3);var $59 = $60;} else {var $61=(self-1n);var $62 = Nat$to_base$go$(_base$1,$57,List$cons$($58,_res$3));var $59 = $62;};return $59;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const Nat$to_base$go = x0=>x1=>x2=>Nat$to_base$go$(x0,x1,x2);
  const List$nil = ({_:'List.nil'});
  function Nat$to_base$(_base$1,_nat$2){var $63 = Nat$to_base$go$(_base$1,_nat$2,List$nil);return $63;};
  const Nat$to_base = x0=>x1=>Nat$to_base$(x0,x1);
  const String$nil = '';
  function Pair$snd$(_pair$3){var self = _pair$3;switch(self._){case 'Pair.new':var $65=self.snd;var $66 = $65;var $64 = $66;break;};return $64;};
  const Pair$snd = x0=>Pair$snd$(x0);
  const Nat$mod = a0=>a1=>(a0%a1);
  const Bool$and = a0=>a1=>(a0&&a1);
  const Nat$gtn = a0=>a1=>(a0>a1);
  function Maybe$(_A$1){var $67 = null;return $67;};
  const Maybe = x0=>Maybe$(x0);
  const Maybe$none = ({_:'Maybe.none'});
  function Maybe$some$(_value$2){var $68 = ({_:'Maybe.some','value':_value$2});return $68;};
  const Maybe$some = x0=>Maybe$some$(x0);
  function List$at$(_index$2,_list$3){var List$at$=(_index$2,_list$3)=>({ctr:'TCO',arg:[_index$2,_list$3]});var List$at=_index$2=>_list$3=>List$at$(_index$2,_list$3);var arg=[_index$2,_list$3];while(true){let [_index$2,_list$3]=arg;var R=(()=>{var self = _list$3;switch(self._){case 'List.cons':var $69=self.head;var $70=self.tail;var self = _index$2;if (self===0n) {var $72 = Maybe$some$($69);var $71 = $72;} else {var $73=(self-1n);var $74 = List$at$($73,$70);var $71 = $74;};return $71;case 'List.nil':var $75 = Maybe$none;return $75;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const List$at = x0=>x1=>List$at$(x0,x1);
  function Nat$show_digit$(_base$1,_n$2){var _m$3 = (_n$2%_base$1);var _base64$4 = List$cons$(48,List$cons$(49,List$cons$(50,List$cons$(51,List$cons$(52,List$cons$(53,List$cons$(54,List$cons$(55,List$cons$(56,List$cons$(57,List$cons$(97,List$cons$(98,List$cons$(99,List$cons$(100,List$cons$(101,List$cons$(102,List$cons$(103,List$cons$(104,List$cons$(105,List$cons$(106,List$cons$(107,List$cons$(108,List$cons$(109,List$cons$(110,List$cons$(111,List$cons$(112,List$cons$(113,List$cons$(114,List$cons$(115,List$cons$(116,List$cons$(117,List$cons$(118,List$cons$(119,List$cons$(120,List$cons$(121,List$cons$(122,List$cons$(65,List$cons$(66,List$cons$(67,List$cons$(68,List$cons$(69,List$cons$(70,List$cons$(71,List$cons$(72,List$cons$(73,List$cons$(74,List$cons$(75,List$cons$(76,List$cons$(77,List$cons$(78,List$cons$(79,List$cons$(80,List$cons$(81,List$cons$(82,List$cons$(83,List$cons$(84,List$cons$(85,List$cons$(86,List$cons$(87,List$cons$(88,List$cons$(89,List$cons$(90,List$cons$(43,List$cons$(47,List$nil))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));var self = ((_base$1>0n)&&(_base$1<=64n));if (self) {var self = List$at$(_m$3,_base64$4);switch(self._){case 'Maybe.some':var $78=self.value;var $79 = $78;var $77 = $79;break;case 'Maybe.none':var $80 = 35;var $77 = $80;break;};var $76 = $77;} else {var $81 = 35;var $76 = $81;};return $76;};
  const Nat$show_digit = x0=>x1=>Nat$show_digit$(x0,x1);
  function Nat$to_string_base$(_base$1,_nat$2){var $82 = List$fold$(Nat$to_base$(_base$1,_nat$2),String$nil,(_n$3=>_str$4=>{var $83 = String$cons$(Nat$show_digit$(_base$1,_n$3),_str$4);return $83;}));return $82;};
  const Nat$to_string_base = x0=>x1=>Nat$to_string_base$(x0,x1);
  function Nat$show$(_n$1){var $84 = Nat$to_string_base$(10n,_n$1);return $84;};
  const Nat$show = x0=>Nat$show$(x0);
  const Nat$zero = 0n;
  function neg_to_nat$(_n$1){var self = _n$1;switch(self._){case 'Neg.pred':var $86=self.succ;var $87 = Nat$succ$(neg_to_nat$($86));var $85 = $87;break;case 'Neg.one':var $88 = Nat$succ$(Nat$zero);var $85 = $88;break;};return $85;};
  const neg_to_nat = x0=>neg_to_nat$(x0);
  function neg_show$(_n$1){var $89 = ("-"+Nat$show$(neg_to_nat$(_n$1)));return $89;};
  const neg_show = x0=>neg_show$(x0);
  function pos_to_nat$(_n$1){var self = _n$1;switch(self._){case 'Pos.succ':var $91=self.pred;var $92 = Nat$succ$(pos_to_nat$($91));var $90 = $92;break;case 'Pos.zero':var $93 = Nat$zero;var $90 = $93;break;};return $90;};
  const pos_to_nat = x0=>pos_to_nat$(x0);
  function pos_show$(_n$1){var $94 = ("+"+Nat$show$(pos_to_nat$(_n$1)));return $94;};
  const pos_show = x0=>pos_show$(x0);
  function inte_show$(_n$1){var self = _n$1;switch(self._){case 'Inte.neg':var $96=self.num;var $97 = neg_show$($96);var $95 = $97;break;case 'Inte.pos':var $98=self.num;var $99 = pos_show$($98);var $95 = $99;break;};return $95;};
  const inte_show = x0=>inte_show$(x0);
  function inte_to_nat$(_a$1){var self = _a$1;switch(self._){case 'Inte.neg':var $101=self.num;var $102 = neg_to_nat$($101);var $100 = $102;break;case 'Inte.pos':var $103=self.num;var $104 = pos_to_nat$($103);var $100 = $104;break;};return $100;};
  const inte_to_nat = x0=>inte_to_nat$(x0);
  function signal$(_a$1,_b$2){var self = _a$1;switch(self._){case 'Inte.neg':var self = _b$2;switch(self._){case 'Inte.neg':var $107 = Bool$true;var $106 = $107;break;case 'Inte.pos':var $108 = Bool$false;var $106 = $108;break;};var $105 = $106;break;case 'Inte.pos':var self = _b$2;switch(self._){case 'Inte.neg':var $110 = Bool$false;var $109 = $110;break;case 'Inte.pos':var $111 = Bool$true;var $109 = $111;break;};var $105 = $109;break;};return $105;};
  const signal = x0=>x1=>signal$(x0,x1);
  function inc$(_a$1){var self = _a$1;switch(self._){case 'Inte.neg':var $113=self.num;var self = $113;switch(self._){case 'Neg.pred':var $115=self.succ;var $116 = Inte$neg$($115);var $114 = $116;break;case 'Neg.one':var $117 = Inte$pos$(Pos$zero);var $114 = $117;break;};var $112 = $114;break;case 'Inte.pos':var $118=self.num;var $119 = Inte$pos$(Pos$succ$($118));var $112 = $119;break;};return $112;};
  const inc = x0=>inc$(x0);
  function dec$(_a$1){var self = _a$1;switch(self._){case 'Inte.neg':var $121=self.num;var $122 = Inte$neg$(Neg$pred$($121));var $120 = $122;break;case 'Inte.pos':var $123=self.num;var self = $123;switch(self._){case 'Pos.succ':var $125=self.pred;var $126 = Inte$pos$($125);var $124 = $126;break;case 'Pos.zero':var $127 = Inte$neg$(Neg$one);var $124 = $127;break;};var $120 = $124;break;};return $120;};
  const dec = x0=>dec$(x0);
  function sub$(_a$1,_b$2){var sub$=(_a$1,_b$2)=>({ctr:'TCO',arg:[_a$1,_b$2]});var sub=_a$1=>_b$2=>sub$(_a$1,_b$2);var arg=[_a$1,_b$2];while(true){let [_a$1,_b$2]=arg;var R=(()=>{var self = _a$1;switch(self._){case 'Inte.neg':var $128=self.num;var self = $128;switch(self._){case 'Neg.one':var self = _b$2;switch(self._){case 'Inte.neg':var $131 = int$(Bool$true,inte_to_nat$(inc$(_b$2)));var $130 = $131;break;case 'Inte.pos':var $132 = int$(Bool$false,inte_to_nat$(inc$(_b$2)));var $130 = $132;break;};var $129 = $130;break;case 'Neg.pred':var $133 = sub$(inc$(_a$1),inc$(_b$2));var $129 = $133;break;};return $129;case 'Inte.pos':var $134=self.num;var self = $134;switch(self._){case 'Pos.zero':var self = _b$2;switch(self._){case 'Inte.neg':var $137 = int$(Bool$true,inte_to_nat$(_b$2));var $136 = $137;break;case 'Inte.pos':var $138 = int$(Bool$false,inte_to_nat$(_b$2));var $136 = $138;break;};var $135 = $136;break;case 'Pos.succ':var $139 = sub$(dec$(_a$1),dec$(_b$2));var $135 = $139;break;};return $135;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const sub = x0=>x1=>sub$(x0,x1);
  function div$(_a$1,_b$2){var _a_nat$3 = inte_to_nat$(_a$1);var _b_nat$4 = inte_to_nat$(_b$2);var self = _a_nat$3;if (self===0n) {var $141 = int$(signal$(_a$1,_b$2),Nat$zero);var $140 = $141;} else {var $142=(self-1n);var self = signal$(_a$1,_b$2);if (self) {var $144 = int$(Bool$true,Nat$succ$(inte_to_nat$(div$(sub$(_a$1,_b$2),_b$2))));var $143 = $144;} else {var $145 = int$(Bool$false,Nat$succ$(inte_to_nat$(div$(sub$(_a$1,_b$2),_b$2))));var $143 = $145;};var $140 = $143;};return $140;};
  const div = x0=>x1=>div$(x0,x1);
  const ex_06 = (()=>{var _a$1 = int$(Bool$false,2n);var _b$2 = int$(Bool$true,7n);var _c$3 = Inte$pos$(Pos$zero);var _d$4 = int$(Bool$false,5n);var $146 = inte_show$(div$(_b$2,_a$1));return $146;})();
  return {
    'Inte.pos': Inte$pos,
    'Pos.zero': Pos$zero,
    'Pos.succ': Pos$succ,
    'nat_to_pos': nat_to_pos,
    'Inte.neg': Inte$neg,
    'Neg.one': Neg$one,
    'neg_succ': neg_succ,
    'Neg.pred': Neg$pred,
    'nat_to_neg_aux': nat_to_neg_aux,
    'nat_to_neg': nat_to_neg,
    'int': int,
    'Bool.false': Bool$false,
    'Bool.true': Bool$true,
    'String.cons': String$cons,
    'String.concat': String$concat,
    'List.fold': List$fold,
    'Nat.lte': Nat$lte,
    'Pair': Pair,
    'Nat.succ': Nat$succ,
    'Nat.sub': Nat$sub,
    'Pair.new': Pair$new,
    'Nat.div_mod.go': Nat$div_mod$go,
    'Nat.div_mod': Nat$div_mod,
    'List': List,
    'List.cons': List$cons,
    'Nat.to_base.go': Nat$to_base$go,
    'List.nil': List$nil,
    'Nat.to_base': Nat$to_base,
    'String.nil': String$nil,
    'Pair.snd': Pair$snd,
    'Nat.mod': Nat$mod,
    'Bool.and': Bool$and,
    'Nat.gtn': Nat$gtn,
    'Maybe': Maybe,
    'Maybe.none': Maybe$none,
    'Maybe.some': Maybe$some,
    'List.at': List$at,
    'Nat.show_digit': Nat$show_digit,
    'Nat.to_string_base': Nat$to_string_base,
    'Nat.show': Nat$show,
    'Nat.zero': Nat$zero,
    'neg_to_nat': neg_to_nat,
    'neg_show': neg_show,
    'pos_to_nat': pos_to_nat,
    'pos_show': pos_show,
    'inte_show': inte_show,
    'inte_to_nat': inte_to_nat,
    'signal': signal,
    'inc': inc,
    'dec': dec,
    'sub': sub,
    'div': div,
    'ex_06': ex_06,
  };
})();
var MAIN=module.exports['ex_06']; try { console.log(JSON.stringify(MAIN,null,2) || '<unprintable>') } catch (e) { console.log(MAIN); };