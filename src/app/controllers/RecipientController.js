import * as Yup from 'yup'
import Recipient from '../models/Recipient'

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(6),
      street: Yup.string().required(),
      neighborhood: Yup.string().required(),
      number: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      complement: Yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const recipient = await Recipient.create(req.body)

    return res.json(recipient)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(6),
      street: Yup.string(),
      neighborhood: Yup.string(),
      number: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      complement: Yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const recipient = await Recipient.findByPk(req.params.id)

    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário não encontrado!' })
    }

    const recipientUpdated = await recipient.update(req.body)

    return res.json(recipientUpdated)
  }
}

export default new RecipientController()
