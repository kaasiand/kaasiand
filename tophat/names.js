
const toCodepointString = c => `U+${c.codePointAt(0).toString(16).padStart(4,0).toUpperCase()}`;
const toCodepointShortLower = c => c.codePointAt(0).toString(16).padStart(4,0);

const gv_ = c => c+" with grave",ac_ = c => c+" with acute",
cx_ = c => c+" with circumflex", td_ = c => c+" with tilde",
di_ = c => c+" with diaeresis",  ri_ = c => c+" with ring above",
cd_ = c => c+" with cedilla",    og_ = c => c+" with ogonek",
st_ = c => c+" with stroke",     hk_ = c => c+" with caron (háček)",
mc_ = c => c+" with macron",     br_ = c => c+" with breve",
da_ = c => c+" with dot above",  db_ = c => c+" with dot below",
md_ = c => c+" with middle dot", aa_ = c => c+" with double acute";

const gac_  = c => [gv_(c),ac_(c),cx_(c)],
gacd_ = c => [gv_(c),ac_(c),cx_(c),di_(c)],
gactd_= c => [gv_(c),ac_(c),cx_(c),td_(c),di_(c)],
aiueo = (...args) => [..."aiueo"].flatMap(c => args.map(d=>d+c)),

// small a, a, small i, i, small u, u, small e, e, small o, o, ka, ga, ki, gi, ku, gu, ke, ge, ko, go, ...

a_lat = "abcdefghijklmnopqrstuvwxyz",
l1sup = ["sharp s",...gactd_("a"),ri_("a"),"ae",cd_("c"),...gacd_("e"),...gacd_("i"),"eth",td_("n"),...gactd_("o"),"",st_("o"),...gacd_("u"),ac_("y"),"thorn",di_("y")],
lex_a = cap => [mc_("a"),br_("a"),og_("a"),ac_("c"),cx_("c"),da_("c"),hk_("c"),hk_("d"),st_("d"),mc_("e"),br_("e"),da_("e"),og_("e"),hk_("e"),cx_("g"),br_("g"),da_("g"),cd_("g"),cx_("h"),st_("h"),td_("i"),mc_("i"),br_("i"),og_("i"),cap?da_("i"):"dotless i","ij",cx_("j"),cd_("k"),"kra",ac_("l"),cd_("l"),hk_("l"),md_("l"),st_("l"),ac_("n"),cd_("n"),hk_("n"),"n preceded by apostrophe","eng",mc_("o"),br_("o"),aa_("o"),"oe",ac_("r"),cd_("r"),hk_("r"),ac_("s"),cx_("s"),cd_("s"),hk_("s"),cd_("t"),hk_("t"),st_("t"),td_("u"),mc_("u"),br_("u"),ri_("u"),aa_("u"),og_("u"),cx_("w"),cx_("y"),di_("y"),ac_("z"),da_("z"),hk_("z"),"long s"],
a_grk = ["alpha","beta","gamma","delta","epsilon","zeta","eta","theta","iota","kappa","lamda","mu","nu","xi","omicron","pi","rho","final sigma","sigma","tau","upsilon","phi","chi","psi","omega"],
gjuon = ktkn => ["double hyphen",...aiueo("small ",""),...aiueo("k","g"),...aiueo("s","z"),"ta","da","ti","di","small tu","tu","du","te","de","to","do",...aiueo("n"),...aiueo(..."hbp"),...aiueo("m"),"small ya","ya","small yu","yu","small yo","yo",...aiueo("r"),"small wa","wa","wi","we","wo","n","vu","small ka","small ke","va","vi","ve","vo","middle dot","prolonged sound mark","iteration mark","voiced iteration mark",ktkn?"digraph koto":"digraph yori"],
jdktn = ["voiced sound mark","semi-voiced sound mark"],
nothing2 = "";

const i_ = str => (() => str),
n_ = (str,arr) => ((ch,anchor) => str.replace("%", arr[ch.codePointAt() - anchor.codePointAt()])),
n2_= (str,arr) => ((ch,anchor) => str.replace("%", arr[(ch.codePointAt() - anchor.codePointAt()) >> 1])),
c_ = str => (ch => str.replace("%", toCodepointShortLower(ch))),
b_ = a => n_("%", a);

const lc = "latin capital letter %",     ls = "latin small letter %",
   ligac = "latin capital ligature %",ligas = "latin small ligature %",
      gc = "greek capital letter %",     gs = "greek small letter %",
   hiral = "hiragana letter %",       katal = "katakana letter %",
    hira = "hiragana %",               kata = "katakana %",
    hrkt = "katakana-hiragana %",     chrkt = "combining katakana-hiragana %"
pdaqm = "-pointing double angle quotation mark", paqm  = "-pointing angle quotation mark",
vf_ = "vulgar fraction ", qm_ = " quotation mark", dpt_= " dot punctuation",

ascii0 = ["space","exclamation mark","quotation mark","number sign","dollar sign","percent sign","ampersand","apostrophe","left parenthesis","right parenthesis","asterisk","plus sign","comma","hyphen-minus","full stop","solidus","digit zero","digit one","digit two","digit three","digit four","digit five","digit six","digit seven","digit eight","digit nine","colon","semicolon","less-than sign","equals sign","greater-than sign","question mark","commercial at"],
ascii1 = ["left square bracket","reverse solidus","right square bracket","circumflex accent","low line","grave accent"],
ascii2 = ["left curly bracket","vertical line","right curly bracket","tilde"],
l1supp = ["multiplication sign","division sign","no-break space","inverted exclamation mark","cent sign","pound sign","currency sign","yen sign","broken bar","section sign","diaeresis","copyright sign","feminine ordinal indicator","left"+pdaqm,"not sign","soft hyphen","registered sign","macron","degree sign","plus-minus sign","superscript two","superscript three","acute accent","micro sign","pilcrow sign","middle dot","cedilla","superscript one","masculine ordinal indicator","right"+pdaqm,vf_+"one quarter",vf_+"one half",vf_+"three quarters", "inverted question mark"],
g_punc = ["en quad","em quad","en space","em space","three-per-em space","four-per-em space","six-per-em space","figure space","punctuation space","thin space","hair space","zero width space","zero width non-joiner","zero width joiner",,,"hyphen","non-breaking hyphen","figure dash","en dash","em dash","horizontal bar","double vertical line","double low line","left single"+qm_,"right single"+qm_,"single low-9"+qm_,"single high-reversed-9"+qm_,"left double"+qm_,"right double"+qm_,"double low-9"+qm_,"double high-reversed-9"+qm_,"dagger","double dagger","bullet","triangular bullet","one dot leader","two dot leader","horizontal ellipsis","hyphenation point",,,,,,,,"narrow no-break space","per mille sign","per ten thousand sign","prime","double prime","triple prime","reversed prime","reversed double prime","reversed triple prime","caret","single left"+paqm,"single right"+paqm,"reference mark","double exclamation mark","interrobang","overline","undertie","character tie","caret insertion point","asterism","hyphen bullet","fraction slash","left square bracket with quill","right square bracket with quill","double question mark","question exclamation mark","exclamation question mark","tironian sign et","reversed pilcrow sign","black leftwards bullet","black rightwards bullet","low asterisk","reversed semicolon","close up","two asterisks aligned vertically","commercial minus sign","swung dash","inverted undertie","flower punctuation mark","three"+dpt_,"quadruple prime","four"+dpt_,"five"+dpt_,"two"+dpt_,"four dot mark","dotted cross","tricolon","vertical four dots","medium mathematical space","word joiner"],
nothing = ""; // so the prev line can end in a comma for easy line duplication

// i_(str) creates a string-constant function, i.e. i_("abc")() returns "abc"
// n_("STRING %", array) creates a function n_(..)(g,a) which returns `STRING ${array[g - a]}` (subtraction as codepoints)
// n2_(..) does the same thing but floor-divides the codepoint subtraction by 2 (useful for ĀāĂă.. character layout)
// b_(array) is a shorthand for n_("%", array)
// c_("STRING %") creates a function c_(..)(g) which returns "STRING xxxx" with xxxx being the codepoint of parameter g
const gn = {
    emptystr: i_(""),

    ascii_00: b_(ascii0),
    ascii_01: b_(ascii1),
    ascii_02: b_(ascii2),
    ltncapit: n_(lc, a_lat), ltnsmall: n_(ls, a_lat),

    lat1supp: b_(l1supp),
    lat1supc: n_(lc, l1sup), lat1sups: n_(ls, l1sup),

    // ltn ext A
    lex_a_c0: n2_(   lc,lex_a(1)), lex_a_s0: n2_(   ls,lex_a(0)),
    lex_a_c1: n2_(ligac,lex_a(1)), lex_a_s1: n2_(ligas,lex_a(0)),

    grkcapit: n_(gc, a_grk),
    grksmall: n_(gs, a_grk),

    gen_punc: b_(g_punc),

    // hiragana, katakana
    hrgnlett: n_(hiral,gjuon()), ktknlett: n_(katal,gjuon()),
    hiragana: n_( hira,gjuon(0)),katakana: n_( kata,gjuon(1)),
    ktknhrgn: n_( hrkt,gjuon()), kthrdktn: n_( hrkt,jdktn),
    combdktn: n_(chrkt,jdktn),

    cjk_ideo: c_("cjk unified ideograph-%"),
}
const gn_f = { // french
    //
}

function isCJKUnifIdeo(cp) {
    if (cp >= 0x3400 && cp <= 0x4DBF) return true;
    if (cp >= 0x4E00 && cp <= 0x9FFF) return true;

    return false;
}

function getGlyphName(g) {
    let n = language == "fr" ? gn_f : gn;
    let cp = g.codePointAt(); // codepoint
    let a = ""; // anchor
    let fn = "emptystr";
    let odd = cp & 1;
    gb: {
        if (isCJKUnifIdeo(cp)) { fn = "cjk_ideo"; break gb; }
        if (cp <= 0x7E) { // basic latin
            if (cp <= 0x40) { fn = "ascii_00"; a = " "; break gb; } if (cp <= 0x5A) { fn = "ltncapit"; a = "A"; break gb; }
            if (cp <= 0x60) { fn = "ascii_01"; a = "["; break gb; } if (cp <= 0x7A) { fn = "ltnsmall"; a = "a"; break gb; }
                              fn = "ascii_02"; a = "{"; break gb;
        }
        if (cp <= 0xFF) { // latin 1 supp
            if (cp == 0xD7) { fn = "lat1supp"; a = "×"; break gb; } if (cp == 0xF7) { fn = "lat1supp"; a = "ö"; break gb; }
            if (cp <= 0xBF) { fn = "lat1supp"; a="\x9e";break gb; } if (cp <= 0xDE) { fn = "lat1supc"; a = "¿"; break gb; }
                              fn = "lat1sups"; a = "ß"; break gb;
        }
        if (cp <= 0x17F) { // latin ext A
            if (cp == 0x132)        { fn = "lex_a_c1"; a = "Ā"; break gb; } if (cp == 0x133)        { fn = "lex_a_s1"; a = "ā"; break gb; }
            if (cp <= 0x137 && odd) { fn = "lex_a_s0"; a = "ā"; break gb; } if (cp <= 0x137)        { fn = "lex_a_c0"; a = "Ā"; break gb; }
            if (cp <= 0x148 && odd) { fn = "lex_a_c0"; a = "ÿ"; break gb; } if (cp <= 0x148)        { fn = "lex_a_s0"; a = "Ā"; break gb; }
            if (cp == 0x152)        { fn = "lex_a_c1"; a = "þ"; break gb; } if (cp == 0x153)        { fn = "lex_a_s1"; a = "ÿ"; break gb; }
            if (cp <= 0x178 && odd) { fn = "lex_a_s0"; a = "ÿ"; break gb; } if (cp <= 0x178)        { fn = "lex_a_c0"; a = "þ"; break gb; }
            if (cp <= 0x17D && odd) { fn = "lex_a_c0"; a = "ý"; break gb; }                           fn = "lex_a_s0"; a = "ý"; break gb;
        }
        if (cp <= 0x3FF) { // greek and coptic
            if (cp <= 0x390) { /* fn = "lat1supp"; a = "\u009e"; */ break gb; }
            if (cp <= 0x3A9) { fn = "grkcapit"; a = "Α"; break gb; }
            if (cp <= 0x3B0) { /* fn = "lat1supc"; a = "¿"; */ break gb; }
            if (cp <= 0x3C9) { fn = "grksmall"; a = "α"; break gb; }
                               break gb;//fn = "lat1sups"; a = "ß"; break gb;
        }
        if (cp < 0x2000) break gb;
        
        if (cp <= 0x2060 && cp >= 0x2000) { fn = "gen_punc"; a = " "; break gb; }

        if (cp < 0x3040) break gb;

        if (cp <= 0x30FF) { // hiragana, katakana
            if (cp <= 0x3096) { fn = "hrgnlett"; a = "぀"; break gb; }
            if (cp <= 0x309A) { fn = "combdktn"; a = "゙"; break gb; }
            if (cp <= 0x309C) { fn = "kthrdktn"; a = "゛"; break gb; }
            if (cp <= 0x309F) { fn = "hiragana"; a = "぀"; break gb; }
            if (cp == 0x30A0) { fn = "ktknhrgn"; a = "゠"; break gb; }
            if (cp == 0x30FC) { fn = "ktknhrgn"; a = "゠"; break gb; }
            if (cp <= 0x30FA) { fn = "ktknlett"; a = "゠"; break gb; }
                                fn = "katakana"; a = "゠"; break gb;
        }
    }
    return n[fn](g,a) ?? "";
}

