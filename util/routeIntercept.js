/********** 路由跳转前拦截 *********/


import Router from 'next/router';

//
// 路由跳转前拦截
Router.beforePopState(({ url, as, options }) => {
  console.log('拦截： ' + as);
  if (as === '/' || as == 'login') {
    window.location.href = as;
    return false;
  }

  return true;
});
