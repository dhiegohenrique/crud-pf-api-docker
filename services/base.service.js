const update = (Model, item) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Array.isArray(item)) {
        item = [item]
      }

      const newItems = []
      item.forEach(async (currentItem, index) => {
        const _id = currentItem._id
        if (_id) {
          if (Object.keys(currentItem).length > 1) {
            await Model.findByIdAndUpdate(_id, currentItem)
          } else {
            await Model.remove({ _id })
          }
        } else {
          let newModel = new Model(currentItem)
          newModel = await newModel.save()
          newItems.push(newModel._id)
        }

        if (index === (item.length - 1)) {
          resolve(newItems)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

const get = (Model, query) => {
  return Model.find(query)
}

const getById = (Model, _id) => {
  return Model.findById(_id)
}

const insert = (Model, item) => {
  return new Promise((resolve, reject) => {
    try {
      if (!Array.isArray(item)) {
        item = [item]
      }

      Model.collection.insertMany(item)
        .then((res) => {
          const insertedIds = res.insertedIds
          const arrayIds = []
          Object.keys(insertedIds).forEach((key) => {
            arrayIds.push(insertedIds[key])
          })
          resolve(arrayIds)
        })
    } catch (error) {
      reject(error)
    }
  })
}

const deleteItem = (Model, _id) => {
  if (!Array.isArray(_id)) {
    _id = [_id]
  }

  return Model.remove({ '_id': { $in: _id } })
}

module.exports = {
  update,
  get,
  insert,
  getById,
  deleteItem
}
