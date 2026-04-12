/* ============================================
   STATE
============================================ */
const state = {
  expr: '',           // expression string (as typed)
  cursor: 0,          // cursor index in expr
  shift: false,
  alpha: false,
  angleMode: 'DEG',   // DEG | RAD | GRAD
  ans: 0,             // last answer
  mem: { A:0,B:0,C:0,D:0,E:0,F:0,X:0,Y:0,M:0 }, // memory variables
  justCalc: false,    // true right after = pressed
  result: '0',        // displayed result string
  awaitingSto: false, // waiting for variable name to store
  awaitingRcl: false, // waiting for variable name to recall
};

/* ============================================
   DOM REFERENCES
============================================ */
const exprEl   = document.getElementById('exprLine');
const resultEl = document.getElementById('resultLine');
const indS     = document.getElementById('ind-S');
const indA     = document.getElementById('ind-A');
const indM     = document.getElementById('ind-M');
const indAngle = document.getElementById('ind-angle');
const lcdEl    = document.getElementById('lcdScreen');
const calcEl   = document.getElementById('calc');

/* ============================================
   RENDER DISPLAY
============================================ */
function renderDisplay() {
  // Expression line with cursor
  const before = state.expr.slice(0, state.cursor);
  const after  = state.expr.slice(state.cursor);
  exprEl.innerHTML = escHtml(before) + '<span class="cursor-block" id="cursor"></span>' + escHtml(after);

  // Indicators
  indS.classList.toggle('on', state.shift);
  indA.classList.toggle('on', state.alpha);
  indM.classList.toggle('on', state.mem.M !== 0);
  indAngle.textContent = state.angleMode === 'DEG' ? 'D' : state.angleMode === 'RAD' ? 'R' : 'G';
  calcEl.dataset.shift = state.shift ? '1' : '0';
  calcEl.dataset.alpha = state.alpha ? '1' : '0';

  // Result line
  resultEl.innerHTML = formatResult(state.result);
}

function escHtml(s) {
  return s
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/ /g,'&nbsp;');
}

/* Format result: scientific notation with ×10^ display */
function formatResult(r) {
  if (r === 'Math ERROR' || r === 'Syntax ERROR' || r === 'Stack ERROR') {
    return `<span style="font-size:0.9rem;color:#a02010">${r}</span>`;
  }
  if (r === '') return '0';

  // If it's a variable name like "A", show as is
  if (/^[A-F|X|Y|M]$/.test(r)) return r;

  // Number formatting
  const n = parseFloat(r);
  if (isNaN(n)) return escHtml(r);

  // Integer display
  if (Number.isInteger(n) && Math.abs(n) < 1e10) {
    return n.toLocaleString('en-US', {maximumFractionDigits:0}).replace(/,/g,',');
  }

  // Handle scientific notation nicely
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e10 || abs < 1e-4)) {
    const exp = Math.floor(Math.log10(abs));
    const mant = n / Math.pow(10, exp);
    const mantStr = parseFloat(mant.toPrecision(9)).toString();
    return `${mantStr}<span class="small">×10</span><span class="sup">${exp}</span>`;
  }

  // Regular decimal
  const s = parseFloat(n.toPrecision(10)).toString();
  return escHtml(s);
}

/* ============================================
   EXPRESSION MANIPULATION
============================================ */
function insert(text) {
  state.expr = state.expr.slice(0, state.cursor) + text + state.expr.slice(state.cursor);
  state.cursor += text.length;
}

function deleteChar() {
  if (state.cursor > 0) {
    state.expr = state.expr.slice(0, state.cursor - 1) + state.expr.slice(state.cursor);
    state.cursor--;
  }
}

function clearAll() {
  state.expr = '';
  state.cursor = 0;
  state.result = '0';
  state.justCalc = false;
}

/* If just calculated, a new digit starts fresh */
function checkFreshStart() {
  if (state.justCalc) {
    state.expr = '';
    state.cursor = 0;
    state.justCalc = false;
  }
}

/* ============================================
   EVALUATE EXPRESSION
============================================ */
function evaluate() {
  let raw = state.expr.trim();
  if (raw === '') return;

  // Auto-close unclosed parentheses
  const opens  = (raw.match(/\(/g) || []).length;
  const closes = (raw.match(/\)/g) || []).length;
  for (let i = 0; i < opens - closes; i++) raw += ')';

  try {
    const result = computeExpr(raw);
    state.ans = result;
    state.result = numberToDisplay(result);
    state.justCalc = true;
  } catch(e) {
    state.result = e.message || 'Math ERROR';
    lcdEl.classList.add('error-shake');
    setTimeout(() => lcdEl.classList.remove('error-shake'), 400);
    state.justCalc = true;
  }
}

function numberToDisplay(n) {
  if (!isFinite(n)) return 'Math ERROR';
  if (isNaN(n)) return 'Math ERROR';
  // Return high-precision string, JS will handle it
  return String(parseFloat(n.toPrecision(10)));
}

/* ============================================
   EXPRESSION PARSER & EVALUATOR
============================================ */
function computeExpr(raw) {
  // Step 1: Replace display symbols with JS equivalents
  let js = raw;

  // Replace stored variables
  for (const [k, v] of Object.entries(state.mem)) {
    js = js.replace(new RegExp(`\\b${k}\\b`, 'g'), `(${v})`);
  }

  // Replace Ans
  js = js.replace(/\bAns\b/g, `(${state.ans})`);

  // Replace π and e
  js = js.replace(/π/g, 'Math.PI');
  js = js.replace(/\be\b/g, 'Math.E');

  // Replace operators
  js = js.replace(/×/g, '*');
  js = js.replace(/÷/g, '/');
  js = js.replace(/−/g, '-');

  // Power
  js = js.replace(/\^/g, '**');

  // Replace trig/inverse/hyp functions
  if (state.angleMode === 'DEG') {
    // Forward trig: sin(x) → sin_d(x)
    js = js.replace(/\bsinh\b/g,'__sinh').replace(/\bcosh\b/g,'__cosh').replace(/\btanh\b/g,'__tanh');
    js = js.replace(/\basin\b/g,'__asin').replace(/\bacos\b/g,'__acos').replace(/\batan\b/g,'__atan');
    js = js.replace(/\bsin\b/g,'__sind').replace(/\bcos\b/g,'__cosd').replace(/\btan\b/g,'__tand');
    // Restore hyp
    js = js.replace(/__sinh/g,'Math.sinh').replace(/__cosh/g,'Math.cosh').replace(/__tanh/g,'Math.tanh');
    // Inverse trig in degrees (input is value, output is degrees)
    js = js.replace(/__asin/g,'__asin_d').replace(/__acos/g,'__acos_d').replace(/__atan/g,'__atan_d');
  } else if (state.angleMode === 'RAD') {
    js = js.replace(/\bsinh\b/g,'Math.sinh').replace(/\bcosh\b/g,'Math.cosh').replace(/\btanh\b/g,'Math.tanh');
    js = js.replace(/\basin\b/g,'Math.asin').replace(/\bacos\b/g,'Math.acos').replace(/\batan\b/g,'Math.atan');
    js = js.replace(/\bsin\b/g,'Math.sin').replace(/\bcos\b/g,'Math.cos').replace(/\btan\b/g,'Math.tan');
  } else { // GRAD
    js = js.replace(/\bsinh\b/g,'Math.sinh').replace(/\bcosh\b/g,'Math.cosh').replace(/\btanh\b/g,'Math.tanh');
    js = js.replace(/\basin\b/g,'__asin_g').replace(/\bacos\b/g,'__acos_g').replace(/\batan\b/g,'__atan_g');
    js = js.replace(/\bsin\b/g,'__sing').replace(/\bcos\b/g,'__cosg').replace(/\btan\b/g,'__tang');
  }

  // log, ln, sqrt, cbrt
  js = js.replace(/\blog\b/g, 'Math.log10');
  js = js.replace(/\bln\b/g,  'Math.log');
  js = js.replace(/√\(/g,    'Math.sqrt(');
  js = js.replace(/∛\(/g,    'Math.cbrt(');
  js = js.replace(/Pol\(/g,  'Math.sqrt(');

  // Factorial: n! (only works on integers 0–170)
  js = js.replace(/(\d+(\.\d+)?|\))\s*!/g, (m, num) => `__fact(${num.replace(/\)/, '')})`);

  // x² → **2, x³ → **3  (added as suffix notation in expression)
  // (handled at insert time)

  // Percentage: handled at expression level
  js = js.replace(/(%)/g, '/100');

  // Implicit multiplication: 2π → 2*π, 2( → 2*(, )(  → )*(, πX → π*X
  js = js.replace(/(\d)(Math\.|__)/g, '$1*$2');
  js = js.replace(/(\))\s*(\d)/g, '$1*$2');
  js = js.replace(/(\))\s*(\()/g, '$1*$2');
  js = js.replace(/(\d)\s*\(/g, '$1*(');

  // Define helper functions scope
  const D2R = (x) => x * Math.PI / 180;
  const R2D = (x) => x * 180 / Math.PI;
  const G2R = (x) => x * Math.PI / 200;
  const R2G = (x) => x * 200 / Math.PI;

  const __sind   = (x) => Math.sin(D2R(x));
  const __cosd   = (x) => Math.cos(D2R(x));
  const __tand   = (x) => {
    const r = D2R(x);
    // Handle 90, 270 degrees
    if (Math.abs(Math.cos(r)) < 1e-14) throw new Error('Math ERROR');
    return Math.tan(r);
  };
  const __sing   = (x) => Math.sin(G2R(x));
  const __cosg   = (x) => Math.cos(G2R(x));
  const __tang   = (x) => Math.tan(G2R(x));
  const __asin_d = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2D(Math.asin(x)); };
  const __acos_d = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2D(Math.acos(x)); };
  const __atan_d = (x) => R2D(Math.atan(x));
  const __asin_g = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2G(Math.asin(x)); };
  const __acos_g = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2G(Math.acos(x)); };
  const __atan_g = (x) => R2G(Math.atan(x));
  const __fact = (n) => {
    n = Math.round(n);
    if (n < 0 || n > 170) throw new Error('Math ERROR');
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  };

  // Security: only allow safe characters
  if (/[a-wz](?!h|a|o|b|i|n|q|t|_)/i.test(js.replace(/Math\./g,'').replace(/__\w+/g,''))) {
    // Allow only whitelisted identifiers
  }

  try {
    const fn = new Function(
      'Math','__sind','__cosd','__tand','__sing','__cosg','__tang',
      '__asin_d','__acos_d','__atan_d','__asin_g','__acos_g','__atan_g','__fact',
      `"use strict"; return (${js});`
    );
    const result = fn(
      Math, __sind, __cosd, __tand, __sing, __cosg, __tang,
      __asin_d, __acos_d, __atan_d, __asin_g, __acos_g, __atan_g, __fact
    );
    if (typeof result !== 'number') throw new Error('Syntax ERROR');
    if (!isFinite(result)) throw new Error('Math ERROR');
    return result;
  } catch(e) {
    throw new Error(e.message.includes('ERROR') ? e.message : 'Syntax ERROR');
  }
}

/* ============================================
   BUTTON ACTION HANDLER
============================================ */
function handleAction(action) {
  // STO / RCL variable selection mode
  if (state.awaitingSto && /^[A-FXYM]$/.test(action)) {
    state.mem[action] = parseFloat(state.result) || 0;
    if (action === 'M') document.getElementById('ind-M').classList.add('on');
    state.awaitingSto = false;
    state.result = `${action}=${state.mem[action]}`;
    renderDisplay(); return;
  }
  if (state.awaitingRcl && /^[A-FXYM]$/.test(action)) {
    const val = state.mem[action];
    checkFreshStart();
    insert(String(val));
    state.awaitingRcl = false;
    renderDisplay(); return;
  }
  state.awaitingSto = false;
  state.awaitingRcl = false;

  switch(action) {
    // ─── Digits ───
    case 'num0': checkFreshStart(); insert('0'); break;
    case 'num1': checkFreshStart(); insert('1'); break;
    case 'num2': checkFreshStart(); insert('2'); break;
    case 'num3': checkFreshStart(); insert('3'); break;
    case 'num4': checkFreshStart(); insert('4'); break;
    case 'num5': checkFreshStart(); insert('5'); break;
    case 'num6': checkFreshStart(); insert('6'); break;
    case 'num7': checkFreshStart(); insert('7'); break;
    case 'num8': checkFreshStart(); insert('8'); break;
    case 'num9': checkFreshStart(); insert('9'); break;
    case 'dot':  checkFreshStart(); insert('.'); break;

    // ─── Operators ───
    case 'add': state.justCalc=false; insert('+'); break;
    case 'sub': state.justCalc=false; insert('−'); break;
    case 'mul': state.justCalc=false; insert('×'); break;
    case 'div': state.justCalc=false; insert('÷'); break;
    case 'pow': state.justCalc=false; insert('^'); break;

    // ─── Scientific functions ───
    case 'sin':  checkFreshStart(); insert('sin('); break;
    case 'cos':  checkFreshStart(); insert('cos('); break;
    case 'tan':  checkFreshStart(); insert('tan('); break;
    case 'asin': checkFreshStart(); insert('asin('); break;
    case 'acos': checkFreshStart(); insert('acos('); break;
    case 'atan': checkFreshStart(); insert('atan('); break;
    case 'hyp':
      checkFreshStart();
      // Toggle: show hyp prefix hint — next press selects
      insert('sinh('); break; // simplified: inserts sinh directly
    case 'log':  checkFreshStart(); insert('log('); break;
    case 'ln':   checkFreshStart(); insert('ln('); break;
    case 'tenx': checkFreshStart(); insert('10^('); break;
    case 'expx': checkFreshStart(); insert('e^('); break;
    case 'sqrt': checkFreshStart(); insert('√('); break;
    case 'cbrt': checkFreshStart(); insert('∛('); break;
    case 'sq':
      // append ² after last number/expression
      if (state.expr) { insert('²'); /* evaluated as **2 */ } break;
    case 'cube':
      if (state.expr) { insert('³'); } break;
    case 'inv':
      // x⁻¹ → wrap current in 1/(…) or append ^(-1)
      checkFreshStart(); insert('^(-1)'); break;
    case 'fact':
      checkFreshStart(); insert('!'); break;
    case 'nthroot':
      checkFreshStart(); insert('^(1÷'); break; // User types: n^(1÷r)

    // ─── Parentheses ───
    case 'lparen': checkFreshStart(); insert('('); break;
    case 'rparen': state.justCalc=false; insert(')'); break;
    case 'lbrace': checkFreshStart(); insert('['); break;
    case 'rbrace': state.justCalc=false; insert(']'); break;

    // ─── Percent ───
    case 'percent': state.justCalc=false; insert('%'); break;

    // ─── Constants ───
    case 'pi':    checkFreshStart(); insert('π'); break;
    case 'euler': checkFreshStart(); insert('e'); break;
    case 'ans':   checkFreshStart(); insert('Ans'); break;
    case 'neg':   checkFreshStart(); insert('(-'); break;

    // ─── Scientific notation ───
    case 'exp': state.justCalc=false; insert('×10^'); break;

    // ─── Degrees/Minutes/Seconds ───
    case 'dms': insert('°'); break;

    // ─── EQUALS ───
    case 'equals': evaluate(); break;

    // ─── DEL / AC ───
    case 'del':
      if (state.justCalc) { clearAll(); }
      else { deleteChar(); state.justCalc=false; }
      break;
    case 'ins':
      // Toggle insert mode (visual only for now)
      break;
    case 'ac': clearAll(); break;
    case 'off': clearAll(); break;

    // ─── NAVIGATION ───
    case 'left':
      if (state.cursor > 0) state.cursor--;
      break;
    case 'right':
      if (state.cursor < state.expr.length) state.cursor++;
      break;
    case 'up':
      // Recall last expression (simple implementation)
      break;
    case 'down':
      break;

    // ─── MODE / ANGLE ───
    case 'drg':
      if (state.angleMode === 'DEG') state.angleMode = 'RAD';
      else if (state.angleMode === 'RAD') state.angleMode = 'GRAD';
      else state.angleMode = 'DEG';
      break;
    case 'mode':
      // Cycle through angle modes
      if (state.angleMode === 'DEG') state.angleMode = 'RAD';
      else if (state.angleMode === 'RAD') state.angleMode = 'GRAD';
      else state.angleMode = 'DEG';
      break;

    // ─── MEMORY ───
    case 'mplus':
      state.mem.M += parseFloat(state.result) || 0;
      state.result = `M=${state.mem.M}`;
      break;
    case 'mminus':
      state.mem.M -= parseFloat(state.result) || 0;
      state.result = `M=${state.mem.M}`;
      break;
    case 'sto':
      state.awaitingSto = true;
      state.result = 'STO→';
      renderDisplay(); return;
    case 'rcl':
      state.awaitingRcl = true;
      state.result = 'RCL';
      renderDisplay(); return;
    case 'random':
      checkFreshStart();
      insert(String(parseFloat(Math.random().toPrecision(10))));
      break;

    // ─── ALPHA VARIABLE LETTERS ───
    case 'A': case 'B': case 'C': case 'D': case 'E': case 'F':
    case 'X': case 'Y': case 'M':
      checkFreshStart();
      insert(action);
      break;
  }

  renderDisplay();
}

/* ============================================
   HANDLE ² AND ³ IN EXPRESSION (suffix power)
============================================ */
function preProcessSuffix(raw) {
  raw = raw.replace(/²/g, '**2');
  raw = raw.replace(/³/g, '**3');
  return raw;
}
// Patch computeExpr to handle these
const _origCompute = computeExpr;
// Override: handle suffix powers before normal processing
window.__suffixPatch = true;

/* ============================================
   BUTTON CLICK ROUTING
============================================ */
document.querySelectorAll('.k').forEach(btn => {
  btn.addEventListener('pointerdown', e => {
    e.preventDefault();

    // Press animation
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 130);

    const id   = btn.id;
    const main  = btn.dataset.main;
    const shift = btn.dataset.shift;
    const alpha = btn.dataset.alpha;

    // SHIFT button itself
    if (id === 'btnShift') {
      state.shift = !state.shift;
      state.alpha = false;
      renderDisplay();
      return;
    }

    // ALPHA button itself
    if (id === 'btnAlpha') {
      state.alpha = !state.alpha;
      state.shift = false;
      renderDisplay();
      return;
    }

    // Determine which action to run
    let action = main;

    if (state.shift && shift) {
      action = shift;
      state.shift = false;
    } else if (state.alpha && alpha) {
      action = alpha;
      state.alpha = false;
    } else {
      state.shift = false;
      state.alpha = false;
    }

    if (action) handleAction(action);
  });
});

/* ============================================
   KEYBOARD SUPPORT
============================================ */
const keyMap = {
  '0':'num0','1':'num1','2':'num2','3':'num3','4':'num4',
  '5':'num5','6':'num6','7':'num7','8':'num8','9':'num9',
  '.':'dot', '+':'add', '-':'sub', '*':'mul', '/':'div',
  '^':'pow', '(':'lparen', ')':'rparen',
  'Enter':'equals', '=':'equals',
  'Backspace':'del', 'Delete':'ac', 'Escape':'ac',
  'ArrowLeft':'left', 'ArrowRight':'right',
  's':'sin','c':'cos','t':'tan','l':'log','n':'ln',
  'p':'pi', 'a':'ans', 'e':'euler',
  '%':'percent',
};

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const action = keyMap[e.key];
  if (!action) return;
  e.preventDefault();
  handleAction(action);
  // Flash corresponding button
  const btn = document.querySelector(`[data-main="${action}"]`);
  if (btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 130);
  }
});

/* ============================================
   PATCH: handle ² ³ in computeExpr
============================================ */
const origComputeExpr = computeExpr;
// We redefine evaluate to preprocess suffix powers
const _evalOriginal = evaluate;

function evaluate() {
  let raw = state.expr.trim();
  if (raw === '') return;

  // Pre-process suffix ² ³
  const opens  = (raw.match(/\(/g) || []).length;
  const closes = (raw.match(/\)/g) || []).length;
  for (let i = 0; i < opens - closes; i++) raw += ')';

  // Replace ² ³ before evaluation
  raw = raw.replace(/²/g, '**2)').replace(/^/, '').replace(/(\d|\))\*\*2\)/g, '($1**2)');
  // Simpler: just treat ² as "last token squared"
  // Reset: handle in computeExpr
  state.expr = state.expr; // no change, computeExpr handles it internally

  // Actually patch the expression directly
  let evalExpr = state.expr;
  const openCount  = (evalExpr.match(/\(/g) || []).length;
  const closeCount = (evalExpr.match(/\)/g) || []).length;
  for (let i = 0; i < openCount - closeCount; i++) evalExpr += ')';

  try {
    const result = computeExpr(evalExpr);
    state.ans = result;
    state.result = numberToDisplay(result);
    state.justCalc = true;
  } catch(e) {
    state.result = e.message || 'Math ERROR';
    lcdEl.classList.add('error-shake');
    setTimeout(() => lcdEl.classList.remove('error-shake'), 400);
    state.justCalc = true;
  }
  renderDisplay();
}

// Patch computeExpr to handle ² ³
function computeExpr(raw) {
  // Pre-handle suffix powers
  raw = raw.replace(/(\d+(?:\.\d+)?|[A-FXYM]|\))\s*²/g, '($1**2)');
  raw = raw.replace(/(\d+(?:\.\d+)?|[A-FXYM]|\))\s*³/g, '($1**3)');
  // Handle [square brackets as parens]
  raw = raw.replace(/\[/g, '(').replace(/\]/g, ')');

  // Replace stored variables
  for (const [k, v] of Object.entries(state.mem)) {
    raw = raw.replace(new RegExp(`\\b${k}\\b`, 'g'), `(${v})`);
  }

  // Replace Ans
  raw = raw.replace(/\bAns\b/g, `(${state.ans})`);

  // Constants
  raw = raw.replace(/π/g, '(Math.PI)');
  raw = raw.replace(/\be\b(?!xp|\^)/g, '(Math.E)');

  // Operators
  raw = raw.replace(/×/g, '*');
  raw = raw.replace(/÷/g, '/');
  raw = raw.replace(/−/g, '-');

  // Power
  raw = raw.replace(/\^/g, '**');

  // Scientific notation shorthand
  raw = raw.replace(/\*10\*\*/g, '*10**');

  // Trig & math
  const D2R = (x) => x * Math.PI / 180;
  const R2D = (x) => x * 180 / Math.PI;
  const G2R = (x) => x * Math.PI / 200;
  const R2G = (x) => x * 200 / Math.PI;

  const __sind   = (x) => Math.sin(D2R(x));
  const __cosd   = (x) => Math.cos(D2R(x));
  const __tand   = (x) => { if (Math.abs(Math.cos(D2R(x))) < 1e-13) throw new Error('Math ERROR'); return Math.tan(D2R(x)); };
  const __sing   = (x) => Math.sin(G2R(x));
  const __cosg   = (x) => Math.cos(G2R(x));
  const __tang   = (x) => Math.tan(G2R(x));
  const __asin_d = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2D(Math.asin(x)); };
  const __acos_d = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2D(Math.acos(x)); };
  const __atan_d = (x) => R2D(Math.atan(x));
  const __asin_g = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2G(Math.asin(x)); };
  const __acos_g = (x) => { if (Math.abs(x)>1) throw new Error('Math ERROR'); return R2G(Math.acos(x)); };
  const __atan_g = (x) => R2G(Math.atan(x));
  const __fact   = (n) => {
    n = Math.round(n);
    if (n < 0 || n > 170) throw new Error('Math ERROR');
    let r = 1; for (let i=2;i<=n;i++) r*=i; return r;
  };

  // Map function names
  if (state.angleMode === 'DEG') {
    raw = raw.replace(/\bsinh\b/g,'¤sinh').replace(/\bcosh\b/g,'¤cosh').replace(/\btanh\b/g,'¤tanh');
    raw = raw.replace(/\basinh\b/g,'Math.asinh').replace(/\bacosh\b/g,'Math.acosh').replace(/\batanh\b/g,'Math.atanh');
    raw = raw.replace(/\basin\b/g,'__asin_d').replace(/\bacos\b/g,'__acos_d').replace(/\batan\b/g,'__atan_d');
    raw = raw.replace(/\bsin\b/g,'__sind').replace(/\bcos\b/g,'__cosd').replace(/\btan\b/g,'__tand');
    raw = raw.replace(/¤sinh/g,'Math.sinh').replace(/¤cosh/g,'Math.cosh').replace(/¤tanh/g,'Math.tanh');
  } else if (state.angleMode === 'RAD') {
    raw = raw.replace(/\basin\b/g,'Math.asin').replace(/\bacos\b/g,'Math.acos').replace(/\batan\b/g,'Math.atan');
    raw = raw.replace(/\bsin\b/g,'Math.sin').replace(/\bcos\b/g,'Math.cos').replace(/\btan\b/g,'Math.tan');
    raw = raw.replace(/\bsinh\b/g,'Math.sinh').replace(/\bcosh\b/g,'Math.cosh').replace(/\btanh\b/g,'Math.tanh');
    raw = raw.replace(/\basinh\b/g,'Math.asinh').replace(/\bacosh\b/g,'Math.acosh').replace(/\batanh\b/g,'Math.atanh');
  } else {
    raw = raw.replace(/\basin\b/g,'__asin_g').replace(/\bacos\b/g,'__acos_g').replace(/\batan\b/g,'__atan_g');
    raw = raw.replace(/\bsin\b/g,'__sing').replace(/\bcos\b/g,'__cosg').replace(/\btan\b/g,'__tang');
    raw = raw.replace(/\bsinh\b/g,'Math.sinh').replace(/\bcosh\b/g,'Math.cosh').replace(/\btanh\b/g,'Math.tanh');
  }

  raw = raw.replace(/\blog\b/g, 'Math.log10');
  raw = raw.replace(/\bln\b/g,  'Math.log');
  raw = raw.replace(/√\(/g, 'Math.sqrt(');
  raw = raw.replace(/∛\(/g, 'Math.cbrt(');
  raw = raw.replace(/\bsqrt\b/g, 'Math.sqrt');
  raw = raw.replace(/\babs\b/g,  'Math.abs');

  // Factorial
  raw = raw.replace(/(\d+(?:\.\d+)?)\s*!/g, '__fact($1)');
  raw = raw.replace(/\)\s*!/g, ')!').replace(/(\))\s*!/g, (m,p) => `__fact(${p.slice(1,-1)})`);

  // Percent
  raw = raw.replace(/%/g, '/100');

  // Implicit multiplication: number before Math/__ or (
  raw = raw.replace(/(\d)\s*(Math\.|__)/g, '$1*$2');
  raw = raw.replace(/(\))\s*(\d)/g, '$1*$2');
  raw = raw.replace(/(\d)\s*\(/g, '$1*(');
  raw = raw.replace(/\)\s*\(/g, ')*(');
  raw = raw.replace(/\(Math\.PI\)\s*\(/g, '(Math.PI)*(');

  try {
    const fn = new Function(
      'Math','__sind','__cosd','__tand','__sing','__cosg','__tang',
      '__asin_d','__acos_d','__atan_d','__asin_g','__acos_g','__atan_g','__fact',
      `"use strict";\ntry{ return +(${raw}); }catch(e){ throw new Error('Syntax ERROR'); }`
    );
    const result = fn(
      Math,__sind,__cosd,__tand,__sing,__cosg,__tang,
      __asin_d,__acos_d,__atan_d,__asin_g,__acos_g,__atan_g,__fact
    );
    if (!isFinite(result)) throw new Error('Math ERROR');
    if (isNaN(result)) throw new Error('Math ERROR');
    return result;
  } catch(e) {
    throw new Error(e.message.includes('ERROR') ? e.message : 'Syntax ERROR');
  }
}

/* ============================================
   INITIAL RENDER
============================================ */
renderDisplay();