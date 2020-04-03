import * as Yup from 'yup'
import Recipient from '../models/Recipient'

class FileController {
  async store(req, res) {
    return res.json({ ok: true })
  }
}

export default new FileController()
