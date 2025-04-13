const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const page = event.queryStringParameters?.page || '';
    const siteUrl = `https://gghorizon.com${page.startsWith('/') ? page : '/' + page}`;
    console.log(`Fazendo fetch para ${siteUrl}`);
    const startTime = Date.now();

    const response = await fetch(siteUrl, { method: 'HEAD', timeout: 5000 });
    const latency = Date.now() - startTime;
    const isOnline = response.ok;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: isOnline ? 'online' : 'offline',
        latency: latency,
        ping: null,
        page: page || 'homepage',
        timestamp: new Date().toISOString(),
        message: isOnline ? `Página ${page || 'homepage'} está funcionando.` : `Página ${page || 'homepage'} pode estar com problemas.`
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
        message: 'Erro ao verificar o status.',
        error: error.message
      })
    };
  }
};