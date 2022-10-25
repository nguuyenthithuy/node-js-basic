import { resolveShowConfigPath } from '@babel/core/lib/config/files';
import pool from '../configs/connectDB'

let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'nguyễn Thị Thủy',
        data: rows,
    })
}

let creatnewuser = async (req, res) => {
    let { firstNameNew, lastName, email, address } = req.body;
    if (!firstNameNew || !lastName || !email || !address) {
        return res.status(200).json({
            message: "missing required params"
        })
    }

    await pool.execute('insert into users (firstName,lastName,email,address)values(?,?,?,?)',
        [firstNameNew, lastName, email, address])
    return res.status(200).json({
        message: 'Nguyễn thi Thủy'
    })
}
let updateuser = async (req, res) => {

    let { firstNameNew, lastName, email, address, id } = req.body;
    if (!firstNameNew || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "missing required params"
        })
    }
    await pool.execute('update users set firstName= ?, lastName= ?, email= ?, address= ? where id = ?',
        [firstNameNew, lastName, email, address, id])
    return res.status(200).json({
        message: 'Nguyễn thi Thủy'
    })
}
let deleteuser = async (req, res) => {
    let userID = req.params.id
    if (!userID) {
        return res.status(200).json({
            message: "missing required params"
        })
    }
    await pool.execute('delete from users where id=?', [userID])
    return res.status(200).json({
        message: 'Nguyễn thi Thủy'
    })
}
module.exports = {
    getAllUser, creatnewuser, updateuser, deleteuser
}