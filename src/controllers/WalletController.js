const connection = require('../database/connection');

function formatDate(date) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return day + '/' + month + '/' + year;
}

async function formatDateExpiration(date) {
  var year = date.getFullYear() + 4;
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return day + '/' + month + '/' + year.toString();
}

function getRandom() {
  return Math.floor(Math.random() * 1000 + 1);
}

module.exports = {
  async create(request, response) {
    let {
      name_user,
      unity_federation = 'AL',
      city = 'Maceió',
      agency = 'SMTT',
      status = 'valida',
      user_id,
    } = request.body;

    const number_registration = getRandom();

    const date_emission = await formatDate(new Date());
    const date_validate = await formatDateExpiration(new Date());

    try {
      let user = await connection('user').where({ id: user_id }).select('*');
      user = user[0];

      if (!user) {
        return response.json({
          mensagem: 'Usuário não encontrado!',
        });
      } else {
        await connection('wallet').insert({
          name_user,
          number_registration,
          date_emission,
          unity_federation,
          city,
          agency,
          status,
          date_validate,

          user_id,
        });

        return response.status(200).json({
          mensagem: 'Ok! Aguarde validação da SMTT!',
        });
      }
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getByUser(request, response) {
    const { user_id } = request.query;

    try {
      let wallet = await connection('wallet')
        .select('*')
        .where({ user_id })
        .orderBy('id', 'asc');
      wallet = wallet[0];

      if (!wallet) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        wallet,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getByWallet(request, response) {
    const { id } = request.query;

    try {
      let wallet = await connection('wallet')
        .select('*')
        .where({ id })
        .orderBy('id', 'asc');
      wallet = wallet[0];

      if (!wallet) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        wallet,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async update(request, response) {
    let { number_registration, status, id } = request.body;

    try {
      let wallet = await connection('wallet').where({ id: id }).select('*');
      wallet = wallet[0];

      if (!wallet) {
        return response.json({
          mensagem: 'Carteira não encontrada!',
        });
      } else {
        await connection('wallet').where('id', id).update({
          number_registration,
          status,
        });

        return response.status(200).json({
          mensagem: 'Carteira Atualizada com sucesso!',
        });
      }
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
};
