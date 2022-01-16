# 爱刷题PLUS--API
爱刷题PLUS在[爱刷题](https://github.com/moke8/aishuati/)的基础上，舍弃了部署简单、纯前端部署等优势，加入了管理后台、更加方便管理操作和题库录入、修改等。在UI界面上采用了新的设计（原本大概属于没有设计）。

## 内容
内容分为题库、意见反馈、使用记录、用户管理几个部分
具体可以到``` 爱刷题PLUS--WECHAT ```和``` 爱刷题PLUS--ADMIN ```中查看

## 配置
### 小程序配置
utils/global.js

### 数据库配置
sql/index.js

## 开发
API内容主要分为admin和wechat两个部分，分别对应管理后台和小程序的API。
在层级上分为router、controllers、sql三个部分，也就是路由、控制器、数据库语句。
