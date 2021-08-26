const express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const routes = express.Router();

const UserController = require('./controllers/UserController');
const WalletController = require('./controllers/WalletController');
const SocilitationController = require('./controllers/SolicitationController');
const CheckController = require('./controllers/CheckController');
const authMiddleware = require('./auth');

routes.get('/', (request, response) => {
  return response.send(
    'Sejá Bem vindo ao Back-End do App APT, contact um Administrador para entender as rotas! '
  );
});

//Login
routes.post('/login', UserController.login);
routes.post('/login/adm', UserController.loginAdm);
//User Routes
routes.post('/user/create', UserController.create);
routes.put('/user/update', UserController.update);
routes.post('/user/sendemail', UserController.sendEmail);
routes.get('/user', UserController.show);

routes.post('/wallet/create', WalletController.create);
routes.put('/wallet/update', WalletController.update);
routes.get('/wallet/user', WalletController.getByUser);
routes.get('/wallet', WalletController.getByWallet);

routes.post('/solicitation/create', SocilitationController.create);
routes.put('/solicitation/update', SocilitationController.updateStatus);
routes.get('/solicitation/user', SocilitationController.getByUser);
routes.get('/solicitation/show', SocilitationController.getById);
routes.get(
  '/solicitation/list',
  SocilitationController.getListenSolicititation
);
routes.get('/solicitation/listall', SocilitationController.getListenAll);
routes.put('/solicitation/updateAll', SocilitationController.updateAll);
routes.get('/solicitation/status/user', SocilitationController.getStatusByUser);

routes.get('/check/list', CheckController.list);
routes.post('/check/create', CheckController.create);
routes.get('/check/user', CheckController.getByUser);
routes.get('/check/place', CheckController.getByPlaceCar);
routes.get('/check/show', CheckController.show);

routes.post('/image/upload', upload.single('fileData'), (req, res, next) => {
  console.log(req.file); //this will be automatically set by multer
  //const fileData = fs.readFileSync(req.file);
  console.log(fileData);
});

module.exports = routes;
