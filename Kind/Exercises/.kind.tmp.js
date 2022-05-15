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
  function List$cons$(_head$2,_tail$3){var $21 = ({_:'List.cons','head':_head$2,'tail':_tail$3});return $21;};
  const List$cons = x0=>x1=>List$cons$(x0,x1);
  const List$nil = ({_:'List.nil'});
  function String$cons$(_head$1,_tail$2){var $22 = (String.fromCharCode(_head$1)+_tail$2);return $22;};
  const String$cons = x0=>x1=>String$cons$(x0,x1);
  const String$concat = a0=>a1=>(a0+a1);
  function String$flatten$go$(_xs$1,_res$2){var String$flatten$go$=(_xs$1,_res$2)=>({ctr:'TCO',arg:[_xs$1,_res$2]});var String$flatten$go=_xs$1=>_res$2=>String$flatten$go$(_xs$1,_res$2);var arg=[_xs$1,_res$2];while(true){let [_xs$1,_res$2]=arg;var R=(()=>{var self = _xs$1;switch(self._){case 'List.cons':var $23=self.head;var $24=self.tail;var $25 = String$flatten$go$($24,(_res$2+$23));return $25;case 'List.nil':var $26 = _res$2;return $26;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const String$flatten$go = x0=>x1=>String$flatten$go$(x0,x1);
  function String$flatten$(_xs$1){var $27 = String$flatten$go$(_xs$1,"");return $27;};
  const String$flatten = x0=>String$flatten$(x0);
  function List$(_A$1){var $28 = null;return $28;};
  const List = x0=>List$(x0);
  function List$pure$(_x$2){var $29 = List$cons$(_x$2,List$nil);return $29;};
  const List$pure = x0=>List$pure$(x0);
  function List$intersperse$(_sep$2,_xs$3){var self = _xs$3;switch(self._){case 'List.cons':var $31=self.head;var $32=self.tail;var self = $32;switch(self._){case 'List.nil':var $34 = List$pure$($31);var $33 = $34;break;case 'List.cons':var $35 = List$cons$($31,List$cons$(_sep$2,List$intersperse$(_sep$2,$32)));var $33 = $35;break;};var $30 = $33;break;case 'List.nil':var $36 = List$nil;var $30 = $36;break;};return $30;};
  const List$intersperse = x0=>x1=>List$intersperse$(x0,x1);
  function String$intercalate$(_sep$1,_xs$2){var $37 = String$flatten$(List$intersperse$(_sep$1,_xs$2));return $37;};
  const String$intercalate = x0=>x1=>String$intercalate$(x0,x1);
  function List$map$(_f$3,_as$4){var self = _as$4;switch(self._){case 'List.cons':var $39=self.head;var $40=self.tail;var $41 = List$cons$(_f$3($39),List$map$(_f$3,$40));var $38 = $41;break;case 'List.nil':var $42 = List$nil;var $38 = $42;break;};return $38;};
  const List$map = x0=>x1=>List$map$(x0,x1);
  function List$show$(_f$2,_xs$3){var $43 = String$flatten$(List$cons$("[",List$cons$(String$intercalate$(",",List$map$(_f$2,_xs$3)),List$cons$("]",List$nil))));return $43;};
  const List$show = x0=>x1=>List$show$(x0,x1);
  function List$fold$(_list$2,_nil$4,_cons$5){var self = _list$2;switch(self._){case 'List.cons':var $45=self.head;var $46=self.tail;var $47 = _cons$5($45)(List$fold$($46,_nil$4,_cons$5));var $44 = $47;break;case 'List.nil':var $48 = _nil$4;var $44 = $48;break;};return $44;};
  const List$fold = x0=>x1=>x2=>List$fold$(x0,x1,x2);
  const Bool$true = true;
  const Bool$false = false;
  const Nat$lte = a0=>a1=>(a0<=a1);
  function Pair$(_A$1,_B$2){var $49 = null;return $49;};
  const Pair = x0=>x1=>Pair$(x0,x1);
  function Nat$succ$(_pred$1){var $50 = 1n+_pred$1;return $50;};
  const Nat$succ = x0=>Nat$succ$(x0);
  const Nat$sub = a0=>a1=>(a0-a1<=0n?0n:a0-a1);
  function Pair$new$(_fst$3,_snd$4){var $51 = ({_:'Pair.new','fst':_fst$3,'snd':_snd$4});return $51;};
  const Pair$new = x0=>x1=>Pair$new$(x0,x1);
  function Nat$div_mod$go$(_n$1,_d$2,_r$3){var Nat$div_mod$go$=(_n$1,_d$2,_r$3)=>({ctr:'TCO',arg:[_n$1,_d$2,_r$3]});var Nat$div_mod$go=_n$1=>_d$2=>_r$3=>Nat$div_mod$go$(_n$1,_d$2,_r$3);var arg=[_n$1,_d$2,_r$3];while(true){let [_n$1,_d$2,_r$3]=arg;var R=(()=>{var self = (_n$1<=_r$3);if (self) {var $52 = Nat$div_mod$go$(_n$1,Nat$succ$(_d$2),(_r$3-_n$1<=0n?0n:_r$3-_n$1));return $52;} else {var $53 = Pair$new$(_d$2,_r$3);return $53;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const Nat$div_mod$go = x0=>x1=>x2=>Nat$div_mod$go$(x0,x1,x2);
  const Nat$div_mod = a0=>a1=>(({_:'Pair.new','fst':a0/a1,'snd':a0%a1}));
  function Nat$to_base$go$(_base$1,_nat$2,_res$3){var Nat$to_base$go$=(_base$1,_nat$2,_res$3)=>({ctr:'TCO',arg:[_base$1,_nat$2,_res$3]});var Nat$to_base$go=_base$1=>_nat$2=>_res$3=>Nat$to_base$go$(_base$1,_nat$2,_res$3);var arg=[_base$1,_nat$2,_res$3];while(true){let [_base$1,_nat$2,_res$3]=arg;var R=(()=>{var self = (({_:'Pair.new','fst':_nat$2/_base$1,'snd':_nat$2%_base$1}));switch(self._){case 'Pair.new':var $54=self.fst;var $55=self.snd;var self = $54;if (self===0n) {var $57 = List$cons$($55,_res$3);var $56 = $57;} else {var $58=(self-1n);var $59 = Nat$to_base$go$(_base$1,$54,List$cons$($55,_res$3));var $56 = $59;};return $56;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const Nat$to_base$go = x0=>x1=>x2=>Nat$to_base$go$(x0,x1,x2);
  function Nat$to_base$(_base$1,_nat$2){var $60 = Nat$to_base$go$(_base$1,_nat$2,List$nil);return $60;};
  const Nat$to_base = x0=>x1=>Nat$to_base$(x0,x1);
  const String$nil = '';
  function Pair$snd$(_pair$3){var self = _pair$3;switch(self._){case 'Pair.new':var $62=self.snd;var $63 = $62;var $61 = $63;break;};return $61;};
  const Pair$snd = x0=>Pair$snd$(x0);
  const Nat$mod = a0=>a1=>(a0%a1);
  const Bool$and = a0=>a1=>(a0&&a1);
  const Nat$gtn = a0=>a1=>(a0>a1);
  function Maybe$(_A$1){var $64 = null;return $64;};
  const Maybe = x0=>Maybe$(x0);
  const Maybe$none = ({_:'Maybe.none'});
  function Maybe$some$(_value$2){var $65 = ({_:'Maybe.some','value':_value$2});return $65;};
  const Maybe$some = x0=>Maybe$some$(x0);
  function List$at$(_index$2,_list$3){var List$at$=(_index$2,_list$3)=>({ctr:'TCO',arg:[_index$2,_list$3]});var List$at=_index$2=>_list$3=>List$at$(_index$2,_list$3);var arg=[_index$2,_list$3];while(true){let [_index$2,_list$3]=arg;var R=(()=>{var self = _list$3;switch(self._){case 'List.cons':var $66=self.head;var $67=self.tail;var self = _index$2;if (self===0n) {var $69 = Maybe$some$($66);var $68 = $69;} else {var $70=(self-1n);var $71 = List$at$($70,$67);var $68 = $71;};return $68;case 'List.nil':var $72 = Maybe$none;return $72;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const List$at = x0=>x1=>List$at$(x0,x1);
  function Nat$show_digit$(_base$1,_n$2){var _m$3 = (_n$2%_base$1);var _base64$4 = List$cons$(48,List$cons$(49,List$cons$(50,List$cons$(51,List$cons$(52,List$cons$(53,List$cons$(54,List$cons$(55,List$cons$(56,List$cons$(57,List$cons$(97,List$cons$(98,List$cons$(99,List$cons$(100,List$cons$(101,List$cons$(102,List$cons$(103,List$cons$(104,List$cons$(105,List$cons$(106,List$cons$(107,List$cons$(108,List$cons$(109,List$cons$(110,List$cons$(111,List$cons$(112,List$cons$(113,List$cons$(114,List$cons$(115,List$cons$(116,List$cons$(117,List$cons$(118,List$cons$(119,List$cons$(120,List$cons$(121,List$cons$(122,List$cons$(65,List$cons$(66,List$cons$(67,List$cons$(68,List$cons$(69,List$cons$(70,List$cons$(71,List$cons$(72,List$cons$(73,List$cons$(74,List$cons$(75,List$cons$(76,List$cons$(77,List$cons$(78,List$cons$(79,List$cons$(80,List$cons$(81,List$cons$(82,List$cons$(83,List$cons$(84,List$cons$(85,List$cons$(86,List$cons$(87,List$cons$(88,List$cons$(89,List$cons$(90,List$cons$(43,List$cons$(47,List$nil))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));var self = ((_base$1>0n)&&(_base$1<=64n));if (self) {var self = List$at$(_m$3,_base64$4);switch(self._){case 'Maybe.some':var $75=self.value;var $76 = $75;var $74 = $76;break;case 'Maybe.none':var $77 = 35;var $74 = $77;break;};var $73 = $74;} else {var $78 = 35;var $73 = $78;};return $73;};
  const Nat$show_digit = x0=>x1=>Nat$show_digit$(x0,x1);
  function Nat$to_string_base$(_base$1,_nat$2){var $79 = List$fold$(Nat$to_base$(_base$1,_nat$2),String$nil,(_n$3=>_str$4=>{var $80 = String$cons$(Nat$show_digit$(_base$1,_n$3),_str$4);return $80;}));return $79;};
  const Nat$to_string_base = x0=>x1=>Nat$to_string_base$(x0,x1);
  function Nat$show$(_n$1){var $81 = Nat$to_string_base$(10n,_n$1);return $81;};
  const Nat$show = x0=>Nat$show$(x0);
  function eql$(_a$1,_b$2){var eql$=(_a$1,_b$2)=>({ctr:'TCO',arg:[_a$1,_b$2]});var eql=_a$1=>_b$2=>eql$(_a$1,_b$2);var arg=[_a$1,_b$2];while(true){let [_a$1,_b$2]=arg;var R=(()=>{var self = _a$1;if (self===0n) {var self = _b$2;if (self===0n) {var $83 = Bool$true;var $82 = $83;} else {var $84=(self-1n);var $85 = Bool$false;var $82 = $85;};return $82;} else {var $86=(self-1n);var self = _b$2;if (self===0n) {var $88 = Bool$false;var $87 = $88;} else {var $89=(self-1n);var $90 = eql$($86,$89);var $87 = $90;};return $87;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const eql = x0=>x1=>eql$(x0,x1);
  const Nat$zero = 0n;
  function gtn$(_a$1,_b$2){var gtn$=(_a$1,_b$2)=>({ctr:'TCO',arg:[_a$1,_b$2]});var gtn=_a$1=>_b$2=>gtn$(_a$1,_b$2);var arg=[_a$1,_b$2];while(true){let [_a$1,_b$2]=arg;var R=(()=>{var self = _a$1;if (self===0n) {var $91 = Bool$false;return $91;} else {var $92=(self-1n);var self = _b$2;if (self===0n) {var $94 = Bool$true;var $93 = $94;} else {var $95=(self-1n);var $96 = gtn$($92,$95);var $93 = $96;};return $93;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const gtn = x0=>x1=>gtn$(x0,x1);
  function smallest$(_xs$1){var smallest$=(_xs$1)=>({ctr:'TCO',arg:[_xs$1]});var smallest=_xs$1=>smallest$(_xs$1);var arg=[_xs$1];while(true){let [_xs$1]=arg;var R=(()=>{var self = _xs$1;switch(self._){case 'List.cons':var $97=self.head;var $98=self.tail;var self = $98;switch(self._){case 'List.cons':var $100=self.head;var $101=self.tail;var self = gtn$($97,$100);if (self) {var $103 = smallest$($98);var $102 = $103;} else {var $104 = smallest$(List$cons$($97,$101));var $102 = $104;};var $99 = $102;break;case 'List.nil':var $105 = $97;var $99 = $105;break;};return $99;case 'List.nil':var $106 = Nat$zero;return $106;};})();if(R.ctr==='TCO')arg=R.arg;else return R;}};
  const smallest = x0=>smallest$(x0);
  function sort_ascending$(_xs$1){var self = _xs$1;switch(self._){case 'List.cons':var $108=self.head;var $109=self.tail;var self = eql$($108,smallest$(_xs$1));if (self) {var $111 = List$cons$($108,sort_ascending$($109));var $110 = $111;} else {var $112 = sort_ascending$(_xs$1);var $110 = $112;};var $107 = $110;break;case 'List.nil':var $113 = List$nil;var $107 = $113;break;};return $107;};
  const sort_ascending = x0=>sort_ascending$(x0);
  const ex_07 = (()=>{var _a$1 = List$cons$(3n,List$cons$(1n,List$cons$(5n,List$cons$(2n,List$nil))));var _b$2 = List$cons$("a",List$cons$("b",List$cons$("c",List$cons$("d",List$nil))));var $114 = List$show$(Nat$show,sort_ascending$(_a$1));return $114;})();
  return {
    'List.cons': List$cons,
    'List.nil': List$nil,
    'String.cons': String$cons,
    'String.concat': String$concat,
    'String.flatten.go': String$flatten$go,
    'String.flatten': String$flatten,
    'List': List,
    'List.pure': List$pure,
    'List.intersperse': List$intersperse,
    'String.intercalate': String$intercalate,
    'List.map': List$map,
    'List.show': List$show,
    'List.fold': List$fold,
    'Bool.true': Bool$true,
    'Bool.false': Bool$false,
    'Nat.lte': Nat$lte,
    'Pair': Pair,
    'Nat.succ': Nat$succ,
    'Nat.sub': Nat$sub,
    'Pair.new': Pair$new,
    'Nat.div_mod.go': Nat$div_mod$go,
    'Nat.div_mod': Nat$div_mod,
    'Nat.to_base.go': Nat$to_base$go,
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
    'eql': eql,
    'Nat.zero': Nat$zero,
    'gtn': gtn,
    'smallest': smallest,
    'sort_ascending': sort_ascending,
    'ex_07': ex_07,
  };
})();
var MAIN=module.exports['ex_07']; try { console.log(JSON.stringify(MAIN,null,2) || '<unprintable>') } catch (e) { console.log(MAIN); };