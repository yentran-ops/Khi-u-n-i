import { cookies } from 'next/headers';
import * as XLSX from 'xlsx';
import { isAdminToken, ADMIN_COOKIE } from '../../../../lib/auth';
import { supabaseAdmin } from '../../../../lib/supabase';
import { SECTIONS, NPS, LABELS } from '../../../../lib/survey';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!isAdminToken(cookies().get(ADMIN_COOKIE)?.value)) return new Response('Unauthorized', { status: 401 });
  const sp = new URL(req.url).searchParams;
  const tu = sp.get('tu'), den = sp.get('den'), club = sp.get('club') || '';
  const sb = supabaseAdmin();
  let q = sb.from('khao_sat').select('*, clubs!club_id ( ten_club )').order('created_at', { ascending: false });
  if (tu) q = q.gte('created_at', tu + 'T00:00:00+07:00');
  if (den) q = q.lte('created_at', den + 'T23:59:59+07:00');
  if (club) q = q.eq('club_id', club);
  const { data: rows } = await q;
  const R = rows || [];

  const critIds = [];
  for (const s of SECTIONS) { critIds.push(s.overall.id); for (const d of s.details) critIds.push(d.id); }
  const header = ['Thời gian', 'Club', 'SĐT', 'NPS', ...critIds.map((id) => LABELS[id] || id), 'Hài lòng nhất', 'Muốn cải thiện'];
  const aoa = [header];
  for (const r of R) {
    const d = r.diem || {};
    aoa.push([r.created_at, r.clubs?.ten_club || '', r.sdt || '', (typeof r.nps === 'number' ? r.nps : ''), ...critIds.map((id) => d[id] ?? ''), r.gop_y_hailong || '', r.gop_y_caithien || '']);
  }
  const ws = XLSX.utils.aoa_to_sheet(aoa);

  // sheet trung bình tiêu chí
  const agg = {};
  for (const r of R) { const d = r.diem || {}; for (const k of Object.keys(d)) { const v = Number(d[k]); if (v >= 1 && v <= 5) { (agg[k] ||= { s: 0, c: 0 }); agg[k].s += v; agg[k].c++; } } }
  const aoa2 = [['Tiêu chí', 'Điểm TB', 'Lượt']];
  Object.keys(agg).map((id) => ({ id, avg: agg[id].s / agg[id].c, c: agg[id].c })).sort((a, b) => a.avg - b.avg)
    .forEach((x) => aoa2.push([LABELS[x.id] || x.id, Number(x.avg.toFixed(2)), x.c]));
  const ws2 = XLSX.utils.aoa_to_sheet(aoa2);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Phan hoi');
  XLSX.utils.book_append_sheet(wb, ws2, 'Trung binh tieu chi');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  return new Response(buf, { headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename="khaosat-${tu || ''}_${den || ''}.xlsx"` } });
}
