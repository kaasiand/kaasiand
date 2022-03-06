const supportedLanguages = ["en-US", "fr", "jp"];
let language = supportedLanguages[0];

const groupComponents = {
    tagged_r: { chars: "", name: "", nameEN: "Red",   nameFR: "Rouge", nameJP: "赤" },
    tagged_y: { chars: "", name: "", nameEN: "Yellow",nameFR: "Jaune", nameJP: "黄色" },
    tagged_g: { chars: "", name: "", nameEN: "Green", nameFR: "Vert",  nameJP: "緑" },
    tagged_b: { chars: "", name: "", nameEN: "Blue",  nameFR: "Bleu",  nameJP: "青" },
    
    // Ponctuation et symboles ASCII
    // Opérateur mathématique ASCII
    // Ponctuation ASCII
    // Chiffres ASCII
    // Ponctuation ASCII
    // Opérateurs mathématiques ASCII
    // Alphabet majuscule latin
    // Ponctuation et symboles ASCII
    // Alphabet minuscule latin
    // Ponctuation et symboles ASCII


    basiclatin: { first: 0x0020,last: 0x007E, nameEN: "Basic Latin",         nameFR: "Latin de base",           nameJP: "基本ラテン文字"},
    latin1supp: { first: 0x00A0,last: 0x00FF, nameEN: "Latin-1 Supplement",  nameFR: "Supplément latin-1",      nameJP: "ラテン1補助"},
    latinext_a: { first: 0x0100,last: 0x017F, nameEN: "Latin Extended-A",    nameFR: "Latin étendu A",          nameJP: "ラテン文字拡張A"},
    latinext_b: { first: 0x0180,last: 0x024F, nameEN: "Latin Extended-B",    nameFR: "Latin étendu B",          nameJP: "ラテン文字拡張B"},
    ipa_ext:    { first: 0x0250,last: 0x02AF, nameEN: "IPA Extensions",      nameFR: "Supplément pour l'API",   nameJP: "IPA拡張"},
    spacingmod: { first: 0x02B0,last: 0x02FF, nameEN: "Spacing Modifier Letters",    nameFR: "Lettres modificatives à chasse", nameJP: "前進を伴う修飾文字"},
    comb_diacr: { first: 0x0300,last: 0x036F, nameEN: "Combining Diacritical Marks", nameFR: "Diacritiques",    nameJP: "合成可能なダイアクリティカルマーク"},
    greek_copt: { chars: "ͰͱͲͳʹ͵Ͷͷͺͻͼͽ;Ϳ΄΅Ά·ΈΉΊΌΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿ", nameEN: "Greek and Coptic",  nameFR: "Grec et copte", nameJP: "ギリシア文字及びコプト文字"},
    cyrillic:   { first: 0x0400,last: 0x04FF, nameEN: "Cyrillic",            nameFR: "Cyrillique",              nameJP: "キリル文字"},
    cyril_supp: { first: 0x0500,last: 0x052F, nameEN: "Cyrillic Supplement", nameFR: "Cyrillique – supplément", nameJP: "キリル文字補助"},
    armenian:   { chars: "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖՙ՚՛՜՝՞՟ՠաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆևֈ։֊֍֎֏", nameEN: "Armenian", nameFR: "Arménien", nameJP: "アルメニア文字"},
    hebrew:     { chars: "ְֱֲֳִֵֶַָֹֺֻּֽ֑֖֛֢֣֤֥֦֧֪֚֭֮֒֓֔֕֗֘֙֜֝֞֟֠֡֨֩֫֬֯־ֿ׀ׁׂ׃ׅׄ׆ׇאבגדהוזחטיךכלםמןנסעףפץצקרשתׯװױײ׳״", nameEN: "Hebrew",    nameFR: "Hébreu",                  nameJP: "ヘブライ文字"},
    arabic:     { first: 0x0600,last: 0x06FF, nameEN: "Arabic",              nameFR: "Arabe",                   nameJP: "アラビア文字"},
    syriac:     { chars: "܀܁܂܃܄܅܆܇܈܉܊܋܌܍܏ܐܑܒܓܔܕܖܗܘܙܚܛܜܝܞܟܠܡܢܣܤܥܦܧܨܩܪܫܬܭܮܯܱܴܷܸܹܻܼܾ݂݄݆݈ܰܲܳܵܶܺܽܿ݀݁݃݅݇݉݊ݍݎݏ",    nameEN: "Syriac",nameFR:"Syriaque",nameJP: "シリア文字"},
    arabic_sup: { first: 0x0750,last: 0x077F, nameEN: "Arabic Supplement",   nameFR: "Arabe – supplément",      nameJP: "アラビア文字補助"},
    thaana:     { first: 0x0780,last: 0x07B1, nameEN: "Thaana",              nameFR: "Thâna",                   nameJP: "ターナ文字"},
    nko:        { chars: "߀߁߂߃߄߅߆߇߈߉ߊߋߌߍߎߏߐߑߒߓߔߕߖߗߘߙߚߛߜߝߞߟߠߡߢߣߤߥߦߧߨߩߪ߲߫߬߭߮߯߰߱߳ߴߵ߶߷߸߹ߺ߽߾߿", nameEN: "NKo",        nameFR: "N’ko",       nameJP: "ンコ文字"},
    samaritan:  { chars: "ࠀࠁࠂࠃࠄࠅࠆࠇࠈࠉࠊࠋࠌࠍࠎࠏࠐࠑࠒࠓࠔࠕࠖࠗ࠘࠙ࠚࠛࠜࠝࠞࠟࠠࠡࠢࠣࠤࠥࠦࠧࠨࠩࠪࠫࠬ࠭࠰࠱࠲࠳࠴࠵࠶࠷࠸࠹࠺࠻࠼࠽࠾",          nameEN: "Samaritan",  nameFR: "Samaritain", nameJP: "サマリア文字"},
    mandaic:    { chars: "ࡀࡁࡂࡃࡄࡅࡆࡇࡈࡉࡊࡋࡌࡍࡎࡏࡐࡑࡒࡓࡔࡕࡖࡗࡘ࡙࡚࡛࡞", nameEN: "Mandaic",   nameFR: "Mandéen",                 nameJP: "マンダ文字"},
    syriac_sup: { first: 0x0860,last: 0x086A, nameEN: "Syriac Supplement",   nameFR: "Supplément syriaque",     nameJP: "シリア文字拡張"},
    arabic_x_b: { chars: "ࡰࡱࡲࡳࡴࡵࡶࡷࡸࡹࡺࡻࡼࡽࡾࡿࢀࢁࢂࢃࢄࢅࢆࢇ࢈ࢉࢊࢋࢌࢍࢎ࢐࢑࢙࢚࢛࢘࢜࢝࢞࢟", nameEN: "Arabic Extended-B", nameFR: "Arabe étendu B", nameJP: "アラビア文字拡張B"},
    arabic_x_a: { first: 0x08A0,last: 0x08FF, nameEN: "Arabic Extended-A",   nameFR: "Arabe étendu A",          nameJP: "アラビア文字拡張A"},
    devanagari: { first: 0x0900,last: 0x097F, nameEN: "Devanagari",          nameFR: "Dévanâgarî",              nameJP: "デーヴァナーガリー文字"},
    bengali:    { chars: "ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻ৼ৽৾",                  nameEN: "Bengali",  nameFR: "Bengali",    nameJP: "ベンガル文字"},
    gurmukhi:   { chars: "ਁਂਃਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹ਼ਾਿੀੁੂੇੈੋੌ੍ੑਖ਼ਗ਼ਜ਼ੜਫ਼੦੧੨੩੪੫੬੭੮੯ੰੱੲੳੴੵ੶",                                  nameEN: "Gurmukhi", nameFR: "Gourmoukhî", nameJP: "グルムキー文字"},
    gujarati:   { chars: "ઁંઃઅઆઇઈઉઊઋઌઍએઐઑઓઔકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલળવશષસહ઼ઽાિીુૂૃૄૅેૈૉોૌ્ૐૠૡૢૣ૦૧૨૩૪૫૬૭૮૯૰૱ૹૺૻૼ૽૾૿",                                        nameEN: "Gujarati", nameFR: "Goudjarati", nameJP: "グジャラート文字"},
    oriya:      { chars: "ଁଂଃଅଆଇଈଉଊଋଌଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହ଼ଽାିୀୁୂୃୄେୈୋୌ୍୕ୖୗଡ଼ଢ଼ୟୠୡୢୣ୦୧୨୩୪୫୬୭୮୯୰ୱ୲୳୴୵୶୷",         nameEN: "Oriya",    nameFR: "Oriya",      nameJP: "オリヤー文字"},
    tamil:      { chars: "ஂஃஅஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரறலளழவஶஷஸஹாிீுூெேைொோௌ்ௐௗ௦௧௨௩௪௫௬௭௮௯௰௱௲௳௴௵௶௷௸௹௺", nameEN: "Tamil",    nameFR: "Tamoul",     nameJP: "タミル文字"},
    telugu:     { chars: "ఀఁంఃఄఅఆఇఈఉఊఋఌఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళఴవశషసహ఼ఽాిీుూృౄెేైొోౌ్ౕౖౘౙౚౝౠౡౢౣ౦౧౨౩౪౫౬౭౮౯౷౸౹౺౻౼౽౾౿",     nameEN: "Telugu",   nameFR: "Télougou",   nameJP: "テルグ文字"},
    kannada:    { chars: "ಀಁಂಃ಄ಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹ಼ಽಾಿೀುೂೃೄೆೇೈೊೋೌ್ೕೖೝೞೠೡೢೣ೦೧೨೩೪೫೬೭೮೯ೱೲ",        nameEN: "Kannada",  nameFR: "Kannara",    nameJP: "カンナダ文字"},
    malayalam:  { chars: "ഀഁംഃഄഅആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനഩപഫബഭമയരറലളഴവശഷസഹഺ഻഼ഽാിീുൂൃൄെേൈൊോൌ്ൎ൏ൔൕൖൗ൘൙൚൛൜൝൞ൟൠൡൢൣ൦൧൨൩൪൫൬൭൮൯൰൱൲൳൴൵൶൷൸൹ൺൻർൽൾൿ", nameEN: "Malayalam", nameFR: "Malayalam", nameJP: "マラヤーラム文字"},
    sinhala:    { chars: "ඁංඃඅආඇඈඉඊඋඌඍඎඏඐඑඒඓඔඕඖකඛගඝඞඟචඡජඣඤඥඦටඨඩඪණඬතථදධනඳපඵබභමඹයරලවශෂසහළෆ්ාැෑිීුූෘෙේෛොෝෞෟ෦෧෨෩෪෫෬෭෮෯ෲෳ෴",                    nameEN: "Sinhala",  nameFR: "Singhalais", nameJP: "シンハラ文字"},
    thai:       { chars: "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛",                                     nameEN: "Thai",     nameFR: "Thaï",       nameJP: "タイ文字"},
    lao:        { chars: "ກຂຄຆງຈຉຊຌຍຎຏຐຑຒຓດຕຖທຘນບປຜຝພຟຠມຢຣລວຨຩສຫຬອຮຯະັາຳິີຶື຺ຸູົຼຽເແໂໃໄໆ່້໊໋໌ໍ໐໑໒໓໔໕໖໗໘໙ໜໝໞໟ",                                            nameEN: "Lao",      nameFR: "Lao",        nameJP: "ラオス文字"},
    tibetan:    { chars: "ༀ༁༂༃༄༅༆༇༈༉༊་༌།༎༏༐༑༒༓༔༕༖༗༘༙༚༛༜༝༞༟༠༡༢༣༤༥༦༧༨༩༪༫༬༭༮༯༰༱༲༳༴༵༶༷༸༹༺༻༼༽༾༿ཀཁགགྷངཅཆཇཉཊཋཌཌྷཎཏཐདདྷནཔཕབབྷམཙཚཛཛྷཝཞཟའཡརལཤཥསཧཨཀྵཪཫཬཱཱཱིིུུྲྀཷླྀཹེཻོཽཾཿ྄ཱྀྀྂྃ྅྆྇ྈྉྊྋྌྍྎྏྐྑྒྒྷྔྕྖྗྙྚྛྜྜྷྞྟྠྡྡྷྣྤྥྦྦྷྨྩྪྫྫྷྭྮྯྰྱྲླྴྵྶྷྸྐྵྺྻྼ྾྿࿀࿁࿂࿃࿄࿅࿆࿇࿈࿉࿊࿋࿌࿎࿏࿐࿑࿒࿓࿔࿕࿖࿗࿘࿙࿚", nameEN: "Tibetan", nameFR: "Tibétain", nameJP: "チベット文字"},
    myanmar:    { first: 0x1000,last: 0x109F, nameEN: "Myanmar",             nameFR: "Birman",                  nameJP: "ビルマ文字"},
    // georgian    Georgian             Géorgien              グルジア文字
    // hanguljamo  Hangul Jamo          Jamos hangûl          ハングル字母
    // ethiopic    Ethiopic             Éthiopien             エチオピア文字
    // ethiopic_s  Ethiopic Supplement  Supplément éthiopien  エチオピア文字補助
    // cherokee    Cherokee             Chérokie              チェロキー文字
    // u_c_ab_syl  Unified Canadian Aboriginal Syllabics  Syllabaires autochtones canadiens  統合カナダ先住民文字
    // ogham       Ogham                Ogam                  オガム文字
    // runic       Runic                Runes                 ルーン文字
    // tagalog     Tagalog              Tagalog               タガログ文字
    // hanunoo     Hanunoo              Hanounóo              ハヌノオ文字
    // buhid       Buhid                Bouhid                ブヒッド文字
    // tagbanwa    Tagbanwa             Tagbanoua             タグバヌア文字
    // khmer       Khmer                Khmer                 クメール文字
    // mongolian   Mongolian            Mongol                モンゴル文字
    // u_c_ab_s_x  Unified Canadian Aboriginal Syllabics Extended  Syllabaires autochtones canadiens étendus  統合カナダ先住民文字拡張
    // limbu       Limbu                Limbu                 リンブ文字
    // tai_le      Tai Le               Taï-le                タイ・ナ文字
    // new_tai_lu  New Tai Lue          Nouveau taï lü        新タイロ文字
    // khmer_symb  Khmer Symbols        Symboles khmers       クメール文字用記号
    // buginese    Buginese             Bougui                ブギス文字
    // tai_tham    Tai Tham             Taï-tham              タイタム文字
    // com_di_m_x  Combining Diacritical Marks Extended  Diacritiques complémentaires  合成可能なダイアクリティカルマーク拡張
    // balinese    Balinese             Balinais              バリ文字
    // sundanese   Sundanese            Soundanais            スンダ文字
    // batak       Batak                Batak                 バタク文字
    // lepcha      Lepcha               Leptcha               レプチャ文字
    // ol_chiki    Ol Chiki             Ol tchiki             オルチキ文字
    // cyrl_ext_c  Cyrillic Extended-C  Cyrillique étendu C   キリル文字拡張C

    cjksympunc: { first: 0x3000,last: 0x303F, nameEN: "CJK Symbols and Punctuation", nameFR: "Symboles et ponctuation CJC", nameJP: "CJKの記号及び句読点"},
    hiragana:   { chars: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゙゚゛゜ゝゞゟ", nameEN: "Hiragana", nameFR: "Hiragana", nameJP: "平仮名"},
    katakana:   { first: 0x30A0,last: 0x30FF, nameEN: "Katakana", nameFR: "Katakana", nameJP: "片仮名"},
    bopomofo:   { first: 0x3105,last: 0x312F, nameEN: "Bopomofo", nameFR: "Bopomofo", nameJP: "注音字母"},
    hangul_c_j: { first: 0x3131,last: 0x318E, nameEN: "Hangul Compatibility Jamo",nameFR: "Jamos hangûl de compatibilité", nameJP: "ハングル互換字母"},
    kanbun:     { first: 0x3190,last: 0x319F, nameEN: "Kanbun",              nameFR: "Kanboun",           nameJP: "漢文用記号"},
    bopomofo_x: { first: 0x31A0,last: 0x31BF, nameEN: "Bopomofo Extended",   nameFR: "Bopomofo étendu",   nameJP: "注音字母拡張"},
    cjk_stroke: { first: 0x31C0,last: 0x31E3, nameEN: "CJK Strokes",         nameFR: "Traits CJC",        nameJP: "CJKの筆画"},
    katakana_x: { first: 0x31F0,last: 0x31FF, nameEN: "Katakana Phonetic Extensions", nameFR: "Supplément phonétique katakana", nameJP: "片仮名拡張"},
    enclos_cjk: { chars: "㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛㈜㈝㈞㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩㈪㈫㈬㈭㈮㈯㈰㈱㈲㈳㈴㈵㈶㈷㈸㈹㈺㈻㈼㈽㈾㈿㉀㉁㉂㉃㉄㉅㉆㉇㉈㉉㉊㉋㉌㉍㉎㉏㉐㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㉠㉡㉢㉣㉤㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉰㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻㉼㉽㉾㉿㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉㊊㊋㊌㊍㊎㊏㊐㊑㊒㊓㊔㊕㊖㊗㊘㊙㊚㊛㊜㊝㊞㊟㊠㊡㊢㊣㊤㊥㊦㊧㊨㊩㊪㊫㊬㊭㊮㊯㊰㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿㋀㋁㋂㋃㋄㋅㋆㋇㋈㋉㋊㋋㋌㋍㋎㋏㋐㋑㋒㋓㋔㋕㋖㋗㋘㋙㋚㋛㋜㋝㋞㋟㋠㋡㋢㋣㋤㋥㋦㋧㋨㋩㋪㋫㋬㋭㋮㋯㋰㋱㋲㋳㋴㋵㋶㋷㋸㋹㋺㋻㋼㋽㋾㋿", nameEN: "Enclosed CJK Letters and Months", nameFR: "Lettres et mois CJC délimités", nameJP: "囲みCJK文字・月"},
    cjk_compat: { first: 0x3300,last: 0x33FF, nameEN: "CJK Compatibility",   nameFR:"Compatibilité CJC",  nameJP: "CJK互換用文字"},
    
    
    cjk_rxa_01:{first:0x3400,last:0x3402,name:"一"},cjk_rxa_02:{first:0x3403,last:0x3404,name:"丨"},                                           　   cjk_rxa_04:{first:0x3405,last:0x3406,name:"丿"},cjk_rxa_05:{first:0x3407,last:0x3426,name:"乙"},cjk_rxa_06:{first:0x3427,last:0x3428,name:"亅"},cjk_rxa_07:{first:0x3429,last:0x3429,name:"二"},cjk_rxa_08:{first:0x342A,last:0x342F,name:"亠"},cjk_rxa_09:{first:0x3430,last:0x34AA,name:"人"},cjk_rxa_10:{first:0x34AB,last:0x34AF,name:"儿"},cjk_rxa_11:{first:0x34B0,last:0x34B4,name:"入"},cjk_rxa_12:{first:0x34B5,last:0x34B9,name:"八"},cjk_rxa_13:{first:0x34BA,last:0x34BF,name:"冂"},cjk_rxa_14:{first:0x34C0,last:0x34C4,name:"冖"},cjk_rxa_15:{first:0x34C5,last:0x34D7,name:"冫"},cjk_rxa_16:{first:0x34D8,last:0x34D8,name:"几"},cjk_rxa_17:{first:0x34D9,last:0x34D9,name:"凵"},cjk_rxa_18:{first:0x34DA,last:0x3512,name:"刀"},cjk_rxa_19:{first:0x3513,last:0x3527,name:"力"},cjk_rxa_20:{first:0x3528,last:0x352A,name:"勹"},cjk_rxa_21:{first:0x352B,last:0x352E,name:"匕"},cjk_rxa_22:{first:0x352F,last:0x3536,name:"匚"},cjk_rxa_23:{first:0x3537,last:0x3538,name:"匸"},cjk_rxa_24:{first:0x3539,last:0x353C,name:"十"},cjk_rxa_25:{first:0x353D,last:0x353D,name:"卜"},cjk_rxa_26:{first:0x353E,last:0x3541,name:"卩"},cjk_rxa_27:{first:0x3542,last:0x3554,name:"厂"},cjk_rxa_28:{first:0x3555,last:0x3559,name:"厶"},cjk_rxa_29:{first:0x355A,last:0x3562,name:"又"},cjk_rxa_30:{first:0x3563,last:0x361C,name:"口"},cjk_rxa_31:{first:0x361D,last:0x3625,name:"囗"},cjk_rxa_32:{first:0x3626,last:0x3682,name:"土"},cjk_rxa_33:{first:0x3683,last:0x3684,name:"士"},cjk_rxa_34:{first:0x3685,last:0x3685,name:"夂"},cjk_rxa_35:{first:0x3686,last:0x3687,name:"夊"},cjk_rxa_36:{first:0x3688,last:0x368D,name:"夕"},
    cjk_rxa_37:{first:0x368E,last:0x36A1,name:"大"},cjk_rxa_38:{first:0x36A2,last:0x373C,name:"女"},cjk_rxa_39:{first:0x373D,last:0x3748,name:"子"},cjk_rxa_40:{first:0x3749,last:0x3772,name:"宀"},cjk_rxa_41:{first:0x3773,last:0x3777,name:"寸"},cjk_rxa_42:{first:0x3778,last:0x377B,name:"小"},cjk_rxa_43:{first:0x377C,last:0x378A,name:"尢"},cjk_rxa_44:{first:0x378B,last:0x37A1,name:"尸"},cjk_rxa_45:{first:0x37A2,last:0x37A3,name:"屮"},cjk_rxa_46:{first:0x37A4,last:0x3828,name:"山"},cjk_rxa_47:{first:0x3829,last:0x3829,name:"巛"},cjk_rxa_48:{first:0x382A,last:0x382E,name:"工"},cjk_rxa_49:{first:0x382F,last:0x3831,name:"己"},cjk_rxa_50:{first:0x3832,last:0x386A,name:"巾"},                                           　   cjk_rxa_52:{first:0x386B,last:0x386E,name:"幺"},cjk_rxa_53:{first:0x386F,last:0x389E,name:"广"},cjk_rxa_54:{first:0x389F,last:0x38A0,name:"廴"},cjk_rxa_55:{first:0x38A1,last:0x38A3,name:"廾"},cjk_rxa_56:{first:0x38A4,last:0x38A6,name:"弋"},cjk_rxa_57:{first:0x38A7,last:0x38C6,name:"弓"},cjk_rxa_58:{first:0x38C7,last:0x38C8,name:"彐"},cjk_rxa_59:{first:0x38C9,last:0x38D3,name:"彡"},cjk_rxa_60:{first:0x38D4,last:0x38F9,name:"彳"},cjk_rxa_61:{first:0x38FA,last:0x39AD,name:"心"},cjk_rxa_62:{first:0x39AE,last:0x39BD,name:"戈"},cjk_rxa_63:{first:0x39BE,last:0x39C2,name:"戶"},cjk_rxa_64:{first:0x39C3,last:0x3A79,name:"手"},cjk_rxa_65:{first:0x3A7A,last:0x3A7E,name:"支"},cjk_rxa_66:{first:0x3A7F,last:0x3AAE,name:"攴"},cjk_rxa_67:{first:0x3AAF,last:0x3AB1,name:"文"},cjk_rxa_68:{first:0x3AB2,last:0x3ABB,name:"斗"},cjk_rxa_69/*nice*/:{first:0x3ABC,last:0x3AC2,name:"斤"},cjk_rxa_70:{first:0x3AC3,last:0x3ACF,name:"方"},                                   　   cjk_rxa_72:{first:0x3AD0,last:0x3B2F,name:"日"},
    cjk_rxa_73:{first:0x3B30,last:0x3B32,name:"曰"},cjk_rxa_74:{first:0x3B33,last:0x3B40,name:"月"},cjk_rxa_75:{first:0x3B41,last:0x3C1C,name:"木"},cjk_rxa_76:{first:0x3C1D,last:0x3C4E,name:"欠"},cjk_rxa_77:{first:0x3C4F,last:0x3C58,name:"止"},cjk_rxa_78:{first:0x3C59,last:0x3C7B,name:"歹"},cjk_rxa_79:{first:0x3C7C,last:0x3C8A,name:"殳"},                                           　   cjk_rxa_81:{first:0x3C8B,last:0x3C8B,name:"比"},cjk_rxa_82:{first:0x3C8C,last:0x3CB2,name:"毛"},cjk_rxa_83:{first:0x3CB3,last:0x3CB3,name:"氏"},cjk_rxa_84:{first:0x3CB4,last:0x3CB7,name:"气"},cjk_rxa_85:{first:0x3CB8,last:0x3DA0,name:"水"},cjk_rxa_86:{first:0x3DA1,last:0x3E11,name:"火"},cjk_rxa_87:{first:0x3E12,last:0x3E15,name:"爪"},cjk_rxa_88:{first:0x3E16,last:0x3E19,name:"父"},cjk_rxa_89:{first:0x3E1A,last:0x3E1A,name:"爻"},cjk_rxa_90:{first:0x3E1B,last:0x3E1C,name:"爿"},cjk_rxa_91:{first:0x3E1D,last:0x3E25,name:"片"},cjk_rxa_92:{first:0x3E26,last:0x3E27,name:"牙"},cjk_rxa_93:{first:0x3E28,last:0x3E5B,name:"牛"},cjk_rxa_94:{first:0x3E5C,last:0x3EA7,name:"犬"},                                           　   cjk_rxa_96:{first:0x3EA8,last:0x3F08,name:"玉"},cjk_rxa_97:{first:0x3F09,last:0x3F16,name:"瓜"},cjk_rxa_98:{first:0x3F17,last:0x3F4C,name:"瓦"},cjk_rxa_99:{first:0x3F4D,last:0x3F51,name:"甘"},cjk_rxa_A0:{first:0x3F52,last:0x3F54,name:"生"},                                           　   cjk_rxa_A2:{first:0x3F55,last:0x3F6F,name:"田"},cjk_rxa_A3:{first:0x3F70,last:0x3F70,name:"疋"},cjk_rxa_A4:{first:0x3F71,last:0x3FDC,name:"疒"},                                           　   cjk_rxa_A6:{first:0x3FDD,last:0x3FE9,name:"白"},cjk_rxa_A7:{first:0x3FEA,last:0x3FFA,name:"皮"},cjk_rxa_A8:{first:0x3FEB,last:0x400D,name:"皿"},
    cjk_rxa_A9:{first:0x400E,last:0x4085,name:"目"},cjk_rxa_B0:{first:0x4086,last:0x408E,name:"矛"},cjk_rxa_B1:{first:0x408F,last:0x4095,name:"矢"},cjk_rxa_B2:{first:0x4096,last:0x40FB,name:"石"},cjk_rxa_B3:{first:0x40FC,last:0x4125,name:"示"},                                           　   cjk_rxa_B5:{first:0x4126,last:0x4190,name:"禾"},cjk_rxa_B6:{first:0x4191,last:0x41C1,name:"穴"},cjk_rxa_B7:{first:0x41C2,last:0x41D5,name:"立"},cjk_rxa_B8:{first:0x41D6,last:0x4279,name:"竹"},cjk_rxa_B9:{first:0x427A,last:0x42B4,name:"米"},cjk_rxa_C0:{first:0x42B5,last:0x4341,name:"糸"},cjk_rxa_C1:{first:0x4342,last:0x434E,name:"缶"},cjk_rxa_C2:{first:0x434F,last:0x4366,name:"网"},cjk_rxa_C3:{first:0x4367,last:0x437D,name:"羊"},cjk_rxa_C4:{first:0x437E,last:0x439A,name:"羽"},cjk_rxa_C5:{first:0x439B,last:0x439E,name:"老"},cjk_rxa_C6:{first:0x439F,last:0x43A1,name:"而"},cjk_rxa_C7:{first:0x43A2,last:0x43B1,name:"耒"},cjk_rxa_C8:{first:0x43B2,last:0x43CA,name:"耳"},cjk_rxa_C9:{first:0x43CB,last:0x43CB,name:"聿"},cjk_rxa_D0:{first:0x43CC,last:0x444F,name:"肉"},cjk_rxa_D1:{first:0x4450,last:0x4451,name:"臣"},                                           　   cjk_rxa_D3:{first:0x4452,last:0x4453,name:"至"},cjk_rxa_D4:{first:0x4454,last:0x4458,name:"臼"},cjk_rxa_D5:{first:0x4459,last:0x445C,name:"舌"},cjk_rxa_D6:{first:0x445D,last:0x445F,name:"舛"},cjk_rxa_D7:{first:0x4460,last:0x4489,name:"舟"},                                           　   cjk_rxa_D9:{first:0x448A,last:0x4490,name:"色"},cjk_rxa_E0:{first:0x4491,last:0x4587,name:"艸"},cjk_rxa_E1:{first:0x4588,last:0x459C,name:"虍"},cjk_rxa_E2:{first:0x459D,last:0x460E,name:"虫"},cjk_rxa_E3:{first:0x460F,last:0x4614,name:"血"},cjk_rxa_E4:{first:0x4615,last:0x4619,name:"行"},
    cjk_rxa_E5:{first:0x461A,last:0x4671,name:"衣"},cjk_rxa_E6:{first:0x4672,last:0x4676,name:"西"},cjk_rxa_E7:{first:0x4677,last:0x4696,name:"見"},cjk_rxa_E8:{first:0x4697,last:0x46AD,name:"角"},cjk_rxa_E9:{first:0x46AE,last:0x4729,name:"言"},cjk_rxa_F0:{first:0x472A,last:0x4732,name:"谷"},cjk_rxa_F1:{first:0x4733,last:0x4744,name:"豆"},cjk_rxa_F2:{first:0x4745,last:0x4755,name:"豕"},cjk_rxa_F3:{first:0x4756,last:0x4766,name:"豸"},cjk_rxa_F4:{first:0x4767,last:0x4790,name:"貝"},cjk_rxa_F5:{first:0x4791,last:0x4795,name:"赤"},cjk_rxa_F6:{first:0x4796,last:0x47D2,name:"走"},cjk_rxa_F7:{first:0x47D3,last:0x4831,name:"足"},cjk_rxa_F8:{first:0x4832,last:0x4841,name:"身"},cjk_rxa_F9:{first:0x4842,last:0x4882,name:"車"},cjk_rxa_G0:{first:0x4883,last:0x4884,name:"辛"},cjk_rxa_G1:{first:0x4885,last:0x4889,name:"辰"},cjk_rxa_G2:{first:0x488A,last:0x48B2,name:"辵"},cjk_rxa_G3:{first:0x48B3,last:0x48E4,name:"邑"},cjk_rxa_G4:{first:0x48E5,last:0x4919,name:"酉"},                                           　   cjk_rxa_G6:{first:0x491A,last:0x491A,name:"里"},cjk_rxa_G7:{first:0x491B,last:0x4986,name:"金"},cjk_rxa_G8:{first:0x4987,last:0x498B,name:"長"},cjk_rxa_G9:{first:0x498C,last:0x49B8,name:"門"},cjk_rxa_H0:{first:0x49B9,last:0x49F0,name:"阜"},                                           　   cjk_rxa_H2:{first:0x49F1,last:0x4A0A,name:"隹"},cjk_rxa_H3:{first:0x4A0B,last:0x4A3B,name:"雨"},cjk_rxa_H4:{first:0x4A3C,last:0x4A3C,name:"青"},cjk_rxa_H5:{first:0x4A3D,last:0x4A41,name:"非"},cjk_rxa_H6:{first:0x4A42,last:0x4A4F,name:"面"},cjk_rxa_H7:{first:0x4A50,last:0x4A8E,name:"革"},cjk_rxa_H8:{first:0x4A8F,last:0x4A9D,name:"韋"},cjk_rxa_H9:{first:0x4A9E,last:0x4AA5,name:"韭"},cjk_rxa_I0:{first:0x4AA6,last:0x4AB0,name:"音"},
    cjk_rxa_I1:{first:0x4AB1,last:0x4AF7,name:"頁"},cjk_rxa_I2:{first:0x4AF8,last:0x4B1F,name:"風"},cjk_rxa_I3:{first:0x4B20,last:0x4B21,name:"飛"},cjk_rxa_I4:{first:0x4B22,last:0x4B6A,name:"食"},cjk_rxa_I5:{first:0x4B6B,last:0x4B6E,name:"首"},cjk_rxa_I6:{first:0x4B6F,last:0x4B73,name:"香"},cjk_rxa_I7:{first:0x4B74,last:0x4BC5,name:"馬"},cjk_rxa_I8:{first:0x4BC6,last:0x4BE6,name:"骨"},cjk_rxa_I9:{first:0x4BE7,last:0x4BEC,name:"高"},cjk_rxa_J0:{first:0x4BED,last:0x4C16,name:"髟"},cjk_rxa_J1:{first:0x4C17,last:0x4C18,name:"鬥"},                                           　   cjk_rxa_J3:{first:0x4C19,last:0x4C1E,name:"鬲"},cjk_rxa_J4:{first:0x4C1F,last:0x4C31,name:"鬼"},cjk_rxa_J5:{first:0x4C32,last:0x4CA4,name:"魚"},cjk_rxa_J6:{first:0x4CA5,last:0x4D19,name:"鳥"},cjk_rxa_J7:{first:0x4D1A,last:0x4D1E,name:"鹵"},cjk_rxa_J8:{first:0x4D1F,last:0x4D2B,name:"鹿"},cjk_rxa_J9:{first:0x4D2C,last:0x4D46,name:"麥"},cjk_rxa_K0:{first:0x4D47,last:0x4D49,name:"麻"},cjk_rxa_K1:{first:0x4D4A,last:0x4D50,name:"黃"},cjk_rxa_K2:{first:0x4D51,last:0x4D5C,name:"黍"},cjk_rxa_K3:{first:0x4D5D,last:0x4D75,name:"黑"},                                           　   cjk_rxa_K5:{first:0x4D76,last:0x4D79,name:"黽"},cjk_rxa_K6:{first:0x4D7A,last:0x4D7C,name:"鼎"},cjk_rxa_K7:{first:0x4D7D,last:0x4D81,name:"鼓"},cjk_rxa_K8:{first:0x4D82,last:0x4D89,name:"鼠"},cjk_rxa_K9:{first:0x4D8A,last:0x4D91,name:"鼻"},cjk_rxa_L0:{first:0x4D92,last:0x4D93,name:"齊"},cjk_rxa_L1:{first:0x4D94,last:0x4DAA,name:"齒"},cjk_rxa_L2:{first:0x4DAB,last:0x4DAE,name:"龍"},cjk_rxa_L3:{first:0x4DAF,last:0x4DB2,name:"龜"},cjk_rxa_L4:{first:0x4DB3,last:0x4DB5,name:"龠"},cjk_rxa_L5:{first:0x4DB6,last:0x4DBF,nameEN: "Other", nameFR: "Autres idéogrammes", nameJP: "他の文字"},
    
    yijing_hex: { first: 0x4DC0,last: 0x4DFF, nameEN:"Yijing Hexagram Symbols",nameFR:"Hexagrammes du Yi-king", nameJP: "易経記号"},

    cjk_rad_01:{first:0x4E00,last:0x4E27,name:"一"},cjk_rad_02:{first:0x4E28,last:0x4E35,name:"丨"},cjk_rad_03:{first:0x4E36,last:0x4E3E,name:"丶"},cjk_rad_04:{first:0x4E3F,last:0x4E58,name:"丿"},cjk_rad_05:{first:0x4E59,last:0x4E84,name:"乙"},cjk_rad_06:{first:0x4E85,last:0x4E8B,name:"亅"},cjk_rad_07:{first:0x4E8C,last:0x4E9F,name:"二"},cjk_rad_08:{first:0x4EA0,last:0x4EB9,name:"亠"},cjk_rad_09:{first:0x4EBA,last:0x513E,name:"人"},cjk_rad_10:{first:0x513F,last:0x5164,name:"儿"},cjk_rad_11:{first:0x5165,last:0x516A,name:"入"},cjk_rad_12:{first:0x516B,last:0x5181,name:"八"},cjk_rad_13:{first:0x5182,last:0x5195,name:"冂"},cjk_rad_14:{first:0x5196,last:0x51AA,name:"冖"},cjk_rad_15:{first:0x51AB,last:0x51DF,name:"冫"},cjk_rad_16:{first:0x51E0,last:0x51F4,name:"几"},cjk_rad_17:{first:0x51F5,last:0x51FF,name:"凵"},cjk_rad_18:{first:0x5200,last:0x529A,name:"刀"},cjk_rad_19:{first:0x529B,last:0x52F8,name:"力"},cjk_rad_20:{first:0x52F9,last:0x5314,name:"勹"},cjk_rad_21:{first:0x5315,last:0x531A,name:"匕"},cjk_rad_22:{first:0x531B,last:0x5338,name:"匚"},cjk_rad_23:{first:0x5339,last:0x5340,name:"匸"},cjk_rad_24:{first:0x5341,last:0x535B,name:"十"},cjk_rad_25:{first:0x535C,last:0x5368,name:"卜"},cjk_rad_26:{first:0x5369,last:0x5381,name:"卩"},cjk_rad_27:{first:0x5382,last:0x53B5,name:"厂"},cjk_rad_28:{first:0x53B6,last:0x53C7,name:"厶"},cjk_rad_29:{first:0x53C8,last:0x53E2,name:"又"},cjk_rad_30:{first:0x53E3,last:0x56D6,name:"口"},cjk_rad_31:{first:0x56D7,last:0x571E,name:"囗"},cjk_rad_32:{first:0x571F,last:0x58EA,name:"土"},cjk_rad_33:{first:0x58EB,last:0x5901,name:"士"},cjk_rad_34:{first:0x5902,last:0x5909,name:"夂"},cjk_rad_35:{first:0x590A,last:0x5914,name:"夊"},cjk_rad_36:{first:0x5915,last:0x5926,name:"夕"},
    cjk_rad_37:{first:0x5927,last:0x5972,name:"大"},cjk_rad_38:{first:0x5973,last:0x5B4F,name:"女"},cjk_rad_39:{first:0x5B50,last:0x5B7F,name:"子"},cjk_rad_40:{first:0x5B80,last:0x5BF7,name:"宀"},cjk_rad_41:{first:0x5BF8,last:0x5C0E,name:"寸"},cjk_rad_42:{first:0x5C0F,last:0x5C21,name:"小"},cjk_rad_43:{first:0x5C22,last:0x5C37,name:"尢"},cjk_rad_44:{first:0x5C38,last:0x5C6D,name:"尸"},cjk_rad_45:{first:0x5C6E,last:0x5C70,name:"屮"},cjk_rad_46:{first:0x5C71,last:0x5DDA,name:"山"},cjk_rad_47:{first:0x5DDB,last:0x5DE4,name:"巛"},cjk_rad_48:{first:0x5DE5,last:0x5DF0,name:"工"},cjk_rad_49:{first:0x5DF1,last:0x5DFD,name:"己"},cjk_rad_50:{first:0x5DFE,last:0x5E71,name:"巾"},cjk_rad_51:{first:0x5E72,last:0x5E79,name:"干"},cjk_rad_52:{first:0x5E7A,last:0x5E7E,name:"幺"},cjk_rad_53:{first:0x5E7F,last:0x5EF3,name:"广"},cjk_rad_54:{first:0x5EF4,last:0x5EFD,name:"廴"},cjk_rad_55:{first:0x5EFE,last:0x5F0A,name:"廾"},cjk_rad_56:{first:0x5F0B,last:0x5F12,name:"弋"},cjk_rad_57:{first:0x5F13,last:0x5F4F,name:"弓"},cjk_rad_58:{first:0x5F50,last:0x5F60,name:"彐"},cjk_rad_59:{first:0x5F61,last:0x5F72,name:"彡"},cjk_rad_60:{first:0x5F73,last:0x5FC2,name:"彳"},cjk_rad_61:{first:0x5FC3,last:0x6207,name:"心"},cjk_rad_62:{first:0x6208,last:0x6235,name:"戈"},cjk_rad_63:{first:0x6236,last:0x624A,name:"戶"},cjk_rad_64:{first:0x624B,last:0x652E,name:"手"},cjk_rad_65:{first:0x652F,last:0x6533,name:"支"},cjk_rad_66:{first:0x6534,last:0x6586,name:"攴"},cjk_rad_67:{first:0x6587,last:0x6596,name:"文"},cjk_rad_68:{first:0x6597,last:0x65A3,name:"斗"},cjk_rad_69/*nice*/:{first:0x65A4,last:0x65B8,name:"斤"},cjk_rad_70:{first:0x65B9,last:0x65DF,name:"方"},cjk_rad_71:{first:0x65E0,last:0x65E4,name:"无"},cjk_rad_72:{first:0x65E5,last:0x66EF,name:"日"},
    cjk_rad_73:{first:0x66F0,last:0x6707,name:"曰"},cjk_rad_74:{first:0x6708,last:0x6727,name:"月"},cjk_rad_75:{first:0x6728,last:0x6B1F,name:"木"},cjk_rad_76:{first:0x6B20,last:0x6B61,name:"欠"},cjk_rad_77:{first:0x6B62,last:0x6B78,name:"止"},cjk_rad_78:{first:0x6B79,last:0x6BB2,name:"歹"},cjk_rad_79:{first:0x6BB3,last:0x6BCA,name:"殳"},cjk_rad_80:{first:0x6BCB,last:0x6BD3,name:"毋"},cjk_rad_81:{first:0x6BD4,last:0x6BDA,name:"比"},cjk_rad_82:{first:0x6BDB,last:0x6C0E,name:"毛"},cjk_rad_83:{first:0x6C0F,last:0x6C13,name:"氏"},cjk_rad_84:{first:0x6C14,last:0x6C33,name:"气"},cjk_rad_85:{first:0x6C34,last:0x706A,name:"水"},cjk_rad_86:{first:0x706B,last:0x7229,name:"火"},cjk_rad_87:{first:0x722A,last:0x7235,name:"爪"},cjk_rad_88:{first:0x7236,last:0x723A,name:"父"},cjk_rad_89:{first:0x723B,last:0x723E,name:"爻"},cjk_rad_90:{first:0x723F,last:0x7246,name:"爿"},cjk_rad_91:{first:0x7247,last:0x7258,name:"片"},cjk_rad_92:{first:0x7259,last:0x725A,name:"牙"},cjk_rad_93:{first:0x725B,last:0x72AB,name:"牛"},cjk_rad_94:{first:0x72AC,last:0x7383,name:"犬"},cjk_rad_95:{first:0x7384,last:0x7388,name:"玄"},cjk_rad_96:{first:0x7389,last:0x74DB,name:"玉"},cjk_rad_97:{first:0x74DC,last:0x74E5,name:"瓜"},cjk_rad_98:{first:0x74E6,last:0x7517,name:"瓦"},cjk_rad_99:{first:0x7518,last:0x751E,name:"甘"},cjk_rad_A0:{first:0x751F,last:0x7527,name:"生"},cjk_rad_A1:{first:0x7528,last:0x752F,name:"用"},cjk_rad_A2:{first:0x7530,last:0x758A,name:"田"},cjk_rad_A3:{first:0x758B,last:0x7591,name:"疋"},cjk_rad_A4:{first:0x7592,last:0x7675,name:"疒"},cjk_rad_A5:{first:0x7676,last:0x767C,name:"癶"},cjk_rad_A6:{first:0x767D,last:0x76AD,name:"白"},cjk_rad_A7:{first:0x76AE,last:0x76BE,name:"皮"},cjk_rad_A8:{first:0x76BF,last:0x76ED,name:"皿"},
    cjk_rad_A9:{first:0x76EE,last:0x77DA,name:"目"},cjk_rad_B0:{first:0x77DB,last:0x77E1,name:"矛"},cjk_rad_B1:{first:0x77E2,last:0x77F2,name:"矢"},cjk_rad_B2:{first:0x77F3,last:0x7939,name:"石"},cjk_rad_B3:{first:0x793A,last:0x79B7,name:"示"},cjk_rad_B4:{first:0x79B8,last:0x79BD,name:"禸"},cjk_rad_B5:{first:0x79BE,last:0x7A73,name:"禾"},cjk_rad_B6:{first:0x7A74,last:0x7ACA,name:"穴"},cjk_rad_B7:{first:0x7ACB,last:0x7AF8,name:"立"},cjk_rad_B8:{first:0x7AF9,last:0x7C72,name:"竹"},cjk_rad_B9:{first:0x7C73,last:0x7CF7,name:"米"},cjk_rad_C0:{first:0x7CF8,last:0x7E9E,name:"糸"},cjk_rad_c0:{first:0x7E9F,last:0x7F35,name:"纟"},cjk_rad_C1:{first:0x7F36,last:0x7F50,name:"缶"},cjk_rad_C2:{first:0x7F51,last:0x7F89,name:"网"},cjk_rad_C3:{first:0x7F8A,last:0x7FBC,name:"羊"},cjk_rad_C4:{first:0x7FBD,last:0x8000,name:"羽"},cjk_rad_C5:{first:0x8001,last:0x800B,name:"老"},cjk_rad_C6:{first:0x800C,last:0x8011,name:"而"},cjk_rad_C7:{first:0x8012,last:0x8032,name:"耒"},cjk_rad_C8:{first:0x8033,last:0x807E,name:"耳"},cjk_rad_C9:{first:0x807F,last:0x8088,name:"聿"},cjk_rad_D0:{first:0x8089,last:0x81E2,name:"肉"},cjk_rad_D1:{first:0x81E3,last:0x81E9,name:"臣"},cjk_rad_D2:{first:0x81EA,last:0x81F2,name:"自"},cjk_rad_D3:{first:0x81F3,last:0x81FB,name:"至"},cjk_rad_D4:{first:0x81FC,last:0x820B,name:"臼"},cjk_rad_D5:{first:0x820C,last:0x821A,name:"舌"},cjk_rad_D6:{first:0x821B,last:0x821E,name:"舛"},cjk_rad_D7:{first:0x821F,last:0x826D,name:"舟"},cjk_rad_D8:{first:0x826E,last:0x8271,name:"艮"},cjk_rad_D9:{first:0x8272,last:0x8277,name:"色"},cjk_rad_E0:{first:0x8278,last:0x864C,name:"艸"},cjk_rad_E1:{first:0x864D,last:0x866A,name:"虍"},cjk_rad_E2:{first:0x866B,last:0x883F,name:"虫"},cjk_rad_E3:{first:0x8840,last:0x884B,name:"血"},cjk_rad_E4:{first:0x884C,last:0x8862,name:"行"},
    cjk_rad_E5:{first:0x8863,last:0x897D,name:"衣"},cjk_rad_E6:{first:0x897E,last:0x898A,name:"西"},cjk_rad_E7:{first:0x898B,last:0x89D1,name:"見"},cjk_rad_E8:{first:0x89D2,last:0x89FF,name:"角"},cjk_rad_E9:{first:0x8A00,last:0x8B9F,name:"言"},cjk_rad_e9:{first:0x8BA0,last:0x8C36,name:"讠"},cjk_rad_F0:{first:0x8C37,last:0x8C45,name:"谷"},cjk_rad_F1:{first:0x8C46,last:0x8C54,name:"豆"},cjk_rad_F2:{first:0x8C55,last:0x8C77,name:"豕"},cjk_rad_F3:{first:0x8C78,last:0x8C9C,name:"豸"},cjk_rad_F4:{first:0x8C9D,last:0x8D63,name:"貝"},cjk_rad_F5:{first:0x8D64,last:0x8D6F,name:"赤"},cjk_rad_F6:{first:0x8D70,last:0x8DB2,name:"走"},cjk_rad_F7:{first:0x8DB3,last:0x8EAA,name:"足"},cjk_rad_F8:{first:0x8EAB,last:0x8EC9,name:"身"},cjk_rad_F9:{first:0x8ECA,last:0x8F9A,name:"車"},cjk_rad_G0:{first:0x8F9B,last:0x8FAF,name:"辛"},cjk_rad_G1:{first:0x8FB0,last:0x8FB4,name:"辰"},cjk_rad_G2:{first:0x8FB5,last:0x9091,name:"辵"},cjk_rad_G3:{first:0x9092,last:0x9148,name:"邑"},cjk_rad_G4:{first:0x9149,last:0x91C5,name:"酉"},cjk_rad_G5:{first:0x91C6,last:0x91CB,name:"釆"},cjk_rad_G6:{first:0x91CC,last:0x91D0,name:"里"},cjk_rad_G7:{first:0x91D1,last:0x9484,name:"金"},cjk_rad_g7:{first:0x9485,last:0x9576,name:"钅"},cjk_rad_G8:{first:0x9577,last:0x957F,name:"長"},cjk_rad_G9:{first:0x9580,last:0x95E7,name:"門"},cjk_rad_g9:{first:0x95E8,last:0x961B,name:"门"},cjk_rad_H0:{first:0x961C,last:0x96B5,name:"阜"},cjk_rad_H1:{first:0x96B6,last:0x96B8,name:"隶"},cjk_rad_H2:{first:0x96B9,last:0x96E7,name:"隹"},cjk_rad_H3:{first:0x96E7,last:0x9750,name:"雨"},cjk_rad_H4:{first:0x9751,last:0x975D,name:"青"},cjk_rad_H5:{first:0x975E,last:0x9761,name:"非"},cjk_rad_H6:{first:0x9762,last:0x9768,name:"面"},cjk_rad_H7:{first:0x9769,last:0x97CA,name:"革"},cjk_rad_H8:{first:0x97CB,last:0x97EC,name:"韋"},cjk_rad_H9:{first:0x97ED,last:0x97F2,name:"韭"},cjk_rad_I0:{first:0x97F3,last:0x9800,name:"音"},
    cjk_rad_I1:{first:0x9801,last:0x98A7,name:"頁"},cjk_rad_I2:{first:0x98A8,last:0x98DA,name:"風"},cjk_rad_I3:{first:0x98DB,last:0x98DF,name:"飛"},cjk_rad_I4:{first:0x98E0,last:0x9995,name:"食"},cjk_rad_I5:{first:0x9996,last:0x9998,name:"首"},cjk_rad_I6:{first:0x9999,last:0x99AB,name:"香"},cjk_rad_I7:{first:0x99AC,last:0x9AA7,name:"馬"},cjk_rad_I8:{first:0x9AA8,last:0x9AD7,name:"骨"},cjk_rad_I9:{first:0x9AD8,last:0x9ADE,name:"高"},cjk_rad_J0:{first:0x9ADF,last:0x9B24,name:"髟"},cjk_rad_J1:{first:0x9B25,last:0x9B2E,name:"鬥"},cjk_rad_J2:{first:0x9B2F,last:0x9B31,name:"鬯"},cjk_rad_J3:{first:0x9B32,last:0x9B3B,name:"鬲"},cjk_rad_J4:{first:0x9B3C,last:0x9B59,name:"鬼"},cjk_rad_J5:{first:0x9B5A,last:0x9C7B,name:"魚"},cjk_rad_j5:{first:0x9C7C,last:0x9CE4,name:"鱼"},cjk_rad_J6:{first:0x9CE5,last:0x9E1E,name:"鳥"},cjk_rad_j6:{first:0x9E1F,last:0x9E74,name:"鸟"},cjk_rad_J7:{first:0x9E75,last:0x9E7E,name:"鹵"},cjk_rad_J8:{first:0x9E7F,last:0x9EA4,name:"鹿"},cjk_rad_J9:{first:0x9EA5,last:0x9EBA,name:"麥"},cjk_rad_K0:{first:0x9EBB,last:0x9EC2,name:"麻"},cjk_rad_K1:{first:0x9EC3,last:0x9ECC,name:"黃"},cjk_rad_K2:{first:0x9ECD,last:0x9ED0,name:"黍"},cjk_rad_K3:{first:0x9ED1,last:0x9EF8,name:"黑"},cjk_rad_K4:{first:0x9EF9,last:0x9EFC,name:"黹"},cjk_rad_K5:{first:0x9EFD,last:0x9F0D,name:"黽"},cjk_rad_K6:{first:0x9F0E,last:0x9F12,name:"鼎"},cjk_rad_K7:{first:0x9F13,last:0x9F1F,name:"鼓"},cjk_rad_K8:{first:0x9F20,last:0x9F3A,name:"鼠"},cjk_rad_K9:{first:0x9F3A,last:0x9F49,name:"鼻"},cjk_rad_L0:{first:0x9F4A,last:0x9F51,name:"齊"},cjk_rad_L1:{first:0x9F52,last:0x9F8C,name:"齒"},cjk_rad_L2:{first:0x9F8D,last:0x9F9B,name:"龍"},cjk_rad_L3:{first:0x9F9C,last:0x9F9F,name:"龜"},cjk_rad_L4:{first:0x9FA0,last:0x9FA5,name:"龠"},cjk_rad_L5:{first:0x9FA6,last:0x9FFF,nameEN: "Other", nameFR: "Autres idéogrammes", nameJP: "他の文字"},

    
    
    yi_syllabl: { first: 0xA000,last: 0xA48C, nameEN: "Yi Syllables",        nameFR: "Syllabaire yi des Monts frais", nameJP: "イ文字"},
    yi_radical: { first: 0xA490,last: 0xA4C6, nameEN: "Yi Radicals",         nameFR: "Clés yi",           nameJP: "イ文字部首"},

    privateu00:{first:0xE000,last:0xE0FF,name:"U+E000..U+E0FF"},privateu01:{first:0xE100,last:0xE1FF,name:"U+E100..U+E1FF"},privateu02:{first:0xE200,last:0xE2FF,name:"U+E200..U+E2FF"},privateu03:{first:0xE300,last:0xE3FF,name:"U+E300..U+E3FF"},privateu04:{first:0xE400,last:0xE4FF,name:"U+E400..U+E4FF"},
    privateu10:{first:0xE500,last:0xE5FF,name:"U+E500..U+E5FF"},privateu11:{first:0xE600,last:0xE6FF,name:"U+E600..U+E6FF"},privateu12:{first:0xE700,last:0xE7FF,name:"U+E700..U+E7FF"},privateu13:{first:0xE800,last:0xE8FF,name:"U+E800..U+E8FF"},privateu14:{first:0xE900,last:0xE9FF,name:"U+E900..U+E9FF"},
    privateu20:{first:0xEA00,last:0xEAFF,name:"U+EA00..U+EAFF"},privateu21:{first:0xEB00,last:0xEBFF,name:"U+EB00..U+EBFF"},privateu22:{first:0xEC00,last:0xECFF,name:"U+EC00..U+ECFF"},privateu23:{first:0xED00,last:0xEDFF,name:"U+ED00..U+EDFF"},privateu24:{first:0xEE00,last:0xEEFF,name:"U+EE00..U+EEFF"},
    privateu30:{first:0xEF00,last:0xEFFF,name:"U+EF00..U+EFFF"},privateu31:{first:0xF000,last:0xF0FF,name:"U+F000..U+F0FF"},privateu32:{first:0xF100,last:0xF1FF,name:"U+F100..U+F1FF"},privateu33:{first:0xF200,last:0xF2FF,name:"U+F200..U+F2FF"},privateu34:{first:0xF300,last:0xF3FF,name:"U+F300..U+F3FF"},
    privateu40:{first:0xF400,last:0xF4FF,name:"U+F400..U+F4FF"},privateu41:{first:0xF500,last:0xF5FF,name:"U+F500..U+F5FF"},privateu42:{first:0xF600,last:0xF6FF,name:"U+F600..U+F6FF"},privateu43:{first:0xF700,last:0xF7FF,name:"U+F700..U+F7FF"},privateu44:{first:0xF800,last:0xF8FF,name:"U+F800..U+F8FF"},

    basiclatin: { first: 0x0020,last: 0x007E, nameEN: "Basic Latin",        nameFR: "Latin de base",           nameJP: "基本ラテン文字"},

    alphab_lat: { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",      nameEN: "Base Latin alphabet", nameFR: "Alphabet latin de base", nameJP: "基本ラテンアルファベット"},
    alphab_swe: { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö",nameEN: "Swedish and Finnish alphabet", nameFR: "Alphabet suédois et finnois", nameJP: "スウェーデン語・フィンランド語アルファベット"},
    alphab_isl: { chars: "AÁBCDÐEÉFGHIÍJKLMNOÓPQRSTUÚVWXYÝZÞÆØaábcdðeéfghiíjklmnoópqrstuúvwxyýzþæø",nameEN: "Icelandic alphabet", nameFR: "Alphabet islandais", nameJP: "アイスランド語アルファベット"},
    alphab_dkn: { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå",nameEN: "Danish and Norwegian alphabet", nameFR: "Alphabet danois et norvégien", nameJP: "デンマーク語・ノルウェー語アルファベット"},
    alphab_grk: { chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψω",         nameEN: "Greek alphabet",      nameFR: "Alphabet grec", nameJP: "ギリシア語アルファベット"},

    jouyou_gr1: { chars: "一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六", nameEN: "Grade 1", nameFR: "Niveau 1", nameJP: "1年生"},
    jouyou_gr2: { chars: "引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話",　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 nameEN: "Grade 2", nameFR: "Niveau 2", nameJP: "2年生"},
    jouyou_gr3: { chars: "悪安暗医委意育員院飲運泳駅央横屋温化荷開界階寒感漢館岸期起客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和",　　 nameEN: "Grade 3", nameFR: "Niveau 3", nameJP: "3年生"},
    jouyou_gr4: { chars: "愛案以衣位茨印英栄媛塩岡億加果貨課芽賀改械害街各覚潟完官管関観願岐希季旗器機議求泣給挙漁共協鏡競極熊訓軍郡群径景芸欠結建健験固功好香候康佐差菜最埼材崎昨札刷察参産散残氏司試児治滋辞鹿失借種周祝順初松笑唱焼照城縄臣信井成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲沖兆低底的典伝徒努灯働特徳栃奈梨熱念敗梅博阪飯飛必票標不夫付府阜富副兵別辺変便包法望牧末満未民無約勇要養浴利陸良料量輪類令冷例連老労録", nameEN: "Grade 4", nameFR: "Niveau 4", nameJP: "4年生"},
    jouyou_gr5: { chars: "圧囲移因永営衛易益液演応往桜可仮価河過快解格確額刊幹慣眼紀基寄規喜技義逆久旧救居許境均禁句型経潔件険検限現減故個護効厚耕航鉱構興講告混査再災妻採際在財罪殺雑酸賛士支史志枝師資飼示似識質舎謝授修述術準序招証象賞条状常情織職制性政勢精製税責績接設絶祖素総造像増則測属率損貸態団断築貯張停提程適統堂銅導得毒独任燃能破犯判版比肥非費備評貧布婦武復複仏粉編弁保墓報豊防貿暴脈務夢迷綿輸余容略留領",　　　　　　　　　　 nameEN: "Grade 5", nameFR: "Niveau 5", nameJP: "5年生"},
    jouyou_gr6: { chars: "胃異遺域宇映延沿恩我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴券絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除承将傷障蒸針仁垂推寸盛聖誠舌宣専泉洗染銭善奏窓創装層操蔵臓存尊退宅担探誕段暖値宙忠著庁頂腸潮賃痛敵展討党糖届難乳認納脳派拝背肺俳班晩否批秘俵腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優預幼欲翌乱卵覧裏律臨朗論",　　　　　　　　　　　 nameEN: "Grade 6", nameFR: "Niveau 6", nameJP: "6年生"},
    jouyou_grS: { chars: "亜哀挨曖握扱宛嵐依威為畏尉萎偉椅彙違維慰緯壱逸芋咽姻淫陰隠韻唄鬱畝浦詠影鋭疫悦越謁閲炎怨宴援煙猿鉛縁艶汚凹押旺欧殴翁奥憶臆虞乙俺卸穏佳苛架華菓渦嫁暇禍靴寡箇稼蚊牙瓦雅餓介戒怪拐悔皆塊楷潰壊懐諧劾崖涯慨蓋該概骸垣柿核殻郭較隔獲嚇穫岳顎掛括喝渇葛滑褐轄且釜鎌刈甘汗缶肝冠陥乾勘患貫喚堪換敢棺款閑勧寛歓監緩憾還環韓艦鑑含玩頑企伎忌奇祈軌既飢鬼亀幾棋棄毀畿輝騎宜偽欺儀戯擬犠菊吉喫詰却脚虐及丘朽臼糾嗅窮巨拒拠虚距御凶叫狂享況峡挟狭恐恭脅矯響驚仰暁凝巾斤菌琴僅緊錦謹襟吟駆惧愚偶遇隅串屈掘窟繰勲薫刑茎契恵啓掲渓蛍傾携継詣慶憬稽憩鶏迎鯨隙撃桁傑肩倹兼剣拳軒圏堅嫌献遣賢謙鍵繭顕懸幻玄弦舷股虎孤弧枯雇誇鼓錮顧互呉娯悟碁勾孔巧甲江坑抗攻更拘肯侯恒洪荒郊貢控梗喉慌硬絞項溝綱酵稿衡購乞拷剛傲豪克酷獄駒込頃昆恨婚痕紺魂墾懇沙唆詐鎖挫采砕宰栽彩斎債催塞歳載剤削柵索酢搾錯咲刹拶撮擦桟惨傘斬暫旨伺刺祉肢施恣脂紫嗣雌摯賜諮侍慈餌璽軸𠮟疾執湿嫉漆芝赦斜煮遮邪蛇酌釈爵寂朱狩殊珠腫趣寿呪需儒囚舟秀臭袖羞愁酬醜蹴襲汁充柔渋銃獣叔淑粛塾俊瞬旬巡盾准殉循潤遵庶緒如叙徐升召匠床抄肖尚昇沼宵症祥称渉紹訟掌晶焦硝粧詔奨詳彰憧衝償礁鐘丈冗浄剰畳壌嬢錠譲醸拭殖飾触嘱辱尻伸芯辛侵津唇娠振浸紳診寝慎審震薪刃尽迅甚陣尋腎須吹炊帥粋衰酔遂睡穂随髄枢崇据杉裾瀬是姓征斉牲凄逝婿誓請醒斥析脊隻惜戚跡籍拙窃摂仙占扇栓旋煎羨腺詮践箋潜遷薦繊鮮禅漸膳繕狙阻租措粗疎訴塑遡礎双壮荘捜挿桑掃曹曽爽喪痩葬僧遭槽踪燥霜騒藻憎贈即促捉俗賊遜汰妥唾堕惰駄耐怠胎泰堆袋逮替滞戴滝択沢卓拓託濯諾濁但脱奪棚誰丹旦胆淡嘆端綻鍛弾壇恥致遅痴稚緻畜逐蓄秩窒嫡抽衷酎鋳駐弔挑彫眺釣貼超跳徴嘲澄聴懲勅捗沈珍朕陳鎮椎墜塚漬坪爪鶴呈廷抵邸亭貞帝訂逓偵堤艇締諦泥摘滴溺迭哲徹撤添塡殿斗吐妬途渡塗賭奴怒到逃倒凍唐桃透悼盗陶塔搭棟痘筒稲踏謄藤闘騰洞胴瞳峠匿督篤凸突屯豚頓貪鈍曇丼那謎鍋軟尼弐匂虹尿妊忍寧捻粘悩濃把覇婆罵杯排廃輩培陪媒賠伯拍泊迫剝舶薄漠縛爆箸肌鉢髪伐抜罰閥氾帆汎伴畔般販斑搬煩頒範繁藩蛮盤妃彼披卑疲被扉碑罷避尾眉微膝肘匹泌姫漂苗描猫浜賓頻敏瓶扶怖附訃赴浮符普腐敷膚賦譜侮舞封伏幅覆払沸紛雰噴墳憤丙併柄塀幣弊蔽餅壁璧癖蔑偏遍哺捕舗募慕簿芳邦奉抱泡胞俸倣峰砲崩蜂飽褒縫乏忙坊妨房肪某冒剖紡傍帽貌膨謀頰朴睦僕墨撲没勃堀奔翻凡盆麻摩磨魔昧埋膜枕又抹慢漫魅岬蜜妙眠矛霧娘冥銘滅免麺茂妄盲耗猛網黙紋冶弥厄躍闇喩愉諭癒唯幽悠湧猶裕雄誘憂融与誉妖庸揚揺溶腰瘍踊窯擁謡抑沃翼拉裸羅雷頼絡酪辣濫藍欄吏痢履璃離慄柳竜粒隆硫侶虜慮了涼猟陵僚寮療瞭糧厘倫隣瑠涙累塁励戻鈴零霊隷齢麗暦劣烈裂恋廉錬呂炉賂露弄郎浪廊楼漏籠麓賄脇惑枠湾腕",
    nameEN: "Secondary school kanji", nameFR: "Jōyō kanji du secondaire", nameJP: "中学生で習う漢字"},

    jouyou_r01:{chars:"一七丁下三上丈不世且丘丙中串丸丹主丼久乏乗乙九乞乱乳乾了事",nameEN:"1 stroke", nameFR:"1 trait", nameJP:"1画"},
    jouyou_r02:{chars:"二五井互亜亡交京享亭人今仏仁介仕他代以付令仙休仲伝仮件任企伎仰伐伏何作来住位佐低似伺伸但伯伴使例価供依佳侍侮併係信便保侯俊侵促俗侶倍候借倉個修値俳俵俺倹倒俸倣倫健側停偽偶偵偏備偉傘傍働傷僅傾傑傲債催僧像僕僚億儀儒優償元兄先光兆充児克免入内全両八六公共兵具典兼冊再冒冗冠冥冬冷冶准凄凍凝凡凶出凹凸刀刃切分刈刊列刑初別利判刷制券刻刹刺到前則削剣剛剤剝剖副剰割創劇力加功劣助努労励効劾勇勅勃勉動務勘勝勤募勢勧勲勾匂包化北匠区匹匿十千午升半協卒卓南卑博占印危卵却即巻卸厄厚厘原去参又及友反取受叔",nameEN:"2 strokes",nameFR:"2 traits",nameJP:"2画"},
    jouyou_r03:{chars:"口右古司可句史𠮟召名合同向各吸后吉叫吐吏君告否含吟呉吹呈呂味命和周呼呪品単哀咽咲員唄唆唇哲唐哺商問唱喝啓唾唯喜善喚喫喉喪喩嗅嗣嘆器嘱嘲噴厳嚇円四囚回因団図囲困国固圏園土圧地在坂均坑坊垂坪城型垣埋埼基堂域執堆培堀場報堪堅堕塚堤塔塀塁墓塊塞塑塡塗境増塾墨墜墳壊墾壌壇壁士壮壱寿夏夕外多夜夢大天太夫央失奈奇奉奔奏契奥奨奪奮女奴好如妃妄妥妊妨妙妖姉妹委始妻姓妬姿威姻娯娠姫娘婦婚婆媛婿媒嫁嫌嫉嫡嬢子孔字存孝学季孤孫写安守宇宅完実定官宗宙宝宛宜室客宣家宮害容宴宰宵宿寄密寂寒富寛寝察寡寧審寮寸寺対専封射将尉尊尋導小少尚就尺尻尼局尿尾居届屈屋展属層履屯山岐岩岸岡岳岬峡峠島峰崎崖崇崩嵐川州巡巣工巨左巧差己巾市布帆希帥帝席帯師帳常幅帽幕幣干平年幸幹幻幼幽幾広庁序床店底府度庫庭座康庶庸廃廊廉廷延建弄弊式弓引弔弟弦弥弧弱強張弾彙形彩彫彰影役径往征彼後待律徒従徐得復御循微徳徴徹",nameEN:"3 strokes",nameFR:"3 traits",nameJP:"3画"},
    jouyou_r04:{chars:"心必忙応快志忘忌忍念性忠怪怖思急怨悔恒恨怠怒息恩悦恐恭恵悟恣恥悩恋悪情患惧惨惜悼悠悲慌惰愉惑意感想愛慨愚慈愁慎慄慣態憎慕慢慰慶憬憧憤憂慮憲憶懐憾憩懇懲懸成我戒戚戦戯戴戸戻所房扇扉才手打払扱投折技批抗抄択把抜扶抑招拡承担拝押拐拒拠拘拙拓抽抵拍披抱抹拉指持拾括挟拷拶拭挑挙挨拳挫振捜挿捉捗捕採授接捨推探掛掘掲控据措掃捻排描提揮握援換掌搭揚揺損携搾摂搬摘撃撮摯撤撲摩操擁擬擦支収改攻放故政叙敏教敗救散敬敢数敵敷整文斑斗料斜斤斥断斬新方施旅族旋旗既日旦早旨旬明昔易旺昆昇春星昼昭昨映是昧時晴暑景晩暁晶普暗暖暇暮暦暴暫曇曖曜会曲更書曹曽最替月有服朗朕望朝期木本札末未机朽朱朴村材束条杉林東板果松枝枚枢析杯枕枠柱栄栃査染架柿枯柵柔柄某柳校根案梅桜格株核桁栽桟栓桑桃械梨梗森植極検棒椅棺棋棚椎棟楽業楷棄楼様構模概横標権槽橋機樹欄次欧欲款欺歌歓止正歩武帰歳歴死残殊殉殖殴段殺殻毀殿母毎毒比毛氏民気水氷永汁氾池汚汗江汎汽決求沖沙汰沢沈没沃泳注波油泣治法河沿況沼泥泊泌沸泡海活洋浅泉洗派洪浄津洞消流浴浦浸泰浜浮涙浪深清液混済淫涯渇渓渋淑渉淡添涼温湖港湯滋満減測渦湿渡湧湾漢準源滑溝滞滝溺漠滅溶漁演漆漸漬滴漂漫漏潟潔潮潰潤潜澄激濁濃濯濫瀬火灯灰災炎炊炉炭烈焼然無営煮焦照煙煎煩熊熱熟燃燥爆爪争為爵父爽片版牙牛物牧牲特犠犬犯状狂狙独狭狩猫猛猟猶猿献獄獲獣",nameEN:"4 strokes",nameFR:"4 traits",nameJP:"4画"},
    jouyou_r05:{chars:"玄率王玉玩珍班珠理球現琴瑠璃環璧璽瓦瓶甘甚生産用田申由甲当男町画界畑畏留畝畜畔略異番畳畿疎疑疫病疾症疲痕痛痩痘痢痴瘍療癖癒発登白百的皇皆皮皿尽盆益盛盗盟監盤目直盲相省看盾眉真眠眼眺睡督睦瞳瞭瞬矛矢知短矯石研砂砕破砲硬硝硫碁磁碑確磨礁礎礼示社祈祉神祝祖秘祥祭票福禁禍禅私秀科秋秒称租秩移税程稚種穀稲稼稽稿穂積穏穫穴究空突窃窓窒窟窮窯立並章童端競",nameEN:"5 strokes",nameFR:"5 traits",nameJP:"5画"},
    jouyou_r06:{chars:"竹笑第笛符答等筆筋策筒節算管箇箋箱箸範築篤簡簿籍籠米粉粋粗粘粒粧精糖糧糸系級県約紀紅糾紙素純納索紛紡紋細組終経紺紹紳累絵給結絶統絞紫絡続絹継緑練総綿維綱緒綻網線縄編縁緩緊締縦緯緻縛繁縫績縮繊織繭繕繰欠缶置罪署罰罵罷羅羊美羞着群義羨羽翁習翌翼考老者耐耕耗耳声聖聞聴職粛肉肌肝肖肘育肥肩股肯肢肪胃背肺胎胆胞能脈胸脅脂脊胴脇脳脚脱腕腸腹腫腎腺腰腐膜膝膚膳膨臆臓臣臨自臭台至致与旧臼興舌舎舗舞舟航般船舷舶艇艦良色艶万芋芝花芸芯芳苦英芽若苛茎苗茂草茶茨荒荘荷華菜著萎菓菊菌葉落葛葬蒸蓋蓄蔑蔵蔽薬薫薪薦薄藤藩藍藻号処虎虐虚虞虜虫虹蚕蚊蛍蛇蛮蜂蜜融血衆行術街衝衛衡衣表袖衰衷被袋裁装補裕裂裏褐裾裸製複褒襟襲西要覆",nameEN:"6 strokes",nameFR:"6 traits",nameJP:"6画"},
    jouyou_r07:{chars:"見規視覚親覧観角解触言計変訂訃記訓討託許設訪訳訟証評詞詠詐詔診訴話詩試誠該詰詣誇詳詮誉語読説誤誌認誓誘談調課諸誕論謁請諾誰諧諮諦謀諭謡講謝謹謙謄謎識警譜議護譲谷豆豊予豚象豪貌弐貝売負貞財貢貨責貧貫貪販買賀貸貯費貿貴貼資賃賊賂賄賛質賞賜賠賓賦賢賭頼購贈赤赦走赴起越超趣足距路跡践跳踊踪踏蹴躍身車軍軌軒転軟軽軸較載輪輝輩輸轄辛辞辣弁辱農辺込迅近返迎述迭迫送追逆迷退逃通速連造逝逐逓途透週進逸逮道運遊達過遇遂遅遍遠違遣適遮遡遭遜選遺遵遷還避那邦邪邸郊郎郡都部郷郵郭医酒配酌酎酔酢酬酪酸酵酷醒醜醸采釈里重野量",nameEN:"7 strokes",nameFR:"7 traits",nameJP:"7画"},
    jouyou_r08:{chars:"金針釜釣鈍鉄鉱鉛鉢鈴銀銅銭銃銘鋭鋳録鋼錦錮錯錠錬鍵鍛鍋鎌鎖鎮鏡鐘鑑長門閉間開閑関閣閥閲闇阪防阜阻附限院降除陛陥陣陸険陰陳陶陪隆陵階陽隊隅随隔隙際障隠隣隷双隻集雇雄雅雑雌難離雨雪雲雰電雷零需震霊霜覇霧露青静非",nameEN:"8 strokes",nameFR:"8 traits",nameJP:"8画"},
    jouyou_r09:{chars:"面革靴韓音韻響頂頃順項須預頑頓頒領頭頰頻顔題類額顎顕願顧風飛翻余食飢飲飯飼飾飽養餓餌餅館首香",nameEN:"9 strokes",nameFR:"9 traits",nameJP:"9画"},
    jouyou_r10:{chars:"馬駅駆駄駒駐験騎騒騰驚体骨骸髄高髪闘鬱鬼魂魅魔魚鮮鯨鳥鳴鶏鶴塩鹿麗麓麦麺麻黄点党黒黙鼓鼻斉斎歯齢竜亀",nameEN:"≥10 strokes",nameFR:"≥10 traits",nameJP:"≥10画"},
    jinmeiyou: {chars:"丑丞乃之乎也云亘亙些亦亥亨亮仔伊伍伽佃佑伶侃侑俄俠俣俐倭俱倦倖偲傭儲允兎兜其冴凌凜凛凧凪凰凱函劉劫勁勺勿匁匡廿卜卯卿厨厩叉叡叢叶只吾吞吻哉哨啄哩喬喧喰喋嘩嘉嘗噌噂圃圭坐尭堯坦埴堰堺堵塙壕壬夷奄奎套娃姪姥娩嬉孟宏宋宕宥寅寓寵尖尤屑峨峻崚嵯嵩嶺巌巖巫已巳巴巷巽帖幌幡庄庇庚庵廟廻弘弛彗彦彪彬徠忽怜恢恰恕悌惟惚悉惇惹惺惣慧憐戊或戟托按挺挽掬捲捷捺捧掠揃摑摺撒撰撞播撫擢孜敦斐斡斧斯於旭昂昊昏昌昴晏晃晄晒晋晟晦晨智暉暢曙曝曳朋朔杏杖杜李杭杵杷枇柑柴柘柊柏柾柚桧檜栞桔桂栖桐栗梧梓梢梛梯桶梶椛梁棲椋椀楯楚楕椿楠楓椰楢楊榎樺榊榛槙槇槍槌樫槻樟樋橘樽橙檎檀櫂櫛櫓欣欽歎此殆毅毘毬汀汝汐汲沌沓沫洸洲洵洛浩浬淵淳渚淀淋渥渾湘湊湛溢滉溜漱漕漣澪濡瀕灘灸灼烏焰焚煌煤煉熙燕燎燦燭燿爾牒牟牡牽犀狼猪獅玖珂珈珊珀玲琢琉瑛琥琶琵琳瑚瑞瑶瑳瓜瓢甥甫畠畢疋疏皐皓眸瞥矩砦砥砧硯碓碗碩碧磐磯祇祢禰祐祷禱禄祿禎禽禾秦秤稀稔稟稜穣穰穹穿窄窪窺竣竪竺竿笈笹笙笠筈筑箕箔篇篠簞簾籾粥粟糊紘紗紐絃紬絆絢綺綜綴緋綾綸縞徽繫繡纂纏羚翔翠耀而耶耽聡肇肋肴胤胡脩腔脹膏臥舜舵芥芹芭芙芦苑茄苔苺茅茉茸茜莞荻莫莉菅菫菖萄菩萌萠萊菱葦葵萱葺萩董葡蓑蒔蒐蒼蒲蒙蓉蓮蔭蔣蔦蓬蔓蕎蕨蕉蕃蕪薙蕾蕗藁薩蘇蘭蝦蝶螺蟬蟹蠟衿袈袴裡裟裳襖訊訣註詢詫誼諏諄諒謂諺讃豹貰賑赳跨蹄蹟輔輯輿轟辰辻迂迄辿迪迦這逞逗逢遥遙遁遼邑祁郁鄭酉醇醐醍醬釉釘釧銑鋒鋸錘錐錆錫鍬鎧閃閏閤阿陀隈隼雀雁雛雫霞靖鞄鞍鞘鞠鞭頁頌頗顚颯饗馨馴馳駕駿驍魁魯鮎鯉鯛鰯鱒鱗鳩鳶鳳鴨鴻鵜鵬鷗鷲鷺鷹麒麟麿黎黛鼎",nameEN:"Jinmeiyō kanji",nameFR:"Jinmeiyō kanji",nameJP:"人名用漢字"},
    
    accent_fra: { chars: "ÀÂÆÇÈÉÊËÎÏÔŒÙÛÜŸàâæçèéêëîïôœùûüÿ", nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    accent_ger: { chars: "ÄÖÜẞäöüß",                         nameEN: "Other letters",    nameFR: "Autres lettres",     nameJP: "他の文字"},
    accent_spa: { chars: "ÁÉÍÑÓÚÜÝáéíñóúüý",                 nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    accent_por: { chars: "ÀÁÂÃÇÉÊÍÓÔÕÚàáâãçéêíóôõú",         nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    accent_ita: { chars: "ÀÈÉÌÒÙàèéìòù",                     nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    accent_nld: { chars: "ÁÈÉÊËÍÏĲÓÖÚÜÝáèéêëíïĳóöúüý",       nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    accent_svf: { chars: "ÉŠÜŽéšüž",                         nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    accent_dkn: { chars: "ÀÁÈÉÊÍÒÓÔÙÚÜǼǾǺàáèéêíòóôùúüǽǿǻ",   nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    accent_smi: { chars: "ÁÂČƷǮĐǦǤÏǨŊÕŠŦÜŽÆØÅÄÖáâčʒǯđǧǥïǩŋõšŧüžæøåäö",nameEN: "Accented letters", nameFR: "Lettres accentuées", nameJP: "発音区別符号付きの文字"},
    
    basic_hira: { chars: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん", nameEN: "Hiragana", nameFR: "Hiraganas", nameJP: "平仮名"},
    other_hira: { chars: "がぎぐげござじずぜぞだぢづでどばぱびぴぶぷべぺぼぽゔぁぃぅぇぉっゃゅょゎゕゖ", nameEN: "Voiced and small hiragana",  nameFR: "Hiraganas sonores et petits",  nameJP: "濁点・半濁点付きの文字と捨て仮名"},
    basic_kata: { chars: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン", nameEN: "Katakana", nameFR: "Katakanas", nameJP: "片仮名"},
    other_kata: { chars: "ガギグゲゴザジズゼゾダヂヅデドバパビピブプベペボポヴァィゥェォッャュョヮヵヶ", nameEN: "Voiced and small katakana",  nameFR: "Katakanas sonores et petits",  nameJP: "濁点・半濁点付きの文字と捨て仮名"},

    punctu_eng: { chars: " .,?!'\":;-/&()“”‘’",              nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点"},
    punctu_fra: { chars: " .,?!'\":;-/&()«»“”",              nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点"},
    punctu_ger: { chars: " .,?!'\":;-/&()„“‚‘«»‹›",          nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点"},
    punctu_spa: { chars: " .,¿?¡!'\":;-/&()«»“”",            nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点"},
    punctu_p_i: { chars: " .,?!'\":;-/&()«»“”",              nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点"},
    punctu_isl: { chars: " .,?!'\":;-/&()„“‚‘",              nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点"},
    punctu_dkn: { chars: " .,?!'\":;-/&()»«›‹“”‘’",          nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点"},
    punctu_jpn: { chars: "　。、？！.,:…・〜/（）「」゠※々円",   nameEN: "Punctuation", nameFR: "Ponctuation", nameJP: "句読点" },
    more_punct: { chars: "[]{}~*_@#%€£$¢ …–—―•©®™‼�",        nameEN: "More symbols", nameFR: "Symboles supplémentaires", nameJP: "より多くの記号"},
    basic_math: { chars: " +−×÷=≠<>≤≥±∞",                    nameEN: "Basic mathematical symbols", nameFR: "Symboles mathématiques de base", nameJP: "基本的な数学記号"},
    buttonicon: { chars: "✛⬆➡⬇⬅ⒶⒷ🎣⊙🔒🟨",                  nameEN: "Button icons", nameFR: "Icônes de boutons", nameJP: "ボタンのアイコン"},

    numeral_en: { chars: "1234567890",                       nameEN: "Numerals", nameFR: "Chiffres", nameJP: "数字"},
    numeral_fr: { chars: "1234567890ᵉʳˢᵈ",                   nameEN: "Numerals", nameFR: "Chiffres", nameJP: "数字"},
    numeral_oa: { chars: "1234567890ºª",                     nameEN: "Numerals", nameFR: "Chiffres", nameJP: "数字"},

    kanji_nums: { chars: "一二三四五六七八九十百千万億兆〇零",     nameEN: "Numerals", nameFR: "Chiffres", nameJP: "数字"},

}
function tagged_all() {
    return {
        chars: groupComponents.tagged_r.chars + groupComponents.tagged_y.chars +
               groupComponents.tagged_g.chars + groupComponents.tagged_b.chars,
        nameEN: "Tagged", nameFR: "Glyphes taggés", nameJP: "タグ付き",
    }
}
function all_glyphs() {
    return {
        chars: Object.keys(advanceWidth).sort().join(""),
        nameEN: "All glyphs", nameFR: "Tous les glyphes", nameJP: "すべての文字",
    }
}

// Consider using the Private Use Area for glyphs that do not exist in Unicode as a single codepoint (x, y, z).
// Unicodeに一つの文字として存在しない文字 (x, y, z) を作成には、私用領域を使用するといいです。
// Il est recommandé d'utiliser la Zone à usage privé pour créer les glyphes qui n'existent pas dans Unicode comme un seul caractère (x, y, z).

// This is the Private Use Area. Glyphs in this block may have any appearance, depending on your installed fonts. You may define and use them however you like.
// Ceci est la Zone à usage privé. Les glyphes dans ce bloc peuvent prendre n'importe quelle apparence, en fonction de vos polices installées. Vous pouvez les définir et les utiliser comme bon vous semble.
// これは私用領域です。このブロックの文字は、システムにインストールされたフォントによって  ???何でもに似られる。???

// Find or add...
// Trouver ou ajouter
// 絞り込み
// 追加

// Hiratake        Hiratake      ヒラタケ
// Stationery      Papeterie     文房具
// Inkwell         Encrier       インク入れ
// Inkwell Nitro   Encrier Nitro インク入れ ニトロ
// Raspberry       Framboise     フランボワーズ
// Kaasiand        Kaasiand      カーシアント
// Kaasiand 2      Kaasiand 2    カーシアント2
// Solarized Light Solarized clair   Solarizedライト
// Solarized Dark  Solarized sombre  Solarizedダーク


const groups = {
    // the collapsible categories
    cat_groups: { nameEN: "Glyph groups",    nameFR: "Groupes de glyphes", nameJP: "文字のグループ"},
    cat_used:   { nameEN: "In this font",    nameFR: "Dans cette fonte",   nameJP: "このフォントにある"},
    cat_uni:    { nameEN: "Unicode blocks",  nameFR: "Blocs Unicode",      nameJP: "Unicodeのブロック"},
    // collapsible subcategories
    cat_latin:  { nameEN: "Latin script",    nameFR: "Alphabet latin",     nameJP: "ラテン文字"},
    cat_greek:  { nameEN: "Greek alphabet",  nameFR: "Alphabet grec",      nameJP: "ギリシア文字"},
    cat_jpnese: { nameEN: "Japanese",        nameFR: "Japonais",           nameJP: "日本語"},
    // unicode block collapsibles
    cat_prvuse: { nameEN: "Private Use Area",nameFR: "Zone à usage privé", nameJP: "私用領域"},
    privateus0: { components: ["privateu00","privateu01","privateu02","privateu03","privateu04"], name: "U+E000..U+E4FF"},
    privateus1: { components: ["privateu10","privateu11","privateu12","privateu13","privateu14"], name: "U+E500..U+E9FF"},
    privateus2: { components: ["privateu20","privateu21","privateu22","privateu23","privateu24"], name: "U+EA00..U+EEFF"},
    privateus3: { components: ["privateu30","privateu31","privateu32","privateu33","privateu34"], name: "U+EF00..U+F3FF"},
    privateus4: { components: ["privateu40","privateu41","privateu42","privateu43","privateu44"], name: "U+F400..U+F8FF"},

    cat_cjkuic: { nameEN: "CJK Unified Ideog. (by codepoint)",nameFR: "Idéogr. unifiés CJC (par point de code)", nameJP: "CJK統合漢字（文字コードによって）"},

    // unicode blocks
    basiclatin: { components: ["basiclatin"], nameEN: "Basic Latin",         nameFR: "Latin de base",           nameJP: "基本ラテン文字"},
    latin1supp: { components: ["latin1supp"], nameEN: "Latin-1 Supplement",  nameFR: "Supplément latin-1",      nameJP: "ラテン1補助"},
    latinext_a: { components: ["latinext_a"], nameEN: "Latin Extended-A",    nameFR: "Latin étendu A",          nameJP: "ラテン文字拡張A"},
    latinext_b: { components: ["latinext_b"], nameEN: "Latin Extended-B",    nameFR: "Latin étendu B",          nameJP: "ラテン文字拡張B"},
    ipa_ext:    { components: ["ipa_ext"   ], nameEN: "IPA Extensions",      nameFR: "Supplément pour l'API",   nameJP: "IPA拡張"},
    spacingmod: { components: ["spacingmod"], nameEN: "Spacing Modifier Letters",    nameFR: "Lettres modificatives à chasse", nameJP: "前進を伴う修飾文字"},
    comb_diacr: { components: ["comb_diacr"], nameEN: "Combining Diacritical Marks", nameFR: "Diacritiques",    nameJP: "合成可能なダイアクリティカルマーク"},
    greek_copt: { components: ["greek_copt"], nameEN: "Greek and Coptic",    nameFR: "Grec et copte",           nameJP: "ギリシア文字及びコプト文字"},
    cyrillic:   { components: ["cyrillic"  ], nameEN: "Cyrillic",            nameFR: "Cyrillique",              nameJP: "キリル文字"},
    cyril_supp: { components: ["cyril_supp"], nameEN: "Cyrillic Supplement", nameFR: "Supplément cyrillique",   nameJP: "キリル文字補助"},
    armenian:   { components: ["armenian"  ], nameEN: "Armenian",            nameFR: "Arménien",                nameJP: "アルメニア文字"},
    hebrew:     { components: ["hebrew"    ], nameEN: "Hebrew",              nameFR: "Hébreu",                  nameJP: "ヘブライ文字"},
    arabic:     { components: ["arabic"    ], nameEN: "Arabic",              nameFR: "Arabe",                   nameJP: "アラビア文字"},
    syriac:     { components: ["syriac"    ], nameEN: "Syriac",              nameFR: "Syriaque",                nameJP: "シリア文字"},
    arabic_sup: { components: ["arabic_sup"], nameEN: "Arabic Supplement",   nameFR: "Supplément arabe",        nameJP: "アラビア文字補助"},
    thaana:     { components: ["thaana"    ], nameEN: "Thaana",              nameFR: "Thâna",                   nameJP: "ターナ文字"},
    nko:        { components: ["nko"       ], nameEN: "NKo",                 nameFR: "N’ko",                    nameJP: "ンコ文字"},
    samaritan:  { components: ["samaritan" ], nameEN: "Samaritan",           nameFR: "Samaritain",              nameJP: "サマリア文字"},
    mandaic:    { components: ["mandaic"   ], nameEN: "Mandaic",             nameFR: "Mandéen",                 nameJP: "マンダ文字"},
    syriac_sup: { components: ["syriac_sup"], nameEN: "Syriac Supplement",   nameFR: "Supplément syriaque",     nameJP: "シリア文字拡張"},
    arabic_x_b: { components: ["arabic_x_b"], nameEN: "Arabic Extended-B",   nameFR: "Arabe étendu B",          nameJP: "アラビア文字拡張B"},
    arabic_x_a: { components: ["arabic_x_a"], nameEN: "Arabic Extended-A",   nameFR: "Arabe étendu A",          nameJP: "アラビア文字拡張A"},
    devanagari: { components: ["devanagari"], nameEN: "Devanagari",          nameFR: "Dévanâgarî",              nameJP: "デーヴァナーガリー文字"},
    bengali:    { components: ["bengali"   ], nameEN: "Bengali",             nameFR: "Bengali",                 nameJP: "ベンガル文字"},
    gurmukhi:   { components: ["gurmukhi"  ], nameEN: "Gurmukhi",            nameFR: "Gourmoukhî",              nameJP: "グルムキー文字"},
    gujarati:   { components: ["gujarati"  ], nameEN: "Gujarati",            nameFR: "Goudjarati",              nameJP: "グジャラート文字"},
    oriya:      { components: ["oriya"     ], nameEN: "Oriya",               nameFR: "Oriya",                   nameJP: "オリヤー文字"},
    tamil:      { components: ["tamil"     ], nameEN: "Tamil",               nameFR: "Tamoul",                  nameJP: "タミル文字"},
    telugu:     { components: ["telugu"    ], nameEN: "Telugu",              nameFR: "Télougou",                nameJP: "テルグ文字"},
    kannada:    { components: ["kannada"   ], nameEN: "Kannada",             nameFR: "Kannara",                 nameJP: "カンナダ文字"},
    malayalam:  { components: ["malayalam" ], nameEN: "Malayalam",           nameFR: "Malayalam",               nameJP: "マラヤーラム文字"},

    sinhala:    { components: ["sinhala"   ], nameEN: "Sinhala",             nameFR: "Singhalais",              nameJP: "シンハラ文字"},
    thai:       { components: ["thai"      ], nameEN: "Thai",                nameFR: "Thaï",                    nameJP: "タイ文字"},
    lao:        { components: ["lao"       ], nameEN: "Lao",                 nameFR: "Lao",                     nameJP: "ラオス文字"},

    tibetan:    { components: ["tibetan"   ], nameEN: "Tibetan",             nameFR: "Tibétain",                nameJP: "チベット文字"},
    myanmar:    { components: ["myanmar"   ], nameEN: "Myanmar",             nameFR: "Birman",                  nameJP: "ビルマ文字"},


    cjksympunc: { components: ["cjksympunc"], nameEN: "CJK Symbols and Punctuation",nameFR: "Symboles et ponctuation CJC", nameJP: "CJKの記号及び句読点"},
    hiragana:   { components: ["hiragana"  ], nameEN: "Hiragana",            nameFR: "Hiragana",                nameJP: "平仮名"},
    katakana:   { components: ["katakana"  ], nameEN: "Katakana",            nameFR: "Katakana",                nameJP: "片仮名"},
    bopomofo:   { components: ["bopomofo"  ], nameEN: "Bopomofo",            nameFR: "Bopomofo",                nameJP: "注音字母"},
    hangul_c_j: { components: ["hangul_c_j"], nameEN: "Hangul Compatibility Jamo",nameFR: "Jamos hangûl de compatibilité", nameJP: "ハングル互換字母"},
    kanbun:     { components: ["kanbun"    ], nameEN: "Kanbun",              nameFR: "Kanboun",                 nameJP: "漢文用記号"},
    bopomofo_x: { components: ["bopomofo_x"], nameEN: "Bopomofo Extended",   nameFR: "Bopomofo étendu",         nameJP: "注音字母拡張"},
    cjk_stroke: { components: ["cjk_stroke"], nameEN: "CJK Strokes",         nameFR: "Traits CJC",              nameJP: "CJKの筆画"},
    katakana_x: { components: ["katakana_x"], nameEN: "Katakana Phonetic Extensions", nameFR: "Supplément phonétique katakana", nameJP: "片仮名拡張"},
    enclos_cjk: { components: ["enclos_cjk"], nameEN: "Enclosed CJK Letters and Months", nameFR: "Lettres et mois CJC délimités", nameJP: "囲みCJK文字・月"},
    cjk_compat: { components: ["cjk_compat"], nameEN: "CJK Compatibility",   nameFR:"Compatibilité CJC",        nameJP: "CJK互換用文字"},
    cat_cjkuxa: { nameEN: "CJK Unified Ideog. Ext. A (by radical)",nameFR: "Supplément A aux idéogr. unifiés CJC (par clé)", nameJP: "CJK統合漢字拡張A（部首別）"},
     cjk_rxa_r0:{ components: ["cjk_rxa_01","cjk_rxa_02",             "cjk_rxa_04","cjk_rxa_05","cjk_rxa_06","cjk_rxa_07","cjk_rxa_08","cjk_rxa_09","cjk_rxa_10","cjk_rxa_11","cjk_rxa_12","cjk_rxa_13","cjk_rxa_14","cjk_rxa_15","cjk_rxa_16","cjk_rxa_17","cjk_rxa_18"], name: "一丨　丿乙亅二亠人　儿入八冂冖冫几凵刀"},cjk_rxa_r1: { components: ["cjk_rxa_19","cjk_rxa_20","cjk_rxa_21","cjk_rxa_22","cjk_rxa_23","cjk_rxa_24","cjk_rxa_25","cjk_rxa_26","cjk_rxa_27","cjk_rxa_28","cjk_rxa_29","cjk_rxa_30","cjk_rxa_31","cjk_rxa_32","cjk_rxa_33","cjk_rxa_34","cjk_rxa_35","cjk_rxa_36"], name: "力勹匕匚匸十卜卩厂　厶又口囗土士夂夊夕"},cjk_rxa_r2: { components: ["cjk_rxa_37","cjk_rxa_38","cjk_rxa_39","cjk_rxa_40","cjk_rxa_41","cjk_rxa_42","cjk_rxa_43","cjk_rxa_44","cjk_rxa_45","cjk_rxa_46","cjk_rxa_47","cjk_rxa_48","cjk_rxa_49","cjk_rxa_50",             "cjk_rxa_52","cjk_rxa_53","cjk_rxa_54"], name: "大女子宀寸小尢尸屮　山巛工己巾　幺广廴"},cjk_rxa_r3: { components: ["cjk_rxa_55","cjk_rxa_56","cjk_rxa_57","cjk_rxa_58","cjk_rxa_59","cjk_rxa_60","cjk_rxa_61","cjk_rxa_62","cjk_rxa_63","cjk_rxa_64","cjk_rxa_65","cjk_rxa_66","cjk_rxa_67","cjk_rxa_68","cjk_rxa_69","cjk_rxa_70",             "cjk_rxa_72"], name: "廾弋弓彐彡彳心戈戶　手支攴文斗斤方　日"},cjk_rxa_r4: { components: ["cjk_rxa_73","cjk_rxa_74","cjk_rxa_75","cjk_rxa_76","cjk_rxa_77","cjk_rxa_78","cjk_rxa_79",             "cjk_rxa_81","cjk_rxa_82","cjk_rxa_83","cjk_rxa_84","cjk_rxa_85","cjk_rxa_86","cjk_rxa_87","cjk_rxa_88","cjk_rxa_89","cjk_rxa_90"], name: "曰月木欠止歹殳　比　毛氏气水火爪父爻爿"},cjk_rxa_r5: { components: ["cjk_rxa_91","cjk_rxa_92","cjk_rxa_93","cjk_rxa_94",             "cjk_rxa_96","cjk_rxa_97","cjk_rxa_98","cjk_rxa_99","cjk_rxa_A0",             "cjk_rxa_A2","cjk_rxa_A3","cjk_rxa_A4",             "cjk_rxa_A6","cjk_rxa_A7","cjk_rxa_A8"], name: "片牙牛犬　玉瓜瓦甘　生　田疋疒　白皮皿"},cjk_rxa_r6: { components: ["cjk_rxa_A9","cjk_rxa_B0","cjk_rxa_B1","cjk_rxa_B2","cjk_rxa_B3",             "cjk_rxa_B5","cjk_rxa_B6","cjk_rxa_B7","cjk_rxa_B8","cjk_rxa_B9","cjk_rxa_C0","cjk_rxa_C1","cjk_rxa_C2","cjk_rxa_C3","cjk_rxa_C4","cjk_rxa_C5","cjk_rxa_C6"], name: "目矛矢石　禸禾穴立　竹米糸缶网羊羽老而"},cjk_rxa_r7: { components: ["cjk_rxa_C7","cjk_rxa_C8","cjk_rxa_C9","cjk_rxa_D0","cjk_rxa_D1",             "cjk_rxa_D3","cjk_rxa_D4","cjk_rxa_D5","cjk_rxa_D6","cjk_rxa_D7",             "cjk_rxa_D9","cjk_rxa_E0","cjk_rxa_E1","cjk_rxa_E2","cjk_rxa_E3","cjk_rxa_E4"], name: "耒耳聿肉臣　至臼舌　舛舟　色艸虍虫血行"},cjk_rxa_r8: { components: ["cjk_rxa_E5","cjk_rxa_E6","cjk_rxa_E7","cjk_rxa_E8","cjk_rxa_E9","cjk_rxa_F0","cjk_rxa_F1","cjk_rxa_F2","cjk_rxa_F3","cjk_rxa_F4","cjk_rxa_F5","cjk_rxa_F6","cjk_rxa_F7","cjk_rxa_F8","cjk_rxa_F9","cjk_rxa_G0","cjk_rxa_G1","cjk_rxa_G2"], name: "衣西見角言谷豆豕豸　貝赤走足身車辛辰辵"},cjk_rxa_r9: { components: ["cjk_rxa_G3","cjk_rxa_G4",             "cjk_rxa_G6","cjk_rxa_G7","cjk_rxa_G8","cjk_rxa_G9","cjk_rxa_H0",            ,"cjk_rxa_H2","cjk_rxa_H3","cjk_rxa_H4","cjk_rxa_H5","cjk_rxa_H6","cjk_rxa_H7","cjk_rxa_H8","cjk_rxa_H9","cjk_rxa_I0"], name: "邑酉　里金長門阜　　隹雨青非面革韋韭音"},cjk_rxa_rA: { components: ["cjk_rxa_I1","cjk_rxa_I2","cjk_rxa_I3","cjk_rxa_I4","cjk_rxa_I5","cjk_rxa_I6","cjk_rxa_I7","cjk_rxa_I8","cjk_rxa_I9","cjk_rxa_J0","cjk_rxa_J1",             "cjk_rxa_J3","cjk_rxa_J4","cjk_rxa_J5","cjk_rxa_J6","cjk_rxa_J7","cjk_rxa_J8"], name: "頁風飛食首香馬骨高　髟鬥　鬲鬼魚鳥鹵鹿"},cjk_rxa_rB: { components: ["cjk_rxa_J9","cjk_rxa_K0","cjk_rxa_K1","cjk_rxa_K2","cjk_rxa_K3",             "cjk_rxa_K5","cjk_rxa_K6","cjk_rxa_K7","cjk_rxa_K8","cjk_rxa_K9","cjk_rxa_L0","cjk_rxa_L1","cjk_rxa_L2","cjk_rxa_L3","cjk_rxa_L4","cjk_rxa_L5"],              name: "麥麻黃黍黑　黽鼎鼓　鼠鼻齊齒龍龜龠…"},
    yijing_hex: { components: ["yijing_hex"], nameEN:"Yijing Hexagram Symbols",nameFR:"Hexagrammes du Yi-king", nameJP: "易経記号"},
    cat_cjkuir: { nameEN: "CJK Unified Ideog. (by radical)",       nameFR: "Idéogr. unifiés CJC (par clé)",     nameJP: "CJK統合漢字（部首別）"},
     cjk_rad_r0:{ components: ["cjk_rad_01","cjk_rad_02","cjk_rad_03","cjk_rad_04","cjk_rad_05","cjk_rad_06","cjk_rad_07","cjk_rad_08","cjk_rad_09"], name: "一丨丶丿乙亅二亠人"},cjk_rad_r1: { components: ["cjk_rad_10","cjk_rad_11","cjk_rad_12","cjk_rad_13","cjk_rad_14","cjk_rad_15","cjk_rad_16","cjk_rad_17","cjk_rad_18"], name: "儿入八冂冖冫几凵刀"},cjk_rad_r2: { components: ["cjk_rad_19","cjk_rad_20","cjk_rad_21","cjk_rad_22","cjk_rad_23","cjk_rad_24","cjk_rad_25","cjk_rad_26","cjk_rad_27"], name: "力勹匕匚匸十卜卩厂"},cjk_rad_r3: { components: ["cjk_rad_28","cjk_rad_29","cjk_rad_30","cjk_rad_31","cjk_rad_32","cjk_rad_33","cjk_rad_34","cjk_rad_35","cjk_rad_36"], name: "厶又口囗土士夂夊夕"},cjk_rad_r4: { components: ["cjk_rad_37","cjk_rad_38","cjk_rad_39","cjk_rad_40","cjk_rad_41","cjk_rad_42","cjk_rad_43","cjk_rad_44","cjk_rad_45"], name: "大女子宀寸小尢尸屮"},cjk_rad_r5: { components: ["cjk_rad_46","cjk_rad_47","cjk_rad_48","cjk_rad_49","cjk_rad_50","cjk_rad_51","cjk_rad_52","cjk_rad_53","cjk_rad_54"], name: "山巛工己巾干幺广廴"},cjk_rad_r6: { components: ["cjk_rad_55","cjk_rad_56","cjk_rad_57","cjk_rad_58","cjk_rad_59","cjk_rad_60","cjk_rad_61","cjk_rad_62","cjk_rad_63"], name: "廾弋弓彐彡彳心戈戶"},cjk_rad_r7: { components: ["cjk_rad_64","cjk_rad_65","cjk_rad_66","cjk_rad_67","cjk_rad_68","cjk_rad_69","cjk_rad_70","cjk_rad_71","cjk_rad_72"], name: "手支攴文斗斤方无日"},cjk_rad_r8: { components: ["cjk_rad_73","cjk_rad_74","cjk_rad_75","cjk_rad_76","cjk_rad_77","cjk_rad_78","cjk_rad_79","cjk_rad_80","cjk_rad_81"], name: "曰月木欠止歹殳毋比"},cjk_rad_r9: { components: ["cjk_rad_82","cjk_rad_83","cjk_rad_84","cjk_rad_85","cjk_rad_86","cjk_rad_87","cjk_rad_88","cjk_rad_89","cjk_rad_90"], name: "毛氏气水火爪父爻爿"},cjk_rad_rA: { components: ["cjk_rad_91","cjk_rad_92","cjk_rad_93","cjk_rad_94","cjk_rad_95","cjk_rad_96","cjk_rad_97","cjk_rad_98","cjk_rad_99"], name: "片牙牛犬玄玉瓜瓦甘"},cjk_rad_rB: { components: ["cjk_rad_A0","cjk_rad_A1","cjk_rad_A2","cjk_rad_A3","cjk_rad_A4","cjk_rad_A5","cjk_rad_A6","cjk_rad_A7","cjk_rad_A8"], name: "生用田疋疒癶白皮皿"},cjk_rad_rC: { components: ["cjk_rad_A9","cjk_rad_B0","cjk_rad_B1","cjk_rad_B2","cjk_rad_B3","cjk_rad_B4","cjk_rad_B5","cjk_rad_B6","cjk_rad_B7"], name: "目矛矢石示禸禾穴立"},cjk_rad_rD: { components: ["cjk_rad_B8","cjk_rad_B9","cjk_rad_C0","cjk_rad_c0","cjk_rad_C1","cjk_rad_C2","cjk_rad_C3","cjk_rad_C4","cjk_rad_C5","cjk_rad_C6"], name: "竹米糸缶网羊羽老而"},cjk_rad_rE: { components: ["cjk_rad_C7","cjk_rad_C8","cjk_rad_C9","cjk_rad_D0","cjk_rad_D1","cjk_rad_D2","cjk_rad_D3","cjk_rad_D4","cjk_rad_D5"], name: "耒耳聿肉臣自至臼舌"},cjk_rad_rF: { components: ["cjk_rad_D6","cjk_rad_D7","cjk_rad_D8","cjk_rad_D9","cjk_rad_E0","cjk_rad_E1","cjk_rad_E2","cjk_rad_E3","cjk_rad_E4"], name: "舛舟艮色艸虍虫血行"},cjk_rad_rG: { components: ["cjk_rad_E5","cjk_rad_E6","cjk_rad_E7","cjk_rad_E8","cjk_rad_E9","cjk_rad_e9","cjk_rad_F0","cjk_rad_F1","cjk_rad_F2","cjk_rad_F3"], name: "衣西見角言谷豆豕豸"},cjk_rad_rH: { components: ["cjk_rad_F4","cjk_rad_F5","cjk_rad_F6","cjk_rad_F7","cjk_rad_F8","cjk_rad_F9","cjk_rad_G0","cjk_rad_G1","cjk_rad_G2"], name: "貝赤走足身車辛辰辵"},cjk_rad_rI: { components: ["cjk_rad_G3","cjk_rad_G4","cjk_rad_G5","cjk_rad_G6","cjk_rad_G7","cjk_rad_g7","cjk_rad_G8","cjk_rad_G9","cjk_rad_g9","cjk_rad_H0","cjk_rad_H1"], name: "邑酉釆里金長門阜隶"},cjk_rad_rJ: { components: ["cjk_rad_H2","cjk_rad_H3","cjk_rad_H4","cjk_rad_H5","cjk_rad_H6","cjk_rad_H7","cjk_rad_H8","cjk_rad_H9","cjk_rad_I0"], name: "隹雨青非面革韋韭音"},cjk_rad_rK: { components: ["cjk_rad_I1","cjk_rad_I2","cjk_rad_I3","cjk_rad_I4","cjk_rad_I5","cjk_rad_I6","cjk_rad_I7","cjk_rad_I8","cjk_rad_I9"], name: "頁風飛食首香馬骨高"},cjk_rad_rL: { components: ["cjk_rad_J0","cjk_rad_J1","cjk_rad_J2","cjk_rad_J3","cjk_rad_J4","cjk_rad_J5","cjk_rad_j5","cjk_rad_J6","cjk_rad_j6","cjk_rad_J7","cjk_rad_J8"], name: "髟鬥鬯鬲鬼魚鳥鹵鹿"},cjk_rad_rM: { components: ["cjk_rad_J9","cjk_rad_K0","cjk_rad_K1","cjk_rad_K2","cjk_rad_K3","cjk_rad_K4","cjk_rad_K5","cjk_rad_K6","cjk_rad_K7"], name: "麥麻黃黍黑黹黽鼎鼓"},cjk_rad_rN: { components: ["cjk_rad_K8","cjk_rad_K9","cjk_rad_L0","cjk_rad_L1","cjk_rad_L2","cjk_rad_L3","cjk_rad_L4","cjk_rad_L5"],              name: "鼠鼻齊齒龍龜龠…"},
    yi_syllabl: { components: ["yi_syllabl"], nameEN: "Yi Syllables",        nameFR: "Syllabaire yi des Monts frais", nameJP: "イ文字"},
    yi_radical: { components: ["yi_radical"], nameEN: "Yi Radicals",         nameFR: "Clés yi",                 nameJP: "イ文字部首"},


    all_glyphs:  { components: null, nameEN: "All glyphs", nameFR: "Tous les glyphes", nameJP: "すべての文字" },
    // latin-script groups
    latin_uni:  { components: ["basiclatin","latin1supp","latinext_a","latinext_b","ipa_ext"],
                  nameEN: "All Unicode blocks",
                  nameFR: "Blocs Unicode",
                  nameJP: "すべてのブロック"},
    latin_acct: { components: ["basiclatin","latin1supp","latinext_a","latinext_b","ipa_ext"],
                  nameEN: "Organised by accent",
                  nameFR: "Organisé par accent",
                  nameJP: "すべての文字"},
    latin_lett: { components: ["basiclatin","latin1supp","latinext_a","latinext_b","ipa_ext"],
                  nameEN: "Organised by letter",
                  nameFR: "Organisé par lettre",
                  nameJP: "すべての文字"},

    enlanguage: { components: ["alphab_lat","punctu_eng","numeral_en","more_punct","basic_math","buttonicon"],              nameEN: "English",   nameFR: "Anglais",      nameJP:"英語"},
    frlanguage: { components: ["alphab_lat","accent_fra","punctu_fra","numeral_fr","more_punct","basic_math","buttonicon"], nameEN: "French",    nameFR: "Français",     nameJP:"フランス語"},
    nllanguage: { components: ["alphab_lat","accent_nld","punctu_eng","numeral_en","more_punct","basic_math","buttonicon"], nameEN: "Dutch",     nameFR: "Néerlandais",  nameJP:"とオランダ語"},
    delanguage: { components: ["alphab_lat","accent_ger","punctu_ger","numeral_en","more_punct","basic_math","buttonicon"], nameEN: "German",    nameFR: "Allemand",     nameJP:"ドイツ語"},
    eslanguage: { components: ["alphab_lat","accent_spa","punctu_spa","numeral_oa","more_punct","basic_math","buttonicon"], nameEN: "Spanish",   nameFR: "Espagnol",     nameJP:"スペイン語"},
    ptlanguage: { components: ["alphab_lat","accent_por","punctu_p_i","numeral_oa","more_punct","basic_math","buttonicon"], nameEN: "Portuguese",nameFR: "Portugais",    nameJP:"ポルトガル語"},
    itlanguage: { components: ["alphab_lat","accent_ita","punctu_p_i","numeral_oa","more_punct","basic_math","buttonicon"], nameEN: "Italian",   nameFR: "Italien",      nameJP:"イタリア語"},
    islanguage: { components: ["alphab_isl","punctu_isl","numeral_en","more_punct","basic_math","buttonicon"],              nameEN: "Icelandic", nameFR: "Islandais",    nameJP:"アイスランド語"},
    dk_no_lang: { components: ["alphab_dkn","accent_dkn","punctu_dkn","numeral_en","more_punct","basic_math","buttonicon"], nameEN: "Danish and Norwegian", nameFR: "Danois et norvégien", nameJP:"デンマーク語とノルウェー語"},
    sv_fi_lang: { components: ["alphab_swe","accent_svf","punctu_eng","numeral_en","more_punct","basic_math","buttonicon"], nameEN: "Swedish and Finnish",  nameFR: "Suédois et finnois",  nameJP:"スウェーデン語とフィンランド語"},
    sami_langs: { components: ["alphab_lat","accent_smi","punctu_eng","numeral_en","more_punct","basic_math","buttonicon"], nameEN: "Sámi languages",nameFR: "Langues sames",  nameJP:"サーミ諸語"},

    greek_mono: { components: ["alphab_grk","buttonicon"], nameEN: "Greek",           nameFR: "Grec",             nameJP: "ギリシア語"},
    greek_poly: { components: [], nameEN: "Polytonic Greek", nameFR: "Grec polytonique", nameJP: "ポリトニックギリシャ語"},

    kana_punct: { components: ["basic_hira","other_hira","basic_kata","other_kata","punctu_jpn","numeral_en","buttonicon"], nameEN: "Kana and punctuation", nameFR: "Kana et ponctuation", nameJP:"仮名と句読点"},
    kanji_comm: { components: ["kanji_nums"], nameEN: "Kanji by meaning", nameFR: "Kanji par sens", nameJP:"意味別の漢字"},
    kyouiku_kj: { components: ["jouyou_gr1","jouyou_gr2","jouyou_gr3","jouyou_gr4","jouyou_gr5","jouyou_gr6"], nameEN: "Kyōiku kanji", nameFR: "Kyōiku kanji", nameJP:"教育漢字"},
    jouyou_kji: { components: ["jouyou_grS"], nameEN: "Grade S jōyō kanji", nameFR: "Jōyō kanji du secondaire", nameJP:"中学校で習う漢字"},
    jouyou_rad: { components: ["jouyou_r01","jouyou_r02","jouyou_r03","jouyou_r04","jouyou_r05","jouyou_r06","jouyou_r07","jouyou_r08","jouyou_r09","jouyou_r10"], nameEN: "Jōyō kanji by radical", nameFR: "Jōyō kanji par clé", nameJP:"部首別の常用漢字"},
    jinmeiyou:  { components: ["jinmeiyou" ],nameEN:"Jinmeiyō kanji", nameFR:"Jinmeiyō kanji", nameJP:"人名用漢字"},
    
}

let baseLetterFromDiacritic = {
    // A
    "À":"A", "Á":"A", "Â":"A", "Å":"A", "Ä":"A", "Ã":"A", "Ā":"A", "Ă":"A", "Ǎ":"A",
    "Ą":"A", "Ȧ":"A", "Ạ":"A", "Ȁ":"A", "À":"A", "Ả":"A", "Ȃ":"A", "Ȃ":"A", "Ḁ":"A", // A
    "Ắ":"Ă", "Ặ":"Ă", "Ằ":"Ă", "Ẳ":"Ă", "Ẵ":"Ă", // A breve
    "Ấ":"Â", "Ậ":"Â", "Ầ":"Â", "Ẩ":"Â", "Ẫ":"Â", // A ccfx
    "Ǟ":"Ä", "Ǡ":"Ȧ", "Ǻ":"Å", // A trema, dot, ring
    // a
    "à":"a", "á":"a", "â":"a", "å":"a", "ä":"a", "ã":"a", "ā":"a", "ă":"a", "ǎ":"a", "ẚ":"a",
    "ą":"a", "ȧ":"a", "ạ":"a", "ȁ":"a", "à":"a", "ả":"a", "ȃ":"a", "ȃ":"a", "ḁ":"a",
    "ắ":"ă", "ặ":"ă", "ằ":"ă", "ẳ":"ă", "ẵ":"ă", // a breve
    "ấ":"â", "ậ":"â", "ầ":"â", "ẩ":"â", "ẫ":"â", // a ccfx
    "ǟ":"ä", "ǡ":"ȧ", "ǻ":"å", // a trema, dot, ring

    "Ǽ":"Æ", "Ǣ":"Æ", "ǽ":"æ", "ǣ":"æ", // Æ
    "Ḃ":"B", "Ḅ":"B", "Ḇ":"B", "ḃ":"b", "ḅ":"b", "ḇ":"b", // B
    "Ć":"C", "Č":"C", "Ç":"C", "Ḉ":"Ç", "Ĉ":"C", "Ċ":"C", "ć":"c", "č":"c", "ç":"c", "ḉ":"ç", "ĉ":"c", "ċ":"c", // C
    // D
    "Ď":"D", "Ḑ":"D", "Ḓ":"D", "Ḋ":"D", "Ḍ":"D", "Ḏ":"D", "Đ":"D", "Ð":"D",
    "ď":"d", "ḑ":"d", "ḓ":"d", "ḋ":"d", "ḍ":"d", "ḏ":"d", "đ":"d",


    

    "が":"か","ぎ":"き","ぐ":"く","げ":"け","ご":"こ", // かきくけこ
    "ざ":"さ","じ":"し","ず":"す","ぜ":"せ","ぞ":"そ", // さしすせそ
    "だ":"た","ぢ":"ち","づ":"つ","で":"て","ど":"と", // たちつてと
    "ば":"は","び":"ひ","ぶ":"ふ","べ":"へ","ぼ":"ほ", // はひふへほ
    "ぱ":"は","ぴ":"ひ","ぷ":"ふ","ぺ":"へ","ぽ":"ほ", // はひふへほ

    "ヘ":"へ","へ":"ヘ",
    "ガ":"カ","ギ":"キ","グ":"ク","ゲ":"ケ","ゴ":"コ", // カキクケコ
    "ザ":"サ","ジ":"シ","ズ":"ス","ゼ":"セ","ゾ":"ソ", // サシスセソ
    "ダ":"タ","ヂ":"チ","ヅ":"ツ","デ":"テ","ド":"ト", // タチツテト
    "バ":"ハ","ビ":"ヒ","ブ":"フ","ベ":"ヘ","ボ":"ホ", // ハヒフヘホ
    "パ":"ハ","ピ":"ヒ","プ":"フ","ペ":"ヘ","ポ":"ホ", // ハヒフヘホ

    "ゔ":"う","ヴ":"ウ", // うウ
    
    


}

let stringL10n = {
    new_font:    { nameEN: "New...", nameFR: "Nouveau...",nameJP: "新しいフォント" },
    export_fnt:  { nameEN: "Export", nameFR: "Exporter",  nameJP: "として保存" },

    savebrowser: { nameEN: "Save",         nameFR: "Sauvegarder", nameJP: "保存" },
    loadbrowser: { nameEN: "Restore save", nameFR: "Restaurer",   nameJP: "ロード" },
    autosave:    { nameEN: "Autosave",     nameFR: "Sauvegarde auto", nameJP: "自動保存" },

    
    autoadvance: { nameEN: "Auto-update advance width", nameFR: "Régler la chasse automatiquement", nameJP: "文字幅を自動的に調整する" },
    setguide:    { nameEN: "Set guide",       nameFR: "Ajuster",             nameJP: "ガイドを設定"      },
    baseline:    { nameEN: "Baseline",        nameFR: "Ligne de base",       nameJP: "ベースライン"      },
    x_height:    { nameEN: "x-height",        nameFR: "Hauteur d'x",         nameJP: "xの高さ"          },
    capheight:   { nameEN: "Cap height",      nameFR: "Hauteur de capitale", nameJP: "大文字の高さ"      },
    
    copyover1: { nameEN: "Copy over", nameFR: "Copier",    nameJP: "文字の" },
    copyoverg: { nameEN: "Glyph",     nameFR: "Glyphe",    nameJP: "らグリフ" },
    copyoverk: { nameEN: "Kerning",   nameFR: "Crénage",   nameJP: "カーニング" },
    copyover2: { nameEN: "from",      nameFR: "du glyphe", nameJP: "をコピー" },

    newfontdim: { nameEN: "New font dimensions: %w × %h", nameFR: "Nouvelles dimensions de la police: %w × %h", nameJP: "フォントの新しい寸法: %w × %h" },


    glypheditor: { nameEN: "Glyph editor",    nameFR: "Editeur de glyphes",  nameJP: "グリフエディタ" },
    fontpreview: { nameEN: "Font preview",    nameFR: "Aperçu de la police", nameJP: "フォントプレビュー" },
    kerningpair: { nameEN: "Kerning pairs",   nameFR: "Paires de crénage",   nameJP: "カーニング" },

    spacestr:    { nameEN: "'space'",   nameFR: "'espace'", nameJP: "'スペース'" },
    emptystr:    { nameEN: "'(no items)'", nameFR: "'(vide)'", nameJP: "'(空っぽ)'" },
    countstr:    { nameEN: "Glyph count: ", nameFR: "Nombre de glyphes : ", nameJP: "文字の数: " },
    untitled:    { nameEN: "untitled", nameFR: "sans titre", nameJP: "無題" },
}

function getLocalisedString(key) {
    switch (language) {
        case "fr":             return stringL10n[key].nameFR ?? "";
        case "jp":             return stringL10n[key].nameJP ?? "";
        default: case "en-US": return stringL10n[key].nameEN ?? "";
    }
}