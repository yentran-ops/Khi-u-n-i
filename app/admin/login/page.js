export const dynamic = 'force-dynamic';
export default function Login({ searchParams }) {
  return (
    <main className="authscreen">
      <div className="logo-plate"><img src="/logo.png" alt="THE NEW GYM" /></div>
      <form className="card stack" method="POST" action="/api/admin/login" style={{ width: '100%', maxWidth: 420 }}>
        <h2>Quản trị khảo sát</h2>
        {searchParams?.loi ? <div className="err">Sai mật khẩu</div> : null}
        <div><label>Mật khẩu quản trị</label><input type="password" name="password" autoFocus /></div>
        <button className="btn primary block">Đăng nhập</button>
      </form>
    </main>
  );
}
