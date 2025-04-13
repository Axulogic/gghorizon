const fetch = require('node-fetch');

let lastCheckedOnline = null;

exports.handler = async function (event, context) {
  try {
    const siteUrl = 'https://gghorizon.com';
    const response = await fetch(siteUrl, { method: 'HEAD', timeout: 5000 });
    const isOnline = response.ok;

    if (isOnline && !lastCheckedOnline) {
      lastCheckedOnline = Date.now();
    } else if (!isOnline) {
      lastCheckedOnline = null;
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        uptime: lastCheckedOnline
          ? Math.floor((Date.now() - lastCheckedOnline) / 1000 / 60) // Minutos
          : 0,
        status: isOnline ? 'online' : 'offline'
      })
    };
  } catch (error) {
    console.error('Erro na função uptime:', error.message);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: 'error',
        message: 'Erro ao verificar o uptime.',
        error: error.message
      })
    };
  }
};