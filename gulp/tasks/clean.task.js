import { deleteAsync } from 'del'

import { constants } from '../config/index.js'

const cleanTask = () => deleteAsync(constants.BUILD_FOLDER_PATH)

export default cleanTask
