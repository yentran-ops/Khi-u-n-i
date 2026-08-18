'use client';
import { useState } from 'react';
import { SECTIONS, NPS, FEEDBACK } from '../lib/survey';

function Stars({ value, onPick }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button type="button" key={n} className={'star' + (value >= n ? ' on' : '')} onClick={() => onPick(n)} aria-label={n + ' sao'}>★</button>
      ))}
    </div>
  );
}

export default function SurveyClient({ club }) {
  const total = SECTIONS.length + 1; // + màn góp ý
  const [step, setStep] = useState(0);
  const [diem, setDiem] = useState({});
  const [nps, setNps] = useState(null);
  const [haiLong, setHaiLong] = useState('');
  const [caiThien, setCaiThien] = useState('');
  const [sdt, setSdt] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const sec = SECTIONS[step];
  const overallVal = sec ? diem[sec.overall.id] : null;

  function pickOverall(val) {
    setDiem((d) => ({ ...d, [sec.overall.id]: val }));
    if (val === 5 && !sec.hasNps) setTimeout(() => setStep((s) => Math.min(s + 1, SECTIONS.length)), 350);
  }
  const setDetail = (id, val) => setDiem((d) => ({ ...d, [id]: val }));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const next = () => setStep((s) => Math.min(s + 1, SECTIONS.length));

  async function submit() {
    setError(''); setSending(true);
    try {
      const r = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ club_id: club.id, diem, nps, gop_y_hailong: haiLong, gop_y_caithien: caiThien, sdt }) });
      const d = await r.json();
      if (!d.ok) { setError(d.error || 'Có lỗi, thử lại'); setSending(false); return; }
      setDone(true);
    } catch { setError('Không kết nối được máy chủ'); setSending(false); }
  }

  if (done) {
    return (
      <main className="authscreen">
        <div className="logo-plate"><img src="/logo.png" alt="THE NEW GYM" /></div>
        <div className="card" style={{ maxWidth: 440, textAlign: 'center' }}>
          <h2>Cảm ơn bạn! 🎉</h2>
          <p className="muted">Phản hồi của bạn về <b>{club.ten_club}</b> đã được ghi nhận. Chúc bạn tập luyện vui khỏe!</p>
        </div>
      </main>
    );
  }

  const pct = Math.round((step / total) * 100);
  const canContinue = sec ? (overallVal != null && (!sec.hasNps || nps != null)) : true;

  return (
    <main>
      <div className="nav"><div style={{ maxWidth: 640, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img className="brand-logo" src="/logo.png" alt="THE NEW GYM" />
      </div></div>

      <div className="survey-wrap">
        <div style={{ textAlign: 'center' }}><span className="cat-badge">{club.ten_club}</span></div>
        <div className="progress"><i style={{ width: pct + '%' }} /></div>

        {sec ? (
          <div className="card">
            <div className="muted" style={{ fontWeight: 600 }}>{sec.cat}</div>
            <div className="qhead">{sec.sub}</div>
            <div className="muted">{sec.overall.micro}</div>
            <Stars value={overallVal} onPick={pickOverall} />

            {overallVal != null && overallVal < 5 && sec.details.map((d) => (
              <div className="detail-q" key={d.id}>
                <div style={{ fontWeight: 700 }}>{d.label}</div>
                <div className="muted">{d.micro}</div>
                <Stars value={diem[d.id]} onPick={(v) => setDetail(d.id, v)} />
              </div>
            ))}

            {sec.hasNps && (
              <div className="detail-q">
                <div style={{ fontWeight: 700 }}>{NPS.label}</div>
                <div className="muted">{NPS.micro}</div>
                <div className="nps-row">
                  {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                    <button type="button" key={n} className={'nps-b' + (nps === n ? ' on' : '')} onClick={() => setNps(n)}>{n}</button>
                  ))}
                </div>
                <div className="nps-ends"><span>Không giới thiệu</span><span>Chắc chắn giới thiệu</span></div>
              </div>
            )}

            <div className="row-actions" style={{ marginTop: 18 }}>
              {step > 0 && <button className="btn" onClick={back}>Quay lại</button>}
              <button className="btn primary" style={{ marginLeft: 'auto' }} disabled={!canContinue} onClick={next}>Tiếp tục</button>
            </div>
            {overallVal === 5 && !sec.hasNps && <p className="muted center" style={{ marginTop: 8 }}>Tuyệt vời! Đang chuyển mục tiếp theo…</p>}
          </div>
        ) : (
          <div className="card stack">
            <div className="qhead">Ý kiến đóng góp</div>
            {error && <div className="err">{error}</div>}
            <div><label>{FEEDBACK[0].micro}</label><textarea rows="3" value={haiLong} onChange={(e) => setHaiLong(e.target.value)} placeholder="(không bắt buộc)" /></div>
            <div><label>{FEEDBACK[1].micro}</label><textarea rows="3" value={caiThien} onChange={(e) => setCaiThien(e.target.value)} placeholder="(không bắt buộc)" /></div>
            <div><label>Số điện thoại (không bắt buộc)</label>
              <input inputMode="tel" value={sdt} onChange={(e) => setSdt(e.target.value)} placeholder="Để trống nếu muốn ẩn danh" />
              <p className="muted" style={{ marginTop: 4 }}>Khảo sát ẩn danh — SĐT chỉ dùng để liên hệ khi bạn cần hỗ trợ, không bắt buộc.</p>
            </div>
            <div className="row-actions">
              <button className="btn" onClick={back}>Quay lại</button>
              <button className="btn primary" style={{ marginLeft: 'auto' }} disabled={sending} onClick={submit}>{sending ? 'Đang gửi…' : 'Gửi khảo sát'}</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
