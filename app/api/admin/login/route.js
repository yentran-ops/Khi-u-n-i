import { NextResponse } from 'next/server';
import { adminToken, ADMIN_COOKIE } from '../../../../lib/auth';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  const form = await req.formData();
  const pw = (form.get('password') || '').toString();
  const base = new URL(req.url);
  if (!process.env.ADMIN_PASSWORD || pw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL('/admin/login?loi=1', base), { status: 303 });
  }
  const res = NextResponse.redirect(new URL('/admin', base), { status: 303 });
  res.cookies.set(ADMIN_COOKIE, adminToken(), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 12 });
  return res;
}
