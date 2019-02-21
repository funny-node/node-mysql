# node-mysql

操作 MySQL 的简单 demo

## 数据库创建

```sql
CREATE TABLE `music_video` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` bigint(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
```

## 插入数据

```sql
INSERT INTO `music_video` (`id`, `video_id`, `name`)
VALUES
  (1, 1080797681514790912, '小清新婚礼请柬'),
  (2, 1080797681514790915, '韩式婚礼请柬');
```

## 大数溢出

数据库有个字段 `video_id`，用的是 `bigint(20)`，有个数据 `1080797681514790912` 超过了 js 的 `MAX_SAFE_INTEGER` 的大小，如果直接取的话，精度会有问题。这时，返回的时候，**需要把这个数据转为字符串**，可以加上 `supportBigNumbers` 和 `bigNumberStrings` 的配置：

```js
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', // 用户名
  password : '12345', // 密码
  database : 'test', // 数据库名
  supportBigNumbers: true,
  bigNumberStrings: true
})
```

bigint 能表示的最大的数是 2^63-1 (9223372036854775807)，bigint 其实已经有长度了，在 MySQL 建表中的 length（比如 demo 中的 20），只是用于显示的位数。而 js 能表示的最大的数是 2^53-1，其实就是 `MAX_SAFE_INTEGER`，所以 bigint 在 js 中是可能溢出的

## 插入 TEXT 类型报错问题

由于开发需要存储大量文本（其实是一个结构化对象字符串），考虑到 char 以及 varchar 都不够大，所以打算用 TEXT 类型，顺便记一下 TEXT、MEDIUMTEXT 以及 LONGTEXT 的存储大小：

![](https://images2018.cnblogs.com/blog/675542/201808/675542-20180827220537906-818884208.png)

但是用 Node 连接 MySQL 插入数据库的时候，一直报错如下：

![](https://images2018.cnblogs.com/blog/675542/201808/675542-20180827220524123-305885546.png)

google 后给出解决方案（原因可以看下 [这里](https://stackoverflow.com/questions/10957238/incorrect-string-value-when-trying-to-insert-utf-8-into-mysql-via-jdbc)）：

1.  在数据库中将该字段编码改成 utf8mb4（如果还不行，将数据库，表也改了，反正我是只改了字段就 ok 了）
2. Node 连接数据库的时候给出 charset 选项。以 [mysql](https://github.com/mysqljs/mysql) 为例（其他语言应该也要在连接数据库的时候显示声明 charset）：

        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '12345', // my mac
            database: 'starskeeper',
            charset: 'utf8mb4' // 添加这里
        });