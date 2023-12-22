import { deleteAsync } from 'del'

import { constants } from '../config/index.js'

const deleteTempFolderTask = () => deleteAsync(constants.TEMP_FOLDER_PATH)

export default deleteTempFolderTask
