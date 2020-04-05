import * as Yup from 'yup'
import Delivery from '../models/Delivery'
import DeliveryProblem from '../models/DeliveryProblem'
import Recipient from '../models/Recipient'
// import File from '../models/File'

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query

    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
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
        },
      ],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(deliveryProblems)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      delivery_id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const { description } = req.body

    const delivery = await Delivery.findByPk(req.params.id)

    if (!delivery) {
      return res.status(400).json({ error: 'Encomenda não encontrada!' })
    }

    const { id } = await DeliveryProblem.create({
      description,
      delivery_id: req.params.id,
    })

    return res.json({ id, description })
  }
}

export default new DeliveryProblemController()
