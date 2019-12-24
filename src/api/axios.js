import axios from 'axios';
import { Message,Loading } from 'element-ui';
import router from '@/router'


axios.defaults.withCredentials = true;// 跨域携带cookie
//创建axios实例
var service = axios.create({
    //baseURL: '/index', //请求的后台域名
    // baseURL:'http://125.208.12.66:9877/',
    timeout: 5000,
        headers: {
        'content-type': 'application/json',
        "token":'14a1347f412b319b0fef270489f'
    }
});




let loading;
//内存中正在请求的数量
let loadingNum=0;
function startLoading() {
	if(loadingNum==0){
		loading = Loading.service({
		  lock: true,
		  text: '拼命加载中...',
		  background:'rgba(255,255,255,0.5)',
		})
	}
	//请求数量加1
	loadingNum++;
};
function endLoading() {
    //请求数量减1
	loadingNum--
	if(loadingNum<=0){
		loading.close()
	}
};


service.interceptors.request.use(config => {//请求之前(可以设置token)
  if (config.method === 'post' || config.method === 'put') {
    // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    config.data = JSON.stringify(config.data)
  }
   startLoading();
    return config
},error =>{
    Message.error(error)
    return Promise.reject(error);
});


service.interceptors.response.use(response => {//数据拿到之后
  endLoading();
    return response.data
},err => {
  endLoading();
 if (err && err.response) {
   switch (err.response.status) {
     case 400: err.message = '请求错误(400)'; break;
     case 401: router.push('/Login'); break;
     case 403: err.message = '拒绝访问(403)'; break;
     case 404: err.message = '请求出错(404)'; break;
     case 408: err.message = '请求超时(408)'; break;
     case 500: err.message = '服务器错误(500)'; break;
     case 501: err.message = '服务未实现(501)'; break;
     case 502: err.message = '网络错误(502)'; break;
     case 503: err.message = '服务不可用(503)'; break;
     case 504: err.message = '网络超时(504)'; break;
     case 505: err.message = 'HTTP版本不受支持(505)'; break;
     default: err.message = `连接出错(${err.response.status})!`;
   }
 } else {
   err.message = '连接服务器失败!'
 }
    Message.error("网络或系统错误，请稍后重试。");
    return Promise.reject(err);
});

export default{
    post(url,data){//post请求
      return new Promise((cback, reject) => {
        return service({
            method:'post',
            url,
            data: data,
            withCredentials: true,
        })
        .then(res => {
          cback(res);
            //return successfun(res)
        })
        .catch(error => {
              reject(error);
              // console.log(error);
            });

      })

    },
    get(url,data){//get请求
      return new Promise((cback, reject) => {
        return service({
            method:'get',
            url,
            data: data,
            withCredentials: true,


        })
        .then(res => {
          cback(res);
            //return successfun(res)
        })
        .catch(error => {
              reject(error);
              // console.log(error);
            });

      })

    },

}
