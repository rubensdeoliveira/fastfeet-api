import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Mail from '../../lib/Mail'

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail'
  }

  async handle({ data }) {
    const { recipient, product, deliverymanName, deliverymanEmail } = data

    await Mail.sendMail({
      to: `${deliverymanName} <${deliverymanEmail}>`,
      subject: 'Nova Encomenda',
      template: 'newdelivery',
      context: {
        deliveryman: deliverymanName,
        product,
        name: recipient.name,
        street: recipient.street,
        neighborhood: recipient.neighborhood,
        number: recipient.number,
        date: format(new Date(), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    })
  }
}

export default new NewDeliveryMail()
