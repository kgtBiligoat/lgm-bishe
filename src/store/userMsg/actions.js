import request from '@/api/index.js'

const actions = {
    async signUp(context, payload) {
        let params = { ...payload }
        let resPayload = await request({
            method: 'post',
            url: '/signUp',
            data: params
        })
        context.commit('setUserInfo', resPayload.data)
        return resPayload.data
    },

    async signIn(context, payload) {
        let params = { 
            username: payload.username,
            password: payload.password
        }
        let resPayload = await request({
            method: 'post',
            url: '/signIn',
            data: params
        })
        context.commit('setUserInfo', resPayload.data)
        return resPayload.data
    },

    async logout(context) {
        let resPayload = await request({
            method: 'get',
            url: '/logout'
        })
        if(resPayload.status === 1) {
            context.commit('logout')
        }
        return resPayload
    },

    async changeUserInfo(context, payload) {
        let param = { ...payload }
        let resPayload = await request({
            method: 'post',
            url: '/users/changeUserInfo',
            data: param
        })
        context.commit('setUserInfo', resPayload.data)
        return resPayload.data
    },

    async check(context) {
        let resPayload = await request({
            method: 'get',
            url: '/check'
        })
        context.commit('setUserInfo', resPayload.data)
        return resPayload.data   
    }
}

export default actions