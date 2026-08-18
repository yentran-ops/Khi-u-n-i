import { supabaseAdmin } from '../lib/supabase';
import SurveyClient from './SurveyClient';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const token = searchParams?.c;
  let club = null;
  if (token) {
    const sb = supabaseAdmin();
    const { data } = await sb.from('clubs').select('id, ten_club').eq('qr_khaosat', token).maybeSingle();
    club = data || null;
  }
  if (!club) {
    return (
      <main className="authscreen">
        <div className="logo-plate"><img src="/logo.png" alt="THE NEW GYM" /></div>
        <div className="card" style={{ maxWidth: 440, textAlign: 'center' }}>
          <h2>Khảo sát chất lượng</h2>
          <p className="muted">Mã QR không hợp lệ hoặc thiếu. Vui lòng quét lại mã khảo sát được dán tại club.</p>
        </div>
      </main>
    );
  }
  return <SurveyClient club={club} />;
}
