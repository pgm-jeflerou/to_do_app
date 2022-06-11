/**
 * API - Category Controller
 */

import { getConnection } from 'typeorm';

export const postCategory = async (req, res, next) => {
  try {
    // validate the incoming body
    if (!req.body.name) {
      throw new Error('Please provide a name for the category.');
    }

    // get the repository from Category
    const categoriesRepository = getConnection().getRepository('Category');

    // get the repository from User
    const usersRepository = getConnection().getRepository('User');

    // make userId an int
    req.body.usersId = parseInt(req.body.usersId, 10);

    // find our current user
    const currentUser = await usersRepository.findOne({
      where: { id: req.body.usersId },
    });

    // get category
    const category = await categoriesRepository.findOne({
      where: {
        name: req.body.name,
        users: currentUser,
      },
    });

    // check if category already exists
    if (category) {
      res
        .status(400)
        .json({ status: ` category with id ${category.id} already exists.` });
      return;
    }

    // save the category in the repository
    await categoriesRepository.save({
      ...req.body,
      users: currentUser,
    });

    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    // get the category repository
    const categoriesRepository = getConnection().getRepository('Category');

    // Send the repository back to the client
    res.status(200).json(await categoriesRepository.find());
  } catch (e) {
    next(e.message);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    // get id from the request
    const { id } = req.params;

    // make sure we got an id
    if (!id) throw new Error('Please provide an id to remove');

    // validate incoming variables
    const categoriesRepository = getConnection().getRepository('Category');

    // get the category that needs to be deleted
    const category = await categoriesRepository.findOne({ id });

    // validate the category
    if (!category)
      throw new Error(`The category with id: ${id} does not exist.`);

    // remove category
    await categoriesRepository.remove({ id });

    // send success to the client
    res.status(200).json({
      status: `Deleted category with id: ${id}.`,
    });
  } catch (e) {
    next(e.message);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    req.body.id = parseInt(req.body.id, 10);

    // validate incoming request
    if (!req.body.id)
      throw new Error(
        'Please provide an id for the category you want to update.'
      );

    // check if the user provided valid properties
    const validProperties = ['id', 'name'];
    const unwantedProperties = Object.getOwnPropertyNames(req.body).filter(
      (property) => !validProperties.includes(property)
    );
    if (unwantedProperties.length !== 0)
      throw new Error(
        `You gave a property that isn't defined: ${unwantedProperties.join(
          ', '
        )}.`
      );

    // get the category repository
    const categoriesRepository = getConnection().getRepository('Category');

    // get the requested category
    const category = await categoriesRepository.findOne({
      where: { id: req.body.id },
    });

    // validate if the category exists
    if (!category) throw new Error(`The given category does not exist`);

    // create updated category
    const updatedCategory = { ...category, ...req.body };

    // save the updated category
    await categoriesRepository.save(updatedCategory);

    // send back the updated id
    res.status(200).json({
      status: `Updated the category with id:${req.body.id}.`,
    });
  } catch (e) {
    next(e.message);
  }
};
