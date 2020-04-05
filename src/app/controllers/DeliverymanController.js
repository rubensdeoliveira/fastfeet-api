import * as Yup from 'yup'
import Deliveryman from '../models/Deliveryman'
import File from '../models/File'

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query

    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(deliverymans)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(6),
      email: Yup.string().required(),
      avatar_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const { email, avatar_id } = req.body

    const deliverymanExists = await Deliveryman.findOne({ where: { email } })

    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um entregador com o e-mail fornecido' })
    }

    const avatarExists = await File.findByPk(avatar_id)

    if (!avatarExists) {
      return res
        .status(400)
        .json({ error: 'Não existe o avatar selecionado no banco de dados' })
    }

    const { id, name } = await Deliveryman.create(req.body)

    return res.json({ id, name, email })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(6),
      email: Yup.string(),
      avatar_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id)

    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não encontrado!' })
    }

    const { email, avatar_id } = req.body

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } })

      if (deliverymanExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um entregador com o e-mail fornecido' })
      }
    }

    if (avatar_id) {
      const avatarExists = await File.findByPk(avatar_id)

      if (!avatarExists) {
        return res
          .status(400)
          .json({ error: 'Não existe o avatar selecionado no banco de dados' })
      }
    }

    const deliverymanUpdated = await deliveryman.update(req.body)

    return res.json(deliverymanUpdated)
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id)

    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não encontrado' })
    }

    await deliveryman.destroy()

    return res.status(204).json()
  }
}

export default new DeliverymanController()
