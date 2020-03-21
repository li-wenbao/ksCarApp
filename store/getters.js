//全局getters
const getters = {
	baseDemain: state => state.baseDemain,
    baseApiUrl: state => state.baseApiUrl,   
	vehicleShareUrl: state => state.vehicleShareUrl,
	token: state => state.token,
	hData : state => state.hData,
	userInfo: state => state.userInfo,
	hasLogin: state => state.hasLogin,
    appId: state => state.appId,
    appKey: state => state.appKey,
	wxAppId: state => state.wxAppId,
	wxInfoByBackUrl: state => state.wxInfoByBackUrl,
	wxInfoByCode: state => state.wxInfoByCode
}
export default getters
