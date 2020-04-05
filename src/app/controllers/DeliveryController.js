import * as Yup from 'yup'
import Deliveryman from '../models/Deliveryman'
import Delivery from '../models/Delivery'
import Recipient from '../models/Recipient'
import File from '../models/File'

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query

    const deliveries = await Delivery.findAll({
      attributes: ['id', 'start_date', 'end_date', 'canceled_at'],
      include: [
        { model: File, as: 'signature', attributes: ['name', 'path', 'url'] },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'neighborhood',
            'number',
            'state',
            'city',
            'complement',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(deliveries)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const { recipient_id, deliveryman_id } = req.body

    const recipientExists = await Recipient.findByPk(recipient_id)

    if (!recipientExists) {
      return res.status(400).json({ error: 'Destinatário não encontrado' })
    }

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id)

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Entregador não encontrado!' })
    }

    const { id } = await Delivery.create({ recipient_id, deliveryman_id })

    return res.json({ id })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const delivery = await Delivery.findByPk(req.params.id)

    if (!delivery) {
      return res.status(400).json({ error: 'Encomenda não encontrada!' })
    }

    const { recipient_id, deliveryman_id } = req.body

    if (recipient_id) {
      const recipientExists = await Recipient.findByPk(recipient_id)

      if (!recipientExists) {
        return res.status(400).json({
          error: 'Destinatário não encontrado!',
        })
      }
    }

    if (deliveryman_id) {
      const deliverymanExists = await Deliveryman.findByPk(deliveryman_id)

      if (!deliverymanExists) {
        return res.status(400).json({
          error: 'Entregador não encontrado',
        })
      }
    }

    const { id } = await delivery.update({ recipient_id, deliveryman_id })

    return res.json({ id })
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id)

    if (!delivery) {
      return res.status(400).json({ error: 'Encomenda não encontrada' })
    }

    delivery.canceled_at = new Date()

    await delivery.save()

    return res.json(delivery)
  }
}

export default new DeliveryController()
