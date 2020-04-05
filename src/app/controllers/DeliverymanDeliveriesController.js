// import Deliveryman from '../models/Deliveryman'
import Delivery from '../models/Delivery'
import Recipient from '../models/Recipient'

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
}

export default new DeliverymanDeliveriesController()
