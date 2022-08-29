import { login} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    organData:''
  }
}
 
const state = getDefaultState()
  // organData:"",

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SAVE_ORGAN: (state,data) => {
    state.organData = data;
  }
}

const actions = {
  // user login
  login(context, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ 
        username: username, 
        password: password 
      })
      .then(res => {
        const token = res.data.access_token
        context.commit('SET_TOKEN', token)
        sessionStorage.setItem('token',"Bearer "+token)
        // document.cookie=`Authorization=Bearer ${token}` //;path:/

        setToken(token) //cookie里
        console.log(res)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token)
      // .then(() => {
        removeToken() // must remove  token  first
        sessionStorage.removeItem('token')

        resetRouter()
        commit('RESET_STATE')
        resolve()
        
      })
      // .catch(error => {
      //   reject(error)
      // })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

