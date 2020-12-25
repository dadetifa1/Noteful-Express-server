const path = require('path')
const express = require('express')
const xss = require('xss')
const folderService = require('./folder-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializefolder = folder => ({
  id: folder.id,
  name: xss(folder.name),
})

foldersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    folderService.getAllfolders(knexInstance)
      .then(folders => {
        res.json(folders.map(serializefolder))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body
    const newFolder = { name }

    for (const [key, value] of Object.entries(newFolder))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    
    folderService.insertfolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.id}`))
          .json(serializefolder(folder))
      })
      .catch(next)
  })

foldersRouter
  .route('/:folder_id')
  .all((req, res, next) => {
    folderService.getById(
      req.app.get('db'),
      req.params.folder_id
    )
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `Folder doesn't exist` }
          })
        }
        res.folder = folder
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializefolder(res.folder))
  })
  .delete((req, res, next) => {
    folderService.deletefolder(
      req.app.get('db'),
      req.params.folder_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  // .patch(jsonParser, (req, res, next) => {
  //   const { title, content, style } = req.body
  //   const articleToUpdate = { title, content, style }

  //   const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length
  //   if (numberOfValues === 0) {
  //     return res.status(400).json({
  //       error: {
  //         message: `Request body must contain either 'title', 'style' or 'content'`
  //       }
  //     })
  //   }

  //   folderService.updateArticle(
  //   req.app.get('db'),
  //   req.params.article_id,
  //   articleToUpdate
  //   )
  //   .then(numRowsAffected => {
  //   res.status(204).end()
  //   })
  //   .catch(next)
  // })

module.exports = foldersRouter