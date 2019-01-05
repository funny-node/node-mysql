const mysql      = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', // 用户名
  password : '12345', // 密码
  database : 'test', // 数据库名
  supportBigNumbers: true,
  bigNumberStrings: true
})

// 连接数据库
connection.connect()

// var options = ''; // sql string
// var queryOptions = '';
// var deleteOptions = '';

// ? 为占位符

// 查
var query = connection.query('SELECT * from music_video where id = ?', [1], (err, results, fields) => {
  if (err) throw err

  // 查到的符合的条数
  console.log(results.length)

  for (var i in results) {
    // results[i] 为查到的每条数据
    // 这里可以进行数据处理
    // ...
    console.log(results[i].video_id)
  }
})

// 增
connection.query('INSERT INTO music_video(video_id, name) VALUES (?, ?)',
  ['1080797681514790925', '日式请柬'], (err, results, fields) => {
    if (err) throw err 
    console.log(results.insertId)
  })

// 删
connection.query('DELETE FROM music_video WHERE id = ?', [1], (err, results, fields) => {
  if (err) throw err 
  console.log('deleted ' + results.affectedRows + ' rows')
})

// 改
connection.query('UPDATE music_video SET name = ? where id = ?',
  ['韩式婚礼请柬小清新', 2], (err, results, fields) => {
    if (err) throw err 
    console.log('changed ' + results.changedRows + ' rows')
  })

// 关闭连接
connection.end()
