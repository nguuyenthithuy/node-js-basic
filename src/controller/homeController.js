
import pool from '../configs/connectDB'
import multer from 'multer'

let getHomePage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUser: rows })
}
let getDetailpage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select *from users where id =? `, [userId])


    return res.send(JSON.stringify(user))
}
let creatNewUser = async (req, res) => {
    console.log(req.body)
    let { firstNameNew, lastName, email, address } = req.body;
    await pool.execute('insert into users (firstName,lastName,email,address)values(?,?,?,?)',
        [firstNameNew, lastName, email, address])
    return res.redirect('/')
}
let deleteUser = async (req, res) => {
    let userID = req.body.userID
    await pool.execute('delete from users where id=?', [userID])
    return res.redirect('/')
}
let getEditUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select *from users where id=?`, [id])
    return res.render('update.ejs', { dataUser: user[0] })
}
let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName= ?, lastName= ?, email= ?, address= ? where id = ?',
        [firstName, lastName, email, address, id])
    return res.redirect('/')
}
let getUploadfilePage = async (req, res) => {
    return res.render('uploadfile.ejs')
}



let handleuploadfile = (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="upload/">Upload another image</a>`);

}


let uploadmultifiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    } // The same as when uploading single images

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}


module.exports = {
    getHomePage, getDetailpage, creatNewUser, deleteUser, getEditUser, postUpdateUser, getUploadfilePage,
    handleuploadfile, uploadmultifiles
}