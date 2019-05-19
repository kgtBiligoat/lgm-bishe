const mutations = {
    setUserInfo: (state, payload) => {
        if(payload.data) {
            Object.keys(payload.data).forEach((item) => {
                state[item] = payload.data[item]
            })            
        }
    },
    logout: (state) => {
        state = {}   
    },
    

}

export default mutations