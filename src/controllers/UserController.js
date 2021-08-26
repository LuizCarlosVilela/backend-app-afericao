const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

function generateToken(params = {}) {
  return jwt.sign(params, '827a556af6c4d7134f275d76e031cb7a', {});
}
module.exports = {
  async create(request, response) {
    let {
      name,
      email,
      password,
      wallet_validate = 'sem_validacao',
      permissions = '',
    } = request.body;
    try {
      let user = await connection('user').where({ email }).select('*');
      user = user[0];

      if (user) {
        return response.json({
          mensagem:
            'O e-mail já está cadastrado, por favor insira outro email!',
        });
      } else {
        password = bcrypt.hashSync(password, 10);
        const id = await connection('user').insert({
          name,
          email,
          password,
          wallet_validate,
          permissions,
        });
        const token = await generateToken({ id: id });

        return response
          .status(200)
          .json({ token, mensagem: 'Usuário cadastrado!' });
      }
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async loginAdm(request, response) {
    const { email, password } = request.body;

    try {
      let user = await connection('user').where({ email }).select('*');
      user = user[0];

      if (!user) {
        return response.json({
          mensagem: 'E-mail ou password errado! Digite novamente.',
        });
      }
      const compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        return response.json({
          mensagem: 'E-mail ou senha errado! Digite novamente.',
        });
      }

      user.password = undefined;
      const token = generateToken({ id: user.id });

      if (user.permissions === 'all') {
        response.status(200).json({
          token,
          user,
          mensagem: 'Usuário logado com sucesso!',
        });
      } else {
        response.status(200).json({
          mensagem: 'Você não é administrador!',
        });
      }
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async login(request, response) {
    const { email, password } = request.body;

    try {
      let user = await connection('user').where({ email }).select('*');
      user = user[0];

      if (!user) {
        return response.json({
          mensagem: 'E-mail ou password errado! Digite novamente.',
        });
      }
      const compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        return response.json({
          mensagem: 'E-mail ou senha errado! Digite novamente.',
        });
      }

      user.password = undefined;

      const token = generateToken({ id: user.id });
      response.status(200).json({
        token,
        user,
        mensagem: 'Usuário logado com sucesso!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async update(request, response) {
    const { name, email, id, wallet_validate } = request.body;

    try {
      let user = await connection('user').where({ email }).select('*');
      user = user[0];

      if (!user) {
        return response.json({
          mensagem: 'E-mail não existe no nosso sistema.',
        });
      }
      await connection('user').where('id', id).update({
        name,
        email,
        wallet_validate,
      });
      return response
        .status(200)
        .json({ mensagem: 'Usuário alterado com sucesso!' });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
  async sendEmail(request, response) {
    const { user_id, mensagem_response = '' } = request.body;

    try {
      let user = await connection('user').where({ id: user_id }).select('*');
      user = user[0];

      console.log('Usuário', user);

      if (!user) {
        return response.json({
          mensagem: 'Usuário inválido.',
        });
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'botsmtt@gmail.com',
          pass: 'botsmtt2021',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter.sendMail({
        from: 'botsmtt@gmail.com',
        to: user.email,
        subject: 'Resposta da sua solicitação - SMTT',
        html: `
          <main>
          <h2>Olá, tudo bem? ${user.name}</h2>
          <p>${mensagem_response}</p> 
      </main>
      <footer>
          <h6>SMTT - security</h6>
      </footer>`,
      });

      return response.json({
        resposta: 'Mensagem enviada para o e-mail',
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
      let user = await connection('user')
        .select('*')
        .where({ id })
        .orderBy('id', 'asc');

      if (!user) {
        return response.json({ mensagem: 'Ops! Digite novamente.' });
      }

      response.status(200).json({
        user,
        mensagem: 'Tudo foi ok!',
      });
    } catch (error) {
      return response.json({
        mensagem: 'Aconteceu algum error contact o administrador!',
      });
    }
  },
};
