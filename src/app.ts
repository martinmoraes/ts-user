import EntryPointExpress from './entrypoint/express/EntryPointExpress';

(() => {
  try {
    new EntryPointExpress().execute();
  } catch (error) {
    console.log('Aplicação encerrada inesperadamente: ', error);
    process.exit(1);
  }
})();
