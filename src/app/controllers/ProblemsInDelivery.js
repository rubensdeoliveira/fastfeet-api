import Delivery from '../models/Delivery'
import DeliveryProblem from '../models/DeliveryProblem'
import Deliveryman from '../models/Deliveryman'
import Recipient from '../models/Recipient'

import CancellationMail from '../jobs/CancellationMail'
import Queue from '../../lib/Queue'

class ProblemsInDelivery {
  async index(req, res) {
    const { page = 1 } = req.query

    const deliveryExists = await Delivery.findByPk(req.params.id)

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Encomenda não encontrada' })
    }

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      attributes: ['description'],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(deliveryProblems)
  }

  async delete(req, res) {
    const problem = await DeliveryProblem.findByPk(req.params.id)

    const deliveryId = problem.delivery_id

    const delivery = await Delivery.findByPk(deliveryId, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'neighborhood', 'number'],
        },
      ],
    })

    if (!delivery) {
      return res.status(400).json({ error: 'Encomenda não encontrada' })
    }

    const cancellationDate = new Date()
    delivery.canceled_at = cancellationDate

    await delivery.save()

    await Queue.add(CancellationMail.key, {
      delivery,
      cancellationDate,
      product: delivery.product,
    })

    return res.json(delivery)
  }
}

export default new ProblemsInDelivery()
