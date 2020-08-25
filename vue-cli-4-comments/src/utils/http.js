import axios from 'axios'
import QS from 'qs'

axios.defaults.baseURL = ""; // 生产环境接口
// axios.defaults.baseURL = "" // 测试环境接口

// 默认超时时间
axios.defaults.timeout = 15000;

axios.interceptors.request.use(config => {
  return config;
}, error => {
  alert("error");
  return Promise.resolve(error);
});

axios.interceptors.request.use(config => {
	return config;
}, err => {
	alert('请求超时！');
  return Promise.resolve(err);
})

axios.interceptors.response.use(
	response => {
		if (response.status == "200") {
			return Promise.resolve(response.data);
		} else {
			return Promise.reject(response);
		}
	},
	error => {
	 return Promise.reject(error);
	}
)

export const get = (url,headers, params, responseType) => {
	return axios({
		method: 'get',
		url: url,
		headers: headers,
		params: params,
		responseType: responseType,
	  });
}

export function post(url, params = {}, json = false) {
  const headerJSON = {
    "Content-Type": "application/json"
  };
  const headerFormData = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
	};
	return axios({
		method: "POST",
		url: url,
		headers: json ? headerJSON : headerFormData,
		data: json ? JSON.stringify(params) : QS.stringify(params)
	});
}

