import { supabaseAdmin } from '../../lib/supabase';
import { SECTIONS, NPS, LABELS } from '../../lib/survey';

export const dynamic = 'force-dynamic';
const overallIds = SECTIONS.map((s) => s.overall.id);
const fmt1 = (x) => (x || x === 0) ? Number(x).toFixed(1) : '—';

export default async function Dashboard({ searchParams }) {
  const sb = supabaseAdmin();
  const { data: clubs } = await sb.from('clubs').select('id, ten_club').order('ma_club');
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
  const tu = searchParams?.tu || (today.slice(0, 8) + '01');
  const den = searchParams?.den || today;
  const club = searchParams?.club || '';

  let q = sb.from('khao_sat')
    .select('id, club_id, sdt, nps, gop_y_hailong, gop_y_caithien, diem, created_at, clubs!club_id ( ten_club )')
    .gte('created_at', tu + 'T00:00:00+07:00').lte('created_at', den + 'T23:59:59+07:00')
    .order('created_at', { ascending: false });
  if (club) q = q.eq('club_id', club);
  const { data: rows } = await q;
  const R = rows || [];

  // Tổng hợp
  const agg = {}; const npsVals = [];
  const perClub = {};
  for (const r of R) {
    const d = r.diem || {};
    let os = 0, oc = 0;
    for (const k of Object.keys(d)) { const v = Number(d[k]); if (v >= 1 && v <= 5) { (agg[k] ||= { s: 0, c: 0 }); agg[k].s += v; agg[k].c++; if (overallIds.includes(k)) { os += v; oc++; } } }
    const cid = r.club_id || 'unknown';
    (perClub[cid] ||= { ten: r.clubs?.ten_club || '—', n: 0, os: 0, oc: 0, nps: [] });
    perClub[cid].n++; perClub[cid].os += os; perClub[cid].oc += oc;
    if (typeof r.nps === 'number') { npsVals.push(r.nps); perClub[cid].nps.push(r.nps); }
  }
  const overallAvg = (() => { let s = 0, c = 0; for (const id of overallIds) if (agg[id]) { s += agg[id].s; c += agg[id].c; } return c ? s / c : null; })();
  const npsScore = (arr) => arr.length ? Math.round((arr.filter((x) => x >= 9).length - arr.filter((x) => x <= 6).length) / arr.length * 100) : null;
  const critRows = Object.keys(agg).map((id) => ({ id, label: LABELS[id] || id, avg: agg[id].s / agg[id].c, cnt: agg[id].c, isOverall: overallIds.includes(id) })).sort((a, b) => a.avg - b.avg);
  const fb = R.filter((r) => r.gop_y_hailong || r.gop_y_caithien);
  const exportHref = `/api/admin/export?tu=${tu}&den=${den}&club=${club}`;

  return (
    <div className="stack">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <h1>Kết quả khảo sát</h1><a className="btn" href={exportHref}>Xuất Excel</a>
      </div>

      <div className="card">
        <form className="filters">
          <div><label>Từ ngày</label><input type="date" name="tu" defaultValue={tu} /></div>
          <div><label>Đến ngày</label><input type="date" name="den" defaultValue={den} /></div>
          <div><label>Club</label>
            <select name="club" defaultValue={club}><option value="">Tất cả club</option>
              {(clubs || []).map((c) => <option key={c.id} value={c.id}>{c.ten_club}</option>)}
            </select>
          </div>
          <button className="btn primary">Xem</button>
        </form>
        <div className="grid">
          <div className="metric"><div className="n">{R.length}</div><div className="l">Số phản hồi</div></div>
          <div className="metric"><div className="n">{fmt1(overallAvg)}<span style={{ fontSize: 14, color: '#6b7280' }}>/5</span></div><div className="l">Điểm TB tổng quan</div></div>
          <div className="metric"><div className="n">{npsScore(npsVals) == null ? '—' : npsScore(npsVals)}</div><div className="l">NPS</div></div>
        </div>
      </div>

      <div className="card">
        <h2>Theo club</h2>
        <table>
          <thead><tr><th>Club</th><th>Phản hồi</th><th>TB tổng quan</th><th>NPS</th></tr></thead>
          <tbody>
            {Object.values(perClub).length === 0 && <tr><td colSpan="4" className="muted">Chưa có phản hồi.</td></tr>}
            {Object.values(perClub).sort((a, b) => (a.oc ? a.os / a.oc : 9) - (b.oc ? b.os / b.oc : 9)).map((c, i) => (
              <tr key={i}><td>{c.ten}</td><td>{c.n}</td><td>{fmt1(c.oc ? c.os / c.oc : null)}</td><td>{npsScore(c.nps) == null ? '—' : npsScore(c.nps)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Tiêu chí theo điểm (thấp → cao)</h2>
        <p className="muted" style={{ marginTop: 0 }}>Điểm càng thấp càng cần cải thiện. In đậm = câu Tổng quan của nhóm.</p>
        <table>
          <thead><tr><th>Tiêu chí</th><th>Điểm TB</th><th>Lượt đánh giá</th></tr></thead>
          <tbody>
            {critRows.length === 0 && <tr><td colSpan="3" className="muted">Chưa có dữ liệu.</td></tr>}
            {critRows.map((c) => (
              <tr key={c.id}><td style={{ fontWeight: c.isOverall ? 700 : 400 }}>{c.label}</td>
                <td><span className={'tag ' + (c.avg < 3 ? 'warn' : c.avg < 4 ? 'gray' : 'green')}>{fmt1(c.avg)}</span></td>
                <td className="muted">{c.cnt}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Góp ý của khách ({fb.length})</h2>
        <table>
          <thead><tr><th>Ngày</th><th>Club</th><th>Hài lòng nhất</th><th>Muốn cải thiện</th><th>SĐT</th></tr></thead>
          <tbody>
            {fb.length === 0 && <tr><td colSpan="5" className="muted">Chưa có góp ý.</td></tr>}
            {fb.map((r) => (
              <tr key={r.id}>
                <td className="muted">{r.created_at.slice(0, 10)}</td>
                <td className="muted">{r.clubs?.ten_club}</td>
                <td>{r.gop_y_hailong || '—'}</td>
                <td>{r.gop_y_caithien || '—'}</td>
                <td className="muted">{r.sdt || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
