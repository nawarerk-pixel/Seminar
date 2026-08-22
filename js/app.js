// ==== ตั้งค่า URL ของ Apps Script Web App ที่ deploy แล้ว ====
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbz7ECJPGrHYpqLFjDy8z0D7Z9l-jsyPjbNbcQzPG3Bl509_WGMwKrzh9p2wuM9krgVJ/exec';

async function apiCall(action, payload) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    // ใช้ text/plain เพื่อเลี่ยง CORS preflight (Apps Script ไม่รองรับ OPTIONS)
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, payload: payload || {} })
  });
  return res.json();
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function toast(msg, type) {
  let el = document.getElementById('__toast');
  if (!el) {
    el = document.createElement('div');
    el.id = '__toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2600);
}

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtTime(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return '';
  return dt.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

// เก็บ PIN ที่ยืนยันแล้วไว้ใน sessionStorage กันต้องพิมพ์ซ้ำทุกครั้งในเซสชันเดียวกัน
function getSavedPin() {
  return sessionStorage.getItem('quorum_admin_pin') || '';
}
function savePin(pin) {
  sessionStorage.setItem('quorum_admin_pin', pin);
}
function clearPin() {
  sessionStorage.removeItem('quorum_admin_pin');
}
async function apiCall(action, payload) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    // ใช้ text/plain เพื่อเลี่ยง CORS preflight (Apps Script ไม่รองรับ OPTIONS)
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, payload: payload || {} })
  });
  return res.json();
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function toast(msg, type) {
  let el = document.getElementById('__toast');
  if (!el) {
    el = document.createElement('div');
    el.id = '__toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2600);
}

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtTime(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return '';
  return dt.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

// เก็บ PIN ที่ยืนยันแล้วไว้ใน sessionStorage กันต้องพิมพ์ซ้ำทุกครั้งในเซสชันเดียวกัน
function getSavedPin() {
  return sessionStorage.getItem('quorum_admin_pin') || '';
}
function savePin(pin) {
  sessionStorage.setItem('quorum_admin_pin', pin);
}
