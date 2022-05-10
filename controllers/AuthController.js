const { User } = require('../models')
const middleware = require('../middleware')

const LogIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
            raw: true
        })
        if (
            user &&
            (await middleware.comparePassword(user.passwordDigest, req.body.password))
        ) {
            let payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
                bio: user.bio,
                zipcode: user.zipcode,
                image: user.image
            }
            let token = middleware.createToken(payload)
            return res.send({ user: payload, token})
        }
        res.status(401).send({ status: 'Error', msg: 'Unauthorized'})
    } catch (error) {
        throw error
    }
}

const SignUp = async (req, res) => {
    try {
      const { firstName, lastName, email, password, userType, bio, zipcode, image } = req.body
      let passwordDigest = await middleware.hashPassword(password)
      const user = await User.create({ firstName, lastName, email, passwordDigest, userType, bio, zipcode, image })
      res.send({user})
    } catch (error) {
      throw error
    }
}

const UpdatePassword = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id)
        const { oldPassword, newPassword } = req.body
        const user = await User.findByPk(user_id)
        if (
            user &&
            (await middleware.comparePassword(
                user.passwordDigest,
                oldPassword 
            ))
        ) {
            let passwordDigest = await middleware.hashPassword(newPassword)
            await user.update({ passwordDigest })
            return res.send({ status: 'Ok', payload: user })
          }
          res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
    } catch (error) {
        throw error
    }
}

const CheckSession = async (req, res) => {
    const {payload} = res.locals
    res.send(payload)
  }

module.exports = {
      LogIn,
      SignUp,
      UpdatePassword,
      CheckSession,
}