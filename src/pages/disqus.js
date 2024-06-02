/**
 * This file is part of the site.
 *
 * (c) pr15il
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Navigate } from "react-router-dom";

export default function DisqusCallback() {
  const dst = sessionStorage.getItem('dst') || '/'

  if (window.location.hash) {
    const params = {}, exp = new Date(),
      regex = /([^&=]+)=([^&]*)/g,
      fragmentString = window.location.hash.substring(1)
    let m

    while (m = regex.exec(fragmentString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
    }

    exp.setSeconds(exp.getSeconds() + (params.expires_in - 20))
    params.expires_at = exp
    delete params.expires_in

    localStorage.setItem('oauth2-params', JSON.stringify(params))
  }

  return <Navigate to={dst} />
}
