/**
 * 加解密小工具
 */

import crypto from 'crypto'

var aesEncrypt = (text) => {
  var key = Buffer.from('d8f77fb88eea85b35936207329b27700')
  var iv = Buffer.alloc(16)
  iv.fill(0)
  var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  var crypted = cipher.update(text, 'utf8', 'base64')
  crypted += cipher.final('base64')

  return crypted
}

var aesDecrypt = (text) => {
  var key = Buffer.from('d8f77fb88eea85b35936207329b27700')
  var iv = Buffer.alloc(16)
  iv.fill(0)
  var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  var dec = decipher.update(text, 'base64', 'utf8')
  dec += decipher.final('utf8')

  return dec
}

var md5Encrypt = (plainText) => {
  var MD5 = crypto.createHash('md5')
  MD5.update(plainText)
  var encryptedText = MD5.digest('hex')
  return encryptedText
}

export default{
  aesEncrypt,
  aesDecrypt,
  md5Encrypt
}
