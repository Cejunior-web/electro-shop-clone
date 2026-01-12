const path = require('path');
const express = require('express');

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, '..', 'client')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
  });
};