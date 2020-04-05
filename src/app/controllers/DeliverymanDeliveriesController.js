// import Deliveryman from '../models/Deliveryman'
import * as Yup from 'yup'
import { Op } from 'sequelize'
import { startOfHour, parseISO, isBefore, startOfDay, endOfDay } from 'date-fns'
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
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
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

    if (end_date && !delivery.start_date) {
      return res.status(400).json({
        error: 'Você precisar ter retirado a encomenda antes de finaliza-la.',
      })
    }

    const startDate = start_date ? parseISO(start_date) : delivery.start_date
    const endDate = end_date ? parseISO(end_date) : delivery.end_date
    const hourStartDate = startOfHour(startDate)
    const hourEndDate = startOfHour(endDate)

    if (isBefore(hourEndDate, hourStartDate)) {
      return res.status(400).json({
        error:
          'O horário de entrega da encomenda não pode ser antes do horário de retirada.',
      })
    }

    if (start_date) {
      const parsedDate = parseISO(start_date)

      const deliveriesCount = await Delivery.count({
        where: {
          deliveryman_id: req.params.dmid,
          start_date: {
            [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
          },
        },
      })

      if (deliveriesCount >= 5) {
        return res.status(400).json({
          error: 'Você só pode retirar até 5 encomendas por dia.',
        })
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
