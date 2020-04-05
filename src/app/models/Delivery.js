import Sequelize, { Model } from 'sequelize'

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'recipient_id', as: 'recipient' })
    this.belongsTo(models.File, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    })
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' })
  }
}

export default Delivery
