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

# 大数溢出

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