import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const b = await req.json();
    if (!b.club_id) return NextResponse.json({ ok: false, error: 'Thiếu club' }, { status: 400 });
    const sb = supabaseAdmin();
    const { error } = await sb.from('khao_sat').insert({
      club_id: b.club_id,
      sdt: (b.sdt || '').toString().trim() || null,
      nps: (typeof b.nps === 'number') ? b.nps : null,
      gop_y_hailong: (b.gop_y_hailong || '').toString().trim() || null,
      gop_y_caithien: (b.gop_y_caithien || '').toString().trim() || null,
      diem: b.diem || {},
    });
    if (error) return NextResponse.json({ ok: false, error: 'Không lưu được, thử lại' }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Lỗi máy chủ' }, { status: 500 });
  }
}
