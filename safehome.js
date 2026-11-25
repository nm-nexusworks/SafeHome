(function () {
  'use strict';

  var stage = document.getElementById('stage');
  var viewerStatus = document.getElementById('viewerStatus');
  function fail(msg) {
    if (viewerStatus) {
      viewerStatus.classList.add('error');
      viewerStatus.textContent = 'No se pudo mostrar el modelo 3D. ' + msg;
      viewerStatus.hidden = false;
      viewerStatus.setAttribute('role', 'alert');
      return;
    }
    var d = document.createElement('div');
    d.className = 'fail';
    d.textContent = msg;
    stage.appendChild(d);
  }
  if (typeof THREE === 'undefined') {
    fail('No se pudo cargar la librería 3D. Revisa tu conexión y recarga la página.');
    return;
  }
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  } catch (err) {
    fail('Este navegador no pudo iniciar gráficos 3D (WebGL).');
    return;
  }
  try {
    main();
  } catch (err) {
    console.error(err);
    fail('No se pudo construir el modelo: ' + err.message);
  }

  function main() {
    var LCD_SRC = 'data:image/png;base64,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';
    var REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // Dimensiones del plano original (1 unidad = 100 px del dibujo)
    var W = 6.5, H = 3.25, D = 1.5, R = 0.2;
    var BG = '#12161b';
    var MOUNT_Z = 0.1 + D / 2;   // la carcasa queda a 0,1 de la pared (cabezas de tornillo detrás)
    var DETACH_Z = 3.7;

    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    var ease = function (t) { return t * t * (3 - 2 * t); };
    var srgb = function (h) { return new THREE.Color(h).convertSRGBToLinear(); };

    // ---------- renderer / escena ----------
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    var cv = renderer.domElement;
    cv.className = 'gl';
    cv.tabIndex = 0;
    cv.setAttribute('role', 'img');
    cv.setAttribute('aria-label', 'Modelo 3D interactivo de SafeHome. Arrastra para girar, usa la rueda o pellizca para acercar y utiliza las herramientas para cambiar iluminación, girar automáticamente o guardar una imagen.');
    stage.insertBefore(cv, stage.firstChild);
    cv.addEventListener('webglcontextlost', function (event) {
      event.preventDefault();
      fail('El navegador perdió el contexto gráfico. Recarga la página para intentarlo de nuevo.');
    });

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(srgb(BG), 16, 34);

    var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
    var maxA = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    // ---------- utilidades de canvas ----------
    function mk(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
    function tex(c, isColor) {
      var t = new THREE.CanvasTexture(c);
      if (isColor) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = maxA;
      return t;
    }
    function rr(x, X, Y, w, h, r) {
      x.beginPath();
      x.moveTo(X + r, Y);
      x.arcTo(X + w, Y, X + w, Y + h, r);
      x.arcTo(X + w, Y + h, X, Y + h, r);
      x.arcTo(X, Y + h, X, Y, r);
      x.arcTo(X, Y, X + w, Y, r);
      x.closePath();
    }
    // Ranura de ventilación profesional: cápsula uniforme, sin puntas tipo gota.
    function taper(x, x1, y1, x2, y2, r) {
      var dx = x2 - x1, dy = y2 - y1;
      var len = Math.hypot(dx, dy), angle = Math.atan2(dy, dx);
      x.save();
      x.translate((x1 + x2) / 2, (y1 + y2) / 2);
      x.rotate(angle);
      rr(x, -len / 2, -r, len, 2 * r, r);
      x.fill();
      x.restore();
    }
    function houseWifi(x, cx, cy) {
      x.save();
      x.translate(cx, cy);
      x.strokeStyle = '#0b0b0b';
      x.fillStyle = '#0b0b0b';
      x.lineWidth = 3.2;
      x.lineJoin = 'round';
      x.lineCap = 'round';
      x.beginPath();
      x.moveTo(-38, 4); x.lineTo(0, -34); x.lineTo(38, 4); x.lineTo(31, 4);
      x.lineTo(31, 35); x.lineTo(-30, 35); x.lineTo(-30, 4); x.closePath();
      x.stroke();
      x.beginPath();
      x.moveTo(18, -16); x.lineTo(18, -29); x.lineTo(26, -29); x.lineTo(26, -23);
      x.stroke();
      x.beginPath(); x.arc(0, 19, 3, 0, Math.PI * 2); x.fill();
      [9, 16, 23].forEach(function (r) {
        x.beginPath(); x.arc(0, 19, r, Math.PI * 1.25, Math.PI * 1.75); x.stroke();
      });
      x.restore();
    }

    // ---------- caras de la carcasa (se dibujan con las coordenadas del plano) ----------
    var S = 4; // píxeles de textura por píxel del plano
    function face(ox, oy, w, h, P, paint) {
      var c = mk(Math.round(w * S), Math.round(h * S));
      var x = c.getContext('2d');
      x.setTransform(S, 0, 0, S, -ox * S, -oy * S);
      x.fillStyle = P ? '#dedede' : '#d0d0d0';
      x.fillRect(ox - 2, oy - 2, w + 4, h + 4);
      paint(x, P);
      return c;
    }
    function blur(c, px) {
      var o = mk(c.width, c.height);
      var x = o.getContext('2d');
      x.filter = 'blur(' + px + 'px)';
      x.drawImage(c, 0, 0);
      x.filter = 'none';
      return o;
    }
    var INK = function (P) { return P ? '#0b0b0b' : '#000'; };

    function speakerGrille(x, cx, cy, r, P) {
      x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2);
      x.fillStyle = P ? '#bcbcbc' : '#6a6a6a'; x.fill(); x.clip();
      x.fillStyle = P ? '#2d2d2d' : '#000';
      var step = r / 7.5, row = 0;
      for (var yy = -r; yy <= r; yy += step * 0.866) {
        for (var xx = -r + (row % 2 ? step / 2 : 0); xx <= r; xx += step) { x.beginPath(); x.arc(cx + xx, cy + yy, step * 0.28, 0, Math.PI * 2); x.fill(); }
        row++;
      }
      x.restore();
      x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.lineWidth = r * 0.1; x.strokeStyle = INK(P); x.stroke();
      x.beginPath(); x.arc(cx, cy, r * 0.2, 0, Math.PI * 2); x.fillStyle = P ? '#8e8e8e' : '#3a3a3a'; x.fill(); x.lineWidth = r * 0.04; x.stroke();
    }

    function sensorIntake(x, cx, cy, r, P) {
      // Toma de aire compacta para el MQ-7 del equipo central, separada de los parlantes.
      x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2);
      x.fillStyle = P ? '#bcbcbc' : '#6a6a6a'; x.fill(); x.clip();
      x.fillStyle = P ? '#2d2d2d' : '#000';
      for (var sy = -r + 5; sy <= r - 5; sy += 7) {
        for (var sx = -r + 5; sx <= r - 5; sx += 7) {
          if (sx * sx + sy * sy <= (r - 4) * (r - 4)) { x.beginPath(); x.arc(cx + sx, cy + sy, 1.35, 0, Math.PI * 2); x.fill(); }
        }
      }
      x.restore();
      x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.lineWidth = 3; x.strokeStyle = INK(P); x.stroke();
      // Aro cian satinado muy fino que distingue el MQ-7 de los parlantes.
      x.beginPath(); x.arc(cx, cy, r + 2.5, 0, Math.PI * 2); x.lineWidth = 1.4; x.strokeStyle = P ? '#287f8c' : '#185761'; x.stroke();
      // Rendija continua con la rejilla: misma altura, unida al borde circular y desplazada al rincón superior izquierdo.
      x.fillStyle = INK(P); rr(x, cx - r - 50, cy - 6, 52, 12, 6); x.fill();
    }

    function paintFront(x, P) {
      if (P) {
        houseWifi(x, 862, 229);
        rr(x, 918, 180, 264, 150, 24); x.fillStyle = '#050505'; x.fill();
        x.fillStyle = '#0b0b0b';
        x.font = '700 22px "Open Sans","Segoe UI",system-ui,sans-serif';
        x.textAlign = 'center'; x.textBaseline = 'alphabetic';
        x.fillText('SafeHome', 1050, 175);
      }
      x.fillStyle = INK(P);
      // Se conservan solo las cinco ranuras diagonales centrales; se retiran las tres que invadían el parlante izquierdo.
      [[800, 355, 765, 420], [845, 355, 810, 420], [890, 355, 855, 420], [935, 355, 900, 420], [980, 355, 945, 420]].forEach(function (v) {
        taper(x, v[0], v[1], v[2], v[3], 9);
      });
      // Rejilla y rendija del MQ-7 trasladadas juntas al rincón superior izquierdo del frente.
      sensorIntake(x, 650, 210, 24, P);
      // Ambos parlantes son iguales, alineados y algo más compactos; se dibujan al final.
      speakerGrille(x, 680, 395, 48, P);
      speakerGrille(x, 1130, 395, 48, P);
    }
    // Lado izquierdo: rejillas de ventilación y marca del botón de apagado
    function paintLeft(x, P) {
      x.fillStyle = INK(P);
      [1296, 1333, 1370].forEach(function (cx) { rr(x, cx - 9, 180, 18, 70, 9); x.fill(); rr(x, cx - 9, 400, 18, 60, 9); x.fill(); });
      taper(x, 1314, 262, 1290, 305, 7); taper(x, 1352, 262, 1328, 305, 7);
      x.beginPath(); x.arc(1333, 343, 30, 0, Math.PI * 2); x.lineWidth = 3; x.strokeStyle = INK(P); x.stroke();
    }
    // Lado derecho: ícono de casa con Wi-Fi y rejillas de ventilación
    function paintRight(x, P) {
      if (P) houseWifi(x, 1334, 669);
      x.fillStyle = INK(P);
      [1296, 1333, 1370].forEach(function (cx) { rr(x, cx - 9, 735, 18, 62, 9); x.fill(); });
      taper(x, 1343, 848, 1305, 903, 8);
      taper(x, 1374, 851, 1334, 906, 8);
      taper(x, 1312, 840, 1285, 880, 7);
    }
    // Reverso: tres ranuras de ojo de cerradura (vista desde atrás)
    function paintBack(x, P) {
      x.fillStyle = P ? '#060606' : '#000';
      [[608, 633], [1165, 633]].forEach(function (k) {
        rr(x, k[0] - 11, k[1], 22, 44, 11); x.fill();
        x.beginPath(); x.arc(k[0], k[1] + 40, 18, 0, Math.PI * 2); x.fill();
      });
    }
    function plastic(ox, oy, w, h, paint) {
      var c = face(ox, oy, w, h, true, paint);
      var b = blur(face(ox, oy, w, h, false, paint), 2.2);
      return new THREE.MeshPhysicalMaterial({
        color: 0xffffff, map: tex(c, true), bumpMap: tex(b, false), bumpScale: 0.008,
        roughness: 0.46, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.46
      });
    }
    var plainMat = new THREE.MeshPhysicalMaterial({ color: srgb('#e3e6e7'), roughness: 0.46, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.46 });

    var topMat = (function () {
      var c = mk(1300, 300), x = c.getContext('2d');
      x.fillStyle = '#dedede'; x.fillRect(0, 0, 1300, 300); x.fillStyle = '#0b0b0b';
      [-0.68, -0.5, 0.5, 0.68, 2.6, 2.76, 2.92].forEach(function (wx) { rr(x, (wx + 3.25) * 200 - 11, 70, 22, 160, 11); x.fill(); });
      return new THREE.MeshPhysicalMaterial({ color: 0xffffff, map: tex(c, true), roughness: 0.46, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.46 });
    })();
    // ---------- carcasa con aristas redondeadas ----------
    function roundedBox(w, h, d, r, seg) {
      var g = new THREE.BoxGeometry(w, h, d, Math.round(w / seg), Math.round(h / seg), Math.round(d / seg));
      var pos = g.attributes.position, nor = g.attributes.normal;
      var hx = w / 2 - r, hy = h / 2 - r, hz = d / 2 - r;
      var p = new THREE.Vector3(), c = new THREE.Vector3(), q = new THREE.Vector3();
      for (var i = 0; i < pos.count; i++) {
        p.fromBufferAttribute(pos, i);
        c.set(clamp(p.x, -hx, hx), clamp(p.y, -hy, hy), clamp(p.z, -hz, hz));
        q.subVectors(p, c);
        if (q.lengthSq() > 1e-9) {
          q.normalize();
          p.copy(c).addScaledVector(q, r);
          nor.setXYZ(i, q.x, q.y, q.z);
        }
        pos.setXYZ(i, p.x, p.y, p.z);
      }
      pos.needsUpdate = true; nor.needsUpdate = true;
      return g;
    }

    var pivot = new THREE.Group();
    pivot.position.z = MOUNT_Z;
    scene.add(pivot);

    // Orden de caras de BoxGeometry: derecha, izquierda, arriba, abajo, frente, reverso
    var body = new THREE.Mesh(roundedBox(W, H, D, R, 0.04), [
      plastic(1260, 603, 149, 324, paintRight),
      plastic(1259, 151, 149, 324, paintLeft),
      topMat,
      plainMat,
      plastic(562, 151, 649, 324, paintFront),
      plastic(562, 605, 649, 324, paintBack)
    ]);
    body.castShadow = true;
    body.receiveShadow = true;
    pivot.add(body);

    // Coordenadas del plano -> carcasa (centro en 886,5 / 313)
    var FZ = D / 2;
    var SCX = 1.635, SCY = 0.58; // centro de la pantalla

    // Marco de la pantalla
    function rrShape(w, h, r) {
      var s = new THREE.Shape();
      var x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);
      s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
      s.lineTo(x + w, y + h - r);
      s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
      s.lineTo(x + r, y + h);
      s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
      s.lineTo(x, y + r);
      s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
      return s;
    }
    var fs = rrShape(2.64, 1.5, 0.24);
    fs.holes.push(rrShape(2.54, 1.38, 0.19));
    var screenFrame = new THREE.Mesh(
      new THREE.ExtrudeGeometry(fs, { depth: 0.03, bevelEnabled: false, curveSegments: 20 }),
      new THREE.MeshStandardMaterial({ color: srgb('#0b0c0e'), roughness: 0.28, metalness: 0.1 })
    );
    screenFrame.position.set(SCX, SCY, FZ - 0.002);
    screenFrame.castShadow = true;
    pivot.add(screenFrame);

    // Pantalla LCD con la captura de HOGARSEGURO v.02
    var lcdC = mk(1236, 640);
    var lx = lcdC.getContext('2d');
    lx.fillStyle = '#000'; lx.fillRect(0, 0, 1236, 640);
    var lcdT = tex(lcdC, true);
    var img = new Image();
    img.onload = function () {
      lx.imageSmoothingEnabled = false;
      lx.drawImage(img, 0, 0, 1236, 640);
      lcdT.needsUpdate = true;
    };
    img.src = LCD_SRC;
    var lcd = new THREE.Mesh(
      new THREE.PlaneGeometry(2.5, 2.5 * 160 / 309),
      new THREE.MeshBasicMaterial({ map: lcdT, toneMapped: false, fog: false })
    );
    lcd.position.set(SCX, SCY, FZ + 0.01);
    pivot.add(lcd);

    var glowLight = new THREE.PointLight(0xbfdcff, 0.35, 5, 2);
    glowLight.position.set(SCX, SCY, FZ + 0.7);
    pivot.add(glowLight);

    // Sin botón frontal: los pulsadores están ahora en la cara superior.
    var btn = new THREE.Group(); pivot.add(btn);

    // Resplandor para los LED
    var glowC = mk(128, 128);
    var gx = glowC.getContext('2d');
    var gr = gx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.25, 'rgba(255,255,255,.45)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    gx.fillStyle = gr; gx.fillRect(0, 0, 128, 128);
    var glowT = new THREE.CanvasTexture(glowC);

    // ---------- dos equipos: central (horizontal) y Nexo CO (vertical) ----------
    var deviceKey = 'central';
    var PARTS = {
      central: ['esp32', 'sensor', 'oled', 'rgb', 'resistors', 'buttons', 'speakers', 'amp', 'lora', 'ble', 'usbc', 'power', 'battery', 'wires'],
      nexo: ['esp32', 'sensor', 'rgb', 'ble', 'speakers', 'usbc', 'battery', 'power', 'wires']
    };
    var internalCircuit = new THREE.Group();
    internalCircuit.visible = false;
    pivot.add(internalCircuit);
    var extGroup = new THREE.Group();
    pivot.add(extGroup);
    var extHide = [];
    var internalParts = {}, partMeshes = {}, pickables = [], wireItems = [], badgeSprites = [], buzzRings = [], rgbs = [];
    var selectedKey = null, hoverKey = null;
    var BLACK = new THREE.Color(0x000000), HL = new THREE.Color(0x14b8d6);
    var WC = { red: '#d8362f', black: '#3a3f45', orange: '#e8913a', white: '#e8e8e8', yellow: '#f0cf3a', green: '#2fbf6a', blue: '#3a82e0', grey: '#aeb6bc' };
    var PLATE_Z = -0.62;

    function partGroup(key, parent) {
      var g = new THREE.Group(); g.name = key;
      (parent || internalCircuit).add(g); internalParts[key] = g; partMeshes[key] = [];
      return g;
    }
    function mat(color, rough, metal) {
      return new THREE.MeshStandardMaterial({ color: srgb(color), roughness: rough === undefined ? 0.55 : rough, metalness: metal || 0 });
    }
    function register(key, m) {
      m.castShadow = true; m.receiveShadow = true; m.userData.part = key;
      internalParts[key].add(m); partMeshes[key].push(m); pickables.push(m);
      return m;
    }
    function solid(key, geo, color, x, y, z, rough, metal) {
      var m = new THREE.Mesh(geo, mat(color, rough, metal));
      m.position.set(x, y, z);
      return register(key, m);
    }
    function zcyl(key, r, h, color, x, y, z, rough, metal) {
      var m = solid(key, new THREE.CylinderGeometry(r, r, h, 28), color, x, y, z, rough, metal);
      m.rotation.x = Math.PI / 2;
      return m;
    }
    function deco(geo, color, x, y, z, rough) {
      var m = new THREE.Mesh(geo, mat(color, rough));
      m.position.set(x, y, z); m.receiveShadow = true; m.castShadow = true;
      internalCircuit.add(m);
      return m;
    }
    function boardFinish(w, h) {
      // Marco y cuatro vías decorativas dan lectura de PCB sin interferir con módulos ni selección.
      var z = PLATE_Z + 0.027, ix = w / 2 - 0.14, iy = h / 2 - 0.14;
      var pts = [[-ix, -iy, z], [ix, -iy, z], [ix, iy, z], [-ix, iy, z], [-ix, -iy, z]];
      var curve = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
      var frame = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.012, 6, false), mat('#4b8077', 0.45, 0.25));
      frame.receiveShadow = true; internalCircuit.add(frame);
      [[-ix, -iy], [ix, -iy], [ix, iy], [-ix, iy]].forEach(function (p) {
        var ring = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 20), mat('#bd9b54', 0.4, 0.45));
        ring.position.set(p[0], p[1], z + 0.008); internalCircuit.add(ring);
      });
    }
    function labelPlane(key, w, h, x, y, z, cw, ch, draw) {
      var c = mk(cw, ch); draw(c.getContext('2d'), cw, ch);
      var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex(c, true), toneMapped: false }));
      m.position.set(x, y, z);
      internalParts[key].add(m);
      return m;
    }
    function post(x, y, zTop) {
      var len = zTop - (PLATE_Z + 0.02);
      if (len < 0.05) return;
      var p = deco(new THREE.CylinderGeometry(0.05, 0.05, len, 12), '#9aa4aa', x, y, PLATE_Z + 0.02 + len / 2, 0.4);
      p.rotation.x = Math.PI / 2;
    }
    function clearGroup(g) { while (g.children.length) g.remove(g.children[0]); }
    function bnum(key) { return String(PARTS[deviceKey].indexOf(key) + 1); }
    function ledMat(c) { return new THREE.MeshStandardMaterial({ color: srgb(c), emissive: srgb(c), emissiveIntensity: 0.2, roughness: 0.35 }); }
    function glowSprite(c, x, y, z) {
      var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, color: srgb(c), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0, fog: false }));
      sp.scale.set(0.9, 0.9, 1); sp.position.set(x, y, z);
      return sp;
    }
    function muteTex() {
      var c = mk(128, 128), x = c.getContext('2d');
      x.fillStyle = '#c9c9c9'; x.fillRect(0, 0, 128, 128);
      x.fillStyle = '#111'; x.strokeStyle = '#111'; x.lineWidth = 9; x.lineCap = 'round';
      x.beginPath(); x.moveTo(30, 52); x.lineTo(50, 52); x.lineTo(74, 32); x.lineTo(74, 96); x.lineTo(50, 76); x.lineTo(30, 76); x.closePath(); x.fill();
      x.beginPath(); x.moveTo(86, 48); x.lineTo(108, 80); x.moveTo(108, 48); x.lineTo(86, 80); x.stroke();
      return tex(c, true);
    }

    // ---------- carcasa del Nexo CO (vertical, como el diseño de referencia) ----------
    var SWd = 2.6, SHd = 5.2, SDd = 1.7;
    var SINK = '#0b0b0b';
    function satMat(w, h, paint) {
      var c = mk(Math.round(w * 200), Math.round(h * 200)), x = c.getContext('2d');
      x.fillStyle = '#dedede'; x.fillRect(0, 0, c.width, c.height);
      if (paint) paint(x, c.width, c.height);
      return new THREE.MeshPhysicalMaterial({ color: 0xffffff, map: tex(c, true), roughness: 0.46, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.46 });
    }
    function paintSatFront(x) {
      // Rejilla superior de entrada de aire del sensor MQ-7: malla circular perforada.
      x.save(); x.beginPath(); x.arc(260, 215, 105, 0, Math.PI * 2); x.fillStyle = '#bcbcbc'; x.fill(); x.clip();
      x.fillStyle = '#303030';
      for (var sy = -98; sy <= 98; sy += 14) {
        for (var sx = -98; sx <= 98; sx += 14) {
          if (sx * sx + sy * sy <= 98 * 98) {
            x.beginPath(); x.arc(260 + sx, 215 + sy, 2.8, 0, Math.PI * 2); x.fill();
          }
        }
      }
      x.restore();
      x.beginPath(); x.arc(260, 215, 105, 0, Math.PI * 2); x.lineWidth = 10; x.strokeStyle = SINK; x.stroke();
      // Aro cian satinado fino: diferencia el sensor MQ-7 de la rejilla del parlante.
      x.beginPath(); x.arc(260, 215, 111, 0, Math.PI * 2); x.lineWidth = 3; x.strokeStyle = '#27818e'; x.stroke();
      // Rendija de entrada de aire del MQ-7, asociada visualmente a su rejilla circular superior.
      x.fillStyle = SINK; rr(x, 220, 350, 80, 14, 7); x.fill();
      // Rejilla del parlante más pequeña y claramente separada de la toma del sensor MQ-7.
      x.save(); x.beginPath(); x.arc(260, 770, 68, 0, Math.PI * 2);
      x.fillStyle = '#bcbcbc'; x.fill(); x.clip();
      x.fillStyle = '#303030';
      for (var gy = -64; gy <= 64; gy += 12) {
        for (var gx = -64; gx <= 64; gx += 12) {
          if (gx * gx + gy * gy <= 64 * 64) { x.beginPath(); x.arc(260 + gx, 770 + gy, 2.2, 0, Math.PI * 2); x.fill(); }
        }
      }
      x.restore();
      x.beginPath(); x.arc(260, 770, 68, 0, Math.PI * 2); x.lineWidth = 8; x.strokeStyle = SINK; x.stroke();
      x.fillStyle = SINK;
      // Dos ranuras diagonales simétricas, más sobrias y separadas del parlante.
      [60, 460].forEach(function (px) { taper(x, px + 40, 875, px - 30, 970, 11); });
      x.textAlign = 'center'; x.textBaseline = 'alphabetic';
      x.font = '700 30px "Open Sans","Segoe UI",system-ui,sans-serif'; x.fillText('SafeHome', 260, 520);
      x.font = '600 19px "Open Sans","Segoe UI",system-ui,sans-serif'; x.fillText('NEXO CO', 260, 558);
    }
    function paintSatBack(x) {
      x.fillStyle = SINK;
      x.beginPath(); x.arc(260, 150, 34, 0, Math.PI * 2); x.fill();
      rr(x, 246, 62, 28, 90, 14); x.fill();
      x.save(); x.translate(260, 650); x.scale(2.3, 2.3); houseWifi(x, 0, 0); x.restore();
      // Dos ranuras inferiores simétricas; se eliminan las dos interiores.
      [150, 370].forEach(function (px) { rr(x, px - 9, 860, 18, 120, 9); x.fill(); });
    }
    function paintSatSide(x, w, h) {
      x.fillStyle = SINK;
      // Tres ranuras verticales a media altura por lateral, en vez de nueve repetidas.
      [w * 0.27, w * 0.5, w * 0.73].forEach(function (cx) { rr(x, cx - 8, h * 0.38, 16, h * 0.22, 8); x.fill(); });
    }
    function paintSatTop(x, w, h) {
      x.fillStyle = SINK;
      // Dos ranuras superiores simétricas, dejando el LED central despejado.
      [90, 430].forEach(function (cx) { rr(x, cx - 9, h * 0.24, 18, h * 0.52, 9); x.fill(); });
    }
    var satBody = new THREE.Mesh(roundedBox(SWd, SHd, SDd, 0.3, 0.05), [
      satMat(SDd, SHd, paintSatSide), satMat(SDd, SHd, paintSatSide), satMat(SWd, SDd, paintSatTop), satMat(SWd, SDd, null),
      satMat(SWd, SHd, paintSatFront), satMat(SWd, SHd, paintSatBack)
    ]);
    satBody.castShadow = true; satBody.receiveShadow = true; satBody.visible = false;
    pivot.add(satBody);

    // Pantalla del equipo central (textura OLED compartida con el circuito)
    var oledC = mk(256, 128), ox = oledC.getContext('2d'), oledT = tex(oledC, true);

    // ---------- constructores de piezas ----------
    var ESPpos = { x: -0.55, y: 0.2, z: -0.2, rot: 0 };
    function padW(i, side) {
      var lx = -1.0 + i * 0.111, ly = side === 'T' ? 0.46 : -0.46;
      if (!ESPpos.rot) return [ESPpos.x + lx, ESPpos.y + ly, ESPpos.z + 0.1];
      return [ESPpos.x - ly, ESPpos.y + lx, ESPpos.z + 0.1];
    }
    function buildEsp() {
      var g = partGroup('esp32'), i;
      g.position.set(ESPpos.x, ESPpos.y, ESPpos.z); g.rotation.z = ESPpos.rot;
      solid('esp32', new THREE.BoxGeometry(2.3, 1.05, 0.06), '#12171d', 0, 0, 0, 0.7);
      for (i = 0; i < 19; i++) {
        solid('esp32', new THREE.BoxGeometry(0.05, 0.1, 0.09), '#d7c66a', -1.0 + i * 0.111, 0.46, 0.05, 0.35, 0.6);
        solid('esp32', new THREE.BoxGeometry(0.05, 0.1, 0.09), '#d7c66a', -1.0 + i * 0.111, -0.46, 0.05, 0.35, 0.6);
      }
      solid('esp32', new THREE.BoxGeometry(0.85, 0.62, 0.07), '#c4cacd', 0.35, 0, 0.065, 0.35, 0.6);
      solid('esp32', new THREE.BoxGeometry(0.26, 0.22, 0.1), '#cfd4d8', -1.08, 0, 0.08, 0.3, 0.6);
      solid('esp32', new THREE.BoxGeometry(0.22, 0.22, 0.05), '#0a0c0f', -0.7, 0, 0.055, 0.4);
      solid('esp32', new THREE.BoxGeometry(0.07, 0.07, 0.04), '#e23b3b', -0.9, 0.3, 0.05, 0.4);
      labelPlane('esp32', 0.7, 0.26, 0.35, 0, 0.103, 256, 96, function (x, w, h) {
        x.fillStyle = '#c4cacd'; x.fillRect(0, 0, w, h);
        x.fillStyle = '#15191d'; x.textAlign = 'center'; x.textBaseline = 'middle';
        x.font = '700 46px Inter, sans-serif'; x.fillText('ESP32', w / 2, h * 0.42);
        x.font = '500 20px "IBM Plex Mono", monospace'; x.fillText('ESP-WROOM-32', w / 2, h * 0.78);
      });
      var b = partGroup('ble');
      b.position.set(ESPpos.x, ESPpos.y, ESPpos.z); b.rotation.z = ESPpos.rot;
      solid('ble', new THREE.BoxGeometry(0.34, 0.62, 0.014), '#1a8fa8', 0.98, 0, 0.04, 0.4);
      for (i = 0; i < 3; i++) {
        var arc = new THREE.Mesh(new THREE.TorusGeometry(0.2 + i * 0.12, 0.012, 6, 28, Math.PI * 0.8), new THREE.MeshStandardMaterial({ color: srgb('#36d8f2'), emissive: srgb('#36d8f2'), emissiveIntensity: 0.8, transparent: true, opacity: 0.85 - i * 0.2 }));
        arc.rotation.z = -Math.PI * 0.4; arc.position.set(0.98, 0, 0.12);
        arc.userData.led = true; arc.userData.baseOpacity = 0.85 - i * 0.2; register('ble', arc);
      }
    }
    function buildMq7(pos) {
      var sc = pos.sc || 1, x0 = pos.x, y0 = pos.y, z0 = pos.z, i;
      partGroup('sensor');
      module('sensor', 0.8 * sc, 1.2 * sc, '#1f5fa8', x0, y0, z0);
      // Serigrafía visible identifica el módulo MQ-7 en ambos circuitos.
      labelPlane('sensor', 0.54 * sc, 0.22 * sc, x0, y0 - 0.36 * sc, z0 + 0.14 * sc, 256, 96, function (x, w, h) {
        x.fillStyle = '#173550'; rr(x, 3, 3, w - 6, h - 6, 12); x.fill();
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#f0f6fa';
        x.font = '700 38px "IBM Plex Mono", monospace'; x.fillText('MQ-7', w / 2, h * 0.37);
        x.fillStyle = '#b8d3e1'; x.font = '500 18px "IBM Plex Mono", monospace'; x.fillText('CO SENSOR', w / 2, h * 0.76);
      });
      zcyl('sensor', 0.34 * sc, 0.34 * sc, '#c4c8c9', x0, y0 + 0.22 * sc, z0 + 0.2 * sc, 0.3, 0.6);
      zcyl('sensor', 0.26 * sc, 0.03 * sc, '#4a5055', x0, y0 + 0.22 * sc, z0 + 0.38 * sc, 0.45, 0.3);
      for (i = 0; i < 8; i++) {
        var sa = i * Math.PI / 4;
        solid('sensor', new THREE.SphereGeometry(0.035 * sc, 8, 6), '#171b1e', x0 + Math.cos(sa) * 0.15 * sc, y0 + 0.22 * sc + Math.sin(sa) * 0.15 * sc, z0 + 0.41 * sc, 0.4);
      }
      solid('sensor', new THREE.BoxGeometry(0.16 * sc, 0.16 * sc, 0.1 * sc), '#2a6ad0', x0 - 0.18 * sc, y0 - 0.4 * sc, z0 + 0.07 * sc, 0.4);
      for (i = 0; i < 4; i++) solid('sensor', new THREE.BoxGeometry(0.1 * sc, 0.05 * sc, 0.08 * sc), '#d7c66a', x0 + 0.3 * sc, y0 - 0.5 * sc + i * 0.11 * sc, z0 + 0.06 * sc, 0.35, 0.6);
      post(x0 - 0.3 * sc, y0 + 0.5 * sc, z0 - 0.03); post(x0 + 0.3 * sc, y0 - 0.5 * sc, z0 - 0.03);
    }

    function buildOled(cx, cy, cz, sc) {
      var g = partGroup('oled'), i;
      g.position.set(cx, cy, cz); g.scale.set(sc, sc, sc);
      solid('oled', new THREE.BoxGeometry(1.6, 1.15, 0.05), '#2a62b5', 0, 0, 0, 0.7);
      solid('oled', new THREE.BoxGeometry(1.36, 0.82, 0.03), '#0a0b0d', 0, 0.04, 0.04, 0.3);
      var pl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), new THREE.MeshBasicMaterial({ map: oledT, toneMapped: false, fog: false }));
      pl.position.set(0, 0.04, 0.058); g.add(pl);
      for (i = 0; i < 6; i++) solid('oled', new THREE.BoxGeometry(0.05, 0.1, 0.07), '#d7c66a', -0.35 + i * 0.14, -0.5, 0.03, 0.35, 0.6);
      post(cx - 0.7 * sc, cy + 0.5 * sc, cz - 0.03); post(cx + 0.7 * sc, cy + 0.5 * sc, cz - 0.03);
    }
    function oledPin(cx, cy, cz, sc, i) { return [cx + (-0.35 + i * 0.14) * sc, cy - 0.5 * sc, cz + 0.03 * sc]; }
    function buildRgbInterior(x, y, z) {
      partGroup('rgb');
      solid('rgb', new THREE.CylinderGeometry(0.15, 0.15, 0.02, 24), '#1b1c1f', x, y, z, 0.5);
      var lmI = ledMat('#18e07c');
      var bI = solid('rgb', new THREE.CylinderGeometry(0.12, 0.12, 0.16, 24), '#18e07c', x, y + 0.09, z, 0.3);
      var dI = solid('rgb', new THREE.SphereGeometry(0.12, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#18e07c', x, y + 0.17, z, 0.3);
      bI.material = lmI; dI.material = lmI; bI.userData.led = true; dI.userData.led = true;
      [-0.06, -0.02, 0.02, 0.06].forEach(function (lx) { solid('rgb', new THREE.CylinderGeometry(0.012, 0.012, 0.1, 8), '#b9c2c8', x + lx, y - 0.06, z, 0.4, 0.6); });
      var sp = glowSprite('#18e07c', x, y + 0.19, z); internalParts.rgb.add(sp);
      rgbs.push({ m: lmI, sp: sp });
    }
    function ledExterior(x, y, z) {
      var eg = new THREE.Group(); eg.position.set(x, y, z);
      var seat = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 32), new THREE.MeshStandardMaterial({ color: srgb('#1b1c1f'), roughness: 0.5 }));
      seat.position.y = -0.005;
      var lmE = ledMat('#18e07c');
      var stem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 32), lmE); stem.position.y = 0.04;
      var dome = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), lmE); dome.position.y = 0.09;
      var spE = glowSprite('#18e07c', 0, 0.17, 0); spE.scale.set(0.95, 0.95, 1);
      eg.add(seat); eg.add(stem); eg.add(dome); eg.add(spE);
      extGroup.add(eg); extHide.push(eg);
      rgbs.push({ m: lmE, sp: spE });
    }
    function redButton(x, y, z, rotZ) {
      var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.z = rotZ;
      var m = new THREE.MeshStandardMaterial({ color: srgb('#e5302f'), emissive: srgb('#6e0b0b'), emissiveIntensity: 0.6, roughness: 0.35 });
      var ringM = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.03, 32), new THREE.MeshStandardMaterial({ color: srgb('#14181c'), roughness: 0.4 }));
      ringM.position.y = 0.005;
      var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.09, 32), m); cap.position.y = 0.05;
      cap.castShadow = true; g.add(ringM); g.add(cap);
      extGroup.add(g);
    }
    function usbSlot(x, y, z) {
      var pg = new THREE.Group(); pg.position.set(x, y, z);
      var sm = new THREE.MeshStandardMaterial({ color: srgb('#08090b'), roughness: 0.5 });
      var slot = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.16), sm); slot.position.y = -0.005;
      var cL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 20), sm); cL.position.set(-0.23, -0.005, 0);
      var cR = cL.clone(); cR.position.x = 0.23;
      pg.add(slot); pg.add(cL); pg.add(cR); extGroup.add(pg);
    }
    function addWire(color, links, pts, r) {
      var vs = [];
      pts.forEach(function (p) {
        var v = new THREE.Vector3(p[0], p[1], p[2]);
        if (!vs.length || vs[vs.length - 1].distanceTo(v) > 0.001) vs.push(v);
      });
      if (vs.length < 2) return;
      var curve = new THREE.CatmullRomCurve3(vs, false, 'catmullrom', 0.1);
      var segs = Math.max(30, vs.length * 12);
      var m = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, r || 0.022, 8, false), mat(WC[color], 0.45));
      m.userData.links = links;
      register('wires', m);
      var hit = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(16, vs.length * 6), 0.07, 5, false), new THREE.MeshBasicMaterial({ visible: false }));
      hit.userData.part = 'wires';
      internalParts.wires.add(hit); pickables.push(hit);
      wireItems.push({ mesh: m, curve: curve, len: curve.getLength(), links: links });
    }
    function route(color, links, start, pad, lx, zl, r) {
      addWire(color, links, [start, [start[0], start[1], zl], [lx, start[1], zl], [lx, pad[1], zl], [pad[0], pad[1], zl], pad], r);
    }
    function badge(key, x, y, z) {
      var c = mk(64, 64), bx = c.getContext('2d');
      bx.fillStyle = '#2bb0cf'; bx.beginPath(); bx.arc(32, 32, 29, 0, Math.PI * 2); bx.fill();
      bx.lineWidth = 3; bx.strokeStyle = '#031a20'; bx.stroke();
      bx.fillStyle = '#031a20'; bx.font = '700 28px Inter, sans-serif'; bx.textAlign = 'center'; bx.textBaseline = 'middle';
      bx.fillText(bnum(key), 32, 34);
      var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(c, true), depthTest: false, depthWrite: false, transparent: true, fog: false }));
      s.scale.set(0.3, 0.3, 1); s.position.set(x, y, z); s.renderOrder = 20;
      s.userData.part = key; s.userData.isBadge = true;
      internalCircuit.add(s); pickables.push(s); badgeSprites.push({ s: s, key: key });
    }
    function module(key, w, h, color, x, y, z) { return solid(key, new THREE.BoxGeometry(w, h, 0.05), color, x, y, z, 0.7); }
    function pin(key, x, y, z) { solid(key, new THREE.BoxGeometry(0.06, 0.08, 0.06), '#d7c66a', x, y, z + 0.03, 0.35, 0.6); }
    function inductor(key, x, y, z) { solid(key, new THREE.CylinderGeometry(0.09, 0.09, 0.09, 16), '#303438', x, y, z + 0.06, 0.5).rotation.x = Math.PI / 2; }
    function speaker(x, y, z) {
      zcyl('speakers', 0.29, 0.1, '#2b3035', x, y, z, 0.4, 0.4);
      var cone = solid('speakers', new THREE.CylinderGeometry(0.21, 0.09, 0.1, 28, 1, true), '#14171a', x, y, z + 0.07, 0.6);
      cone.rotation.x = Math.PI / 2; cone.material.side = THREE.DoubleSide;
      zcyl('speakers', 0.08, 0.05, '#6c747a', x, y, z + 0.11, 0.35, 0.6);
      zcyl('speakers', 0.18, 0.14, '#0d0f11', x, y, z - 0.1, 0.5);
      solid('speakers', new THREE.BoxGeometry(0.04, 0.1, 0.04), '#d7c66a', x - 0.12, y - 0.37, z - 0.02, 0.35, 0.6);
      solid('speakers', new THREE.BoxGeometry(0.04, 0.1, 0.04), '#d7c66a', x + 0.12, y - 0.37, z - 0.02, 0.35, 0.6);
      for (var k = 0; k < 3; k++) {
        var ring = new THREE.Mesh(new THREE.RingGeometry(0.26, 0.29, 40), new THREE.MeshBasicMaterial({ color: srgb('#ffb347'), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
        ring.position.set(x, y, z + 0.16); ring.visible = false;
        internalParts.speakers.add(ring);
        buzzRings.push({ m: ring, phase: k / 3, idx: buzzRings.length < 3 ? 0 : 1 });
      }
    }

    function buildDevice(variant) {
      var central = variant === 'central', i;
      deviceKey = variant;
      clearGroup(internalCircuit); clearGroup(extGroup);
      internalParts = {}; partMeshes = {};
      pickables.length = 0; wireItems.length = 0; badgeSprites.length = 0; buzzRings.length = 0; rgbs.length = 0; extHide.length = 0;

      if (central) {
        // ===================== EQUIPO CENTRAL =====================
        ESPpos = { x: -0.55, y: 0.2, z: -0.2, rot: 0 };
        var OL = { x: 1.635, y: 0.58, z: 0.42 }, AMP = { x: -2.2, y: 0.15, z: 0.05 }, SP = [[-2.0, -0.98, 0.3], [2.0, -0.98, 0.3]];
        var BO = { x: -2.2, y: -0.55, z: 0.08 }, SW = { x: -2.95, y: -0.3, z: 0.1 }, LR = { x: -0.9, y: -0.85, z: 0.12 };
        var MQC = { x: -2.35, y: 0.95, z: 0.05, sc: 0.72 };
        var CH = { x: 2.85, y: 0.4, z: 0.0 }, UB = { x: 2.55, y: -1.25, z: 0.0 }, BA = { x: 0.35, y: -0.82, z: -0.42 };
        var RES_X = [-0.35, 0, 0.35], MUTE_X = 1.635;
        var BP = [[1.45, -0.65, -0.25], [1.45, -0.98, -0.25]];

        deco(new THREE.BoxGeometry(5.9, 2.9, 0.04), '#1d3532', 0, 0, PLATE_Z, 0.78);
        boardFinish(5.9, 2.9);
        buildEsp();
        buildMq7(MQC);
        post(-1.6, -0.22, -0.23); post(0.5, 0.62, -0.23);
        buildOled(OL.x, OL.y, OL.z, 1);

        buildRgbInterior(0, 1.37, 0.15);
        partGroup('resistors');
        RES_X.forEach(function (rx) {
          solid('resistors', new THREE.CylinderGeometry(0.05, 0.05, 0.22, 14), '#d7c8a2', rx, 1.08, 0.15, 0.65);
          [['#7a3a1a', 1.14], ['#111111', 1.095], ['#c9302c', 1.05]].forEach(function (b) { solid('resistors', new THREE.CylinderGeometry(0.053, 0.053, 0.02, 14), b[0], rx, b[1], 0.15, 0.5); });
          solid('resistors', new THREE.CylinderGeometry(0.012, 0.012, 0.08, 8), '#b9c2c8', rx, 1.23, 0.15, 0.4, 0.6);
          solid('resistors', new THREE.CylinderGeometry(0.012, 0.012, 0.08, 8), '#b9c2c8', rx, 0.93, 0.15, 0.4, 0.6);
        });
        post(-0.6, 1.0, 0.1); post(0.6, 1.0, 0.1);

        // Un único pulsador de muteo en la cara superior, centrado sobre la pantalla.
        partGroup('buttons');
        solid('buttons', new THREE.BoxGeometry(0.38, 0.24, 0.38), '#22272b', MUTE_X, 1.42, 0.2, 0.35);
        solid('buttons', new THREE.CylinderGeometry(0.1, 0.1, 0.16, 20), '#1496b4', MUTE_X, 1.55, 0.2, 0.35);
        solid('buttons', new THREE.BoxGeometry(0.04, 0.1, 0.04), '#d7c66a', MUTE_X - 0.12, 1.3, 0.2, 0.35, 0.6);
        solid('buttons', new THREE.BoxGeometry(0.04, 0.1, 0.04), '#d7c66a', MUTE_X + 0.12, 1.3, 0.2, 0.35, 0.6);

        // Parlantes y amplificador
        partGroup('speakers'); partGroup('amp');
        SP.forEach(function (p) { speaker(p[0], p[1], p[2]); post(p[0], p[1] - 0.1, p[2] - 0.17); });
        module('amp', 0.7, 0.5, '#c0392b', AMP.x, AMP.y, AMP.z);
        solid('amp', new THREE.BoxGeometry(0.28, 0.2, 0.08), '#0a0c0f', AMP.x + 0.05, AMP.y, AMP.z + 0.06, 0.4);
        for (i = 0; i < 4; i++) pin('amp', AMP.x - 0.24 + i * 0.16, AMP.y + 0.27, AMP.z);
        pin('amp', AMP.x - 0.24, AMP.y - 0.27, AMP.z); pin('amp', AMP.x - 0.08, AMP.y - 0.27, AMP.z);
        post(AMP.x - 0.3, AMP.y - 0.2, AMP.z - 0.03); post(AMP.x + 0.3, AMP.y + 0.2, AMP.z - 0.03);

        // LoRa 915 MHz
        partGroup('lora');
        module('lora', 1.0, 0.9, '#2a3f8f', LR.x, LR.y, LR.z);
        solid('lora', new THREE.BoxGeometry(0.5, 0.5, 0.08), '#c4cacd', LR.x - 0.05, LR.y + 0.05, LR.z + 0.065, 0.35, 0.6);
        solid('lora', new THREE.BoxGeometry(0.16, 0.16, 0.05), '#0a0c0f', LR.x + 0.3, LR.y - 0.2, LR.z + 0.05, 0.4);
        labelPlane('lora', 0.46, 0.2, LR.x - 0.05, LR.y + 0.05, LR.z + 0.107, 256, 110, function (x, w, h) {
          x.fillStyle = '#c4cacd'; x.fillRect(0, 0, w, h);
          x.fillStyle = '#15191d'; x.textAlign = 'center'; x.textBaseline = 'middle';
          x.font = '700 40px Inter, sans-serif'; x.fillText('LoRa', w / 2, h * 0.4);
          x.font = '500 20px "IBM Plex Mono", monospace'; x.fillText('915 MHz', w / 2, h * 0.78);
        });
        for (i = 0; i < 8; i++) pin('lora', LR.x - 0.45 + i * 0.13, LR.y + 0.43, LR.z);
        solid('lora', new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12), '#d9a441', LR.x + 0.95, LR.y - 0.35, LR.z + 0.1, 0.4, 0.5).rotation.z = Math.PI / 2;
        solid('lora', new THREE.CylinderGeometry(0.07, 0.07, 0.14, 12), '#b9c2c8', LR.x + 0.5, LR.y - 0.35, LR.z + 0.1, 0.3, 0.7).rotation.z = Math.PI / 2;
        post(LR.x - 0.45, LR.y - 0.4, LR.z - 0.03); post(LR.x + 0.45, LR.y + 0.4, LR.z - 0.03);

        // Cargador USB-C (TP4056)
        partGroup('usbc');
        module('usbc', 0.5, 0.4, '#2b6a3c', UB.x, UB.y, UB.z);
        solid('usbc', new THREE.BoxGeometry(0.26, 0.18, 0.1), '#cfd4d8', UB.x, UB.y - 0.2, UB.z + 0.04, 0.3, 0.7);
        solid('usbc', new THREE.BoxGeometry(0.1, 0.1, 0.07), '#0a0c0f', UB.x - 0.12, UB.y + 0.08, UB.z + 0.05, 0.4);
        pin('usbc', UB.x - 0.2, UB.y + 0.1, UB.z); pin('usbc', UB.x - 0.2, UB.y - 0.05, UB.z);
        post(UB.x - 0.2, UB.y + 0.15, UB.z - 0.03); post(UB.x + 0.2, UB.y - 0.15, UB.z - 0.03);

        // Interruptor de apagado y elevador 5 V
        partGroup('power');
        module('power', 0.34, 0.5, '#22272b', SW.x, SW.y, SW.z);
        zcyl('power', 0.1, 0.1, '#d93a35', SW.x - 0.05, SW.y, SW.z + 0.07, 0.35);
        pin('power', SW.x + 0.1, SW.y - 0.2, SW.z); pin('power', SW.x + 0.1, SW.y + 0.2, SW.z);
        module('power', 0.6, 0.3, '#b3262a', BO.x, BO.y, BO.z);
        inductor('power', BO.x - 0.1, BO.y, BO.z); solid('power', new THREE.BoxGeometry(0.12, 0.12, 0.08), '#2a6ad0', BO.x + 0.1, BO.y, BO.z + 0.05, 0.4);
        pin('power', BO.x - 0.25, BO.y + 0.1, BO.z); pin('power', BO.x - 0.25, BO.y - 0.1, BO.z); pin('power', BO.x + 0.25, BO.y + 0.1, BO.z); pin('power', BO.x + 0.25, BO.y - 0.1, BO.z);
        post(SW.x, SW.y - 0.22, SW.z - 0.03); post(BO.x - 0.25, BO.y - 0.12, BO.z - 0.03); post(BO.x + 0.25, BO.y + 0.12, BO.z - 0.03);

        // Batería
        partGroup('battery');
        solid('battery', new THREE.BoxGeometry(2.7, 0.7, 0.3), '#253e55', BA.x, BA.y, BA.z, 0.45);
        solid('battery', new THREE.BoxGeometry(2.5, 0.55, 0.02), '#365b78', BA.x, BA.y, BA.z + 0.16, 0.5);
        labelPlane('battery', 2.2, 0.4, BA.x, BA.y, BA.z + 0.172, 512, 92, function (x, w, h) {
          x.fillStyle = '#365b78'; x.fillRect(0, 0, w, h);
          x.fillStyle = '#eaf3f8'; x.textAlign = 'center'; x.textBaseline = 'middle';
          x.font = '700 52px Inter, sans-serif'; x.fillText('10.000 mAh', w / 2, h * 0.42);
          x.font = '500 20px "IBM Plex Mono", monospace'; x.fillText('BATERÍA LI-ION · SAFEHOME', w / 2, h * 0.8);
        });
        solid('battery', new THREE.BoxGeometry(0.22, 0.12, 0.04), '#d64a42', BP[0][0], BP[0][1], BP[0][2], 0.35);
        solid('battery', new THREE.BoxGeometry(0.22, 0.12, 0.04), '#2b2f33', BP[1][0], BP[1][1], BP[1][2], 0.35);
        post(BA.x - 1.1, BA.y, BA.z - 0.15); post(BA.x + 1.1, BA.y, BA.z - 0.15);


        // ---- Cableado ----
        partGroup('wires');
        addWire('red', ['usbc', 'battery'], [[UB.x - 0.2, UB.y + 0.1, 0.05], [2.3, -0.95, -0.06], [1.62, -0.7, -0.2], BP[0]], 0.03);
        addWire('black', ['usbc', 'battery'], [[UB.x - 0.2, UB.y - 0.05, 0.05], [2.3, -1.2, -0.06], [1.65, -1.02, -0.2], BP[1]], 0.03);
        addWire('red', ['battery', 'power'], [BP[0], [1.62, -0.8, -0.22], [1.62, -1.38, -0.1], [SW.x + 0.1, -1.38, -0.1], [SW.x + 0.1, SW.y - 0.2, SW.z + 0.04]], 0.03);
        addWire('red', ['power'], [[SW.x + 0.1, SW.y + 0.2, SW.z + 0.04], [SW.x + 0.4, SW.y + 0.1, 0.12], [BO.x - 0.25, BO.y + 0.1, BO.z + 0.04]], 0.03);
        addWire('black', ['battery', 'power'], [BP[1], [1.72, -1.0, -0.26], [1.72, -1.44, -0.12], [BO.x - 0.25, -1.44, -0.12], [BO.x - 0.25, BO.y - 0.1, BO.z + 0.04]], 0.03);
        route('red', ['power', 'esp32'], [BO.x + 0.25, BO.y + 0.1, BO.z + 0.04], padW(1, 'B'), -1.75, 0.0, 0.03);
        route('black', ['power', 'esp32'], [BO.x + 0.25, BO.y - 0.1, BO.z + 0.04], padW(2, 'B'), -1.7, -0.02, 0.03);
        // Alimentación y lectura analógica ilustrativas del MQ-7 central (AOUT previsto a GPIO34).
        [
          ['red', 0, 10, -1.58, 0.04],
          ['black', 1, 11, -1.64, 0.02],
          ['orange', 2, 12, -1.70, 0.00]
        ].forEach(function (d) {
          var pinY = MQC.y - 0.5 * MQC.sc + d[1] * 0.11 * MQC.sc;
          route(d[0], ['sensor', 'esp32'], [MQC.x + 0.3 * MQC.sc, pinY, MQC.z + 0.06 * MQC.sc], padW(d[2], 'B'), d[3], d[4], 0.022);
        });
        [[0, 'black', 14], [1, 'red', 15], [4, 'white', 17], [5, 'orange', 18]].forEach(function (d, k) {
          route(d[1], ['oled', 'esp32'], oledPin(OL.x, OL.y, OL.z, 1, d[0]), padW(d[2], 'T'), 0.95 + k * 0.06, 0.3 + k * 0.03);
        });
        [['red', 0, 10], ['green', 1, 13], ['blue', 2, 16]].forEach(function (d, k) {
          var rx = RES_X[k], p = padW(d[2], 'T');
          addWire(d[0], ['rgb', 'resistors'], [[[-0.06, 0.02, 0.06][k], 1.26, 0.15], [rx, 1.29, 0.15]]);
          addWire(d[0], ['rgb', 'resistors', 'esp32'], [[rx, 0.89, 0.15], [rx, 0.82, 0.12], [p[0], 0.76, 0.05], p]);
        });
        addWire('black', ['rgb', 'esp32'], [[-0.02, 1.26, 0.12], [-0.02, 1.34, -0.02], [-0.66, 1.34, -0.02], [-0.66, 0.8, -0.02], padW(8, 'T')]);
        // Señal de muteo y tierra del único pulsador; GPIO4 es el pin previsto.
        addWire('green', ['buttons', 'esp32'], [[MUTE_X - 0.12, 1.26, 0.2], [MUTE_X - 0.12, 1.17, -0.08], [padW(2, 'T')[0], 1.17, -0.08], padW(2, 'T')]);
        addWire('black', ['buttons', 'esp32'], [[MUTE_X + 0.12, 1.26, 0.2], [MUTE_X + 0.12, 1.07, -0.08], [padW(4, 'T')[0], 1.07, -0.08], padW(4, 'T')]);
        // Amplificador -> ESP32 y parlantes
        route('grey', ['amp', 'esp32'], [AMP.x - 0.24 + 2 * 0.16, AMP.y + 0.27, AMP.z + 0.03], padW(5, 'T'), AMP.x - 0.24 + 2 * 0.16, 0.12);
        route('grey', ['amp', 'esp32'], [AMP.x - 0.24 + 3 * 0.16, AMP.y + 0.27, AMP.z + 0.03], padW(6, 'T'), AMP.x - 0.24 + 3 * 0.16, 0.16);
        [[0, 'red', -0.12], [1, 'black', 0.12]].forEach(function (d) {
          addWire(d[1], ['amp', 'speakers'], [[AMP.x - 0.24 + d[0] * 0.16, AMP.y + 0.27, AMP.z + 0.03], [SP[0][0] + d[2], 0.45, 0.1], [SP[0][0] + d[2], SP[0][1] - 0.37, SP[0][2] - 0.02]]);
          addWire(d[1], ['amp', 'speakers'], [[AMP.x - 0.24 + d[0] * 0.16, AMP.y - 0.27, AMP.z + 0.03], [AMP.x - 0.24 + d[0] * 0.16, -1.5 + d[0] * 0.03, 0.0], [SP[1][0] + d[2], -1.5 + d[0] * 0.03, 0.0], [SP[1][0] + d[2], SP[1][1] - 0.37, SP[1][2] - 0.02]]);
        });
        // LoRa -> ESP32
        ['red', 'black', 'white', 'yellow', 'blue', 'orange'].forEach(function (c, j) {
          route(c, ['lora', 'esp32'], [LR.x - 0.45 + j * 0.13, LR.y + 0.43, LR.z + 0.03], padW(4 + j, 'B'), LR.x - 0.45 + j * 0.13, 0.0 + j * 0.02);
        });

        // ---- Exterior ----
        ledExterior(0, H / 2, 0.15);
        var muteButton = new THREE.Group(); muteButton.position.set(MUTE_X, H / 2, 0.2);
        var muteRing = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 32), new THREE.MeshStandardMaterial({ color: srgb('#1496b4'), roughness: 0.4, metalness: 0.2, emissive: srgb('#0a4f61'), emissiveIntensity: 0.5 }));
        muteRing.position.y = 0.005;
        var muteCap = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.08, 32), new THREE.MeshStandardMaterial({ color: srgb('#bdbdbd'), roughness: 0.42, metalness: 0.1 }));
        muteCap.position.y = 0.05;
        var muteSymbol = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), new THREE.MeshBasicMaterial({ map: muteTex(), toneMapped: false }));
        muteSymbol.rotation.x = -Math.PI / 2; muteSymbol.position.y = 0.092;
        [muteRing, muteCap].forEach(function (m) { m.castShadow = true; });
        muteButton.add(muteRing); muteButton.add(muteCap); muteButton.add(muteSymbol);
        extGroup.add(muteButton); extHide.push(muteButton);
        usbSlot(UB.x, -H / 2, 0.0);
        var chl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 20), new THREE.MeshStandardMaterial({ color: srgb('#ff3b3b'), emissive: srgb('#ff3b3b'), emissiveIntensity: 0.9, roughness: 0.3 }));
        chl.position.set(1.9, -H / 2, 0); extGroup.add(chl);
        redButton(-W / 2, SW.y, 0, Math.PI / 2);   // botón de apagado en el lado izquierdo

        badge('esp32', -0.75, 0.25, 0.3); badge('sensor', -1.83, 1.02, 0.52); badge('oled', OL.x, OL.y, 0.75); badge('rgb', 0.0, 1.62, 0.45);
        badge('resistors', -0.7, 1.08, 0.35); badge('buttons', MUTE_X, 1.55, 0.6);
        badge('speakers', SP[0][0], SP[0][1], 0.65); badge('speakers', SP[1][0], SP[1][1], 0.65);
        badge('amp', AMP.x, AMP.y, 0.35); badge('lora', LR.x, LR.y, 0.4); badge('ble', 0.3, 0.66, 0.2);
        badge('usbc', UB.x, UB.y, 0.3);
        badge('power', SW.x + 0.1, SW.y, 0.35); badge('battery', BA.x, BA.y, -0.05); badge('wires', 0.8, -0.55, 0.2);
      } else {
        // ===================== NEXO CO =====================
        ESPpos = { x: 0, y: -0.7, z: -0.2, rot: Math.PI / 2 };
        var SN = { x: 0, y: 1.3, z: 0.05 }, OS = { x: 0, y: 0.2, z: 0.55, sc: 0.75 };
        var CHS = { x: -0.55, y: -2.15, z: -0.1 }, BOS = { x: 0, y: -2.15, z: -0.1 }, SWS = { x: 0.75, y: -2.15, z: -0.1 };
        var BPS = { x: 0, y: -0.55, z: -0.43 };
        var BTp = [[0.19, -1.62, -0.35], [-0.19, -1.62, -0.35]];

        deco(new THREE.BoxGeometry(2.3, 5.0, 0.04), '#1d3532', 0, 0, PLATE_Z, 0.78);
        boardFinish(2.3, 5.0);
        buildEsp();

        // Sensor de gas MQ-7 del Nexo CO (se conserva la rejilla frontal y el módulo seleccionable).
        buildMq7(SN);

        // Parlante de alerta del Nexo CO: pieza seleccionable en el circuito.
        var SPN = { x: 0, y: -1.25, z: 0.18 };
        partGroup('speakers');
        speaker(SPN.x, SPN.y, SPN.z);
        post(SPN.x, SPN.y - 0.18, SPN.z - 0.17);

        buildRgbInterior(0, 2.12, 0.15);
        post(-0.5, 2.0, 0.1); post(0.5, 2.0, 0.1);

        // Batería: 3 celdas 18650 en paralelo
        partGroup('battery');
        [-0.38, 0, 0.38].forEach(function (cx) {
          solid('battery', new THREE.CylinderGeometry(0.18, 0.18, 2.1, 24), '#2f6f9f', BPS.x + cx, BPS.y, BPS.z, 0.4, 0.2);
          solid('battery', new THREE.CylinderGeometry(0.185, 0.185, 0.3, 24), '#e9eef1', BPS.x + cx, BPS.y + 0.4, BPS.z, 0.5);
          solid('battery', new THREE.CylinderGeometry(0.06, 0.06, 0.05, 12), '#c9ced2', BPS.x + cx, BPS.y + 1.07, BPS.z, 0.3, 0.7);
        });
        solid('battery', new THREE.BoxGeometry(1.2, 0.06, 0.1), '#b9c2c8', BPS.x, BPS.y - 1.1, BPS.z + 0.02, 0.35, 0.6);
        solid('battery', new THREE.BoxGeometry(0.1, 0.1, 0.06), '#d64a42', BTp[0][0], BTp[0][1], BTp[0][2], 0.35);
        solid('battery', new THREE.BoxGeometry(0.1, 0.1, 0.06), '#2b2f33', BTp[1][0], BTp[1][1], BTp[1][2], 0.35);
        labelPlane('battery', 1.0, 0.3, BPS.x, BPS.y - 0.45, BPS.z + 0.2, 400, 120, function (x, w, h) {
          x.clearRect(0, 0, w, h); x.fillStyle = 'rgba(20,35,48,.9)'; rr(x, 0, 0, w, h, 14); x.fill();
          x.fillStyle = '#eaf3f8'; x.textAlign = 'center'; x.textBaseline = 'middle';
          x.font = '700 44px Inter, sans-serif'; x.fillText('3×18650 · 10.200 mAh', w / 2, h * 0.38);
          x.font = '500 22px "IBM Plex Mono", monospace'; x.fillText('≈ 1 DÍA DE AUTONOMÍA', w / 2, h * 0.74);
        });
        post(-0.9, -1.4, BPS.z - 0.2); post(0.9, 0.2, BPS.z - 0.2);

        // Cargador USB-C
        partGroup('usbc');
        module('usbc', 0.6, 0.5, '#2b6a3c', CHS.x, CHS.y, CHS.z);
        solid('usbc', new THREE.BoxGeometry(0.28, 0.2, 0.1), '#cfd4d8', CHS.x, CHS.y - 0.27, CHS.z + 0.05, 0.3, 0.7);
        solid('usbc', new THREE.BoxGeometry(0.12, 0.12, 0.07), '#0a0c0f', CHS.x - 0.1, CHS.y + 0.05, CHS.z + 0.05, 0.4);
        pin('usbc', CHS.x + 0.27, CHS.y + 0.1, CHS.z); pin('usbc', CHS.x + 0.27, CHS.y - 0.1, CHS.z);
        post(CHS.x - 0.25, CHS.y + 0.2, CHS.z - 0.03); post(CHS.x + 0.25, CHS.y - 0.2, CHS.z - 0.03);

        // Interruptor y elevador 5 V
        partGroup('power');
        module('power', 0.42, 0.5, '#22272b', SWS.x, SWS.y, SWS.z);
        zcyl('power', 0.1, 0.1, '#d93a35', SWS.x, SWS.y - 0.05, SWS.z + 0.07, 0.35);
        pin('power', SWS.x - 0.12, SWS.y + 0.2, SWS.z); pin('power', SWS.x + 0.12, SWS.y + 0.2, SWS.z);
        module('power', 0.6, 0.45, '#b3262a', BOS.x, BOS.y, BOS.z);
        inductor('power', BOS.x - 0.1, BOS.y, BOS.z); solid('power', new THREE.BoxGeometry(0.12, 0.12, 0.08), '#2a6ad0', BOS.x + 0.12, BOS.y, BOS.z + 0.05, 0.4);
        pin('power', BOS.x + 0.3, BOS.y + 0.1, BOS.z); pin('power', BOS.x + 0.3, BOS.y - 0.1, BOS.z);
        pin('power', BOS.x - 0.15, BOS.y + 0.23, BOS.z); pin('power', BOS.x + 0.05, BOS.y + 0.23, BOS.z);
        post(BOS.x - 0.25, BOS.y - 0.2, BOS.z - 0.03); post(SWS.x - 0.2, SWS.y - 0.22, SWS.z - 0.03);

        // ---- Cableado ----
        partGroup('wires');
        [[3, 'red', 14], [2, 'black', 15], [0, 'orange', 16]].forEach(function (d, k) {
          route(d[1], ['sensor', 'esp32'], [SN.x + 0.3, SN.y - 0.5 + d[0] * 0.11, SN.z + 0.07], padW(d[2], 'B'), 0.7 + k * 0.07, 0.2 - k * 0.03);
        });
        [[0, 'black', 14], [1, 'red', 15], [4, 'white', 16], [5, 'orange', 17]].forEach(function (d, k) {
          route(d[1], ['oled', 'esp32'], oledPin(OS.x, OS.y, OS.z, OS.sc, d[0]), padW(d[2], 'T'), -0.7 - k * 0.07, 0.1 + k * 0.03);
        });
        [['red', 10, -0.06], ['green', 11, -0.02], ['blue', 12, 0.02], ['black', 13, 0.06]].forEach(function (d, k) {
          route(d[0], ['rgb', 'esp32'], [d[2], 2.06, 0.15], padW(d[1], 'B'), 0.95 + k * 0.07, -0.02 - k * 0.02);
        });
        addWire('red', ['usbc', 'battery'], [[CHS.x + 0.27, CHS.y + 0.1, 0.0], [-0.4, -1.9, -0.12], BTp[0]], 0.03);
        addWire('black', ['usbc', 'battery'], [[CHS.x + 0.27, CHS.y - 0.1, 0.0], [-0.42, -1.82, -0.14], BTp[1]], 0.03);
        addWire('red', ['battery', 'power'], [BTp[0], [0.4, -1.78, -0.2], [SWS.x - 0.12, SWS.y + 0.2, SWS.z + 0.04]], 0.03);
        addWire('red', ['power'], [[SWS.x + 0.12, SWS.y + 0.2, SWS.z + 0.04], [0.6, -1.9, 0.02], [BOS.x + 0.3, BOS.y + 0.1, BOS.z + 0.04]], 0.03);
        addWire('black', ['battery', 'power'], [BTp[1], [-0.19, -1.8, -0.05], [0.4, -1.95, 0.03], [0.4, BOS.y - 0.1, 0.0], [BOS.x + 0.3, BOS.y - 0.1, BOS.z + 0.04]], 0.03);
        route('red', ['power', 'esp32'], [BOS.x - 0.15, BOS.y + 0.23, BOS.z + 0.04], padW(2, 'B'), 0.62, -0.04, 0.03);
        route('black', ['power', 'esp32'], [BOS.x + 0.05, BOS.y + 0.23, BOS.z + 0.04], padW(3, 'B'), 0.68, -0.06, 0.03);
        addWire('grey', ['speakers', 'esp32'], [[SPN.x - 0.12, SPN.y - 0.37, SPN.z - 0.02], padW(7, 'B'), [padW(7, 'B')[0], -0.75, 0.0]], 0.025);
        addWire('black', ['speakers', 'esp32'], [[SPN.x + 0.12, SPN.y - 0.37, SPN.z - 0.02], padW(8, 'B'), [padW(8, 'B')[0], -0.82, 0.0]], 0.025);

        // ---- Exterior (diseño de referencia) ----
        ledExterior(0, SHd / 2, 0.0);

        usbSlot(CHS.x, -SHd / 2, 0.0);
        redButton(SWS.x, -SHd / 2, 0.0, Math.PI);   // botón de apagado hacia abajo

        badge('esp32', 0.0, -1.0, 0.1); badge('sensor', 0.0, 1.55, 0.7); badge('rgb', 0.0, 2.38, 0.4); badge('speakers', 0.0, -0.9, 0.65);
        badge('ble', 0.0, 0.42, 0.2); badge('usbc', CHS.x, CHS.y, 0.3); badge('battery', 0.45, -0.9, -0.05);
        badge('power', SWS.x, SWS.y, 0.3); badge('wires', -0.9, -1.0, 0.2);
      }

      // Puntos de señal que recorren los cables
      var flowGeo = new THREE.SphereGeometry(0.04, 10, 8);
      var flowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, depthWrite: false });
      wireItems.forEach(function (w, wi) {
        w.dots = [0, 0.5].map(function (o) {
          var d = new THREE.Mesh(flowGeo, flowMat);
          d.userData.t = (o + (wi * 0.137)) % 1; d.visible = false;
          internalParts.wires.add(d);
          return d;
        });
      });
      syncExterior();
    }

    // Caja de selección
    var selBox = new THREE.BoxHelper(internalCircuit, 0x36d8f2);
    selBox.visible = false; selBox.material.depthTest = false; selBox.renderOrder = 15;
    scene.add(selBox);

    // ---- resaltado, selección y puntero ----
    function applyHighlight() {
      Object.keys(partMeshes).forEach(function (k) {
        partMeshes[k].forEach(function (m) {
          var mt = m.material, lk = m.userData.links;
          var linked = k === 'wires' && selectedKey && lk && lk.indexOf(selectedKey) >= 0;
          var active = !selectedKey || k === selectedKey || linked;
          var sel = k === selectedKey || linked;
          var hov = hoverKey && k === hoverKey;
          var wasT = mt.transparent;
          if (!m.userData.led) { mt.transparent = !active; mt.opacity = active ? 1 : 0.25; }
          else { mt.transparent = true; mt.opacity = active ? (m.userData.baseOpacity || 1) : 0.25; }
          if (!m.userData.led && mt.emissive) {
            mt.emissive.copy(sel || hov ? HL : BLACK);
            mt.emissiveIntensity = sel ? (k === selectedKey ? 0.3 : 0.18) : (hov ? 0.16 : 0);
          }
          if (wasT !== mt.transparent) mt.needsUpdate = true;
        });
      });
      badgeSprites.forEach(function (b) {
        var on = b.key === selectedKey;
        b.s.scale.set(on ? 0.4 : 0.3, on ? 0.4 : 0.3, 1);
        b.s.material.color.setHex(on ? 0xffffff : 0xb8c4cc);
      });
      if (selectedKey && internalParts[selectedKey] && interiorMode) { selBox.visible = true; selBox.setFromObject(internalParts[selectedKey]); }
      else selBox.visible = false;
    }
    var raycaster = new THREE.Raycaster(), ndc = new THREE.Vector2();
    function pickAt(e) {
      if (!interiorMode) return null;
      var r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      var hits = raycaster.intersectObjects(pickables, false), i;
      for (i = 0; i < hits.length; i++) if (hits[i].object.userData.isBadge) return hits[i].object.userData.part;
      return hits.length ? hits[0].object.userData.part : null;
    }
    var tipEl = document.getElementById('tip');
    function clearHover() {
      cv.style.cursor = '';
      if (tipEl) tipEl.hidden = true;
      if (hoverKey) { hoverKey = null; applyHighlight(); }
    }
    function hoverAt(e) {
      var k = pickAt(e);
      cv.style.cursor = k ? 'pointer' : '';
      if (k !== hoverKey) { hoverKey = k; applyHighlight(); }
      if (k && componentData[k]) {
        var r = stage.getBoundingClientRect();
        tipEl.textContent = getData(k).name;
        tipEl.style.left = (e.clientX - r.left + 14) + 'px';
        tipEl.style.top = (e.clientY - r.top + 14) + 'px';
        tipEl.hidden = false;
      } else tipEl.hidden = true;
    }

    // ---- simulación de estados (valores ilustrativos) ----
    var SIM = {
      normal: { label: 'NORMAL', col: '#18e07c', adc: 400, buzz: [0, 0] },
      prevencion: { label: 'PRE-ALERTA', col: '#ffd23a', adc: 850, buzz: [1, 0], pulse: true },
      alerta: { label: 'ALERTA', col: '#ff3b3b', adc: 4095, buzz: [1, 1] }
    };
    var THR_PRE = 700, THR_ALM = 1000;
    var simKey = 'normal';
    function drawOled() {
      var s = SIM[simKey], cen = deviceKey === 'central';
      ox.fillStyle = '#000'; ox.fillRect(0, 0, 256, 128);
      ox.font = '500 13px "IBM Plex Mono", monospace'; ox.textBaseline = 'middle'; ox.textAlign = 'left';
      ox.fillStyle = '#e8f6ff'; ox.fillRect(4, 4, 248, 20);
      ox.fillStyle = '#000'; ox.fillText(cen ? 'HOGARSEGURO v.02' : 'SAFEHOME NEXO CO', 10, 14);
      ox.fillStyle = '#e8f6ff';
      ox.fillText('ESTADO: ' + s.label, 10, 38);
      ox.fillText((cen ? 'SAT1 ADC: ' : 'ADC: ') + s.adc, 10, 56);
      ox.strokeStyle = '#e8f6ff'; ox.lineWidth = 1.5; ox.strokeRect(10, 66, 236, 12);
      ox.fillRect(12, 68, Math.max(1, Math.round(232 * s.adc / 4095)), 8);
      ox.fillRect(12 + Math.round(232 * THR_PRE / 4095), 62, 2, 5);
      ox.fillRect(12 + Math.round(232 * THR_ALM / 4095), 60, 2, 7);
      ox.fillText(cen ? 'BT:NEXO CO  LORA:OK' : 'BT: CONECTADO', 10, 96);
      ox.fillText(cen ? 'ALIM: USB-C/BAT' : 'BAT: 87%  USB-C', 10, 114);
      oledT.needsUpdate = true;
    }
    function setSim(key, quiet) {
      var s = SIM[key]; if (!s) return;
      simKey = key;
      var col = srgb(s.col);
      rgbs.forEach(function (l) { l.m.color.copy(col); l.m.emissive.copy(col); l.sp.material.color.copy(col); });
      drawOled();
      var bs = document.querySelectorAll('[data-sim]');
      for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', bs[i].dataset.sim === key ? 'true' : 'false');
      if (!quiet) showNotice('Estado simulado: ' + s.label);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawOled);

    function updateInterior(dt, s) {
      if (selBox.visible && selectedKey && internalParts[selectedKey]) selBox.setFromObject(internalParts[selectedKey]);
      wireItems.forEach(function (w) {
        w.dots.forEach(function (d) {
          d.visible = flowOn;
          if (!flowOn) return;
          if (!REDUCE) d.userData.t = (d.userData.t + dt * 0.9 / w.len) % 1;
          w.curve.getPointAt(d.userData.t, d.position);
        });
      });
      var sm = SIM[simKey];
      buzzRings.forEach(function (r) {
        var on = sm.buzz[r.idx];
        if (on && sm.pulse) { var cyc = REDUCE ? 0.05 : (s % 5) / 0.6; on = cyc < 1 ? 1 : 0; r.ph = cyc; }
        if (!on) { r.m.visible = false; return; }
        var ph = sm.pulse ? Math.min(0.999, r.ph) : (REDUCE ? 0.3 : (s * 1.1 + r.phase) % 1);
        r.m.visible = true; r.m.scale.setScalar(1 + ph * 1.6); r.m.material.opacity = 0.7 * (1 - ph);
      });
    }

    // Carcasas translúcidas en modo interior (equipo central y Nexo CO)
    var shells = [body, satBody].map(function (m) {
      return { mesh: m, mats: m.material, orig: m.material.map(function (x) { return { transparent: x.transparent, opacity: x.opacity, depthWrite: x.depthWrite }; }) };
    });
    var interiorMode = false, flowOn = true, shellTranslucent = true;
    function syncExterior() {
      var cen = deviceKey === 'central';
      body.visible = cen && (!interiorMode || shellTranslucent);
      satBody.visible = !cen && (!interiorMode || shellTranslucent);
      extGroup.visible = !interiorMode;
      screenFrame.visible = lcd.visible = glowLight.visible = cen && !interiorMode;
      btn.visible = false;
      extHide.forEach(function (o) { o.visible = !interiorMode; });
    }
    function setShellMode() { syncExterior(); }
    function setInteriorMode(on) {
      interiorMode = !!on; internalCircuit.visible = interiorMode;
      stage.classList.toggle('is-interior', interiorMode);
      shells.forEach(function (sh) {
        sh.mesh.castShadow = !interiorMode; sh.mesh.receiveShadow = !interiorMode;
        sh.mats.forEach(function (m, i) { m.transparent = interiorMode ? true : sh.orig[i].transparent; m.opacity = interiorMode ? 0.14 : sh.orig[i].opacity; m.depthWrite = interiorMode ? false : sh.orig[i].depthWrite; m.needsUpdate = true; });
      });
      syncExterior();
      if (interiorMode) {
        var w = stage.clientWidth, sat = deviceKey === 'nexo';
        tgt.th = -0.14; tgt.ph = sat ? 1.5 : 1.38; tgt.det = 0;
        tgt.zoom = w > 760 ? clamp(w / (w - 400) * 1.02, 1.05, 1.8) : 1.0;
        setAutoRotate(false);
        capK.textContent = 'Circuito interno';
        capT.textContent = 'Toca una pieza o un cable para resaltarlo.';
        showNotice('Toca cualquier pieza del circuito');
        selectComponent('esp32');
      } else {
        selectComponent(null); clearHover();
        setView('l34'); showNotice('Vista exterior restaurada');
      }
      resize();
    }
    buildDevice('central');
    setSim('normal', true);

    // ---------- pared: materiales intercambiables ----------
    var wallMaterial = new THREE.MeshStandardMaterial({ roughness: 0.92, metalness: 0 });
    var wall = new THREE.Mesh(new THREE.PlaneGeometry(90, 60), wallMaterial);
    wall.receiveShadow = true;
    scene.add(wall);

    function makeWallTexture(style) {
      var wc = mk(512, 512), wx = wc.getContext('2d');
      var base = {
        slate: '#687681', white: '#e9e6df', wood: '#9a6840',
        brick: '#895b4c', concrete: '#999b98', sage: '#aab9a5', tile: '#dedbd2'
      }[style] || '#687681';
      wx.fillStyle = base; wx.fillRect(0, 0, 512, 512);

      if (style === 'wood') {
        for (var y = 0; y < 512; y += 64) {
          wx.fillStyle = y % 128 === 0 ? 'rgba(55,30,12,.13)' : 'rgba(255,220,170,.10)';
          wx.fillRect(0, y, 512, 2);
          for (var x = 0; x < 512; x += 1) {
            var wave = Math.sin(x * 0.035 + y * 0.018) * 3 + Math.sin(x * 0.011 + y) * 2;
            wx.fillStyle = 'rgba(54,29,12,' + (0.025 + Math.random() * 0.035) + ')';
            wx.fillRect(x, y + 8 + wave, 1, 1 + Math.random() * 5);
          }
        }
      } else if (style === 'brick') {
        var bh = 64, bw = 128;
        for (var by = 0; by < 512; by += bh) {
          var offset = (Math.floor(by / bh) % 2) * (bw / 2);
          for (var bx = -bw; bx < 512 + bw; bx += bw) {
            wx.fillStyle = 'rgba(238,220,197,.8)'; wx.fillRect(bx + offset, by, bw - 3, bh - 3);
            wx.fillStyle = 'rgba(255,255,255,.07)'; wx.fillRect(bx + offset + 5, by + 5, bw - 13, 3);
          }
        }
      } else if (style === 'tile') {
        wx.strokeStyle = 'rgba(105,105,98,.28)'; wx.lineWidth = 4;
        for (var tx = 0; tx <= 512; tx += 128) { wx.beginPath(); wx.moveTo(tx, 0); wx.lineTo(tx, 512); wx.stroke(); }
        for (var ty = 0; ty <= 512; ty += 128) { wx.beginPath(); wx.moveTo(0, ty); wx.lineTo(512, ty); wx.stroke(); }
      }

      var image = wx.getImageData(0, 0, 512, 512), pixels = image.data;
      var noise = style === 'wood' || style === 'brick' ? 5 : 9;
      for (var i = 0; i < pixels.length; i += 4) {
        var n = (Math.random() - 0.5) * noise;
        pixels[i] += n; pixels[i + 1] += n; pixels[i + 2] += n;
      }
      wx.putImageData(image, 0, 0);
      var texture = new THREE.CanvasTexture(wc);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(style === 'wood' ? 5 : style === 'brick' ? 5 : 14, style === 'wood' ? 3 : style === 'brick' ? 5 : 9);
      texture.encoding = THREE.sRGBEncoding;
      texture.anisotropy = maxA;
      return texture;
    }

    var wallStyleSelect = document.getElementById('wallStyle');
    var activeWallTexture = makeWallTexture('slate');
    wallMaterial.map = activeWallTexture;
    wallMaterial.needsUpdate = true;
    wallStyleSelect.addEventListener('change', function () {
      var nextTexture = makeWallTexture(wallStyleSelect.value);
      wallMaterial.map = nextTexture;
      wallMaterial.needsUpdate = true;
      if (activeWallTexture) activeWallTexture.dispose();
      activeWallTexture = nextTexture;
    });

    // Tornillos en la pared (quedan ocultos detrás de la carcasa montada)
    var wallScrews = [];
    var screwMat = new THREE.MeshStandardMaterial({ color: srgb('#aab2b9'), metalness: 0.5, roughness: 0.4 });
    [[2.78, 1.23], [-2.78, 1.23]].forEach(function (p) {
      var s = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.07, 24), screwMat);
      s.rotation.x = Math.PI / 2;
      s.position.set(p[0], p[1], 0.035);
      s.castShadow = true;
      wallScrews.push(s);
      scene.add(s);
    });
    function syncWallScrews() {
      var pos = deviceKey === 'nexo' ? [[-0.55, 1.85], [0.55, 1.85]] : [[2.78, 1.23], [-2.78, 1.23]];
      wallScrews.forEach(function (s, i) { s.position.set(pos[i][0], pos[i][1], 0.035); });
    }
    syncWallScrews();

    // ---------- luces ----------
    scene.add(new THREE.HemisphereLight(0xdfe9f2, 0x1a1d22, 0.72));
    var key = new THREE.SpotLight(0xfff8ef, 1.15, 0, 0.55, 1, 0);
    key.position.set(-7, 8, 13);
    key.target.position.set(0, 0, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 4;
    key.shadow.camera.near = 4;
    key.shadow.camera.far = 40;
    scene.add(key); scene.add(key.target);
    var fill = new THREE.DirectionalLight(0xb8d8ff, 0.42);
    fill.position.set(6, 3, 8);
    scene.add(fill);
    var softFill = new THREE.DirectionalLight(0xe6f4ff, 0.22);
    softFill.position.set(-6, 1, 7);
    scene.add(softFill);

    // Perfiles de iluminación para presentar el producto en distintos ambientes.
    var hemi = scene.children.find(function (o) { return o.isHemisphereLight; });
    var lightStyle = document.getElementById('lightStyle');
    lightStyle.addEventListener('change', function () {
      var presets = {
        studio: { hemi: 0.72, key: 1.15, fill: 0.42, soft: 0.22, color: 0xfff8ef, fillColor: 0xb8d8ff, softColor: 0xe6f4ff },
        warm:   { hemi: 0.78, key: 1.25, fill: 0.28, soft: 0.16, color: 0xffd2a1, fillColor: 0xffb36b, softColor: 0xffd6ad },
        cool:   { hemi: 0.68, key: 1.0, fill: 0.48, soft: 0.24, color: 0xd9eaff, fillColor: 0x82b9ff, softColor: 0xc4e2ff }
      };
      var preset = presets[lightStyle.value] || presets.studio;
      hemi.intensity = preset.hemi;
      key.intensity = preset.key;
      key.color.setHex(preset.color);
      fill.intensity = preset.fill;
      fill.color.setHex(preset.fillColor);
      softFill.intensity = preset.soft;
      softFill.color.setHex(preset.softColor);
    });

    // ---------- vistas ----------
    var VIEWS = {
      front: { label: 'Frente', th: 0, ph: Math.PI / 2, zoom: 1, det: 0,
        text: 'Dos parlantes con rejilla perforada, iguales y alineados en la parte inferior del frente (izquierda y derecha), ícono de casa con Wi-Fi, pantalla SafeHome y varias rejillas de ventilación.' },
      l34: { label: '3/4 izquierda', th: -0.66, ph: 1.42, zoom: 0.98, det: 0,
        text: 'Se ven a la vez el frente y el lado izquierdo, con el botón rojo de apagado. Arriba sobresalen el LED RGB y los tres botones.' },
      r34: { label: '3/4 derecha', th: 0.66, ph: 1.42, zoom: 0.98, det: 0,
        text: 'Se ven a la vez el frente y el lado derecho de la carcasa.' },
      left: { label: 'Lado izquierdo', th: -1.3, ph: 1.55, zoom: 0.86, det: 0,
        text: 'Botón rojo de apagado en el centro y rejillas de ventilación arriba y abajo.' },
      right: { label: 'Lado derecho', th: 1.3, ph: 1.55, zoom: 0.86, det: 0,
        text: 'Ícono de casa con Wi-Fi arriba y rejillas de ventilación abajo.' },
      top: { label: 'Superior', th: -0.25, ph: 0.62, zoom: 0.95, det: 0,
        text: 'LED RGB al centro, un único botón de muteo turquesa sobre la pantalla y rejillas de ventilación a los lados.' },
      bottom: { label: 'Inferior', th: -0.25, ph: 2.25, zoom: 0.95, det: 0,
        text: 'Puerto de carga USB-C con su LED rojo indicador de carga.' },
      back: { label: 'Reverso', th: 0, ph: Math.PI / 2, zoom: 1, det: 1,
        text: 'La carcasa se separa de la pared. El reverso conserva dos ranuras laterales para montaje. Esta representación es un prototipo visual, no un plano de fabricación.' }
    };
    var tgt = { th: -0.66, ph: 1.42, zoom: 0.98, det: 0 };
    var cur = { th: 0, ph: Math.PI / 2, zoom: 1.35, det: 0 };
    var capK = document.getElementById('capK');
    var capT = document.getElementById('capT');
    var viewsEl = document.getElementById('views');

    function mark(name) {
      var bs = viewsEl.querySelectorAll('button[data-view]');
      for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', bs[i].dataset.view === name ? 'true' : 'false');
    }
    var SAT_TEXT = {
      front: 'Rejilla del sensor MQ-7 en la parte superior y rejilla circular del parlante más abajo; sin pantalla.',
      l34: 'Se ven el frente y un lado con rejillas de ventilación. El LED RGB sobresale en el borde superior.',
      r34: 'Se ven el frente y el lado derecho con rejillas de ventilación.',
      left: 'Rejillas de ventilación laterales.', right: 'Rejillas de ventilación laterales.',
      top: 'LED RGB al centro y rejillas de ventilación.',
      bottom: 'Puerto USB-C a la izquierda y botón rojo de apagado a la derecha, apuntando hacia abajo.',
      back: 'Reverso del Nexo CO: la carcasa se separa del soporte y gira para mostrar la parte posterior, con su sistema de montaje.'
    };
    function setView(name) {
      var v = VIEWS[name];
      if (!v) return;
      var sat = deviceKey === 'nexo';
      tgt.th = v.th; tgt.ph = v.ph; tgt.zoom = v.zoom; tgt.det = v.det;
      capK.textContent = v.label;
      capT.textContent = sat ? (SAT_TEXT[name] || '') : v.text;
      mark(name);
    }
    function manual() {
      mark('');
      capK.textContent = 'Vista libre';
      capT.textContent = 'Gira la carcasa a tu gusto. Con los botones de abajo vuelves a una vista fija.';
      if (autoRotate) setAutoRotate(false);
    }
    var autoRotate = false;
    var autoRotateButton = document.getElementById('autoRotate');
    var notice = document.getElementById('notice');
    var noticeTimer = null;
    function showNotice(message) {
      notice.textContent = message;
      notice.classList.add('show');
      if (noticeTimer) clearTimeout(noticeTimer);
      noticeTimer = setTimeout(function () { notice.classList.remove('show'); }, 2200);
    }
    function setAutoRotate(enabled) {
      autoRotate = !!enabled;
      autoRotateButton.setAttribute('aria-pressed', autoRotate ? 'true' : 'false');
    }
    autoRotateButton.addEventListener('click', function () {
      setAutoRotate(!autoRotate);
      showNotice(autoRotate ? 'Giro automático activado' : 'Giro automático pausado');
    });
    document.getElementById('resetView').addEventListener('click', function () {
      setAutoRotate(false);
      setView('l34');
      showNotice('Vista restablecida');
    });
    document.getElementById('captureView').addEventListener('click', function () {
      try {
        renderer.render(scene, camera);
        var link = document.createElement('a');
        link.download = 'SafeHome-vista-3D.png';
        link.href = renderer.domElement.toDataURL('image/png');
        link.click();
        showNotice('Imagen del producto guardada');
      } catch (err) {
        showNotice('No se pudo guardar la imagen en este navegador');
      }
    });
    document.getElementById('fullscreen').addEventListener('click', function () {
      var target = stage;
      if (!document.fullscreenElement && target.requestFullscreen) {
        target.requestFullscreen().then(function () { showNotice('Pantalla completa activada'); }).catch(function () { showNotice('Pantalla completa no disponible'); });
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });

    // ---------- explorador interactivo del circuito ----------
    var componentData = {
      esp32:{name:'ESP32',tag:'UNIDAD DE CONTROL',description:'Es el cerebro de SafeHome. En el equipo central lee su propio MQ-7 y coordina el Nexo CO por Bluetooth; también controla el LED RGB, los parlantes, la pantalla, el LoRa y el botón de muteo. En el Nexo CO, el ESP32 lee el segundo MQ-7 y envía su estado al central.',why:'Integra procesamiento, WiFi y Bluetooth en una sola placa. El Bluetooth del propio ESP32 permite enlazar los equipos sin añadir otro módulo.',conn:'Central: salida AOUT del MQ-7 a GPIO34 (con adaptación de nivel), pantalla I2C (SDA 18, SCL 22), LED RGB (R 19, G 23, B 21), parlantes (16 y 17) y muteo en GPIO4. LoRa por SPI alternativo (SCK 14, MISO 12, MOSI 13, NSS 5, RST 27, DIO0 32), porque el SPI por defecto usa GPIO18, que ya ocupa la pantalla.'},
      sensor:{name:'Sensor de monóxido de carbono MQ-7',tag:'DETECCIÓN',description:'SafeHome incorpora dos sensores MQ-7: uno en la central y otro en el Nexo CO. Cada salida analógica se conecta al ESP32 local por GPIO34, con adaptación de nivel, y se compara con umbrales de simulación. El MQ-7 requiere calibración en el entorno de uso y un ciclo de calefacción controlado para obtener mediciones confiables; una lectura sin ese ciclo no debe tratarse como medición válida.',why:'La central mide CO en su propia ubicación y recibe además el estado del sensor remoto del Nexo CO.',conn:'Cada MQ-7 va a 5 V/GND común y AOUT a GPIO34 del ESP32 de su equipo, mediante adaptación/divisor para no superar el máximo admitido por el ADC. El calefactor requiere ciclo de alta/baja tensión, alimentación dimensionada y calibración con el módulo real.'},
      oled:{name:'Pantalla OLED del equipo central',tag:'INTERFAZ',description:'Muestra el estado, la lectura ADC y una barra con marcas de umbral. En el equipo central también indica cuántos Nexo CO hay conectados. El Nexo CO no incorpora pantalla.',why:'Entrega información inmediata sin depender de un teléfono ni de Internet.',conn:'Alimentación, tierra y bus I2C (SDA 18, SCL 22). Usa «Simular» para ver los tres estados.'},
      rgb:{name:'LED RGB',tag:'INDICADOR DE ESTADO',description:'Un único LED de tres colores reemplaza a los tres LEDs: verde en NORMAL, amarillo (rojo + verde) en PRE-ALERTA y rojo en ALERTA. Parpadea en alerta. Está en la cara superior de ambos equipos.',why:'Ahorra espacio y pines, y permite más colores, por ejemplo azul para emparejando Bluetooth.',conn:'Cátodo común a GND y tres canales con su resistencia en serie: rojo GPIO19, verde GPIO23, azul GPIO21 (en el central; en el Nexo CO las resistencias van en el mismo LED).'},
      resistors:{name:'Resistencias',tag:'PROTECCIÓN',description:'Una resistencia por cada canal del LED RGB limita la corriente.',why:'Evitan sobrecorriente en el LED y en los pines del ESP32.',conn:'En serie entre cada pin de salida y su canal del LED RGB.'},
      buttons:{name:'Botón de muteo (silencio)',tag:'ENTRADA MANUAL',description:'Un único pulsador en la cara superior del equipo central, centrado sobre la pantalla y marcado con un anillo turquesa. Permite silenciar temporalmente las alertas sonoras.',why:'Deja a mano una única acción de silencio, sin controles físicos para subir o bajar el volumen.',conn:'El pulsador se conecta con pull-up interno al GPIO4 y a GND.'},
      speakers:{name:'Parlantes',tag:'ALERTA SONORA',description:'Dos parlantes inferiores con rejilla perforada, uno a la izquierda y otro a la derecha; tienen el mismo diámetro y están alineados a la misma altura. Reemplazan a los zumbadores. En PRE-ALERTA y ALERTA el parlante local puede emitir patrones sonoros diferenciados según el estado.',why:'Un parlante da un sonido más fuerte y claro que un zumbador. Como no se puede conectar directo al ESP32, va con un amplificador.',conn:'Las señales salen de GPIO16 y GPIO17, pasan por el amplificador y de ahí a cada parlante (cables rojo y negro). El botón de muteo permite silenciar temporalmente las alertas sonoras.'},
      amp:{name:'Amplificador de audio',tag:'AUDIO',description:'Módulo amplificador clase D (tipo PAM8403) de dos canales que alimenta a los parlantes.',why:'El ESP32 no entrega la corriente que necesita un parlante; el amplificador la suministra para reproducir las alertas.',conn:'Entradas de audio desde GPIO16 y GPIO17, salida a los dos parlantes y alimentación de 5 V desde el elevador.'},
      lora:{name:'Módulo LoRa 915 MHz',tag:'LARGO ALCANCE',description:'Radio LoRa (tipo SX1276 / RFM95W) para enviar alertas a larga distancia, más allá del alcance del Bluetooth, hacia otro receptor LoRa.',why:'Permite avisar a una pasarela o a otro equipo situado lejos del hogar sin depender de WiFi. En Chile se usa la banda de 915 MHz.',conn:'Bus SPI con el ESP32 (3V3, GND, SCK, MISO, MOSI, NSS, además de RST y DIO0). Requiere antena (la varilla dorada). Hay que usar SPI alternativo porque GPIO18 lo ocupa la pantalla.'},
      ble:{name:'Bluetooth (BLE)',tag:'COMUNICACIÓN',description:'El ESP32 trae Bluetooth integrado. El equipo central se conecta al Nexo CO, que le envía el estado de detección de CO y notifica los cambios.',why:'Amplía la cobertura a varias habitaciones sin cableado. Límite técnico: el ESP32 clásico admite hasta 9 conexiones BLE simultáneas según la guía de Espressif, por lo que 10 dispositivos no es alcanzable con esta placa.',conn:'Usa la antena del propio módulo ESP32, sin cables. Para pasar de 9 habría que usar dos centrales u otra placa.'},
                  usbc:{name:'Cargador USB-C',tag:'CARGA',description:'Módulo de carga (tipo TP4056 con protección) conectado al puerto USB-C de la cara inferior. Un LED rojo junto al puerto indica carga.',why:'Permite recargar la batería con un cargador de celular normal. Está presente en ambos equipos.',conn:'Entrada: USB-C de 5 V. Salida: terminales positivo (rojo) y negativo (negro) de la batería.'},
      power:{name:'Botón de apagado y elevador 5 V',tag:'ENERGÍA',description:'Un interruptor con botón rojo corta la energía de la batería para apagar el equipo. Después va un elevador que sube la tensión de la batería a 5 V para el ESP32. En el central el botón está en el lado izquierdo; en el Nexo CO, en la cara inferior.',why:'Permite apagar el equipo de verdad (no solo ponerlo en reposo) para guardarlo o transportarlo.',conn:'En serie con el positivo de la batería: batería → interruptor → elevador → ESP32. La carga por USB-C sigue funcionando con el equipo apagado.'},
      battery:{name:'Batería',tag:'ALIMENTACIÓN',description:'Central: batería de 10.000 mAh, recargable por USB-C. Nexo CO: tres celdas 18650 en paralelo (unos 10.200 mAh) pensadas para durar aproximadamente un día.',why:'La autonomía del Nexo CO depende especialmente del ciclo de calefacción del MQ-7, del ESP32 y de las pérdidas del elevador. Debe medirse en el prototipo después de definir y validar el ciclo térmico del sensor.',conn:'Positivo (rojo) y negativo (negro) a los módulos de carga y, pasando por el interruptor, al elevador de 5 V.'},
      wires:{name:'Cableado',tag:'INTERCONEXIÓN',description:'Une los módulos con el ESP32 y con la cadena de energía.',why:'Hacen posible el intercambio de señales y energía. En el montaje físico hay que respetar polaridad y niveles de voltaje.',conn:'Colores: rojo = positivo, negro = tierra, naranja/blanco/amarillo/azul = datos y señales, verde = señal verde del RGB y silencio, gris = audio. Los puntos blancos muestran el flujo y se pueden apagar.'}
    };
    var SAT_DATA = {
      speakers:{name:'Parlante del Nexo CO',tag:'ALERTA SONORA LOCAL',description:'Parlante interno con rejilla circular visible en la carcasa para emitir avisos locales.',why:'Permite una alerta audible en la habitación donde está instalado el Nexo CO.',conn:'Usar una etapa de amplificación/driver adecuada; no conectar el parlante directamente a un GPIO del ESP32.'},
      esp32:{name:'ESP32 (Nexo CO)',description:'Lee el sensor MQ-7 y envía el estado de CO por Bluetooth al equipo central. El Nexo CO no incorpora pantalla.',why:'Procesa la lectura del MQ-7, gestiona el indicador RGB y el aviso sonoro local, y reporta al equipo central.',conn:'MQ-7 AOUT a GPIO34 mediante adaptación de nivel, VCC/calefactor según el módulo y GND común; LED RGB (19, 23, 21) y parlante mediante etapa de manejo adecuada. Alimentación desde el elevador de 5 V con capacidad suficiente para el ciclo del calefactor.'},
      ble:{description:'El Nexo CO anuncia su servicio BLE y espera que el equipo central se conecte. Envía el estado de detección de CO y notifica los cambios.',why:'Evita cableado entre habitaciones y permite que el equipo central reciba las alertas.',conn:'Antena integrada en el ESP32.'},
      rgb:{description:'LED RGB en el borde superior, como en el diseño de referencia: verde en NORMAL, amarillo en PRE-ALERTA y rojo en ALERTA.'}
    };
    function getData(key) {
      var d = {}, b = componentData[key] || {};
      Object.keys(b).forEach(function (k) { d[k] = b[k]; });
      if (deviceKey === 'nexo' && SAT_DATA[key]) Object.keys(SAT_DATA[key]).forEach(function (k) { d[k] = SAT_DATA[key][k]; });
      return d;
    }
    var SUBS = { esp32: 'Unidad de control', sensor: 'Detección de monóxido de carbono', oled: 'Información del sistema', rgb: 'Normal · Pre-alerta · Alerta', resistors: 'Protección del LED', buttons: 'Muteo / silencio', speakers: 'Alerta sonora local', amp: 'Amplificador de audio', lora: 'Largo alcance 915 MHz', ble: 'Hasta 9 conexiones', usbc: 'Carga por USB-C', power: 'Apagado + elevador 5 V', battery: 'Autonomía', wires: 'Conexiones' };
    var componentsDialog = document.getElementById('componentsDialog');
    var componentsBackdrop = document.getElementById('componentsBackdrop');
    var openComponents = document.getElementById('openComponents');
    var closeComponents = document.getElementById('closeComponents');
    var componentList = document.getElementById('componentList');
    function renderList() {
      componentList.innerHTML = '';
      PARTS[deviceKey].forEach(function (k, i) {
        var b = document.createElement('button');
        b.className = 'component-option'; b.type = 'button'; b.dataset.component = k;
        b.innerHTML = '<span class="component-index">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span><b></b><small></small></span><span class="component-arrow">›</span>';
        b.querySelector('b').textContent = getData(k).name; b.querySelector('small').textContent = SUBS[k] || '';
        componentList.appendChild(b);
      });
    }
    function selectComponent(key) {
      if (key && PARTS[deviceKey].indexOf(key) < 0) key = null;
      selectedKey = key;
      var opts = componentList.querySelectorAll('.component-option');
      for (var i = 0; i < opts.length; i++) opts[i].classList.toggle('active', opts[i].dataset.component === key);
      var d = key ? getData(key) : null;
      if (d) {
        document.getElementById('detailTag').textContent = d.tag;
        document.getElementById('detailName').textContent = d.name;
        document.getElementById('detailDescription').textContent = d.description;
        document.getElementById('detailWhy').textContent = d.why;
        document.getElementById('detailConn').textContent = d.conn;
      }
      applyHighlight();
    }
    function closeComponentExplorer() {
      componentsDialog.hidden = true; componentsBackdrop.hidden = true;
      if (interiorMode) setInteriorMode(false);
      openComponents.focus();
    }
    var devBtns = document.querySelectorAll('[data-device]');
    function switchDevice(v, quiet) {
      if (v === deviceKey) return;
      selectedKey = null; hoverKey = null;
      buildDevice(v); syncWallScrews(); resize(); setSim(simKey, true); renderList();
      for (var i = 0; i < devBtns.length; i++) devBtns[i].setAttribute('aria-pressed', devBtns[i].dataset.device === v ? 'true' : 'false');
      document.getElementById('componentsTitle').textContent = v === 'central' ? 'Equipo central' : 'Nexo CO';
      if (switchBtn) switchBtn.textContent = v === 'central' ? 'Ver Nexo CO' : 'Ver central';
      if (interiorMode) selectComponent('esp32'); else { selectComponent(null); setView('l34'); }
      internalCircuit.visible = interiorMode; extGroup.visible = !interiorMode;
      if (interiorMode) { var w2 = stage.clientWidth; tgt.zoom = w2 > 760 ? clamp(w2 / (w2 - 400) * 1.02, 1.05, 1.8) : 1.0; tgt.ph = v === 'nexo' ? 1.5 : 1.38; }
      if (!quiet) showNotice(v === 'central' ? 'Equipo central' : 'Equipo Nexo CO');
    }
    for (var dbi = 0; dbi < devBtns.length; dbi++) devBtns[dbi].addEventListener('click', function () { switchDevice(this.dataset.device); });
    var switchBtn = document.getElementById('switchDevice');
    switchBtn.addEventListener('click', function () {
      var v = deviceKey === 'central' ? 'nexo' : 'central';
      switchDevice(v);
    });
    openComponents.addEventListener('click', function () {
      if (interiorMode) { closeComponentExplorer(); return; }
      componentsDialog.hidden = false;
      setInteriorMode(true);
      componentsDialog.focus();
    });
    closeComponents.addEventListener('click', closeComponentExplorer);
    componentsBackdrop.addEventListener('click', closeComponentExplorer);
    var moreOptions = document.getElementById('moreOptions');
    var moreOptionsSummary = document.getElementById('moreOptionsSummary');
    var mobileControls = window.matchMedia('(max-width: 640px)');
    function syncMoreOptions() { if (!mobileControls.matches) moreOptions.open = false; }
    syncMoreOptions();
    if (mobileControls.addEventListener) mobileControls.addEventListener('change', syncMoreOptions);
    else if (mobileControls.addListener) mobileControls.addListener(syncMoreOptions);
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!componentsDialog.hidden) closeComponentExplorer();
      else if (moreOptions.open && mobileControls.matches) { moreOptions.open = false; moreOptionsSummary.focus(); }
    });
    componentList.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-component]'); if (!b) return;
      selectComponent(b.dataset.component);
    });
    componentList.addEventListener('mouseover', function (e) {
      var b = e.target.closest('button[data-component]');
      var k = b ? b.dataset.component : null;
      if (k !== hoverKey) { hoverKey = k; applyHighlight(); }
    });
    componentList.addEventListener('mouseleave', function () { if (hoverKey) { hoverKey = null; applyHighlight(); } });
    cv.addEventListener('pointerleave', clearHover);
    var simBtns = document.querySelectorAll('[data-sim]');
    for (var sbi = 0; sbi < simBtns.length; sbi++) simBtns[sbi].addEventListener('click', function () { setSim(this.dataset.sim); });
    var toggleFlowBtn = document.getElementById('toggleFlow'), toggleShellBtn = document.getElementById('toggleShell');
    toggleFlowBtn.addEventListener('click', function () {
      flowOn = !flowOn; this.setAttribute('aria-pressed', flowOn ? 'true' : 'false');
    });
    toggleShellBtn.addEventListener('click', function () {
      shellTranslucent = !shellTranslucent; this.setAttribute('aria-pressed', shellTranslucent ? 'true' : 'false'); setShellMode();
    });
    renderList();

    function clampTargets() {
      tgt.th = clamp(tgt.th, -1.5, 1.5);
      tgt.ph = clamp(tgt.ph, 0.3, 2.4);
      tgt.zoom = clamp(tgt.zoom, 0.4, 3.2);
    }
    viewsEl.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-view]');
      if (b) setView(b.dataset.view);
    });
    cv.addEventListener('dblclick', function () { setView('l34'); });

    // ---------- control de órbita propio ----------
    var pts = new Map(), lastPinch = 0, tapStart = null;
    function pinchDist() {
      var a = Array.from(pts.values());
      return a.length < 2 ? 0 : Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
    }
    cv.addEventListener('pointerdown', function (e) {
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      tapStart = pts.size === 1 ? { x: e.clientX, y: e.clientY } : null;
      if (pts.size === 2) lastPinch = pinchDist();
    });
    cv.addEventListener('pointermove', function (e) {
      var p = pts.get(e.pointerId);
      if (!p) { if (interiorMode && e.pointerType === 'mouse') hoverAt(e); return; }
      if (tapStart && Math.hypot(e.clientX - tapStart.x, e.clientY - tapStart.y) > 6) tapStart = null;
      var dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY;
      if (pts.size === 1) {
        tgt.th -= dx * 0.0055;
        tgt.ph -= dy * 0.0055;
      } else if (pts.size === 2) {
        var d = pinchDist();
        if (lastPinch > 0 && d > 0) tgt.zoom *= lastPinch / d;
        lastPinch = d;
      }
      clampTargets();
      manual();
    });
    function endPointer(e) { pts.delete(e.pointerId); lastPinch = 0; }
    cv.addEventListener('pointerup', function (e) {
      if (tapStart && interiorMode && pts.size === 1) { var k = pickAt(e); tapStart = null; if (k) selectComponent(k); }
      endPointer(e);
    });
    cv.addEventListener('pointercancel', endPointer);
    cv.addEventListener('wheel', function (e) {
      e.preventDefault();
      tgt.zoom *= Math.exp(e.deltaY * 0.0012);
      clampTargets();
      manual();
    }, { passive: false });
    cv.addEventListener('keydown', function (e) {
      var used = true;
      if (e.key === 'ArrowLeft') tgt.th -= 0.12;
      else if (e.key === 'ArrowRight') tgt.th += 0.12;
      else if (e.key === 'ArrowUp') tgt.ph -= 0.1;
      else if (e.key === 'ArrowDown') tgt.ph += 0.1;
      else if (e.key === '+' || e.key === '=') tgt.zoom *= 0.9;
      else if (e.key === '-') tgt.zoom *= 1.1;
      else used = false;
      if (used) { e.preventDefault(); clampTargets(); manual(); }
    });

    // ---------- tamaño y encuadre ----------
    var fit = 11;
    function resize() {
      var w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      if (interiorMode) { if (w > 760) camera.setViewOffset(w, h, 200, 0, w, h); else camera.setViewOffset(w, h, 0, Math.round(h * 0.24), w, h); } else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      var t = Math.tan(camera.fov * Math.PI / 360);
      var modelW = deviceKey === 'nexo' ? SWd : W;
      var modelH = deviceKey === 'nexo' ? SHd : H;
      fit = Math.max((modelH / 2 * 1.55) / t, (modelW / 2 * 1.22) / (t * camera.aspect));
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(stage);
    else window.addEventListener('resize', resize);

    // ---------- animación ----------
    var last = performance.now(), t0 = last, renderFailed = false, firstFrame = true;
    function frame(now) {
      if (renderFailed) return;
      requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (autoRotate && !REDUCE) {
        tgt.th += dt * 0.24;
        clampTargets();
      }
      var k = REDUCE ? 1 : 1 - Math.exp(-dt * 7);
      var kd = REDUCE ? 1 : 1 - Math.exp(-dt * 3.2);
      cur.th += (tgt.th - cur.th) * k;
      cur.ph += (tgt.ph - cur.ph) * k;
      cur.zoom += (tgt.zoom - cur.zoom) * k;
      cur.det += (tgt.det - cur.det) * kd;
      if (Math.abs(tgt.det - cur.det) < 0.0005) cur.det = tgt.det;

      // primero avanza hacia delante, después gira
      var mv = ease(clamp(cur.det / 0.5, 0, 1));
      var ro = ease(clamp((cur.det - 0.35) / 0.65, 0, 1));
      pivot.position.z = MOUNT_Z + (DETACH_Z - MOUNT_Z) * mv;
      pivot.rotation.y = Math.PI * ro;

      var r = fit * cur.zoom, sp = Math.sin(cur.ph);
      var tx = 0, ty = deviceKey === 'nexo' ? 0 : -0.3, tz = pivot.position.z;
      camera.position.set(tx + r * sp * Math.sin(cur.th), ty + r * Math.cos(cur.ph), tz + r * sp * Math.cos(cur.th));
      camera.lookAt(tx, ty, tz);

      var s = (now - t0) / 1000;
      var pulse = REDUCE ? 1 : 0.85 + 0.15 * Math.sin(s * 2.2);
      rgbs.forEach(function (l) {
        var f = REDUCE ? 1 : (simKey === 'alerta' ? (Math.floor(s * 6) % 2 ? 1 : 0.25) : pulse);
        l.m.emissiveIntensity = 1.5 * f;
        l.sp.material.opacity = 0.6 * f;
      });
      if (interiorMode) updateInterior(dt, s);
      try {
        renderer.render(scene, camera);
        if (firstFrame) { firstFrame = false; viewerStatus.hidden = true; }
      } catch (err) {
        renderFailed = true;
        console.error(err);
        fail('Falló el renderizado WebGL. Comprueba que la aceleración gráfica esté disponible e inténtalo de nuevo.');
      }
    }
    setView('l34');
    requestAnimationFrame(frame);
  }
})();
