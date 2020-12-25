const FolderService = {
    getAllfolders (knex) {
        return knex.select('*').from('noteful_folder');
    },
    insertfolder(knex, newFolder) {
        return knex
       .insert(newFolder)
       .into('noteful_folder')
       .returning('*')
       .then(rows => {
           return rows[0]
       })
    },
    getById(knex, id) {
      return knex.from('noteful_folder').select('*').where('id', id).first()
    },
    deletefolder(knex, id) {
        return knex('noteful_folder')
        .where({ id })
        .delete()
    }
}


module.exports = FolderService