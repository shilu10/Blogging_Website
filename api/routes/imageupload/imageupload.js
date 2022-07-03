const ImageUploadModel = require('../../models/ImageUpload');
const router = require('express').Router();
const multer = require('multer');
const UserModel = require('../../models/User');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("des")
    cb(null, 'images')
  },
  filename: function (req, file, cb) {  
    // null as first argument means no error
    cb(null, Date.now() + '-' + path.extname(file.originalname))  
}
});

const upload = multer({ storage: storage })

router.put('/uploadProfile/:id', upload.single('file'), async(req, res) => {
    const userId = req.params.id;
    console.log(userId, "user")
    var img = fs.readFileSync(req.file.path);
    const imgObj = {
      data: img,
      contentType: 'image/*'
    }
    const id = userId;

    const newImage = await ImageUploadModel.findOneAndUpdate({id: id},{
      image: imgObj
    });
    try{
       // const oldImages = await ImageUploadModel.deleteMany({
       //   id: id
       // });
      //  console.log(oldImages, "oold")
        newImage.save();
        return res.contentType("json")
            .send(newImage);
    } 
    catch(err){
      console.log(err)
        return res.status(400).json("error while uploading image");
    }
});

router.get('/:id', async(req, res)=>{
  console.log("in")
  try {
    const imgObj = await ImageUploadModel.findOne({
      id: req.params.id
    });
    return res.contentType('json')
      .send(imgObj);
     
  } 
  catch(err){
    console.log(err);
    return res.status(400).send("no image")
  }

});


router.post('/uploadProfile/:id', upload.single('file'), async(req, res) => {
  console.log("post login")
  const userId = req.params.id;
  const imgObj = {
    data: null,
    contentType: 'image/*'
  }
  
  const id = userId;
  const newImage = new ImageUploadModel({
    id: id,
    image: imgObj
  });
  try{
     
      newImage.save();
      return res.contentType("json")
          .send("success");
  } 
  catch(err){
    console.log(err)
      return res.status(400).json("error while uploading image");
  }
});

module.exports = router;