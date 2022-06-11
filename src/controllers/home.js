/**
 * A Home Controller
 */

import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const home = async (req, res) => {
  // get the current user
  const { token } = req.cookies;
  const decodedToken = jwt.decode(token);

  const userRepository = getConnection().getRepository('User');
  const user = await userRepository.findOne({
    where: {
      id: decodedToken.userId,
    },
  });

  // get the categories
  const categoryRepository = getConnection().getRepository('Category');
  const categories = await categoryRepository.find({
    where: {
      users: user,
    },
  });

  // get the toDoItems
  const toDoItemRepository = getConnection().getRepository('ToDoItem');

  // display the not yet done items
  const categoryId = req.params?.id ? req.params?.id : '';
  const currentCategory = await categoryRepository.findOne({
    where: {
      users: user,
      id: categoryId,
    },
  });
  const toDo = await toDoItemRepository.find({
    relations: ['category'],
    where: {
      finished: false,
      category: currentCategory,
    },
  });

  // display the items that are done
  const done = await toDoItemRepository.find({
    relations: ['category'],
    where: {
      finished: true,
      category: currentCategory,
    },
  });

  res.render('home', {
    categories,
    toDo,
    done,
    user,
  });
};
