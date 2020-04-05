import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Mail from '../../lib/Mail'

class CancellationMail {
  get key() {
    return 'CancellationMail'
  }

  async handle({ data }) {
    const { delivery, cancellationDate, product } = data

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliveryman.name,
        product,
        name: delivery.recipient.name,
        street: delivery.recipient.street,
        neighborhood: delivery.recipient.neighborhood,
        number: delivery.recipient.number,
        date: format(
          parseISO(cancellationDate),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    })
  }
}

export default new CancellationMail()
