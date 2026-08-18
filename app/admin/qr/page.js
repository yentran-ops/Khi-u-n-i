import { headers } from 'next/headers';
import QRCode from 'qrcode';
import { supabaseAdmin } from '../../../lib/supabase';
import { requireAdmin } from '../../../lib/guard';

export const dynamic = 'force-dynamic';

export default async function QrPage() {
  requireAdmin();
  const sb = supabaseAdmin();
  const { data: clubs } = await sb.from('clubs').select('id, ma_club, ten_club, qr_khaosat').order('ma_club');
  const h = headers();
  const host = h.get('host');
  const proto = h.get('x-forwarded-proto') || 'https';
  const base = `${proto}://${host}`;

  const items = [];
  for (const c of clubs || []) {
    const url = `${base}/?c=${c.qr_khaosat}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 600, margin: 1 });
    items.push({ ...c, url, dataUrl });
  }

  return (
    <div className="stack">
      <h1>Mã QR khảo sát theo club</h1>
      <p className="muted">Mỗi club một mã riêng (khác QR chấm công). In và dán tại quầy/khu tập để khách quét đánh giá.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 16 }}>
        {items.map((c) => (
          <div className="card" key={c.id} style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{c.ten_club}</div>
            <img src={c.dataUrl} alt={c.ten_club} style={{ width: '100%', maxWidth: 200, aspectRatio: '1/1' }} />
            <div className="row-actions" style={{ justifyContent: 'center', marginTop: 10 }}>
              <a className="btn" href={c.dataUrl} download={`khaosat-${c.ma_club}.png`}>Tải PNG</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
