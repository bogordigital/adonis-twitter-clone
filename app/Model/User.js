'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

  static get rules(){
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required"
    }
  }

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  tweets(){
    return this.hasMany('App/Model/Tweet')
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = User