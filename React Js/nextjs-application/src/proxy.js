import { NextResponse } from 'next/server'

export default function proxy(request) {

  // if (request.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.rewrite(new URL('/', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/shop', request.url))
  // }

  let login = request.cookies.get('user_login')
  login = login ? login.value : 0;

  if(login == 1 && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if(login == 0 && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/shop', request.url))
  } else {
    return NextResponse.next();
  }
}
