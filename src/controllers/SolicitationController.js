const connection = require('../database/connection');

function formatDate(date) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return day + '/' + month + '/' + year;
}

module.exports = {
  async create(request, response) {
    let {
      name,
      cpf,
      rg,
      adress,
      url_rg,
      url_cpf,
      avatar,
      residency,
      sickness,
      user_id,

      url_user_face = '',
      url_rg_verse = '',

      mensage_validation = '',
      status = 'validando',
    } = request.body;

    try {
      let user = await connection('user').where({ id: user_id }).select('*');
      user = user[0];

      const solicitation_date = formatDate(new Date());

      if (!user) {
        return response.json({
          mensagem: 'Usuário não encontrado!',
        });
      } else {
        await connection('solicitation').insert({
          name,
          cpf,
          rg,
          adress,
          url_rg,
          url_cpf,
          avatar,
          residency,
          sickness,
          user_id,
          status,

          url_user_face,
          url_rg_verse,

          solicitation_date,
          mensage_validation,
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
      let solicitation = await connection('solicitation')
        .select('*')
        .where({ user_id })
        .orderBy('id', 'asc');
      solicitation = solicitation[0];

      if (!solicitation) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        solicitation,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getStatusByUser(request, response) {
    const { user_id } = request.query;

    try {
      let solicitation = await connection('solicitation')
        .select('status')
        .where({ user_id })
        .orderBy('id', 'asc');
      solicitation = solicitation[0];

      if (!solicitation) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        status: solicitation?.status || '',
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
      let solicitation = await connection('solicitation')
        .select('*')
        .where({ id })
        .orderBy('id', 'asc');
      solicitation = solicitation[0];

      if (!solicitation) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        solicitation,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getListenSolicititation(request, response) {
    const { status } = request.query;

    try {
      let solicitations = await connection('solicitation')
        .select('*')
        .where({ status });

      if (!solicitations) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        solicitations,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async getListenAll(request, response) {
    try {
      let solicitations = await connection('solicitation').select('*');

      if (!solicitations) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        solicitations,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async updateStatus(request, response) {
    let { id, status, mensage_validation = '' } = request.body;

    try {
      let solicitation = await connection('solicitation')
        .where({ id: id })
        .select('*');
      solicitation = solicitation[0];

      if (!solicitation) {
        return response.json({
          mensagem: 'Solitação não encontrada!',
        });
      } else {
        await connection('solicitation').where('id', id).update({
          status,
          mensage_validation,
        });

        return response.status(200).json({
          mensagem: 'Solitação Atualizada com sucesso!',
        });
      }
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async updateAll(request, response) {
    let {
      id,
      name,
      cpf,
      rg,
      adress,
      url_user_face,
      url_rg,
      url_rg_verse,
      url_cpf,

      avatar,
      residency,
      sickness,

      status,
    } = request.body;

    try {
      let solicitation = await connection('solicitation')
        .where({ id: id })
        .select('*');
      solicitation = solicitation[0];

      if (!solicitation) {
        return response.json({
          mensagem: 'Solitação não encontrada!',
        });
      } else {
        await connection('solicitation').where('id', id).update({
          name,
          cpf,
          rg,
          adress,
          url_user_face,
          url_rg,
          url_rg_verse,
          url_cpf,

          avatar,
          residency,
          sickness,

          status,
        });

        return response.status(200).json({
          mensagem: 'Solitação Atualizada com sucesso!',
        });
      }
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
};
