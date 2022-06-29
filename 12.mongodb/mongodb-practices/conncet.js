// 引入mongoose库
const mongoose = require('mongoose')

// 连接本地数据库
mongoose.connect('mongodb://localhost/mock')

// 监听是否连上数据库
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('sucess')
})

// 定义Schema,即数据库集合的数据类型
// User集合
const usersSchema = mongoose.Schema({
  name: String,
})

// 对于嵌套数据库，可以将嵌套的结构拿出来单独进行定义
// Order集合
const orderLinesSchema = mongoose.Schema({
  product: String,
  sku: String,
  qty: Number,
  price: Number,
  cost: Number,
})

const ordersSchema = mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  phone: String,
  name: String,
  userId: Number,
  orderDate: Date,
  status: String,
  shippingFee: Number,
  orderLines: [orderLinesSchema],
  total: Number,
})

// 绑定集合
const Users = mongoose.model('users', usersSchema)
const Orders = mongoose.model('orders', ordersSchema)

// Modal对象CURD

// 增加数据
Users.create({ name: 'Xiezhiyong' }, err => {
  if (err) console.error(err)
})

// 查询数据
Orders.find(
  { city: 'Lake Zoila' },
  'city country -_id',
  { skip: 1, limit: 2 },
  (err, data) => {
    if (err) console.error(err)
    console.log(data)
  }
)

// 更新数据
Users.updateOne(
  { name: 'houruijie' },
  { $set: { name: 'Houruijie' } },
  (err, data) => {
    if (err) console.error(err)
    console.log(data)
  }
)

// 删除数据
Users.deleteOne({ name: 'Houruijie' }, (err, data) => {
  if (err) console.error(err)
  console.log(data)
})

Users.deleteMany({ age: '18' }, (err, data) => {
  if (err) console.error(err)
  console.log(data)
})

// 查询数据条数
Users.count({}, (err, data) => {
  if (err) console.log(error)
  console.log(data)
})

// Document对象CURD

const newUser = new Users({ name: 'Xiawenming', age: '18' })

// 增加数据
newUser.save((err, data) => {
  if (err) console.error(err)
  console.log(data)
})

// 修改数据
newUser.update({ $unset: { name: 'Xiawenming' } }, (err, data) => {
  if (err) console.error(err)
  console.log(data)
})

// 删除数据
newUser.remove(err => {
  console.error(err)
})
