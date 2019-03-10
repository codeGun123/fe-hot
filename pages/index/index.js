import Link from 'next/link';

export default () => (
  <div>
    <div>首页133</div>
    <a href="/login">登录1</a>
    <hr />

    <Link href="/login">
      <a>登录</a>
    </Link>
    <hr />

    <Link href="/system">
      <a>系统设置</a>
    </Link>
    <hr />
    <Link href="/system/account">
      <a>系统账户</a>
    </Link>
    <hr />

    <Link href="/system/authority">
      <a>系统权限</a>
    </Link>
  </div>
);
