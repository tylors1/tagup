Tagup
==============

Tagup assignment

Usage
---------

This assignment is hosted on a digital ocean server with Node, Express, and MongoDB.

To list all records:
```bash
curl http://tylorsarrafzadeh.com/tagup/api/list
```

To create a record:
```bash
curl -i -X POST -H "Content-Type: application/json" -d "{\"timestamp\": \"2018-07-06T00:56:33.631Z\",\"value1\": \"value1\",\"value2\": \"value2\",\"value3\": \"value3\"}" http://tylorsarrafzadeh.com/tagup/api/create
```

To read a specific record:
```bash
curl http://tylorsarrafzadeh.com/tagup/api/read/:recordId
```

To modify a record:
```bash
curl -i -X PUT -H "Content-Type: application/json" -d "{\"timestamp\": \"2018-07-06T00:56:33.631Z\",\"value1\": \"vaue11\",\"value2\": \"value22\",\"value3\": \"value33\"}" http://tylorsarrafzadeh.com/tagup/api/modify/:recordId
```

To remove a record:
```bash
// curl -X DELETE http://tylorsarrafzadeh.com/tagup/api/remove/:recordId
```