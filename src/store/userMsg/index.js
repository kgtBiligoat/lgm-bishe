import mutations from '@/store/userMsg/mutaions.js'
import actions from '@/store/userMsg/actions.js'


export default {
    state: {
        _id: String,
        username: String,
        password: String,
        phone: Number,
        email: String,
        sex: String,
        number: Number,
        nodes: []
    },
    mutations,
    actions
}