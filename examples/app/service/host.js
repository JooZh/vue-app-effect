const apiHost = {
  dev: {
    API_HOST: 'http://localhost:9090/music/api'
  },
  test:{
    API_HOST: 'http://localhost:9090/music/api'
  },
  prod: {
    API_HOST: 'https://joozh.cn/music/api'
  }
};

const getApiHost = () => {
  let url = window.location.origin;
  if (url.indexOf('9090') > -1) {
      return apiHost.test;
  } else if (url.indexOf('joozh.cn') > -1) {
      return apiHost.prod;
  } else {
      return apiHost.dev;
  }
};
export default getApiHost;
