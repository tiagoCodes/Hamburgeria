import path from 'node:path'
import express from 'express'

const pathUploads =  path.resolve('uploads')

const fileRoutesConfig = express.static(pathUploads)

export default fileRoutesConfig;
