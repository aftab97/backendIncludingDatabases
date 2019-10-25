const mysql =require("mysql")
const express = require('express');

class SQL{
    constructor(host,user,password,database){
        this.conn = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
    }

    login(username,password){
        return new Promise((resolve,reject) =>{this.conn.query('SELECT * FROM users WHERE username = ? AND password = ?;',
        [username,password],
        (error,res) =>{
            if (error) throw error;
            if (res.length == 0){
                resolve('index')
            }
            else{
                resolve(res[0].type)
            }
        })}
        )
    }
    
    signup(username,phoneNum,email,password,radioVal){
        this.conn.query('INSERT INTO users SELECT ?,?,?,?,?;',
        [username,password,email,phoneNum,radioVal],
        (error,results) =>{
            if (error) throw error;
        })
    }
}

module.exports = SQL