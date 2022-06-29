### 1. 学习mongodb相关知识

##### mongodb三大基本概念

1.  数据库（database）：mongodb由很多个数据库组成
2. 集合（collection）：每个数据库由不同的集合组成
3. 文档对象（document）：每个集合中保存了很多条文档的那个对象

[![jmYKvn.md.png](https://s1.ax1x.com/2022/06/29/jmYKvn.md.png)](https://imgtu.com/i/jmYKvn)

##### 基础指令

1. 创建

```
// 切换(创建)到指定的数据库
use xxx

// 创建集合(在mongodb中你不需要创建即可，在插入一些信息时，会自动创建集合)
createCollection(name, options)
 name: 要创建的集合名称
 options: 可选参数, 指定有关内存大小及索引的选项
    capped：（可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。当该值为 true 时，必须指定 size 参数。
    size：（可选）为固定集合指定一个最大值，即字节数。如果 capped 为 true，也需要指定该字段。
    max：（可选）指定固定集合中包含文档的最大数量
```

2. 查看

```
// 查看所有的数据库
show dbs 或show databases

// 查看当前操作的数据库
db

// 查看当前数据库中所有的集合
show collections
```

3. 删除

```
// 删除当前数据库，执行该命令的时候一定要注意自己在哪个数据库中
db.dropDatabase()

// 删除集合
db.collection.drop()
```

##### CRUD操作

1. 插入数据

```
// 插入一条数据（插入的文档如果没有手动提供_id属性，则会自动创建一个）
 db.collectionName.insertOne( {name:'liu'} )
 	db表示的是当前操作的数据库
    collectionName表示操作的集合，若没有，则会自动创建
    
// 插入多条数据(需要用数组包起来)
  db.collectionName.insertMany( [ {name:'liu5'} , {name:'liu6'} ] ) 
  
// 万能API：db.collectionName.insert()(既可以插如单个数据，里面传对象，也可以传多个数据，里面传对象的数组)
db.collectionName.insert({name:'liu'})
db.collectionName.insert([ {name:'liu5'} , {name:'liu6'} ])
```

2. 查询数据

- 基础查询

```
// 查询集合所有的文档，即所有的数据。结果返回为一个数组
db.collectionName.find() 或db.collectionName.find({}) 
	find中可以传入两个对象，第一个对象是筛选项，第二个对象是返回值是否包含对象的属性，1为包含，0为不包含。
	
// 返回item属性，不返回status属性
db.inventory.find( { status: "A" }, { item: 1, status: 0 } )

// 统计文档个数
db.collectionName.count()   

// 条件查询，结果返回的是一个数组
db.collectionName.find({_id:222}) 

// db.collectionName.findOne() 返回的是查询到的对象数组中的第一个对象
db.students.findOne({_id:222}).name 
```

> mongodb支持直接通过内嵌文档的属性值进行查询

```
{
	name:'liu',
	hobby:{
		movies:['movie1','movie2'],
		cities:['zhuhai','chengdu']
	}
}
db.users.find({hobby.movies:'movie1'}) //错误
db.users.find({"hobby.movies":'movie1'})//此时查询的属性名必须加上引号
```

- 用查询操作符

```
$gt：大于
$gte：大于等于
$lt：小于
$lte：小于等于
$ne：不等于
$eq：等于的另一种写法

// 大于200
db.users.find({num:{$gt:200}}) 
// 大于200小于300
db.users.find({num:{$gt:200,$lt:300}}) 

$or 或者
// 大于300或小于200
db.users.find(
    {
        $or:[
            {num:{$gt:300}},
            {num:{$lt:200}}
        ]
    }
) 
```

- 分页查询

```
db.users.find().skip(页码-1 * 每页显示的条数).limit(每页显示的条数)

// 前10条数据
db.users.find().limit(10) 
// 跳过前50条数据，即查询的是第61-70条数据，即第6页的数据
db.users.find().skip(50).limit(10) 
```

- 排序

```
// 1表示升序排列，-1表示降序排列
db.emp.find().sort({sal:1}) 
// 先按照sal升序排列，如果遇到相同的sal，则按empno降序排列
db.emp.find().sort({sal:1,empno:-1}) 

// 注意：skip,limit,sort可以以任意的顺序调用，最终的结果都是先调sort，再调skip，最后调limit
```

3. 更新数据

```
// 替换整个文档
// db.collectionName.update(condiction,newDocument)
db.students.update({_id:'222'},{name:'kang'})

// 修改对应的属性，需要用到修改操作符，比如$set,$unset,$push,$addToSet
db.collectionName.update(
	# 查询条件
	{_id:222},
	{
		#修改对应的属性
		$set:{ 
			name:'kang2',
			age:21
		}
		#删除对应的属性
		$unset:{
			gender:1 //这里的1可以随便改为其他的值，无影响
		}
		
	}
)

// 注意：update默认与updateOne()等效，即对于匹配到的文档只更改其中的第一个
// updateMany()可以用来更改匹配到的所有文档
db.students.updateMany(
	{name:'liu'},
	{
		$set:{
			age:21,
			gender:222
		}
	}
)


// 向数组中添加数据
db.users.update({username:'liu'},{$push:{"hobby.movies":'movie4'}})

// 如果数据已经存在，则不会添加
db.users.update({username:'liu'},{$addToSet:{"hobby.movies":'movie4'}})


// 自增自减操作符$inc
{$inc:{num:100}} #让num自增100
{$inc:{num:-100}} #让num自减100

// 给工资低于1000的员工增加400的工资
db.emp.updateMany({sal:{$lt:1000}},{$inc:{sal:400}}) 
```

4. 删除数据

```
注意：删除某一个文档的属性，应该用update。   remove以及delete系列删除的是整个文档

// db.collectionName.remove() 
// remove默认会删除所有匹配的文档。相当于deleteMany()
// remove可以加第二个参数，表示只删除匹配到的第一个文档。此时相当于deleteOne()
db.students.remove({name:'liu',true})

// db.collectionName.deleteOne()
// db.collectionName.deleteMany()
db.students.deleteOne({name:'liu'})

// 删除所有数据：db.students.remove({})----效率较差，内部是在一条一条的删除文档。
// 可直接通过db.students.drop()删除整个集合来提高效率。

// 删除集合
db.collection.drop()

// 删除数据库
db.dropDatabase()

// 当删除的条件为内嵌的属性时：
db.users.remove({"hobby.movies":'movie3'})
```

### 2. 学习mongoose在node中连接mongodb
##### 基本概念
Schema模式对象：进行模式限制（类型限制）
Model模型对象：通过绑定集合和Schema创建Modal对象
Document文档对象：Modal模型对象的实例化
##### 使用流程
1. 下载

```
npm install mongoose
```

2. 连接数据库

```
// 引入mongoose模块
const mongoose = require('mongoose')

// 连接本地数据库
mongoose.connect('mongodb://localhost/mock')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('sucess')
})
```

3. 创建Schema模式对象

```
// 对于嵌套数据库，可以将嵌套的结构拿出来单独进行定义
// Order集合
const orderLinesSchema = mongoose.Schema({
  product: String,
  price: Number,
  cost: Number,
})

const ordersSchema = mongoose.Schema({
  city: String,
  state: String,
  country: String,
  userId: Number,
  orderDate: Date,
  shippingFee: Number,
  orderLines: [orderLinesSchema],
  total: Number,
})
```

4. Model绑定Schema，创建Model对象

```
// 绑定集合，得到一个集合的构造函数
const Users = mongoose.model('users', usersSchema)
const Orders = mongoose.model('orders', ordersSchema)
```

##### Modal对象的CURD
```
1. 增加数据
UserModel.create({ user_id: 100, name: "liu1" }, (err) => {
  if (!err) {
    console.log("插入成功");
  } else {
    console.log(err);
  }
});

let data = [
  { user_id: 101, name: "liu2", age: 22 },
  { user_id: 102, name: "liu3" },
];
UserModel.create(data, function (err) {
  console.log(arguments[1]); //第二个值表示的是所添加的文档对象,是一个数组
});

2. 查询数据
/* 
    查询:
    model.find(conditions,[projection],[options],callback)
    conditions:查询的条件 
    projection:投影  { name: 1, gender: 1, _id: 0 } 或 'name gender -_id'
    options:查询选项  { skip: xx, limit: xx }   
 
    model.findOne(...)
    model.findById(...)

    model.countDocuments(conditions,callback) 查询文档的数量
 */

UserModel.find({}, function (err, data) {
  console.log(data);
});
UserModel.find(
  { name: /liu/i },
  "name gender -_id",
  { skip: 2, limit: 1 },
  function (err, data) {
    console.log(data); //返回的是一个文档对象数组
  }
);

UserModel.findById("5f9fbfba14319e492c0f5bc4", (err, data) => {
  console.log(data);
  console.log(data instanceof UserModel); //true 返回的文档对象属于模型对象（即集合）的实例对象
});

UserModel.countDocuments({}, (err, data) => {
  console.log(data);
});

3. 修改数据
/* 修改：
    model.update(conditions,[doc],[options],callback)
        doc:修改后的文档对象
    model.updateMany(...)
    model.uodateOne(...)
*/
UserModel.updateOne({ name: "liu1" }, { $set: { age: 22 } }, function (
  err,
  data
) {
  if (!err) {
    console.log("修改成功");
  }
});

UserModel.find({ name: "liu1" }, (err, data) => {
  console.log(data);
});

4. 删除操作
/* 
删除：
model.remove(conditions,callback)
model.deleteOne(...)
model.deleteMany(...)
*/
UserModel.remove(
  {
    name: "liu2",
  },
  function (err, data) {
    console.log("删除成功");
  }
);
UserModel.find({}, function (err, data) {
  console.log(data);
});

```
##### 文档对象的CURD
```
const newUser = new Users({ name: 'Xiayifan' })

1. 增加数据
// 在Document对象的实例上调用save()方法,save的返回值是一个Promise
newUser.save((err, data) => {
  if (err) console.error(err)
  console.log(data)
})

2. 查询数据(没有)

3. 修改数据
newUser.update({$set:{name:"Hejiawei"}},err => {})

4. 删除数据
newUser.remove(err => {})
```

