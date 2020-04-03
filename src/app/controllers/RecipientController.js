import Recipient from '../models/Recipient'

class UserController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body)

    return res.json(recipient)
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id)

    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário não encontrado!' })
    }

    const recipientUpdated = await recipient.update(req.body)

    return res.json(recipientUpdated)
  }
}

export default new UserController()
