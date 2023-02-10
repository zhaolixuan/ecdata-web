export function logOut() {
  console.log(process.env.VUE_APP_CURRENTMODE);
  // let url = document.location.href
  const host = window.location.host;
  if (process.env.VUE_APP_CURRENTMODE === "dev") {
    document.location.href =
      "http://xianyou.jdcloud.com:8080/sso-server/logout?redirectUrl=http://dev.jdcloud.com:8080/"; // 本地
  } else if (process.env.VUE_APP_CURRENTMODE === "test") {
    document.location.href =
      "http://xianyou.jdcloud.com:8080/sso-server/logout?redirectUrl=http://xianyou-test.jdcloud.com:9001/"; // 测试环境
  } else if (process.env.VUE_APP_CURRENTMODE === "foshan") {
    document.location.href =
      "http://cywx.jdcloud.com/foshan/sso/logout?redirectUrl=http://cywx.jdcloud.com/foshan/"; // 佛山
  } else if (process.env.VUE_APP_CURRENTMODE === "textfoshan") {
    document.location.href =
      "http://116.196.82.227:8146/sso/logout?redirectUrl=http://116.196.82.227/18081/foshan/"; // 佛山测试
      
  } else {
    document.location.href = `//${host}/xianyou/sso/logout?redirectUrl=http://${host}${process.env.VUE_APP_BASE_URL}/`;
  }
}
