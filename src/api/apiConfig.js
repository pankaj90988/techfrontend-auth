const hostname=window.location.hostname

console.log("hostname: ",hostname)
export const BASE_URL=hostname==="localhost"?"http://127.2.2.219:8000":"https://panku-auth.onrender.com"
// export const BASE_URL="http://170.2.2.219:8000"