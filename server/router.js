const Router = require('express');
const multer = require('multer');
const upload = multer({ limits:{fieldSize: 25 * 1024 * 1024} });
const UserController = require('./controllers/userController');
const AlbumController = require('./controllers/albumController');
const PhotoController = require('./controllers/photoController');
const FriendController = require('./controllers/friendController');
const TagController = require('./controllers/tagController');
const CommentController = require('./controllers/commentController');
const { getAlbumByUserId } = require('./models/album');

const router = Router();

//*** USER ROUTES ***//
router.get('/user/:id', UserController.getUserById);
router.post('/user/register', UserController.createUser);
router.post('/user/login', UserController.login);
router.post('/user/search', UserController.search);

//*** FRIEND ROUTES ***//
router.post('/friend/add', FriendController.addFriend);
router.post('/friend/delete', FriendController.deleteFriend);
router.get('/friend/friends/:id', FriendController.getFriends);
router.get('/friend/followers/:id', FriendController.getFollowers);

//*** ALBUM ROUTES ***//
router.post('/album/create', AlbumController.createAlbum);
router.get('/album/user/:id', AlbumController.getAlbumByUserId);
router.get('/album/delete/:id', AlbumController.deleteAlbum);

//*** PHOTO ROUTES ***//
router.get('/photo/album/:id', PhotoController.getPhotosByAlbumId);
router.post('/photo/create', upload.single('photo'), PhotoController.createPhoto);
router.get('/photo/delete/:id', PhotoController.deletePhoto);

//*** TAG ROUTES ***//
router.post('/tags/create', TagController.createTag);
router.post('/tags/search', TagController.search);
router.get('/tags/trending', TagController.getTrendingTags);

//*** COMMENT ROUTES ***//
router.post('/comment/create', CommentController.createComment);

//*** LIKE ROUTES ***//

module.exports = router;