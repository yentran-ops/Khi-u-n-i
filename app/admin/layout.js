import { requireAdmin } from '../../lib/guard';
export const dynamic = 'force-dynamic';
export default function AdminLayout({ children }) {
  requireAdmin();
  return (
    <div>
      <div className="nav">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <img className="brand-logo" src="/logo.png" alt="THE NEW GYM" />
          <a href="/admin">Kết quả</a>
          <a href="/admin/qr">Mã QR</a>
          <form action="/api/admin/logout" method="POST" style={{ marginLeft: 'auto' }}><button className="btn">Đăng xuất</button></form>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px' }}>{children}</div>
    </div>
  );
}
