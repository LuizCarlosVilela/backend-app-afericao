const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    let {
      user_url,
      user_latitude,
      user_longitude,
      place_car,
      url_car,
      user_id,
      date_check,

      adress_check = '',
    } = request.body;

    try {
      let user = await connection('user').where({ id: user_id }).select('*');
      user = user[0];

      if (!user) {
        return response.json({
          mensagem: 'Usuário não encontrado!',
        });
      } else {
        await connection('check').insert({
          user_url,
          user_latitude,
          user_longitude,
          place_car,
          url_car,
          date_check,

          adress_check,

          user_id,
        });

        return response.status(200).json({
          mensagem: 'Ok! check feito com sucesso!',
        });
      }
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async list(request, response) {
    try {
      let check = await connection('check').select('*').orderBy('id', 'asc');

      if (!check) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        check,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async show(request, response) {
    const { id } = request.query;
    try {
      let check = await connection('check')
        .select('*')
        .where({ id })
        .orderBy('id', 'asc');

      if (!check) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        check,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getByUser(request, response) {
    const { user_id } = request.query;
    try {
      let check = await connection('check')
        .select('*')
        .where({ user_id })
        .orderBy('id', 'asc');

      if (!check) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        check,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getByPlaceCar(request, response) {
    const { place_car } = request.query;
    try {
      let check = await connection('check')
        .select('*')
        .where({ place_car })
        .orderBy('id', 'desc');
      check = check[0];

      if (!check) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        check,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getById(request, response) {
    const { id } = request.query;

    try {
      let check = await connection('check')
        .select('*')
        .where({ id })
        .orderBy('id', 'asc');
      check = check[0];

      if (!check) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        check,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
};
