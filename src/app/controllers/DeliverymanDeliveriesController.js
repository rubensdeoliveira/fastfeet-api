// import Deliveryman from '../models/Deliveryman'
import * as Yup from 'yup'
import Delivery from '../models/Delivery'
import Recipient from '../models/Recipient'
import File from '../models/File'

class DeliverymanDeliveriesController {
  async index(req, res) {
    const { page = 1 } = req.query

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'neighborhood',
            'number',
            'state',
            'city',
            'complement',
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['created_at'],
    })

    return res.json(deliveries)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const delivery = await Delivery.findByPk(req.params.dvid)

    if (!delivery) {
      return res.status(400).json({ error: 'Encomenda não encontrada!' })
    }

    if (delivery.deliveryman_id !== Number(req.params.dmid)) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissões para alterar essa encomenda!' })
    }

    const { signature_id, start_date, end_date } = req.body

    if (signature_id) {
      const signatureExists = await File.findByPk(signature_id)

      if (!signatureExists) {
        return res
          .status(400)
          .json({ error: 'Imagem de assinatura não existente!' })
      }
    }

    const { id } = await delivery.update({
      signature_id,
      start_date,
      end_date,
    })

    return res.json({ id })
  }
}

export default new DeliverymanDeliveriesController()
