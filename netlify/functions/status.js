const fetch = require('node-fetch');
const ping = require('ping');

exports.handler = async function (event, context) {
  try {
    console.log('Iniciando verificação de status...');
    const siteUrl = 'https://gghorizon.com';
    const startTime = Date.now();

    console.log(`Fazendo fetch para ${siteUrl}`);
    const response = await fetch(siteUrl, { method: 'HEAD', timeout: 5000 });
    const latency = Date.now() - startTime;
    const isOnline = response.ok;

    console.log('Fetch concluído. Iniciando ping...');
    const pingResult = await ping.promise.probe('gghorizon.com');
    const pingTime = pingResult.avg ? parseFloat(pingResult.avg) : null;

    console.log('Ping concluído. Montando resposta...');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: isOnline ? 'online' : 'offline',
        latency: latency,
        ping: pingTime,
        timestamp: new Date().toISOString(),
        message: isOnline ? 'Site está funcionando normalmente.' : 'Site pode estar enfrentando problemas.'
      })
    };
  } catch (error) {
    console.error('Erro na função status:', error.message, error.stack);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: 'error',
        message: 'Erro ao verificar o status do site.',
        error: error.message
      })
    };
  }
};