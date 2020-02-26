// import decode from 'jwt-decode'

export default {
  computed: {
    headers () {
      return {
        headers: {
          'Authorization': localStorage.acess_token
        }
      }
    },
    api () {
      return {
        location: 'https://aedesmapapi.herokuapp.com'
      }
    },
    defaultPrams () {
      return {  }
    },
    // api () {
    //   return api
    //   return {
    //     location: 'https://aedesmapapi.herokuapp.com'
    //   }
    // }
  },
  methods: {
    HttpSave (model, route, params = {}, headers = {}) {
      let method = model.id ? this.axios.put : this.axios.post
      return new Promise((resolve, reject) => {
        let header = {
          headers: Object.assign(this.headers, headers)
        }
        method(`${this.api.location}/${route}${model.id ? '/'+model.id : ''}`, model, Object.assign({ params: params }, this.headers))
          .then(res => {
            resolve(
              {
                headers: res.headers,
                body: res.data
              }
            )
          })
          .catch(err => {
            // this.$notify({ group: 'error', type: 'error', title: err.response.data.error, text: err.response.data.message})
            reject(err.response.data)
            if (Number(err.response.status) === 403) {
              this.cleanToken()
            }
          })
      })
    },
    HttpGet (route, params = {}) {
      console.log(`${this.api.location}/${route}`);
      
      return new Promise((resolve, reject) => {
        this.axios.get(`${this.api.location}/${route}`, Object.assign({params: Object.assign(this.defaultPrams, params)}, this.headers))
          .then(res => {
            resolve({
              headers: res.headers,
              body: res.data
            })
          })
          .catch(err => {
            // this.$notify({ group: 'error', type: 'error', title: err.response.data.error, text: err.response.data.message})
            reject(err.response.data)
            if (Number(err.response.status) === 403) {
              this.cleanToken()
            }
          })
      })
    },
    HttpDelete (route, params = {}) {
      return new Promise((resolve, reject) => {
        this.axios.delete(`${this.api.location}/${route}`, Object.assign({params: params}, this.headers))
          .then(res => {
            resolve(
              {
                headers: res.headers,
                body: res.data
              }
            )
          })
          .catch(err => {
            // this.$notify({ group: 'error', type: 'error', title: err.response.data.error, text: err.response.data.message})
            reject(err.response.data)
          })
      })
    },
    // HttpLogin (model) {
    //   let method = model.id ? this.axios.put : this.axios.post
    //   return new Promise((resolve, reject) => {
    //     method(`${this.api.location}/login`, model)
    //       .then(res => {
    //         localStorage.setItem('access_token', res.headers.authorization)

    //         let prefeituraId = JSON.parse(decode(res.headers.authorization.split(' ')[1]).sub).prefeituraId

    //         localStorage.setItem('prefeitura', prefeituraId)
    //         resolve(
    //           {
    //             headers: res.headers,
    //             body: res.data
    //           }
    //         )
    //       })
    //       .catch(err => {
    //         this.$notify({ group: 'error', type: 'error', title: err.response.data.error, text: err.response.data.message})
    //         reject(err.response.data)
    //       })
    //   })
    // },
    /**
     * Implementaçção do verbo PATCH.
     *
     * @param {*} model Objeto com os dados à serem enviados no corpo da requisição.
     * @param {*} route Rota para a URI do Back-end.
     * @param {*} params Filtros da requisição.
     */
    HttpPatch (model, route, params = {}) {
      return new Promise((resolve, reject) => {
        this.axios.patch(`${this.api.location}/${route}${model.id ? `/${model.id}`: ''}`, model, Object.assign({params: params}, this.headers))
        .then(res => {
          resolve( { headers: res.headers, body: res.data } )
        })
        .catch(err => {
          reject(err.response.data)
          if (Number(err.response.status) === 403) { this.cleanToken() }
        })
      })
    },
    cleanToken () {
      if ( localStorage.getItem('access_token') ) {
        localStorage.removeItem('access_token')
        location.reload(true)
      }
    }
  }
}