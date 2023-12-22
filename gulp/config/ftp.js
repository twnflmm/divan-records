import dotenv from 'dotenv'

dotenv.config()

const ftpConfig = {
	host: process.env.FTP_HOST || '',
	user: process.env.FTP_USER || '',
	password: process.env.FTP_PASSWORD || '',
	parallel: process.env.FTP_PARALLEL ? +process.env.FTP_PARALLEL : 5
}

export default ftpConfig
