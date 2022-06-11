/**
 * API - ToDoItem Controller
 */

import { getConnection } from 'typeorm';

export const postToDoItem = async (req, res, next) => {
  try {
    // validate the incoming body
    if (!req.body.name)
      throw new Error('Please provide a name for the toDoItem.');

    // get the repository from todoItem
    const toDoItemsRepository = getConnection().getRepository('ToDoItem');
    const categoryRepository = getConnection().getRepository('Category');

    // get the repository from User
    const usersRepository = getConnection().getRepository('User');

    // make userId an int
    req.body.userId = parseInt(req.body.userId, 10);

    // find our current user
    const currentUser = await usersRepository.findOne({
      where: { id: req.body.userId },
    });

    // get the linked category
    const currentCategory = await categoryRepository.findOne({
      where: {
        name: req.body.category,
        users: currentUser,
      },
    });

    const categoryId = currentCategory.id;

    // get toDoItem
    const toDoItem = await toDoItemsRepository.findOne({
      where: {
        name: req.body.name,
        category: currentCategory,
      },
    });

    // check if toDoItem already exists
    if (toDoItem) {
      res.status(200).json({
        status: `Posted toDoItem with id ${toDoItem.id}.`,
      });
      return;
    }

    // save the toDoItem in the repository
    await toDoItemsRepository.save({
      name: req.body.name,
      finished: false,
      category: currentCategory,
    });

    res.redirect(`/category/${categoryId}`);
  } catch (e) {
    next(e.message);
  }
};

export const getToDoItem = async (req, res, next) => {
  try {
    // get the ToDoItem repository
    const toDoItemsRepository = getConnection().getRepository('ToDoItem');

    // Send the repository back to the client
    res.status(200).json(await toDoItemsRepository.find());
  } catch (e) {
    next(e.message);
  }
};

export const deleteToDoItem = async (req, res, next) => {
  try {
    // get id from the request
    const { id } = req.params;

    // make sure we got an id
    if (!id) throw new Error('Please provide id to remove');

    // validate incoming variables
    const toDoItemsRepository = getConnection().getRepository('ToDoItem');

    // get the ToDoItem that needs to be deleted
    const ToDoItem = await toDoItemsRepository.findOne({
      id,
    });

    // validate the ToDoItem
    if (!ToDoItem)
      throw new Error(`The ToDoItem with id: ${id} does not exist.`);

    // remove ToDoItem
    await toDoItemsRepository.remove({
      id,
    });

    // send success to the client
    res.status(200).json({
      status: `Deleted ToDoItem with id: ${id}.`,
    });
  } catch (e) {
    next(e.message);
  }
};

export const updateToDoItem = async (req, res, next) => {
  try {
    // validate incoming request
    if (!req.body.id)
      throw new Error(
        'Please provide an id for the ToDoItem you want to update.'
      );

    // check if the user provided valid properties
    const validProperties = ['id', 'name', 'finished'];
    const unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (property) => !validProperties.includes(property)
    );
    if (unwantedProperties.length !== 0)
      throw new Error(
        `You gave a property that isn't defined: ${unwantedProperties.join(
          ', '
        )}.`
      );

    // get the ToDoItem repository
    const toDoItemsRepository = getConnection().getRepository('ToDoItem');

    // get the requested ToDoItem
    const ToDoItem = await toDoItemsRepository.findOne({
      where: {
        id: req.body.id,
      },
    });

    req.body.id = parseInt(req.body.id, 10);

    // validate if the ToDoItem exists
    if (!ToDoItem) throw new Error(`The given ToDoItem does not exist`);

    // create updated ToDoItem
    const updatedToDoItem = {
      ...ToDoItem,
      ...req.body,
    };

    // save the updated ToDoItem
    await toDoItemsRepository.save(updatedToDoItem);

    // send back the updated id
    res.status(200).json({
      status: `Updated the ToDoItem with id:${req.body.id}.`,
    });
  } catch (e) {
    next(e.message);
  }
};
